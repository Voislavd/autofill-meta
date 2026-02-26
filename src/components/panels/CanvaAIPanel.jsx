import { useState, useRef, useEffect } from 'react'
import './CanvaAIPanel.css'
import brandThumbnail from '../../assets/icons/brand-thumbnail.png'
import recentThumbnail from '../../assets/icons/start-recent-thumbnail.png'
import chartThumbnail from '../../assets/icons/chart-thumbnail.png'
import micIcon from '../../assets/icons/mic-icon.png'
import { TEMPLATES, SCHEMA, DATA_SOURCES } from '../../data/sampleData'
import { MessageList, UserMessage, AIMessage, ThinkingIndicator, TemplateCard, MappingIntentPanel, MatchFieldsCard } from './canva-ai'

export default function CanvaAIPanel({ 
  onClose,
  onTemplatePreview,
  onMappingStart, 
  onMappingEnd,
  onApplyStart,
  onApplyComplete,
  onApplyEnd,
  isApplied = false,
  mappings = {},
  onFieldMap,
  onFieldUnmap,
  selectedPageIndex = 0,
  onPageSelect,
  onFieldDragStart,
  onFieldDragEnd
}) {
  // View state: 'chat' | 'mapping'
  const [view, setView] = useState('chat')
  
  // Conversation state
  const [messages, setMessages] = useState([])
  const [isThinking, setIsThinking] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [conversationTitle, setConversationTitle] = useState(null)
  
  // Input state
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef(null)
  
  const isActive = isFocused || inputValue.length > 0
  const hasConversation = messages.length > 0

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [inputValue])

  // Handle prompt submission
  const handleSubmit = () => {
    if (!inputValue.trim()) return
    
    const userPrompt = inputValue.trim()
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userPrompt }])
    setInputValue('')
    setIsThinking(true)
    
    // Extract title from prompt (simple heuristic for prototype)
    const titleMatch = userPrompt.match(/create\s+(.+?)(?:\s+using|\s+with|$)/i)
    if (titleMatch) {
      setConversationTitle(titleMatch[1])
    }
    
    // Simulate AI response after delay
    setTimeout(() => {
      setIsThinking(false)
      
      // Find a template to suggest (use first Benefits template for prototype)
      const suggestedTemplate = TEMPLATES.find(t => t.title === 'Employee Benefits Guide')
      setSelectedTemplate(suggestedTemplate)
      
      const matchedDataSource = DATA_SOURCES.find(s => s.connected)

      if (onTemplatePreview && suggestedTemplate) {
        onTemplatePreview(suggestedTemplate)
      }

      setMessages(prev => [...prev, {
        type: 'ai',
        text: "I found your brand template and matched it with your data.",
        template: suggestedTemplate,
        dataSource: matchedDataSource
      }])
    }, 1500)
  }

  // Handle key press in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Match fields state for inline compact surface
  const [matchFieldsState, setMatchFieldsState] = useState(null) // null | 'analyzing' | 'complete'
  const [matchedCount, setMatchedCount] = useState(0)
  const [totalFieldCount, setTotalFieldCount] = useState(0)

  // AI auto-matching logic (extracted from MappingIntentPanel)
  const runAutoMatching = (template) => {
    if (!onFieldMap) return

    const aiMappingRules = {
      'Product Name': 'product-name',
      'Promo Label': 'promo-label',
      'Discount': 'discount-percent',
      'Product Image': 'product-image',
      'CTA': 'cta-text',
      'Brand': 'product-brand',
      'Price': 'product-price',
      'Sale Price': 'sale-price',
      'Description': 'product-description',
      'Category': 'product-category',
      'Lifestyle': 'lifestyle-image',
      'Logo': 'brand-logo',
    }

    let matched = 0
    let total = 0

    template.pages.forEach(page => {
      page.elements.forEach(el => {
        total++
        if (el.label === 'Product Name') return
        for (const [labelPattern, fieldId] of Object.entries(aiMappingRules)) {
          if (el.label && el.label.toLowerCase().includes(labelPattern.toLowerCase())) {
            onFieldMap(el.id, fieldId)
            matched++
            break
          }
        }
      })
    })

    setMatchedCount(matched)
    setTotalFieldCount(total)
  }

  // Handle "Match fields" button click — triggers inline compact surface
  const handleMapTemplate = () => {
    if (!selectedTemplate) return

    if (onMappingStart) {
      onMappingStart(selectedTemplate)
    }

    setMatchFieldsState('analyzing')
    setMessages(prev => [...prev, {
      type: 'match-fields',
      state: 'analyzing'
    }])

    setTimeout(() => {
      runAutoMatching(selectedTemplate)
      setMatchFieldsState('complete')
      setMessages(prev => prev.map(msg =>
        msg.type === 'match-fields' && msg.state === 'analyzing'
          ? { ...msg, state: 'complete' }
          : msg
      ))
    }, 5000)
  }

  // Handle "Edit matching" from compact card — opens full panel
  const handleEditMatching = () => {
    setView('mapping')
  }

  // Handle "Generate with AI" button click — placeholder
  const handleGenerateWithAI = () => {
    setMessages(prev => [...prev, {
      type: 'ai',
      text: "Generative AI design is coming soon. For now, use Match Fields to connect your data to this template."
    }])
  }

  // Handle back from mapping
  const handleBackFromMapping = () => {
    setView('chat')
  }

  // Designing state
  const [isDesigning, setIsDesigning] = useState(false)
  const [designStep, setDesignStep] = useState(0)

  const designSteps = [
    'Applying matched fields',
    'Replacing text fields',
    'Inserting media',
    'Populating tables',
    'Finalizing layout'
  ]

  // Handle save matching
  const handleSaveMapping = () => {
    if (onApplyStart) {
      onApplyStart()
    }
    
    setMessages(prev => [...prev, {
      type: 'ai',
      text: "Great! I've saved the matching. Now generating your Employee Benefits Guide..."
    }])
    
    setView('chat')
    setIsDesigning(true)
    setDesignStep(0)

    const stepInterval = setInterval(() => {
      setDesignStep(prev => {
        if (prev >= designSteps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 1000)
    
    setTimeout(() => {
      clearInterval(stepInterval)
      setIsDesigning(false)
      
      if (onApplyComplete) {
        onApplyComplete()
      }
      
      setMessages(prev => [...prev, {
        type: 'ai',
        text: "Your Employee Benefits Guide has been created! You can view it in the editor."
      }])
    }, 5000)
  }

  // Render chat view
  const renderChatView = () => (
    <>
      {/* Header */}
      <div className="canva-ai-header">
        {hasConversation && conversationTitle ? (
          <div className="conversation-header">
            <button className="back-btn" onClick={() => {
              setMessages([])
              setConversationTitle(null)
              setSelectedTemplate(null)
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="conversation-title">{conversationTitle}</span>
          </div>
        ) : (
          <button className="past-chats-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M6 8H14M6 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Past chats
          </button>
        )}
      </div>

      {/* Main content */}
      <div className="canva-ai-content">
        {!hasConversation ? (
          <>
            <div className="canva-ai-title-wrapper">
              <h1 className="canva-ai-title">
                What will we design today?
              </h1>
            </div>

            {/* Suggestion pills */}
            <div className="ai-suggestions">
              <button className="ai-suggestion-pill">
                <div className="suggestion-thumbnail">
                  <img src={brandThumbnail} alt="" />
                </div>
                <span className="suggestion-text">Use brand template</span>
              </button>

              <button className="ai-suggestion-pill">
                <div className="suggestion-thumbnail">
                  <img src={recentThumbnail} alt="" />
                </div>
                <span className="suggestion-text">Start from recent design</span>
              </button>

              <button className="ai-suggestion-pill">
                <div className="suggestion-thumbnail">
                  <img src={chartThumbnail} alt="" />
                </div>
                <span className="suggestion-text">Generate chart</span>
              </button>
            </div>
          </>
        ) : (
          <MessageList>
            {messages.map((msg, index) => {
              if (msg.type === 'user') {
                return <UserMessage key={index} text={msg.text} />
              } else if (msg.type === 'ai') {
                return (
                  <AIMessage key={index} text={msg.text}>
                    {msg.template && (
                      <TemplateCard 
                        template={msg.template}
                        dataSource={msg.dataSource}
                        onMapTemplate={handleMapTemplate}
                        onGenerateWithAI={handleGenerateWithAI}
                      />
                    )}
                  </AIMessage>
                )
              } else if (msg.type === 'match-fields') {
                return (
                  <MatchFieldsCard
                    key={index}
                    state={matchFieldsState || msg.state}
                    matchedCount={matchedCount}
                    totalCount={totalFieldCount}
                    onEditMatching={handleEditMatching}
                    onSave={handleSaveMapping}
                  />
                )
              }
              return null
            })}
            {isThinking && <ThinkingIndicator />}
            {isDesigning && (
              <div className="designing-indicator">
                <span className="designing-label">Designing<span className="designing-dots"><span className="dot" /><span className="dot" /><span className="dot" /></span></span>
                <span className="designing-step">{designSteps[designStep]}</span>
              </div>
            )}
          </MessageList>
        )}
      </div>

      {/* Input area - Compact Wonder Box */}
      <div className="canva-ai-footer">
        <div className={`wonder-box ${isActive ? 'active' : ''}`}>
          <div className="wonder-box-input">
            <textarea
              ref={textareaRef}
              className="wonder-input"
              placeholder="Describe your idea, and I'll bring it to life"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
          </div>
          <div className="wonder-box-actions">
            <button className="wonder-btn add-btn" aria-label="Add">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isActive ? (
              <button className="wonder-btn submit-btn" aria-label="Submit" onClick={handleSubmit}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ) : (
              <button className="wonder-btn mic-btn" aria-label="Voice input">
                <div className="mic-orb">
                  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <g filter="url(#filter0_f_682_29546)">
                      <circle cx="30" cy="30" r="18" fill="url(#paint0_linear_682_29546)"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_682_29546" x="0" y="0" width="60" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="6" result="effect1_foregroundBlur_682_29546"/>
                      </filter>
                      <linearGradient id="paint0_linear_682_29546" x1="-6" y1="30" x2="30" y2="66" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#03A5AB"/>
                        <stop offset="1" stopColor="#8B3DFF"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <img src={micIcon} alt="" className="mic-icon" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="canva-ai-panel">
      {view === 'chat' && renderChatView()}
      {view === 'mapping' && selectedTemplate && (
        <MappingIntentPanel
          template={selectedTemplate}
          schema={SCHEMA}
          mappings={mappings}
          onFieldMap={onFieldMap}
          onFieldUnmap={onFieldUnmap}
          onBack={handleBackFromMapping}
          onSave={handleSaveMapping}
          selectedPageIndex={selectedPageIndex}
          onPageSelect={onPageSelect}
          onFieldDragStart={onFieldDragStart}
          onFieldDragEnd={onFieldDragEnd}
          initialAiMappingState={matchFieldsState === 'complete' ? 'complete' : undefined}
        />
      )}
    </div>
  )
}
