import { useState, useEffect } from 'react'
import PageThumbnailStrip from '../autofill/PageThumbnailStrip'
import AIAssistMappingCard from './canva-ai/AIAssistMappingCard'
import FieldsSchemaSection from '../autofill/FieldsSchemaSection'
import FieldListView from '../autofill/FieldListView'
import AllMappingsView from '../autofill/AllMappingsView'
import { SCHEMA } from '../../data/sampleData'
import textFieldIcon from '../../assets/icons/text-field-icon.png'
import mediaIcon from '../../assets/icons/media-icon.png'
import tableIcon from '../../assets/icons/table-icon.png'

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
  onSave,
  onFieldDragStart,
  onFieldDragEnd
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
          onFieldDragStart={onFieldDragStart}
          onFieldDragEnd={onFieldDragEnd}
          onDisconnect={(item, mappingInfo) => {
            if (mappingInfo?.elementId) {
              onFieldUnmap?.(mappingInfo.elementId)
            }
          }}
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
      </div>

      <FieldsSchemaSection
        schema={schema}
        mappings={mappings}
        template={template}
        onCategoryClick={handleCategoryClick}
        onViewAllClick={handleViewAllClick}
      />

      {/* Matched Fields Summary Card */}
      {mappedFields.length > 0 && (() => {
        const textCount = mappedFields.filter(f => f.type === 'text').length
        const mediaCount = mappedFields.filter(f => f.type === 'image').length
        const tableCount = mappedFields.filter(f => f.type === 'table').length
        const fieldNames = mappedFields.map(f => f.label).slice(0, 3).join(', ')
        return (
          <div className="mapped-fields-section">
            <h4 className="section-label">Matched fields</h4>
            <div className="fields-summary-card" onClick={handleViewAllClick}>
              <div className="fields-summary-top">
                <span className="fields-summary-count">{mappedFields.length} fields matched</span>
                <button className="edit-mappings-link" onClick={(e) => { e.stopPropagation(); handleViewAllClick() }}>
                  View matched fields
                </button>
              </div>
              <div className="fields-summary-detail">
                {textCount > 0 && <span className="fields-summary-tag"><img src={textFieldIcon} alt="" className="fields-summary-tag-icon" /> {textCount} text fields</span>}
                {mediaCount > 0 && <span className="fields-summary-tag"><img src={mediaIcon} alt="" className="fields-summary-tag-icon" /> {mediaCount} media</span>}
                {tableCount > 0 && <span className="fields-summary-tag"><img src={tableIcon} alt="" className="fields-summary-tag-icon" /> {tableCount} tables</span>}
              </div>
              <p className="fields-summary-preview">{fieldNames}{mappedFields.length > 3 ? '...' : ''}</p>
            </div>
          </div>
        )
      })()}

      {/* Save Button */}
      <div className="mappings-save-footer">
        <button className="save-mappings-btn" onClick={onSave}>
          Save matching
        </button>
      </div>
    </div>
  )
}

