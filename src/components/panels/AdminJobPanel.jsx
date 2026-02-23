import './panels.css'

export default function AdminJobPanel({
  job,
  onBack,
  onClose
}) {
  if (!job) return null

  return (
    <div className="admin-job-panel">
      {/* Header with back button */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">{job.panelTitle}</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Placeholder content based on job type */}
      <div className="admin-job-content">
        {job.id === 'configure-data' && (
          <>
            <div className="admin-section">
              <h4 className="section-label">Connected Data Sources</h4>
              <div className="data-source-list">
                <div className="data-source-item">
                  <span className="source-icon">🗄️</span>
                  <span className="source-name">Benefits HRIS One Digital</span>
                  <span className="source-status connected">Connected</span>
                </div>
                <div className="data-source-item">
                  <span className="source-icon">📊</span>
                  <span className="source-name">Rates Database</span>
                  <span className="source-status connected">Connected</span>
                </div>
              </div>
            </div>
            <button className="add-source-btn">
              <span>+</span> Add data source
            </button>
          </>
        )}

        {job.id === 'review-mappings' && (
          <>
            <div className="admin-section">
              <h4 className="section-label">Templates with matched fields</h4>
              <div className="mapping-review-list">
                <div className="mapping-item">
                  <span className="mapping-name">Employee Benefits Guide</span>
                  <span className="mapping-count">3 fields matched</span>
                  <span className="mapping-status ok">✓</span>
                </div>
                <div className="mapping-item">
                  <span className="mapping-name">Summary Sheet</span>
                  <span className="mapping-count">5 fields matched</span>
                  <span className="mapping-status ok">✓</span>
                </div>
                <div className="mapping-item warning">
                  <span className="mapping-name">Rates Sheet</span>
                  <span className="mapping-count">2 unmatched</span>
                  <span className="mapping-status warn">!</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}



