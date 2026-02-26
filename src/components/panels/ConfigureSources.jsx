import metaIcon from '../../assets/icons/meta-icon.png'
import iconSheet from '../../assets/icons/icon-sheet.png'
import './panels.css'

export default function ConfigureSources({ onBack, onClose }) {
  return (
    <div className="configure-sources">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Import data</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Meta Catalogue — Hero option */}
      <button className="source-hero-card">
        <div className="source-hero-icon">
          <img src={metaIcon} alt="" className="source-icon-img" />
        </div>
        <div className="source-hero-content">
          <div className="source-hero-title-row">
            <span className="source-hero-title">Meta Catalogue</span>
            <span className="source-hero-badge">Connected</span>
          </div>
          <span className="source-hero-desc">Your product catalogue synced from Meta</span>
        </div>
      </button>

      {/* Other sources */}
      <div className="source-secondary-section">
        <h3 className="source-section-label">Other sources</h3>

        {/* Canva Sheets */}
        <button className="source-hero-card">
          <div className="source-hero-icon">
            <img src={iconSheet} alt="" className="source-icon-img" />
          </div>
          <div className="source-hero-content">
            <span className="source-hero-title">Canva Sheets</span>
            <span className="source-hero-desc">Connect to a spreadsheet in Canva</span>
          </div>
        </button>

        {/* Upload data */}
        <button className="source-hero-card">
          <div className="source-hero-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 16V4M12 4L8 8M12 4L16 8" stroke="#0F1015" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 14V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V14" stroke="#0F1015" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="source-hero-content">
            <span className="source-hero-title">Upload data</span>
            <span className="source-hero-desc">XLSX, CSV, TSV</span>
          </div>
        </button>
      </div>
    </div>
  )
}
