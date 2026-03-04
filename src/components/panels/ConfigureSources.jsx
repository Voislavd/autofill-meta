import { useState } from 'react'
import { SCHEMA } from '../../data/sampleData'
import metaIcon from '../../assets/icons/meta-icon.png'
import textFieldIcon from '../../assets/icons/text-field-icon.png'
import mediaIcon from '../../assets/icons/media-icon.png'
import tableIcon from '../../assets/icons/table-icon.png'
import './panels.css'

export default function ConfigureSources({ onBack, onClose }) {
  const [expandedSection, setExpandedSection] = useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="configure-sources">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Your data</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Connector Card */}
      <div className="your-data-connector">
        <div className="source-hero-icon">
          <img src={metaIcon} alt="" className="source-icon-img" />
        </div>
        <div className="source-hero-content">
          <div className="source-hero-title-row">
            <span className="source-hero-title">Product Catalogue</span>
            <span className="source-hero-badge">Connected</span>
          </div>
          <span className="source-hero-desc">Your product catalogue synced from Meta</span>
        </div>
      </div>

      {/* Schema Sections */}
      <div className="your-data-schema">
        <h3 className="source-section-label">Schema</h3>

        {/* Fields */}
        <button
          className={`your-data-category ${expandedSection === 'fields' ? 'expanded' : ''}`}
          onClick={() => toggleSection('fields')}
        >
          <span className="your-data-category-icon">
            <img src={textFieldIcon} alt="" />
          </span>
          <span className="your-data-category-name">Fields</span>
          <span className="your-data-category-count">{SCHEMA.fields.length}</span>
          <span className="your-data-category-chevron">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d={expandedSection === 'fields' ? "M15 12.5L10 7.5L5 12.5" : "M7.5 5L12.5 10L7.5 15"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSection === 'fields' && (
          <div className="your-data-items">
            {SCHEMA.fields.map(field => (
              <div key={field.id} className="your-data-item">
                <span className="your-data-item-label">{field.label}</span>
                <span className="your-data-item-sample">{field.sampleValue}</span>
              </div>
            ))}
          </div>
        )}

        {/* Media */}
        <button
          className={`your-data-category ${expandedSection === 'media' ? 'expanded' : ''}`}
          onClick={() => toggleSection('media')}
        >
          <span className="your-data-category-icon">
            <img src={mediaIcon} alt="" />
          </span>
          <span className="your-data-category-name">Media</span>
          <span className="your-data-category-count">{SCHEMA.media.length}</span>
          <span className="your-data-category-chevron">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d={expandedSection === 'media' ? "M15 12.5L10 7.5L5 12.5" : "M7.5 5L12.5 10L7.5 15"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSection === 'media' && (
          <div className="your-data-items">
            {SCHEMA.media.map(item => (
              <div key={item.id} className="your-data-item">
                <span className="your-data-item-label">{item.label}</span>
                <span className="your-data-item-sample">{item.sampleValue}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tables */}
        <button
          className={`your-data-category ${expandedSection === 'tables' ? 'expanded' : ''}`}
          onClick={() => toggleSection('tables')}
        >
          <span className="your-data-category-icon">
            <img src={tableIcon} alt="" />
          </span>
          <span className="your-data-category-name">Tables</span>
          <span className="your-data-category-count">{SCHEMA.tables.length}</span>
          <span className="your-data-category-chevron">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d={expandedSection === 'tables' ? "M15 12.5L10 7.5L5 12.5" : "M7.5 5L12.5 10L7.5 15"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        {expandedSection === 'tables' && (
          <div className="your-data-items">
            {SCHEMA.tables.map(table => (
              <div key={table.id} className="your-data-item your-data-table-item">
                <span className="your-data-item-label">{table.label}</span>
                <span className="your-data-item-sample">{table.columns.join(', ')}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
