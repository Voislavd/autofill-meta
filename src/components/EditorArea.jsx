import { useState } from 'react'
import './EditorArea.css'
import Toolbar from './Toolbar'
import Canvas from './Canvas'
import TemplatePreview from './canvas/TemplatePreview'
import BatchPreview from './canvas/BatchPreview'

export default function EditorArea({
  isPanelOpen,
  showTemplatePreview,
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
  onFieldDragEnd,
  singlePageMode = false,
  batchDesigns = null,
  isGenerating = false
}) {
  const [dragOverElement, setDragOverElement] = useState(null)

  const handleElementDragOver = (elementId) => {
    setDragOverElement(elementId)
  }

  const handleElementDragLeave = () => {
    setDragOverElement(null)
  }

  const handleElementDrop = (elementId, fieldData) => {
    setDragOverElement(null)
    if (fieldData && fieldData.fieldId) {
      onFieldMap(elementId, fieldData.fieldId)
    }
    onFieldDragEnd?.()
  }

  const renderCanvas = () => {
    if (isGenerating) {
      return (
        <div className="generating-overlay">
          <div className="generating-spinner" />
          <span className="generating-text">Generating designs...</span>
          <span className="generating-subtext">Creating unique designs for each product</span>
        </div>
      )
    }

    if (batchDesigns) {
      return <BatchPreview designs={batchDesigns} />
    }

    if (showTemplatePreview) {
      return (
        <TemplatePreview
          template={template}
          selectedPageIndex={selectedPageIndex}
          onPageSelect={onPageSelect}
          mappings={mappings}
          onFieldMap={onFieldMap}
          onFieldUnmap={onFieldUnmap}
          isClickToMapMode={isClickToMapMode}
          schema={schema}
          isMarketerMode={isMarketerMode}
          highlightedElementId={highlightedElementId}
          isApplied={isApplied}
          isInMappingMode={isInMappingMode}
          isDraggingField={isDraggingField}
          dragOverElement={dragOverElement}
          onElementDragOver={handleElementDragOver}
          onElementDragLeave={handleElementDragLeave}
          onElementDrop={handleElementDrop}
          singlePageMode={singlePageMode}
        />
      )
    }

    return <Canvas />
  }

  return (
    <main className={`editor-area ${isPanelOpen ? '' : 'panel-closed'}`}>
      {!showTemplatePreview && !batchDesigns && !isGenerating && <Toolbar />}
      <div className="canvas-container">
        {renderCanvas()}
      </div>
    </main>
  )
}
