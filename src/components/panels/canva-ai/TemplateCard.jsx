import './TemplateCard.css'
import tagIcon from '../../../assets/icons/icon-tag-text.svg'

export default function TemplateCard({ template, onMapTemplate }) {
  return (
    <div className="template-card">
      <div className="template-card-preview">
        <img 
          src={template.thumbnail} 
          alt={template.name} 
          className="template-card-image"
        />
      </div>
      <button className="map-template-btn" onClick={onMapTemplate}>
        <img src={tagIcon} alt="" className="map-template-icon" />
        Map template
      </button>
    </div>
  )
}
