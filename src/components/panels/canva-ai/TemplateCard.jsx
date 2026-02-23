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

      <div className="template-card-options">
        <div className="template-option">
          <p className="option-description">
            I can <strong>generate a new design</strong> using AI. It will use your data but the layout may differ from the original template.
          </p>
          <button className="option-btn" onClick={onGenerateWithAI}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1L9.5 5.5L14 7L9.5 8.5L8 13L6.5 8.5L2 7L6.5 5.5L8 1Z" fill="currentColor"/>
            </svg>
            Generate design
          </button>
        </div>

        <div className="template-option">
          <p className="option-description">
            Or I can <strong>autofill this template</strong> with your data. Every field maps exactly to the design, so the output stays true to the original layout.
          </p>
          <button className="option-btn" onClick={onMapTemplate}>
            <img src={tagIcon} alt="" className="option-btn-icon" />
            Autofill this template
          </button>
        </div>
      </div>
    </div>
  )
}
