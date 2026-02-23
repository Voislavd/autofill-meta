import './AIAssistMappingCard.css'
import aiMappingIcon from '../../../assets/icons/Icon.png'
import iconDone from '../../../assets/icons/icon-done.png'

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
              <span className="ai-card-icon">
                <img src={iconDone} alt="" className="ai-done-icon" />
              </span>
              <span className="ai-card-title gradient">Auto-matching complete!</span>
            </div>
          </>
        )
      
      case 'idle':
      default:
        return (
          <>
            <div className="ai-card-header">
              <img src={aiMappingIcon} alt="" className="ai-mapping-icon" />
              <span className="ai-card-title gradient">AI Assisted Matching</span>
            </div>
            <button className="ai-card-btn primary" onClick={onMapWithAI}>
              Match with AI
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
