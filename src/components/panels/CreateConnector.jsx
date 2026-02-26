import { useState, useMemo } from 'react'
import { DATA_SOURCES, SCHEMA, CATALOGUE_FILTERS } from '../../data/sampleData'
import Dropdown from '../ui/Dropdown'
import './panels.css'

export default function CreateConnector({
  template,
  mappings,
  isApplied,
  isGenerating,
  onApply,
  onEditMappings,
  onBack,
  onClose,
  onUploadToMeta
}) {
  const [selectedSource, setSelectedSource] = useState(DATA_SOURCES.filter(s => s.connected)[0]?.id)
  const [selectedDateRange, setSelectedDateRange] = useState('last-7')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('new')

  const connectedSources = DATA_SOURCES.filter(s => s.connected)

  const getMappedItems = () => {
    if (!template || !mappings) return []

    const mappedFieldIds = Object.values(mappings)
    const items = []

    SCHEMA.fields.forEach(field => {
      if (mappedFieldIds.includes(field.id)) {
        items.push({ ...field, category: 'field' })
      }
    })

    SCHEMA.media.forEach(media => {
      if (mappedFieldIds.includes(media.id)) {
        items.push({ ...media, category: 'media' })
      }
    })

    SCHEMA.tables.forEach(table => {
      if (mappedFieldIds.includes(table.id)) {
        items.push({ ...table, category: 'table' })
      }
    })

    return items
  }

  const mappedItems = getMappedItems()

  const fieldCount = mappedItems.filter(i => i.category === 'field').length
  const mediaCount = mappedItems.filter(i => i.category === 'media').length
  const tableCount = mappedItems.filter(i => i.category === 'table').length

  const fieldNames = mappedItems
    .filter(i => i.category === 'field')
    .map(i => i.label)
    .slice(0, 3)
    .join(', ')

  const productCount = useMemo(() => {
    const dateCount = CATALOGUE_FILTERS.dateRange.find(f => f.id === selectedDateRange)?.count || 0
    const catCount = CATALOGUE_FILTERS.category.find(f => f.id === selectedCategory)?.count || 0
    const statusCount = CATALOGUE_FILTERS.status.find(f => f.id === selectedStatus)?.count || 0
    return Math.min(dateCount, catCount, statusCount)
  }, [selectedDateRange, selectedCategory, selectedStatus])

  const sourceItems = connectedSources.map(s => ({ value: s.id, label: s.name }))
  const dateItems = CATALOGUE_FILTERS.dateRange.map(f => ({ value: f.id, label: f.label }))
  const categoryItems = CATALOGUE_FILTERS.category.map(f => ({ value: f.id, label: f.label }))
  const statusItems = CATALOGUE_FILTERS.status.map(f => ({ value: f.id, label: f.label }))

  return (
    <div className="create-connector">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Choose data</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Data Source Dropdown */}
      <div className="connector-section">
        <label className="section-label">Data source</label>
        <Dropdown
          items={sourceItems}
          value={selectedSource}
          onSelect={(item) => setSelectedSource(item.value)}
          fullWidth
        />
      </div>

      {/* Filters */}
      <div className="connector-section">
        <label className="section-label">Filters</label>
        <div className="connector-filters">
          <Dropdown
            items={dateItems}
            value={selectedDateRange}
            onSelect={(item) => setSelectedDateRange(item.value)}
            fullWidth
          />
          <Dropdown
            items={categoryItems}
            value={selectedCategory}
            onSelect={(item) => setSelectedCategory(item.value)}
            fullWidth
          />
          <Dropdown
            items={statusItems}
            value={selectedStatus}
            onSelect={(item) => setSelectedStatus(item.value)}
            fullWidth
          />
        </div>

        <div className="record-count">
          <span className="record-count-number">{productCount}</span> products selected
        </div>
      </div>

      {/* Fields Summary Card */}
      <div className="connector-section">
        <label className="section-label">Matched fields</label>
        {mappedItems.length > 0 ? (
          <div className="fields-summary-card" onClick={onEditMappings}>
            <div className="fields-summary-top">
              <span className="fields-summary-count">{mappedItems.length} fields matched</span>
              <button className="edit-mappings-link" onClick={(e) => { e.stopPropagation(); onEditMappings() }}>
                Edit matching
              </button>
            </div>
            <div className="fields-summary-detail">
              {fieldCount > 0 && <span className="fields-summary-tag">Aa {fieldCount} text</span>}
              {mediaCount > 0 && <span className="fields-summary-tag">🖼 {mediaCount} media</span>}
              {tableCount > 0 && <span className="fields-summary-tag">☰ {tableCount} tables</span>}
            </div>
            <p className="fields-summary-preview">{fieldNames}{fieldCount > 3 ? '...' : ''}</p>
          </div>
        ) : (
          <div className="fields-summary-card fields-summary-empty" onClick={onEditMappings}>
            <span className="fields-summary-count">No fields matched yet</span>
            <button className="edit-mappings-link" onClick={(e) => { e.stopPropagation(); onEditMappings() }}>
              Set up matching
            </button>
          </div>
        )}
      </div>

      {/* Create Button */}
      <div className="create-bottom">
        {isApplied && (
          <button className="upload-meta-btn" onClick={onUploadToMeta}>
            Upload to Meta
          </button>
        )}
        <button
          className={`apply-btn ${isApplied ? 'applied' : ''} ${isGenerating ? 'generating' : ''}`}
          onClick={() => onApply(productCount)}
          disabled={isApplied || isGenerating || mappedItems.length === 0}
        >
          {isGenerating ? (
            <>
              <span className="btn-spinner" />
              <span>Generating...</span>
            </>
          ) : isApplied ? (
            <>
              <span className="btn-icon">✓</span>
              <span>Created {productCount} designs</span>
            </>
          ) : (
            <>
              <span className="btn-icon">✦</span>
              <span>Create {productCount} designs</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
