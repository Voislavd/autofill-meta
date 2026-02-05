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
  const [activePanel, setActivePanel] = useState('canva-ai')

  // Autofill state - lifted up for canvas coordination
  const [autofillView, setAutofillView] = useState('home')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [selectedPageIndex, setSelectedPageIndex] = useState(0)
  const [isClickToMapMode, setIsClickToMapMode] = useState(false)
  const [mappings, setMappings] = useState({})
  const [highlightedElementId, setHighlightedElementId] = useState(null)
  const [isApplied, setIsApplied] = useState(false)
  
  // Canva AI mapping state
  const [canvaAIMappingMode, setCanvaAIMappingMode] = useState(false)
  
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
    setMappings({ ...mappings, [elementId]: fieldId })
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

  // Handler for Canva AI entering mapping mode
  const handleCanvaAIMappingStart = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setCanvaAIMappingMode(true)
    
    // Start with empty mappings - AI will populate them
    setMappings({})
  }

  // Handler for Canva AI exiting mapping mode
  const handleCanvaAIMappingEnd = () => {
    setCanvaAIMappingMode(false)
  }

  // Panel type checks
  const isCanvaAIPanel = activePanel === 'canva-ai'
  const isAutofillPanel = activePanel === 'apps'

  // Show template preview for mappings, create-connect, and mapped-detail views
  // Also show for Canva AI when in mapping mode
  const showTemplatePreview = (
    (isAutofillPanel && (autofillView === 'mappings' || autofillView === 'create-connect' || autofillView === 'mapped-detail')) ||
    (isCanvaAIPanel && canvaAIMappingMode)
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
            onMappingStart={handleCanvaAIMappingStart}
            onMappingEnd={handleCanvaAIMappingEnd}
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
        isDraggingField={isDraggingField}
      />
    </div>
  )
}
