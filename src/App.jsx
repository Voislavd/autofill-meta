import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ObjectPanel from './components/ObjectPanel'
import EditorArea from './components/EditorArea'
import AutofillPanel from './components/panels/AutofillPanel'
import CanvaAIPanel from './components/panels/CanvaAIPanel'
import MetaUploadPanel from './components/panels/MetaUploadPanel'
import { SCHEMA, BATCH_PRODUCTS } from './data/sampleData'
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
  
  // Batch creation state
  const [batchDesigns, setBatchDesigns] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Canva AI state
  const [canvaAIPreviewMode, setCanvaAIPreviewMode] = useState(false)
  const [canvaAIMappingMode, setCanvaAIMappingMode] = useState(false)
  const [canvaAIApplyingMode, setCanvaAIApplyingMode] = useState(false)
  
  // Drag and drop state
  const [isDraggingField, setIsDraggingField] = useState(false)
  
  // Meta upload panel state
  const [showMetaUpload, setShowMetaUpload] = useState(false)
  const [toastMessage, setToastMessage] = useState(null)
  const [toastFading, setToastFading] = useState(false)

  const showToast = (message) => {
    setToastMessage(message)
    setToastFading(false)
    setTimeout(() => setToastFading(true), 2500)
    setTimeout(() => setToastMessage(null), 2800)
  }

  const handleMetaUploaded = () => {
    setShowMetaUpload(false)
    showToast('Uploaded to Meta')
  }

  const handleSidebarClick = (panelId) => {
    if (activePanel === panelId) {
      setActivePanel(null)
    } else {
      setActivePanel(panelId)
    }
  }

  const handleClosePanel = () => {
    setActivePanel(null)
    setAutofillView('home')
    setSelectedTemplate(null)
    setIsClickToMapMode(false)
    setIsApplied(false)
    setBatchDesigns(null)
    setIsGenerating(false)
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setIsApplied(false)
    setBatchDesigns(null)
    setIsGenerating(false)

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

  // Batch create handler
  const handleApply = (productCount) => {
    setIsGenerating(true)
    const count = productCount || 8
    setTimeout(() => {
      setBatchDesigns(BATCH_PRODUCTS.slice(0, count))
      setIsApplied(true)
      setIsGenerating(false)
    }, 3000)
  }

  const handleFieldMap = (elementId, fieldId) => {
    setMappings(prev => ({ ...prev, [elementId]: fieldId }))
  }

  const handleFieldUnmap = (elementId) => {
    const newMappings = { ...mappings }
    delete newMappings[elementId]
    setMappings(newMappings)
  }

  const handleFieldHighlight = (elementId) => {
    setHighlightedElementId(elementId)
    setTimeout(() => setHighlightedElementId(null), 1500)
  }

  const handleCanvaAITemplatePreview = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setCanvaAIPreviewMode(true)
    setMappings({})
  }

  const handleCanvaAIMappingStart = (template) => {
    setSelectedTemplate(template)
    setSelectedPageIndex(0)
    setCanvaAIPreviewMode(false)
    setCanvaAIMappingMode(true)
    setMappings({})
  }

  const handleCanvaAIMappingEnd = () => {
    setCanvaAIMappingMode(false)
  }

  const handleCanvaAIApplyStart = () => {
    setCanvaAIMappingMode(false)
    setCanvaAIApplyingMode(true)
  }

  const handleCanvaAIApplyComplete = () => {
    setIsApplied(true)
  }

  const handleCanvaAIApplyEnd = () => {
    setCanvaAIApplyingMode(false)
  }

  const isCanvaAIPanel = activePanel === 'canva-ai'
  const isAutofillPanel = activePanel === 'apps'

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
            isGenerating={isGenerating}
            onApply={handleApply}
            onFieldDragStart={() => setIsDraggingField(true)}
            onFieldDragEnd={() => setIsDraggingField(false)}
            onUploadToMeta={() => setShowMetaUpload(true)}
          />
        ) : null}
      </ObjectPanel>
      {showMetaUpload && (
        <MetaUploadPanel
          onClose={() => setShowMetaUpload(false)}
          onUploaded={handleMetaUploaded}
          designCount={batchDesigns?.length || 8}
        />
      )}
      {toastMessage && (
        <div className={`toast-container ${toastFading ? 'toast-out' : ''}`}>
          <div className="toast">{toastMessage}</div>
        </div>
      )}
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
        singlePageMode={isAutofillPanel && (autofillView === 'mappings' || autofillView === 'mapped-detail' || autofillView === 'create-connect') && !batchDesigns}
        batchDesigns={batchDesigns}
        isGenerating={isGenerating}
      />
    </div>
  )
}
