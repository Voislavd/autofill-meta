import './autofill.css'

export default function AllMappingsView({ 
  template,
  mappings = {},
  schema,
  onBack,
  onUnmap,
  onFieldClick
}) {
  // Get field label by ID
  const getFieldLabel = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId) ||
                  schema.media.find(m => m.id === fieldId) ||
                  schema.tables.find(t => t.id === fieldId)
    return field?.label || fieldId
  }

  // Get field type by ID
  const getFieldType = (fieldId) => {
    if (schema.fields.find(f => f.id === fieldId)) return 'text'
    if (schema.media.find(m => m.id === fieldId)) return 'image'
    if (schema.tables.find(t => t.id === fieldId)) return 'table'
    return 'text'
  }

  // Get icon for field type
  const getTypeIcon = (type) => {
    switch (type) {
      case 'image': return '🖼'
      case 'table': return '⊞'
      default: return 'T'
    }
  }

  // Group mappings by page
  const getMappingsByPage = () => {
    const byPage = []
    
    template.pages.forEach((page, pageIndex) => {
      const pageMappings = page.elements
        .filter(el => mappings[el.id])
        .map(el => ({
          elementId: el.id,
          elementLabel: el.label,
          fieldId: mappings[el.id],
          fieldLabel: getFieldLabel(mappings[el.id]),
          fieldType: getFieldType(mappings[el.id])
        }))
      
      if (pageMappings.length > 0) {
        byPage.push({
          pageNumber: pageIndex + 1,
          pageTitle: page.title || `Page ${pageIndex + 1}`,
          mappings: pageMappings
        })
      }
    })
    
    return byPage
  }

  const mappingsByPage = getMappingsByPage()
  const totalMappings = mappingsByPage.reduce((sum, p) => sum + p.mappings.length, 0)

  return (
    <div className="all-mappings-view">
      {/* Header */}
      <div className="all-mappings-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="all-mappings-title">All matched fields</h3>
        <span className="all-mappings-count">{totalMappings} total</span>
      </div>

      {/* Mappings by Page */}
      <div className="all-mappings-content">
        {mappingsByPage.length === 0 ? (
          <div className="all-mappings-empty">
            <span className="empty-icon">📋</span>
            <span className="empty-text">No matched fields yet</span>
            <span className="empty-hint">Use Click to match to start matching fields</span>
          </div>
        ) : (
          mappingsByPage.map(page => (
            <div key={page.pageNumber} className="mappings-page-group">
              <div className="page-group-header">
                <span className="page-group-title">Page {page.pageNumber}</span>
                <span className="page-group-count">{page.mappings.length} fields</span>
              </div>
              
              <div className="page-group-items">
                {page.mappings.map(mapping => (
                  <div 
                    key={mapping.elementId} 
                    className="mapping-row"
                    onClick={() => onFieldClick?.(mapping.elementId)}
                  >
                    <span className="mapping-icon">{getTypeIcon(mapping.fieldType)}</span>
                    <div className="mapping-content">
                      <span className="mapping-field">{mapping.fieldLabel}</span>
                      <span className="mapping-element">→ {mapping.elementLabel}</span>
                    </div>
                    <button 
                      className="mapping-remove"
                      onClick={(e) => {
                        e.stopPropagation()
                        onUnmap?.(mapping.elementId)
                      }}
                    >
                      −
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}



