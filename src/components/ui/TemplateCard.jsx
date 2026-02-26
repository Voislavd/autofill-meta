import './TemplateCard.css'

export default function TemplateCard({
  title,
  type,
  thumbnail,
  bgColor = '#F6F7F8',
  onClick,
  isSelected = false,
  isMapped = false
}) {
  return (
    <div className={`template-card ${isSelected ? 'selected' : ''}`} onClick={onClick}>
      <div className="template-thumb" style={{ backgroundColor: bgColor }}>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="template-thumb-image"
          />
        ) : (
          <div className="template-thumb-placeholder">
            <span className="placeholder-icon">📄</span>
            <span className="placeholder-label">{title}</span>
          </div>
        )}
        {isMapped && (
          <span className="mapped-badge">Matched</span>
        )}
        <button className="template-carousel-arrow" onClick={(e) => e.stopPropagation()}>
          ›
        </button>
      </div>
      <div className="template-label">
        <div className="template-name">{title}</div>
        <div className="template-type">{type}</div>
      </div>
    </div>
  )
}
