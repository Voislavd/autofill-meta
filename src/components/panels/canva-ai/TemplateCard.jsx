import './TemplateCard.css'
import tagIcon from '../../../assets/icons/icon-tag-text.svg'

export default function TemplateCard({ template, dataSource, onMapTemplate, onGenerateWithAI }) {
  return (
    <div className="ai-template-card">
      <div className="template-card-context">
        <div className="context-card">
          <div className="context-card-square">
            <img 
              src={template.thumbnail} 
              alt={template.name} 
              className="context-card-image"
            />
          </div>
          <span className="context-card-label">{template.title}</span>
        </div>

        {dataSource && (
          <div className="context-card">
            <div className="context-card-square">
              <span className="context-card-badge">Connected</span>
              <div className="context-card-icon-wrapper">
                <svg width="28" height="28" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1C4.5 1 2 2.12 2 3.5V12.5C2 13.88 4.5 15 8 15C11.5 15 14 13.88 14 12.5V3.5C14 2.12 11.5 1 8 1Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                  <path d="M2 3.5C2 4.88 4.5 6 8 6C11.5 6 14 4.88 14 3.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 8C2 9.38 4.5 10.5 8 10.5C11.5 10.5 14 9.38 14 8" stroke="currentColor" strokeWidth="1.2"/>
                </svg>
              </div>
            </div>
            <span className="context-card-label">{dataSource.name}</span>
          </div>
        )}
      </div>

      <p className="template-card-divider-text">There are two ways I can help:</p>

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
