import { useState, useMemo } from 'react'
import { DATA_SOURCES, SCHEMA, CATALOGUE_FILTERS } from '../../data/sampleData'
import './panels.css'

export default function CreateConnector({
  template,
  mappings,
  isApplied,
  onApply,
  onEditMappings,
  onBack,
  onClose
}) {
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

  const getItemIcon = (item) => {
    switch (item.category) {
      case 'media': return '🖼'
      case 'table': return '☰'
      default: return 'Aa'
    }
  }

  const productCount = useMemo(() => {
    const dateCount = CATALOGUE_FILTERS.dateRange.find(f => f.id === selectedDateRange)?.count || 0
    const catCount = CATALOGUE_FILTERS.category.find(f => f.id === selectedCategory)?.count || 0
    const statusCount = CATALOGUE_FILTERS.status.find(f => f.id === selectedStatus)?.count || 0
    return Math.min(dateCount, catCount, statusCount)
  }, [selectedDateRange, selectedCategory, selectedStatus])

  return (
    <div className="create-connector">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Choose a connector</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Data Source Dropdown */}
      <div className="connector-section">
        <label className="section-label">Data source</label>
        <div className="data-source-dropdown">
          <select className="data-source-select" defaultValue={connectedSources[0]?.id}>
            {connectedSources.map(source => (
              <option key={source.id} value={source.id}>
                {source.name}
              </option>
            ))}
          </select>
          <span className="dropdown-chevron">▼</span>
        </div>
      </div>

      {/* Filters */}
      <div className="connector-section">
        <label className="section-label">Filters</label>
        <div className="connector-filters">
          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              {CATALOGUE_FILTERS.dateRange.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="dropdown-chevron">▼</span>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {CATALOGUE_FILTERS.category.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="dropdown-chevron">▼</span>
          </div>

          <div className="filter-dropdown">
            <select
              className="filter-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {CATALOGUE_FILTERS.status.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="dropdown-chevron">▼</span>
          </div>
        </div>

        <div className="record-count">
          <span className="record-count-number">{productCount}</span> products selected
        </div>
      </div>

      {/* Fields List */}
      <div className="connector-section fields-section">
        <div className="fields-header">
          <label className="section-label">Fields ({mappedItems.length})</label>
          <button className="edit-mappings-link" onClick={onEditMappings}>
            Edit matching
          </button>
        </div>

        <div className="field-check-list">
          {mappedItems.length > 0 ? (
            mappedItems.map((item) => (
              <div
                key={item.id}
                className={`field-check-item ${isApplied ? 'applied' : ''}`}
              >
                <div className="field-item-content">
                  <span className="field-item-icon">{getItemIcon(item)}</span>
                  <span className="field-check-label">{item.label}</span>
                </div>
                <span className={`field-check-icon ${isApplied ? 'check-applied' : ''}`}>
                  {isApplied ? '✓' : '○'}
                </span>
              </div>
            ))
          ) : (
            <div className="field-check-item empty">
              <span className="field-check-label">No fields matched yet</span>
            </div>
          )}
        </div>
      </div>

      {/* Create Summary + Button */}
      <div className="create-bottom">
        <p className="create-summary">
          This will create <strong>{productCount}</strong> designs
        </p>
        <button
          className={`apply-btn ${isApplied ? 'applied' : ''}`}
          onClick={onApply}
          disabled={isApplied || mappedItems.length === 0}
        >
          {isApplied ? (
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
