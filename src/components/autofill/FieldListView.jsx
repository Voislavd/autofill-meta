import { useState, useRef, useEffect } from 'react'
import './autofill.css'
import textFieldIcon from '../../assets/icons/text-field-icon.png'
import mediaIcon from '../../assets/icons/media-icon.png'
import tableIcon from '../../assets/icons/table-icon.png'
import searchIcon from '../../assets/icons/search-icon.png'
import iconDisconnect from '../../assets/icons/icon-disconnect-dark.png'
import iconDrag from '../../assets/icons/Icon-drag.png'

export default function FieldListView({ 
  category, // 'fields', 'media', or 'tables'
  schema, 
  mappings = {},
  template,
  onBack,
  onFieldClick,
  onFieldDragStart,
  onFieldDragEnd,
  onDisconnect
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [draggingItem, setDraggingItem] = useState(null)
  const dragPreviewRef = useRef(null)

  // Get items based on category
  const getItems = () => {
    switch (category) {
      case 'fields':
        return schema.fields.map(f => ({ ...f, fieldType: 'text' }))
      case 'media':
        return schema.media.map(m => ({ ...m, fieldType: 'image' }))
      case 'tables':
        return schema.tables.map(t => ({ ...t, fieldType: 'table' }))
      default:
        return []
    }
  }

  const items = getItems()
  
  // Filter by search
  const filteredItems = searchQuery
    ? items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : items

  // Check if a field is mapped and to which element
  const getMappingInfo = (fieldId) => {
    // Find which element ID maps to this field
    const elementId = Object.entries(mappings).find(([_, fId]) => fId === fieldId)?.[0]
    if (!elementId) return null

    // Find the element across all pages
    for (const page of template.pages) {
      const element = page.elements.find(el => el.id === elementId)
      if (element) {
        const pageIndex = template.pages.indexOf(page)
        return {
          elementId,
          elementLabel: element.label,
          pageNumber: pageIndex + 1
        }
      }
    }
    return null
  }

  // Get icon for field type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'image': return mediaIcon
      case 'table': return tableIcon
      default: return textFieldIcon
    }
  }

  const getCategoryTitle = () => {
    switch (category) {
      case 'fields': return 'Fields'
      case 'media': return 'Media'
      case 'tables': return 'Tables'
      default: return 'Fields'
    }
  }

  // Split items into mapped and unmapped
  const unmappedItems = filteredItems.filter(item => !getMappingInfo(item.id))
  const mappedItems = filteredItems.filter(item => getMappingInfo(item.id))

  // Drag handlers
  const handleDragStart = (e, item) => {
    setDraggingItem(item)
    
    // Create custom drag image
    const dragPreview = document.createElement('div')
    dragPreview.className = 'field-drag-preview'
    dragPreview.innerHTML = `
      <div class="field-drag-preview-header">
        <span class="field-drag-preview-icon">
          <img src="${getTypeIcon(item.fieldType)}" alt="" />
        </span>
        <span class="field-drag-preview-label">${item.label}</span>
      </div>
      ${item.sampleValue ? `<span class="field-drag-preview-sample">${item.sampleValue}</span>` : ''}
    `
    document.body.appendChild(dragPreview)
    dragPreviewRef.current = dragPreview
    
    // Position off-screen initially
    dragPreview.style.position = 'fixed'
    dragPreview.style.top = '-1000px'
    dragPreview.style.left = '-1000px'
    
    e.dataTransfer.setDragImage(dragPreview, 160, 40)
    e.dataTransfer.setData('application/json', JSON.stringify({
      fieldId: item.id,
      fieldLabel: item.label,
      fieldType: item.fieldType,
      sampleValue: item.sampleValue
    }))
    e.dataTransfer.effectAllowed = 'copy'
    
    // Notify parent
    onFieldDragStart?.(item)
  }

  const handleDragEnd = (e) => {
    setDraggingItem(null)
    
    // Clean up drag preview
    if (dragPreviewRef.current) {
      document.body.removeChild(dragPreviewRef.current)
      dragPreviewRef.current = null
    }
    
    onFieldDragEnd?.()
  }

  // Render a field item
  const renderFieldItem = (item, isMapped) => {
    const mappingInfo = getMappingInfo(item.id)
    
    return (
      <div 
        key={item.id} 
        className={`field-list-item ${isMapped ? 'is-mapped' : ''} ${draggingItem?.id === item.id ? 'is-dragging' : ''}`}
        onClick={() => onFieldClick?.(item)}
        draggable={!isMapped}
        onDragStart={(e) => handleDragStart(e, item)}
        onDragEnd={handleDragEnd}
      >
        <div className="field-list-item-header">
          <span className="field-list-icon">
            <img src={getTypeIcon(item.fieldType)} alt="" />
          </span>
          <span className="field-list-label">{item.label}</span>
          <span className="field-list-menu">
            {isMapped ? (
              <button 
                className="disconnect-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onDisconnect?.(item, mappingInfo)
                }}
                title="Disconnect matching"
              >
                <img src={iconDisconnect} alt="Disconnect" className="disconnect-icon" />
              </button>
            ) : (
              <img src={iconDrag} alt="Drag" className="drag-icon" />
            )}
          </span>
        </div>
        {item.sampleValue && (
          <span className="field-list-sample">{item.sampleValue}</span>
        )}
        {item.fieldType === 'table' && item.columns && item.rows && (
          <div className="field-table-preview">
            <table>
              <thead>
                <tr>
                  <th className="field-table-row-num"></th>
                  {item.columns.slice(0, 3).map((col, i) => (
                    <th key={i}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.slice(0, 3).map((row, ri) => (
                  <tr key={ri}>
                    <td className="field-table-row-num">{ri + 1}</td>
                    {row.slice(0, 3).map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="field-list-view">
      {/* Header */}
      <div className="field-list-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="field-list-title">{getCategoryTitle()}</h3>
        <span className="field-list-count">{items.length} items</span>
      </div>

      {/* Body */}
      <div className="field-list-body">
        {/* Search */}
        <div className="field-list-search">
          <span className="search-icon">
            <img src={searchIcon} alt="" />
          </span>
          <input
            type="text"
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Drag and Drop Instruction */}
        <div className="drag-drop-instruction">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L10 17M10 3L6 7M10 3L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Drag and drop to match</span>
        </div>

        {/* List */}
        <div className="field-list-items">
          {filteredItems.length === 0 ? (
            <div className="field-list-empty">No {category} found</div>
          ) : (
            <>
              {/* Unmapped Section */}
              {unmappedItems.length > 0 && (
                <div className="field-list-section">
                  <h4 className="field-list-section-title">Unmatched</h4>
                  {unmappedItems.map(item => renderFieldItem(item, false))}
                </div>
              )}

              {/* Mapped Section */}
              {mappedItems.length > 0 && (
                <div className="field-list-section">
                  <h4 className="field-list-section-title">Matched</h4>
                  {mappedItems.map(item => renderFieldItem(item, true))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}



