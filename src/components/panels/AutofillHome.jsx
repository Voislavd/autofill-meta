import './panels.css'

const IconCreate = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#C47A1A" strokeWidth="1.5"/>
    <path d="M3 16L8.29 11.47C8.68 11.12 9.27 11.13 9.65 11.49L14 15.5" stroke="#C47A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 14.5L15.29 12.47C15.68 12.12 16.27 12.13 16.65 12.49L21 16" stroke="#C47A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="8.5" r="1.5" stroke="#C47A1A" strokeWidth="1.5"/>
  </svg>
)

const IconMatchFields = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="7" height="3" rx="1.5" stroke="#4955CA" strokeWidth="1.5"/>
    <rect x="3" y="11" width="7" height="3" rx="1.5" stroke="#4955CA" strokeWidth="1.5"/>
    <rect x="3" y="17" width="7" height="3" rx="1.5" stroke="#4955CA" strokeWidth="1.5"/>
    <rect x="15" y="7" width="6" height="11" rx="1.5" stroke="#4955CA" strokeWidth="1.5"/>
    <path d="M10 6.5L15 9" stroke="#4955CA" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 12.5L15 12.5" stroke="#4955CA" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18.5L15 16" stroke="#4955CA" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const IconData = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#2D8A4E" strokeWidth="1.5"/>
    <path d="M4 6V12C4 13.66 7.58 15 12 15C16.42 15 20 13.66 20 12V6" stroke="#2D8A4E" strokeWidth="1.5"/>
    <path d="M4 12V18C4 19.66 7.58 21 12 21C16.42 21 20 19.66 20 18V12" stroke="#2D8A4E" strokeWidth="1.5"/>
  </svg>
)

const IconAutomation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4.09 12.63C3.74 13.05 4.04 13.68 4.58 13.68H12L11 22L19.91 11.37C20.26 10.95 19.96 10.32 19.42 10.32H12L13 2Z" stroke="#C43A5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ICON_MAP = {
  create: <IconCreate />,
  'map-template': <IconMatchFields />,
  'configure-sources': <IconData />,
  automation: <IconAutomation />
}

const ENTRY_POINTS = [
  {
    id: 'create',
    title: 'Create',
    description: 'Designs from connected data',
    view: 'create'
  },
  {
    id: 'map-template',
    title: 'Match fields to template',
    description: 'Define how data fills into designs.',
    view: 'map-template'
  },
  {
    id: 'configure-sources',
    title: 'Your data',
    description: 'Browse your connected data',
    view: 'configure-sources'
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Rules, updates, and workflows',
    view: 'automation'
  }
]

export default function AutofillHome({ onNavigate, onClose }) {
  return (
    <div className="autofill-home">
      {/* Header */}
      <div className="autofill-header">
        <h2 className="autofill-title">Shoes & Co</h2>
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
            <div className="entry-point-icon">{ICON_MAP[entry.id]}</div>
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
