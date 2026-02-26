import { useState } from 'react'
import './EditorArea.css'
import Toolbar from './Toolbar'
import Canvas from './Canvas'
import TemplatePreview from './canvas/TemplatePreview'

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
  singlePageMode = false
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
    // Also reset drag state when drop happens
    onFieldDragEnd?.()
  }

  return (
    <main className={`editor-area ${isPanelOpen ? '' : 'panel-closed'}`}>
      {!showTemplatePreview && <Toolbar />}
      <div className="canvas-container">
        {showTemplatePreview ? (
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
        ) : (
          <Canvas />
        )}
      </div>
    </main>
  )
}
