import { useState, useEffect } from 'react'
import TemplateGrid from '../autofill/TemplateGrid'
import FilterTabs from '../autofill/FilterTabs'

const FILTER_TABS = [
  { id: 'unmapped', label: 'Unmatched' },
  { id: 'mapped', label: 'Matched' }
]

export default function ChooseTemplate({
  templates,
  onUnmappedClick,
  onMappedClick,
  onBack,
  onClose,
  initialTab = 'unmapped'
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterTab, setFilterTab] = useState(initialTab)

  // Sync tab when initialTab prop changes
  useEffect(() => {
    setFilterTab(initialTab)
  }, [initialTab])

  // Filter by search query
  const searchFiltered = templates.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter by mapped/unmapped status
  const filteredTemplates = searchFiltered.filter(t =>
    filterTab === 'unmapped' ? !t.isMapped : t.isMapped
  )

  const handleTemplateClick = (template) => {
    if (template.isMapped) {
      onMappedClick(template)
    } else {
      onUnmappedClick(template)
    }
  }

  return (
    <div className="choose-template">
      {/* Header */}
      <div className="panel-nav-header">
        <button className="back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="panel-nav-title">Match a template</h2>
        <button className="autofill-close" onClick={onClose}>×</button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Tabs */}
      <FilterTabs
        tabs={FILTER_TABS}
        selected={filterTab}
        onChange={setFilterTab}
      />

      {/* Templates */}
      <div className="template-section">
        <TemplateGrid
          templates={filteredTemplates}
          onTemplateClick={handleTemplateClick}
          showMappedBadge={false}
        />
      </div>
    </div>
  )
}
