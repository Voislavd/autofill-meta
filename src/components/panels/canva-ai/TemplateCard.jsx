import './TemplateCard.css'
import tagIcon from '../../../assets/icons/icon-tag-text.svg'

export default function TemplateCard({ template, onMapTemplate, onGenerateWithAI }) {
  return (
    <div className="template-card">
      <div className="template-card-preview">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="template-card-image"
        />
      </div>
      <div className="template-card-actions">
        <button className="template-option-card" onClick={onGenerateWithAI}>
          <span className="option-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="option-text">
            <span className="option-title">Generate with AI</span>
            <span className="option-desc">AI interprets your data into a new design</span>
          </span>
        </button>
        <button className="template-option-card" onClick={onMapTemplate}>
          <span className="option-icon">
            <img src={tagIcon} alt="" className="option-icon-img" />
          </span>
          <span className="option-text">
            <span className="option-title">AI-match fields</span>
            <span className="option-desc">Match your data fields to this template exactly</span>
          </span>
        </button>
      </div>
    </div>
  )
}
