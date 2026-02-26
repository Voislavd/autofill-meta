import { useState, useEffect } from 'react'
import PageThumbnailStrip from '../autofill/PageThumbnailStrip'
import AIAssistMappingCard from './canva-ai/AIAssistMappingCard'
import FieldsSchemaSection from '../autofill/FieldsSchemaSection'
import FieldListView from '../autofill/FieldListView'
import AllMappingsView from '../autofill/AllMappingsView'
import MappedFieldsList from '../autofill/MappedFieldsList'
import { SCHEMA } from '../../data/sampleData'

const AI_MAPPING_RULES = {
  'Product Name': 'product-name',
  'Promo Label': 'promo-label',
  'Discount': 'discount-percent',
  'Product Image': 'product-image',
  'CTA': 'cta-text',
  'Brand': 'product-brand',
  'Price': 'product-price',
  'Sale Price': 'sale-price',
  'Description': 'product-description',
  'Category': 'product-category',
  'Lifestyle': 'lifestyle-image',
  'Logo': 'brand-logo',
}

export default function MappingsPanel({
  template,
  selectedPageIndex,
  onPageSelect,
  isClickToMapMode,
  onToggleClickToMap,
  mappings,
  onFieldMap,
  onFieldUnmap,
  onFieldHighlight,
  schema,
  onBack,
  onClose,
  onSave
}) {
  // Sub-view state: 'overview', 'field-list', 'all-mappings'
  const [subView, setSubView] = useState('overview')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [aiMappingState, setAiMappingState] = useState('analyzing')

  // Auto-trigger AI matching on mount
  useEffect(() => {
    if (!template || !onFieldMap) return

    const timer = setTimeout(() => {
      setAiMappingState('complete')

      template.pages.forEach(page => {
        page.elements.forEach(el => {
          if (el.label === 'Product Name') return
          if (!mappings[el.id]) {
            for (const [labelPattern, fieldId] of Object.entries(AI_MAPPING_RULES)) {
              if (el.label && el.label.toLowerCase().includes(labelPattern.toLowerCase())) {
                onFieldMap(el.id, fieldId)
                break
              }
            }
          }
        })
      })
    }, 5000)

    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!template) return null

  const currentPage = template.pages[selectedPageIndex]
  
  // Get mapped fields for current page
  const mappedFields = currentPage.elements
    .filter(el => mappings[el.id])
    .map(el => {
      const fieldId = mappings[el.id]
      const field = schema.fields.find(f => f.id === fieldId) ||
                    schema.media.find(m => m.id === fieldId) ||
                    schema.tables.find(t => t.id === fieldId)
      return {
        elementId: el.id,
        fieldId,
        label: field?.label || fieldId,
        type: el.type
      }
    })

  // Handle category card click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSubView('field-list')
  }

  // Handle view all mappings click
  const handleViewAllClick = () => {
    setSubView('all-mappings')
  }

  // Handle back from sub-view
  const handleSubViewBack = () => {
    setSubView('overview')
    setSelectedCategory(null)
  }

  // Render sub-view content
  if (subView === 'field-list' && selectedCategory) {
    return (
      <div className="mappings-panel">
        <FieldListView
          category={selectedCategory}
          schema={schema}
          mappings={mappings}
          template={template}
          onBack={handleSubViewBack}
        />
      </div>
    )
  }

  if (subView === 'all-mappings') {
    return (
      <div className="mappings-panel">
        <AllMappingsView
          template={template}
          mappings={mappings}
          schema={schema}
          onBack={handleSubViewBack}
          onUnmap={onFieldUnmap}
          onFieldClick={onFieldHighlight}
        />
      </div>
    )
  }

  return (
    <div className="mappings-panel">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Matched fields</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Page Thumbnails - only show for multi-page templates */}
      {template.pages.length > 1 && (
        <PageThumbnailStrip
          pages={template.pages}
          selectedIndex={selectedPageIndex}
          onPageSelect={onPageSelect}
          mappings={mappings}
        />
      )}

      {/* Matching Tools */}
      <div className="mapping-tools">
        <h4 className="section-label">Matching tools</h4>
        <AIAssistMappingCard
          state={aiMappingState}
          onMapWithAI={() => {}}
          onCancel={() => setAiMappingState('idle')}
        />
        <button
          className={`mapping-tool-btn click-btn ${isClickToMapMode ? 'active' : ''}`}
          onClick={onToggleClickToMap}
        >
          <span className="tool-icon">⎋</span>
          Click to match
        </button>
      </div>

      {/* Show Fields & Schema when not in click-to-map mode */}
      {!isClickToMapMode && (
        <FieldsSchemaSection
          schema={schema}
          mappings={mappings}
          template={template}
          onCategoryClick={handleCategoryClick}
          onViewAllClick={handleViewAllClick}
        />
      )}

      {/* Show Mapped Fields when in click-to-map mode */}
      {isClickToMapMode && (
        <div className="mapped-fields-section">
          <h4 className="section-label">Matched fields (Page {selectedPageIndex + 1})</h4>

          {mappedFields.length === 0 ? (
            <div className="click-to-map-hint">
              <span className="info-icon">ℹ</span>
              <span>Click on an element to match it</span>
            </div>
          ) : (
            <MappedFieldsList
              fields={mappedFields}
              onUnmap={onFieldUnmap}
              onFieldClick={onFieldHighlight}
            />
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="mappings-save-footer">
        <button className="save-mappings-btn" onClick={onSave}>
          Save matching
        </button>
      </div>
    </div>
  )
}

