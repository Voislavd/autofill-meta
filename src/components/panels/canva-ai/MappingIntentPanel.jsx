import { useState } from 'react'
import './MappingIntentPanel.css'
import PageThumbnailStrip from '../../autofill/PageThumbnailStrip'
import AIAssistMappingCard from './AIAssistMappingCard'
import FieldsSchemaSection from '../../autofill/FieldsSchemaSection'
import FieldListView from '../../autofill/FieldListView'

export default function MappingIntentPanel({
  template,
  schema,
  mappings,
  onFieldMap,
  onFieldUnmap,
  onBack,
  onSave,
  selectedPageIndex = 0,
  onPageSelect,
  onFieldDragStart,
  onFieldDragEnd,
  initialAiMappingState
}) {
  const [aiMappingState, setAiMappingState] = useState(initialAiMappingState || 'idle') // 'idle' | 'analyzing' | 'complete'
  const [subView, setSubView] = useState('overview') // 'overview' | 'field-list'
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Handle page selection - use prop if available, otherwise manage locally
  const handlePageSelect = (index) => {
    if (onPageSelect) {
      onPageSelect(index)
    }
  }

  if (!template) return null

  // Handle AI mapping
  const handleMapWithAI = () => {
    setAiMappingState('analyzing')
    
    // Simulate AI analysis
    setTimeout(() => {
      setAiMappingState('complete')
      
      // Simulate auto-mapping fields across all pages
      // Map ALL fields EXCEPT 'Company name' (el-1) so user can demo drag & drop
      if (onFieldMap) {
        // Define AI mapping rules (simulating what AI would detect)
        // Intentionally EXCLUDING 'ABC Company' -> 'company-name' mapping
        const aiMappingRules = {
          'For xx employees': 'employee-count',
          'Department': 'department',
          'Start Date': 'start-date',
          'Hero Image': 'hero-photo',
          'Company Logo': 'company-logo',
          'Team Photo': 'team-photo',
          'Contact Information': 'contact-info',
          'Job Type': 'job-type',
          'Job Title': 'job-title',
          'Manager Name': 'manager-name',
          'Office Location': 'office-location',
          'Employee Type': 'employee-type',
          'Employee ID': 'employee-id',
        }
        
        template.pages.forEach(page => {
          page.elements.forEach(el => {
            // Skip the 'ABC Company' element (el-1) to leave it unmapped for demo
            if (el.id === 'el-1') return
            
            if (!mappings[el.id]) {
              // Try to find a matching rule
              for (const [labelPattern, fieldId] of Object.entries(aiMappingRules)) {
                if (el.label && el.label.toLowerCase().includes(labelPattern.toLowerCase())) {
                  onFieldMap(el.id, fieldId)
                  break
                }
              }
            }
          })
        })
      }
    }, 5000)
  }

  const handleCancelAI = () => {
    setAiMappingState('idle')
  }

  // Handle category click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setSubView('field-list')
  }

  // Handle back from sub-view
  const handleSubViewBack = () => {
    setSubView('overview')
    setSelectedCategory(null)
  }

  // Calculate if save button should be enabled
  const hasMappings = Object.keys(mappings).length > 0 || aiMappingState === 'complete'

  // Render field list view
  if (subView === 'field-list' && selectedCategory) {
    return (
      <div className="mapping-intent-panel">
        <FieldListView
          category={selectedCategory}
          schema={schema}
          mappings={mappings}
          template={template}
          onBack={handleSubViewBack}
          onFieldDragStart={onFieldDragStart}
          onFieldDragEnd={onFieldDragEnd}
          onDisconnect={(item, mappingInfo) => {
            if (mappingInfo?.elementId) {
              onFieldUnmap?.(mappingInfo.elementId)
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="mapping-intent-panel">
      {/* Header */}
      <div className="mapping-intent-header">
        <button className="mapping-back-btn" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="mapping-header-title">Match fields</span>
      </div>

      {/* Page Thumbnails */}
      <div className="mapping-intent-thumbnails">
        <PageThumbnailStrip
          pages={template.pages}
          selectedIndex={selectedPageIndex}
          onPageSelect={handlePageSelect}
          mappings={mappings}
        />
      </div>

      {/* Mapping Tools Section */}
      <div className="mapping-intent-tools">
        <h4 className="mapping-section-label">Matching tools</h4>
        <AIAssistMappingCard
          state={aiMappingState}
          onMapWithAI={handleMapWithAI}
          onCancel={handleCancelAI}
        />
      </div>

      {/* Fields & Schema Section */}
      <div className="mapping-intent-fields">
        <FieldsSchemaSection
          schema={schema}
          mappings={mappings}
          template={template}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Save Button */}
      <div className="mapping-intent-footer">
        <button 
          className={`save-mapping-btn ${hasMappings ? 'active' : ''}`}
          onClick={onSave}
          disabled={!hasMappings}
        >
          Save matching
        </button>
      </div>
    </div>
  )
}
