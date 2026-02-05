import './AIAssistMappingCard.css'
import aiMappingIcon from '../../../assets/icons/Icon.png'

export default function AIAssistMappingCard({ state, onMapWithAI, onCancel }) {
  // Render based on state
  const renderContent = () => {
    switch (state) {
      case 'analyzing':
        return (
          <>
            <div className="ai-card-header">
              <span className="ai-card-icon spinning">
                <img src={aiMappingIcon} alt="" className="ai-mapping-icon" />
              </span>
              <span className="ai-card-title gradient">Analysing this design</span>
            </div>
            <button className="ai-card-btn secondary" onClick={onCancel}>
              Cancel
            </button>
          </>
        )
      
      case 'complete':
        return (
          <>
            <div className="ai-card-header">
              <span className="ai-card-icon success">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="8" fill="#00C4CC" fillOpacity="0.15"/>
                  <path d="M6 10L9 13L14 7" stroke="#00C4CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="ai-card-title success">Auto-mapping complete!</span>
            </div>
          </>
        )
      
      case 'idle':
      default:
        return (
          <>
            <div className="ai-card-header">
              <img src={aiMappingIcon} alt="" className="ai-mapping-icon" />
              <span className="ai-card-title gradient">AI Assisted Mapping</span>
            </div>
            <button className="ai-card-btn primary" onClick={onMapWithAI}>
              Map with AI
            </button>
          </>
        )
    }
  }

  return (
    <div className={`ai-assist-mapping-card ${state}`}>
      {renderContent()}
    </div>
  )
}
