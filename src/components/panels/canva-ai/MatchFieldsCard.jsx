import './MatchFieldsCard.css'
import aiMappingIcon from '../../../assets/icons/Icon.png'
import iconDone from '../../../assets/icons/icon-done.png'

export default function MatchFieldsCard({ state, matchedCount, totalCount, onEditMatching, onSave }) {
  if (state === 'analyzing') {
    return (
      <div className="match-fields-card analyzing">
        <div className="match-fields-header">
          <span className="match-fields-icon spinning">
            <img src={aiMappingIcon} alt="" className="match-fields-icon-img" />
          </span>
          <span className="match-fields-title gradient">Analysing this design...</span>
        </div>
        <div className="match-fields-progress">
          <div className="match-fields-progress-bar">
            <div className="match-fields-progress-fill" />
          </div>
        </div>
      </div>
    )
  }

  if (state === 'complete') {
    return (
      <div className="match-fields-card complete">
        <div className="match-fields-header">
          <span className="match-fields-icon">
            <img src={iconDone} alt="" className="match-fields-done-img" />
          </span>
          <span className="match-fields-title gradient">
            {matchedCount} of {totalCount} fields matched
          </span>
        </div>
        <div className="match-fields-actions">
          <button className="match-fields-btn secondary" onClick={onEditMatching}>
            Edit matching
          </button>
          <button className="match-fields-btn primary" onClick={onSave}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  return null
}
