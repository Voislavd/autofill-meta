import './autofill.css'

import databaseIcon from '../../assets/icons/icon-database.png'
import textFieldIcon from '../../assets/icons/text-field-icon.png'
import mediaIcon from '../../assets/icons/media-icon.png'
import tableIcon from '../../assets/icons/table-icon.png'
import chevronRight from '../../assets/icons/chevron-right.png'

export default function FieldsSchemaSection({ 
  schema, 
  mappings = {}, 
  template,
  onCategoryClick,
  onViewAllClick
}) {
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

      {/* Data Source — static, single connector */}
      <div className="schema-source-card static">
        <span className="source-icon">
          <img src={databaseIcon} alt="" />
        </span>
        <span className="source-name">{schema.name}</span>
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
