import { DATA_SOURCES, SCHEMA } from '../../data/sampleData'
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

  // Get connected data sources only
  const connectedSources = DATA_SOURCES.filter(s => s.connected)

  // Get all fields that are mapped in this template (fields, media, tables)
  const getMappedItems = () => {
    if (!template || !mappings) return []

    const mappedFieldIds = Object.values(mappings)
    const items = []

    // Add text fields
    SCHEMA.fields.forEach(field => {
      if (mappedFieldIds.includes(field.id)) {
        items.push({ ...field, category: 'field' })
      }
    })

    // Add media
    SCHEMA.media.forEach(media => {
      if (mappedFieldIds.includes(media.id)) {
        items.push({ ...media, category: 'media' })
      }
    })

    // Add tables
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

  const handleApply = () => {
    onApply()
  }

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

      {/* Apply Button */}
      <button
        className={`apply-btn ${isApplied ? 'applied' : ''}`}
        onClick={handleApply}
        disabled={isApplied || mappedItems.length === 0}
      >
        {isApplied ? (
          <>
            <span className="btn-icon">✓</span>
            <span>Applied to design</span>
          </>
        ) : (
          <>
            <span className="btn-icon">✦</span>
            <span>Apply to design</span>
          </>
        )}
      </button>
    </div>
  )
}
