import { useState, useRef, useEffect } from 'react'
import './autofill.css'

// Import icons
import databaseIcon from '../../assets/icons/icon-database.png'
import textFieldIcon from '../../assets/icons/text-field-icon.png'
import mediaIcon from '../../assets/icons/media-icon.png'
import tableIcon from '../../assets/icons/table-icon.png'
import chevronDown from '../../assets/icons/chevron-down.png'
import chevronRight from '../../assets/icons/chevron-right.png'

const DATA_SOURCES = [
  { id: 'meta-catalogue', name: 'Meta Catalogue' },
  { id: 'canva-sheets', name: 'Canva Sheets' },
  { id: 'manual-upload', name: 'Manual Upload' }
]

export default function FieldsSchemaSection({ 
  schema, 
  mappings = {}, 
  template,
  onCategoryClick,
  onViewAllClick
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedSourceId, setSelectedSourceId] = useState(schema.id)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedSource = DATA_SOURCES.find(s => s.id === selectedSourceId) || DATA_SOURCES[0]

  // Count mapped fields across all pages
  const getMappedCount = (type) => {
    const mappedFieldIds = new Set(Object.values(mappings))
    
    switch (type) {
      case 'fields':
        return schema.fields.filter(f => mappedFieldIds.has(f.id)).length
      case 'media':
        return schema.media.filter(m => mappedFieldIds.has(m.id)).length
      case 'tables':
        return schema.tables.filter(t => mappedFieldIds.has(t.id)).length
      default:
        return 0
    }
  }

  const fieldsTotal = schema.fields.length
  const mediaTotal = schema.media.length
  const tablesTotal = schema.tables.length

  const fieldsMapped = getMappedCount('fields')
  const mediaMapped = getMappedCount('media')
  const tablesMapped = getMappedCount('tables')

  const fieldsUnmapped = fieldsTotal - fieldsMapped
  const mediaUnmapped = mediaTotal - mediaMapped
  const tablesUnmapped = tablesTotal - tablesMapped

  return (
    <div className="fields-schema-section">
      <h4 className="section-label">Fields & Schema</h4>

      {/* Data Source Selector */}
      <div className="schema-source-wrapper" ref={dropdownRef}>
        <button 
          className={`schema-source-card ${isDropdownOpen ? 'open' : ''}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="source-icon">
            <img src={databaseIcon} alt="" />
          </span>
          <span className="source-name">{selectedSource.name}</span>
          <span className={`source-chevron ${isDropdownOpen ? 'open' : ''}`}>
            <img src={chevronDown} alt="" />
          </span>
        </button>
        
        {isDropdownOpen && (
          <div className="source-dropdown">
            {DATA_SOURCES.map(source => (
              <button
                key={source.id}
                className={`source-option ${selectedSourceId === source.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSourceId(source.id)
                  setIsDropdownOpen(false)
                }}
              >
                <span className="source-option-icon">
                  <img src={databaseIcon} alt="" />
                </span>
                <span className="source-option-name">{source.name}</span>
                {selectedSourceId === source.id && (
                  <span className="source-option-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fields Card */}
      <button 
        className="schema-category-card"
        onClick={() => onCategoryClick?.('fields')}
      >
        <span className="category-icon">
          <img src={textFieldIcon} alt="" />
        </span>
        <span className="category-name">Fields</span>
        <span className={`category-count ${fieldsUnmapped > 0 ? 'unmapped' : 'complete'}`}>
          {fieldsUnmapped > 0 ? (
            <>
              <span className="count-dot"></span>
              {fieldsUnmapped} unmatched
            </>
          ) : (
            '✓ All matched'
          )}
        </span>
        <span className="category-chevron">
          <img src={chevronRight} alt="" />
        </span>
      </button>

      {/* Media Card */}
      <button 
        className="schema-category-card"
        onClick={() => onCategoryClick?.('media')}
      >
        <span className="category-icon">
          <img src={mediaIcon} alt="" />
        </span>
        <span className="category-name">Media</span>
        <span className={`category-count ${mediaUnmapped > 0 ? 'unmapped' : 'complete'}`}>
          {mediaUnmapped > 0 ? (
            <>
              <span className="count-dot"></span>
              {mediaUnmapped} unmatched
            </>
          ) : (
            '✓ All matched'
          )}
        </span>
        <span className="category-chevron">
          <img src={chevronRight} alt="" />
        </span>
      </button>

      {/* Tables Card */}
      <button 
        className="schema-category-card"
        onClick={() => onCategoryClick?.('tables')}
      >
        <span className="category-icon">
          <img src={tableIcon} alt="" />
        </span>
        <span className="category-name">Tables</span>
        <span className={`category-count ${tablesUnmapped > 0 ? 'unmapped' : 'complete'}`}>
          {tablesUnmapped > 0 ? (
            <>
              <span className="count-dot"></span>
              {tablesUnmapped} unmatched
            </>
          ) : (
            '✓ All matched'
          )}
        </span>
        <span className="category-chevron">
          <img src={chevronRight} alt="" />
        </span>
      </button>

    </div>
  )
}

