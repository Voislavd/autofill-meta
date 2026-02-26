import './autofill.css'

export default function MappedFieldsList({ fields, onUnmap, onFieldClick }) {
  if (fields.length === 0) {
    return (
      <div className="no-fields">
        <span className="no-fields-text">No matched fields on this page</span>
      </div>
    )
  }

  const getIcon = (type) => {
    switch (type) {
      case 'text': return 'T'
      case 'image': return '🖼'
      case 'table': return '⊞'
      default: return 'T'
    }
  }

  return (
    <div className="mapped-fields-list">
      {fields.map(field => (
        <div 
          key={field.elementId} 
          className="mapped-field-row"
          onClick={() => onFieldClick?.(field.elementId)}
        >
          <span className="field-icon">{getIcon(field.type)}</span>
          <span className="field-label">{field.label}</span>
          <button 
            className="field-remove"
            onClick={(e) => {
              e.stopPropagation()
              onUnmap(field.elementId)
            }}
          >
            −
          </button>
        </div>
      ))}
    </div>
  )
}

