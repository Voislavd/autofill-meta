import { useState } from 'react'
import AutofillHome from './AutofillHome'
import CreateSelectTemplate from './CreateSelectTemplate'
import CreateConnector from './CreateConnector'
import ChooseTemplate from './ChooseTemplate'
import MappingsPanel from './MappingsPanel'
import MappedTemplateDetail from './MappedTemplateDetail'
import ConfigureSources from './ConfigureSources'
import AutomationPanel from './AutomationPanel'
import { TEMPLATES, SCHEMA } from '../../data/sampleData'
import './panels.css'

export default function AutofillPanel({
  onClose,
  view,
  onViewChange,
  selectedTemplate,
  onTemplateSelect,
  selectedPageIndex,
  onPageSelect,
  isClickToMapMode,
  onToggleClickToMap,
  mappings,
  onFieldMap,
  onFieldUnmap,
  onFieldHighlight,
  isApplied,
  isGenerating,
  onApply,
  onFieldDragStart,
  onFieldDragEnd
}) {
  // Local navigation stack for back button
  const [navigationStack, setNavigationStack] = useState([])
  // Track initial tab for map-template view
  const [mapTemplateInitialTab, setMapTemplateInitialTab] = useState('unmapped')

  // Navigation helpers
  const navigateTo = (newView) => {
    setNavigationStack([...navigationStack, view])
    onViewChange(newView)
  }

  const goBack = () => {
    if (navigationStack.length > 0) {
      const previousView = navigationStack[navigationStack.length - 1]
      setNavigationStack(navigationStack.slice(0, -1))
      onViewChange(previousView)
    } else {
      // If no history, go back to home
      onViewChange('home')
    }
  }

  // Home navigation handler
  const handleNavigate = (targetView) => {
    // Reset to unmapped tab when navigating from home
    if (targetView === 'map-template') {
      setMapTemplateInitialTab('unmapped')
    }
    navigateTo(targetView)
  }

  // Create flow: template selection
  const handleCreateTemplateClick = (template) => {
    onTemplateSelect(template)
    navigateTo('create-connect')
  }

  // Create flow: edit mappings -> go to mappings panel
  const handleEditMappings = () => {
    navigateTo('mappings')
  }

  // Map a Template flow: unmapped template → go to mappings setup
  const handleUnmappedTemplateClick = (template) => {
    onTemplateSelect(template)
    navigateTo('mappings')
  }

  // Map a Template flow: mapped template → show detail view
  const handleMappedTemplateClick = (template) => {
    onTemplateSelect(template)
    navigateTo('mapped-detail')
  }

  // From mapped detail → edit mappings
  const handleEditFromMappedDetail = () => {
    navigateTo('mappings')
  }

  // Save mappings → show the matched template detail
  const handleSaveMappings = () => {
    setNavigationStack(['home', 'map-template'])
    onViewChange('mapped-detail')
  }

  // Render current view
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <AutofillHome
            onNavigate={handleNavigate}
            onClose={onClose}
          />
        )

      case 'create':
        return (
          <CreateSelectTemplate
            templates={TEMPLATES}
            onTemplateClick={handleCreateTemplateClick}
            onBack={goBack}
            onClose={onClose}
          />
        )

      case 'create-connect':
        return (
          <CreateConnector
            template={selectedTemplate}
            mappings={mappings}
            isApplied={isApplied}
            isGenerating={isGenerating}
            onApply={onApply}
            onEditMappings={handleEditMappings}
            onBack={goBack}
            onClose={onClose}
          />
        )

      case 'map-template':
        return (
          <ChooseTemplate
            templates={TEMPLATES}
            onUnmappedClick={handleUnmappedTemplateClick}
            onMappedClick={handleMappedTemplateClick}
            onBack={goBack}
            onClose={onClose}
            initialTab={mapTemplateInitialTab}
          />
        )

      case 'mapped-detail':
        return (
          <MappedTemplateDetail
            template={selectedTemplate}
            mappings={mappings}
            onEditMappings={handleEditFromMappedDetail}
            onBack={goBack}
            onClose={onClose}
            onDone={() => {
              setNavigationStack([])
              onViewChange('home')
            }}
          />
        )

      case 'mappings':
        return (
          <MappingsPanel
            template={selectedTemplate}
            selectedPageIndex={selectedPageIndex}
            onPageSelect={onPageSelect}
            isClickToMapMode={isClickToMapMode}
            onToggleClickToMap={onToggleClickToMap}
            mappings={mappings}
            onFieldMap={onFieldMap}
            onFieldUnmap={onFieldUnmap}
            onFieldHighlight={onFieldHighlight}
            schema={SCHEMA}
            onBack={goBack}
            onClose={onClose}
            onSave={handleSaveMappings}
            onFieldDragStart={onFieldDragStart}
            onFieldDragEnd={onFieldDragEnd}
          />
        )

      case 'configure-sources':
        return (
          <ConfigureSources
            onBack={goBack}
            onClose={onClose}
          />
        )

      case 'automation':
        return (
          <AutomationPanel
            onBack={goBack}
            onClose={onClose}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="autofill-panel">
      {renderView()}
    </div>
  )
}
