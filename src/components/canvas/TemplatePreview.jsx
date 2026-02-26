import { useState, useEffect, useRef } from 'react'
import PageContainer from './PageContainer'
import FieldPopover from './FieldPopover'
import './canvas-preview.css'

// AI prediction - matches element label/content to schema fields
function predictFieldForElement(element, schema) {
  const label = (element.label || '').toLowerCase()
  
  // Get all fields based on element type
  let candidates = []
  if (element.type === 'image') {
    candidates = schema.media
  } else if (element.type === 'table') {
    candidates = schema.tables
  } else {
    candidates = schema.fields
  }
  
  // Scoring: find best match based on label similarity
  let bestMatch = null
  let bestScore = 0
  
  for (const field of candidates) {
    const fieldLabel = field.label.toLowerCase()
    const fieldId = field.id.toLowerCase()
    
    // Exact match
    if (label === fieldLabel || label.includes(fieldLabel) || fieldLabel.includes(label)) {
      return field.id
    }
    
    // Keyword matching
    const labelWords = label.split(/\s+/)
    const fieldWords = fieldLabel.split(/\s+/)
    
    let score = 0
    for (const lw of labelWords) {
      for (const fw of fieldWords) {
        if (lw.includes(fw) || fw.includes(lw)) {
          score += 1
        }
      }
    }
    
    // Check field ID too
    if (label.includes(fieldId.replace(/-/g, ' ')) || fieldId.includes(label.replace(/\s+/g, '-'))) {
      score += 2
    }
    
    // Special keyword associations
    const keywordMap = {
      'company': 'company-name',
      'abc': 'company-name',
      'employee': 'employee-count',
      'xx': 'employee-count',
      'department': 'department',
      'start': 'start-date',
      'date': 'start-date',
      'contact': 'contact-info',
      'table': 'contact-info',
      'summary': 'benefits-summary',
      'benefit': 'benefits-summary',
    }
    
    for (const [keyword, targetFieldId] of Object.entries(keywordMap)) {
      if (label.includes(keyword) && field.id === targetFieldId) {
        score += 3
      }
    }
    
    if (score > bestScore) {
      bestScore = score
      bestMatch = field.id
    }
  }
  
  return bestMatch
}

export default function TemplatePreview({
  template,
  selectedPageIndex,
  onPageSelect,
  mappings,
  onFieldMap,
  onFieldUnmap,
  isClickToMapMode,
  schema,
  isMarketerMode = false,
  highlightedElementId,
  isApplied = false,
  isInMappingMode = false,
  isDraggingField = false,
  dragOverElement,
  onElementDragOver,
  onElementDragLeave,
  onElementDrop,
  singlePageMode = false
}) {
  const [popoverState, setPopoverState] = useState({
    isOpen: false,
    elementId: null,
    elementType: 'text',
    position: { x: 0, y: 0 }
  })
  
  // Refs for scrolling to pages
  const pageRefs = useRef([])
  const scrollContainerRef = useRef(null)

  // Scroll to selected page when it changes
  useEffect(() => {
    if (template && pageRefs.current[selectedPageIndex]) {
      pageRefs.current[selectedPageIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [selectedPageIndex, template])

  if (!template) return null

  const handleElementClick = (element, rect) => {
    if (!isClickToMapMode && !mappings[element.id]) return
    
    const isUnmapped = !mappings[element.id]
    
    // If unmapped and in click-to-map mode, predict and auto-map (no popover)
    if (isClickToMapMode && isUnmapped) {
      const predictedFieldId = predictFieldForElement(element, schema)
      if (predictedFieldId) {
        // Auto-map with AI prediction - just show the badge, no popover
        onFieldMap(element.id, predictedFieldId)
      }
      return
    }
    
    // For already-mapped elements, show popover to change/remove mapping
    setPopoverState({
      isOpen: true,
      elementId: element.id,
      elementType: element.type || 'text',
      currentFieldId: mappings[element.id] || null,
      position: { 
        x: rect.left + rect.width / 2,
        y: rect.top
      }
    })
  }

  const handleFieldSelect = (fieldId) => {
    if (popoverState.elementId) {
      onFieldMap(popoverState.elementId, fieldId)
    }
    setPopoverState({ isOpen: false, elementId: null, position: { x: 0, y: 0 } })
  }

  const handleDisconnect = () => {
    if (popoverState.elementId) {
      onFieldUnmap(popoverState.elementId)
    }
    setPopoverState({ isOpen: false, elementId: null, position: { x: 0, y: 0 } })
  }

  const handleClosePopover = () => {
    setPopoverState({ isOpen: false, elementId: null, position: { x: 0, y: 0 } })
  }

  const pagesToRender = singlePageMode
    ? [{ page: template.pages[selectedPageIndex], index: selectedPageIndex }]
    : template.pages.map((page, index) => ({ page, index }))

  return (
    <div className={`template-preview ${singlePageMode ? 'single-page-mode' : ''}`}>
      <div className="pages-scroll-container" ref={scrollContainerRef}>
        {pagesToRender.map(({ page, index }) => (
          <div 
            key={page.id} 
            ref={el => pageRefs.current[index] = el}
            className="page-scroll-anchor"
          >
            <PageContainer
              page={page}
              pageNumber={index + 1}
              pageIndex={index}
              mappings={mappings}
              schema={schema}
              isSelected={selectedPageIndex === index}
              isClickToMapMode={isClickToMapMode}
              onElementClick={handleElementClick}
              onElementUnmap={onFieldUnmap}
              onPageSelect={onPageSelect}
              isMarketerMode={isMarketerMode}
              highlightedElementId={highlightedElementId}
              isApplied={isApplied}
              isInMappingMode={isInMappingMode}
              isDraggingField={isDraggingField}
              dragOverElement={dragOverElement}
              onElementDragOver={onElementDragOver}
              onElementDragLeave={onElementDragLeave}
              onElementDrop={onElementDrop}
            />
          </div>
        ))}
      </div>

      {/* Page dots for single page mode */}
      {singlePageMode && template.pages.length > 1 && (
        <div className="single-page-dots">
          {template.pages.map((_, i) => (
            <button
              key={i}
              className={`page-dot ${i === selectedPageIndex ? 'active' : ''}`}
              onClick={() => onPageSelect(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      )}

      {popoverState.isOpen && (
        <FieldPopover
          position={popoverState.position}
          currentFieldId={popoverState.currentFieldId}
          elementType={popoverState.elementType}
          schema={schema}
          onSelect={handleFieldSelect}
          onDisconnect={handleDisconnect}
          onClose={handleClosePopover}
        />
      )}
    </div>
  )
}

