import './panels.css'

// Entry points for the new Autofill App structure
const ENTRY_POINTS = [
  {
    id: 'create',
    title: 'Create',
    description: 'Designs from connected data',
    view: 'create',
    icon: '🖼️'
  },
  {
    id: 'map-template',
    title: 'Match fields to template',
    description: 'Define how data fills into designs.',
    view: 'map-template',
    icon: '🔗'
  },
  {
    id: 'configure-sources',
    title: 'Configure data sources',
    description: 'Connect & manage schemas',
    view: 'configure-sources',
    icon: '🗄️'
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Rules, updates, and workflows',
    view: 'automation',
    icon: '⚡'
  }
]

export default function AutofillHome({ onNavigate, onClose }) {
  return (
    <div className="autofill-home">
      {/* Header */}
      <div className="autofill-header">
        <h2 className="autofill-title">Meta Business</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Entry Points */}
      <div className="entry-points">
        {ENTRY_POINTS.map((entry) => (
          <button
            key={entry.id}
            className="entry-point-card"
            onClick={() => onNavigate(entry.view)}
          >
            <div className="entry-point-icon">{entry.icon}</div>
            <div className="entry-point-content">
              <span className="entry-point-title">{entry.title}</span>
              <span className="entry-point-description">{entry.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
