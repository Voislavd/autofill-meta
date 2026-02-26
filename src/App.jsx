import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ObjectPanel from './components/ObjectPanel'
import EditorArea from './components/EditorArea'
import AutofillPanel from './components/panels/AutofillPanel'
import CanvaAIPanel from './components/panels/CanvaAIPanel'
import { SCHEMA } from './data/sampleData'
import './App.css'

export default function App() {
  const [activePanel, setActivePanel] = useState('apps')

  // Autofill state - lifted up for canvas coordination
  const [autofillView, setAutofillView] = useState('home')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedPageIndex, setSelectedPageIndex] = useState(0)
  const [isClickToMapMode, setIsClickToMapMode] = useState(false)
  const [mappings, setMappings] = useState({})
  const [highlightedElementId, setHighlightedElementId] = useState(null)
  const [isApplied, setIsApplied] = useState(false)
  
  // Canva AI state
  const [canvaAIPreviewMode, setCanvaAIPreviewMode] = useState(false)
  const [canvaAIMappingMode, setCanvaAIMappingMode] = useState(false)
  const [canvaAIApplyingMode, setCanvaAIApplyingMode] = useState(false)
  
  // Drag and drop state
  const [isDraggingField, setIsDraggingField] = useState(false)

  const handleSidebarClick = (panelId) => {
    if (activePanel === panelId) {
      setActivePanel(null)
    } else {
      setActivePanel(panelId)
    }
  }

  const handleClosePanel = () => {
    setActivePanel(null)
    // Reset autofill state when closing
    setAutofillView('home')
    setSelectedTemplate(null)
    setIsClickToMapMode(false)
    setIsApplied(false)
  }

  // Template selection handler (just sets template, view is handled by panel)
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setIsApplied(false) // Reset applied state when selecting new template

    // Initialize mappings from template
    const initialMappings = {}
    template.pages.forEach(page => {
      page.elements.forEach(el => {
        if (el.mappedField) {
          initialMappings[el.id] = el.mappedField
        }
      })
    })
    setMappings(initialMappings)
  }

  // Apply handler for Create flow
  const handleApply = () => {
    setIsApplied(true)
  }

  // Mapping handlers
  const handleFieldMap = (elementId, fieldId) => {
    // Use functional setState to handle multiple rapid updates correctly
    setMappings(prev => ({ ...prev, [elementId]: fieldId }))
  }

  const handleFieldUnmap = (elementId) => {
    const newMappings = { ...mappings }
    delete newMappings[elementId]
    setMappings(newMappings)
  }

  // Highlight handler - sets element and auto-clears after animation
  const handleFieldHighlight = (elementId) => {
    setHighlightedElementId(elementId)
    // Clear highlight after animation completes
    setTimeout(() => setHighlightedElementId(null), 1500)
  }

  // Handler for Canva AI showing template preview (before matching)
  const handleCanvaAITemplatePreview = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setCanvaAIPreviewMode(true)
    setMappings({})
  }

  // Handler for Canva AI entering mapping mode
  const handleCanvaAIMappingStart = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setCanvaAIPreviewMode(false)
    setCanvaAIMappingMode(true)
    
    // Start with empty mappings - AI will populate them
    setMappings({})
  }

  // Handler for Canva AI exiting mapping mode
  const handleCanvaAIMappingEnd = () => {
    setCanvaAIMappingMode(false)
  }

  // Handler for Canva AI starting apply mode (after save mapping)
  const handleCanvaAIApplyStart = () => {
    setCanvaAIMappingMode(false)  // Exit mapping mode (hides badges)
    setCanvaAIApplyingMode(true)  // Enter applying mode (keeps preview visible)
  }

  // Handler for Canva AI completing apply
  const handleCanvaAIApplyComplete = () => {
    setIsApplied(true)  // Show actual values instead of placeholders
  }

  // Handler for Canva AI ending apply mode
  const handleCanvaAIApplyEnd = () => {
    setCanvaAIApplyingMode(false)
  }

  // Panel type checks
  const isCanvaAIPanel = activePanel === 'canva-ai'
  const isAutofillPanel = activePanel === 'apps'

  // Show template preview for mappings, create-connect, and mapped-detail views
  // Also show for Canva AI when in mapping mode or applying mode
  const showTemplatePreview = (
    (isAutofillPanel && (autofillView === 'mappings' || autofillView === 'create-connect' || autofillView === 'mapped-detail')) ||
    (isCanvaAIPanel && (canvaAIPreviewMode || canvaAIMappingMode || canvaAIApplyingMode))
  ) && selectedTemplate

  return (
    <div className="app">
      <Header />
      <Sidebar activePanel={activePanel} onPanelClick={handleSidebarClick} />
      <ObjectPanel
        isOpen={activePanel !== null}
        title={isCanvaAIPanel ? 'Canva AI' : isAutofillPanel ? 'Autofill' : 'Panel'}
        onClose={handleClosePanel}
        hideHeader={isCanvaAIPanel || isAutofillPanel}
      >
        {isCanvaAIPanel ? (
          <CanvaAIPanel 
            onClose={handleClosePanel}
            onTemplatePreview={handleCanvaAITemplatePreview}
            onMappingStart={handleCanvaAIMappingStart}
            onMappingEnd={handleCanvaAIMappingEnd}
            onApplyStart={handleCanvaAIApplyStart}
            onApplyComplete={handleCanvaAIApplyComplete}
            onApplyEnd={handleCanvaAIApplyEnd}
            isApplied={isApplied}
            mappings={mappings}
            onFieldMap={handleFieldMap}
            onFieldUnmap={handleFieldUnmap}
            selectedPageIndex={selectedPageIndex}
            onPageSelect={setSelectedPageIndex}
            onFieldDragStart={() => setIsDraggingField(true)}
            onFieldDragEnd={() => setIsDraggingField(false)}
          />
        ) : isAutofillPanel ? (
          <AutofillPanel
            onClose={handleClosePanel}
            view={autofillView}
            onViewChange={setAutofillView}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
            selectedPageIndex={selectedPageIndex}
            onPageSelect={setSelectedPageIndex}
            isClickToMapMode={isClickToMapMode}
            onToggleClickToMap={() => setIsClickToMapMode(!isClickToMapMode)}
            mappings={mappings}
            onFieldMap={handleFieldMap}
            onFieldUnmap={handleFieldUnmap}
            onFieldHighlight={handleFieldHighlight}
            isApplied={isApplied}
            onApply={handleApply}
            onFieldDragStart={() => setIsDraggingField(true)}
            onFieldDragEnd={() => setIsDraggingField(false)}
          />
        ) : null}
      </ObjectPanel>
      <EditorArea
        isPanelOpen={activePanel !== null}
        showTemplatePreview={showTemplatePreview}
        template={selectedTemplate}
        selectedPageIndex={selectedPageIndex}
        onPageSelect={setSelectedPageIndex}
        mappings={mappings}
        onFieldMap={handleFieldMap}
        onFieldUnmap={handleFieldUnmap}
        isClickToMapMode={isClickToMapMode}
        schema={SCHEMA}
        highlightedElementId={highlightedElementId}
        isApplied={isApplied}
        isInMappingMode={canvaAIMappingMode || (isAutofillPanel && autofillView === 'mappings')}
        isDraggingField={isDraggingField}
        onFieldDragEnd={() => setIsDraggingField(false)}
        singlePageMode={isAutofillPanel && (autofillView === 'mappings' || autofillView === 'mapped-detail')}
      />
    </div>
  )
}
