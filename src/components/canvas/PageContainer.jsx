import MappedBadge from './MappedBadge'
import './canvas-preview.css'
import iconDatabaseSmall from '../../assets/icons/icon-database-small.png'
import iconDisconnect from '../../assets/icons/icon-disconnect.png'
import shoeImage from '../../assets/images/shoe.png'
import iconChevronDown from '../../assets/icons/down-chevron-canvas.png'
import iconChevronUp from '../../assets/icons/up-chevron-canvas.png'
import iconLock from '../../assets/icons/lock.png'
import iconDuplicate from '../../assets/icons/Duplicate.png'
import iconDelete from '../../assets/icons/Delete.png'
import iconAdd from '../../assets/icons/Add.png'

export default function PageContainer({
  page,
  pageNumber,
  pageIndex,
  mappings,
  schema,
  isSelected,
  isClickToMapMode,
  onElementClick,
  onElementUnmap,
  onPageSelect,
  isMarketerMode = false,
  highlightedElementId,
  isApplied = false,
  isInMappingMode = false,
  isDraggingField = false,
  dragOverElement,
  onElementDragOver,
  onElementDragLeave,
  onElementDrop
}) {
  const getFieldLabel = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId) ||
                  schema.media.find(m => m.id === fieldId) ||
                  schema.tables.find(t => t.id === fieldId)
    return field?.label || fieldId
  }

  // Get sample value for a field
  const getFieldValue = (fieldId) => {
    const field = schema.fields.find(f => f.id === fieldId) ||
                  schema.media.find(m => m.id === fieldId)
    return field?.sampleValue || null
  }

  // Handle element click - for both mapped and unmapped elements
  const handleElementClick = (element, e) => {
    if (!isClickToMapMode && !mappings[element.id]) return
    // Select this page when clicking an element
    if (onPageSelect && !isSelected) {
      onPageSelect(pageIndex)
    }
    const rect = e.currentTarget.getBoundingClientRect()
    onElementClick(element, rect)
  }

  // Handle unmap from badge
  const handleUnmap = (elementId, e) => {
    e.stopPropagation()
    onElementUnmap?.(elementId)
  }

  // Handle drag over for drop targets
  const handleDragOver = (e, elementId) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    onElementDragOver?.(elementId)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    onElementDragLeave?.()
  }

  const handleDrop = (e, elementId) => {
    e.preventDefault()
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      onElementDrop?.(elementId, data)
    } catch (err) {
      console.error('Drop error:', err)
    }
  }

  // Render a selectable element
  const SelectableElement = ({ element, children, className = '' }) => {
    const isMapped = !!mappings[element.id]
    const isHighlighted = highlightedElementId === element.id
    const isDragOver = dragOverElement === element.id
    const canSelect = isClickToMapMode || isMapped
    const canDrop = isDraggingField && !isMapped

    return (
      <div
        className={`selectable-element ${className} ${canSelect ? 'can-select' : ''} ${isMapped ? 'is-mapped' : ''} ${isHighlighted ? 'is-highlighted' : ''} ${isApplied && isMapped ? 'is-applied' : ''} ${canDrop ? 'can-drop' : ''} ${isDragOver ? 'drag-over' : ''}`}
        onClick={(e) => canSelect && handleElementClick(element, e)}
        onDragOver={(e) => canDrop && handleDragOver(e, element.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => canDrop && handleDrop(e, element.id)}
      >
        {children}
        {/* Show mapped badge on top of element - only in mapping mode */}
        {!isMarketerMode && isMapped && !isApplied && isInMappingMode && (
          <div className="element-mapping-badge">
            {getFieldLabel(mappings[element.id])}
            <span className="badge-icon-mini">
              <img src={iconDatabaseSmall} alt="" />
            </span>
            <button
              className="badge-remove-mini"
              onClick={(e) => handleUnmap(element.id, e)}
              title="Unmatch field"
            >
              <img src={iconDisconnect} alt="" />
            </button>
          </div>
        )}
        {/* Show drop indicator when dragging */}
        {canDrop && isDragOver && (
          <div className="drop-indicator">
            <span>Drop to match</span>
          </div>
        )}
      </div>
    )
  }

  // Find element by label pattern
  const findElement = (labelPattern) => {
    return page.elements.find(el =>
      el.label?.toLowerCase().includes(labelPattern.toLowerCase())
    )
  }

  // Get display value - shows applied value if applied, otherwise placeholder
  const getDisplayValue = (element, placeholder) => {
    if (!element) return placeholder
    const mappedFieldId = mappings[element.id]
    if (isApplied && mappedFieldId) {
      const value = getFieldValue(mappedFieldId)
      return value || placeholder
    }
    return placeholder
  }

  // Product ad elements
  const productNameElement = findElement('product name')
  const promoLabelElement = findElement('promo label') || findElement('promo')
  const discountElement = findElement('discount')
  const productImageElement = findElement('product image') || findElement('product')
  const ctaElement = findElement('cta')

  // Legacy benefit elements (for mapped templates)
  const companyElement = findElement('company') || findElement('abc')
  const employeeElement = findElement('employee') || findElement('xx')
  const heroElement = findElement('hero')
  const summaryElement = findElement('summary') || findElement('benefits summary')
  const departmentElement = findElement('department')
  const startDateElement = findElement('start date')
  const tableElement = findElement('contact') || findElement('table')

  const heroImages = [
    '/images/people/image1.png',
    '/images/people/image2.png',
    '/images/people/image3.png',
    '/images/people/image4.png',
    '/images/people/image5.png'
  ]

  // Detect if this is a product ad template
  const isProductAd = !!productNameElement || !!promoLabelElement

  return (
    <div className={`page-container ${isSelected ? 'selected' : ''} ${isApplied ? 'page-applied' : ''}`}>
      {/* Page Header */}
      <div className="page-header">
        <span className="page-label">Page {pageNumber}</span>
        <span className="page-title-input">- Add page title</span>
        <div className="page-actions">
          <button className="page-action"><img src={iconChevronDown} alt="Move down" /></button>
          <button className="page-action"><img src={iconChevronUp} alt="Move up" /></button>
          <button className="page-action"><img src={iconLock} alt="Lock" /></button>
          <button className="page-action"><img src={iconDuplicate} alt="Duplicate" /></button>
          <button className="page-action"><img src={iconDelete} alt="Delete" /></button>
          <button className="page-action"><img src={iconAdd} alt="Add page" /></button>
        </div>
      </div>

      {/* Page Content */}
      <div className={`page-content ${isClickToMapMode ? 'click-mode' : ''} ${isApplied ? 'is-applied' : ''}`}>
        {/* Template Visual */}
        <div className="page-visual">
          {/* ==================== PRODUCT AD PAGE ==================== */}
          {pageNumber === 1 && isProductAd && (
            <div className="product-ad-page">
              {/* Geometric accents */}
              <div className="ad-accent ad-accent-tl" />
              <div className="ad-accent ad-accent-br" />

              {/* Product name */}
              <div className="ad-product-name-section">
                {productNameElement ? (
                  <SelectableElement element={productNameElement} className="ad-product-name-wrapper">
                    <span className="ad-product-name">
                      {getDisplayValue(productNameElement, 'PRODUCT NAME')}
                    </span>
                  </SelectableElement>
                ) : (
                  <span className="ad-product-name">PRODUCT NAME</span>
                )}
              </div>

              {/* Sale / Discount row */}
              <div className="ad-promo-row">
                <div className="ad-promo-left">
                  {promoLabelElement ? (
                    <SelectableElement element={promoLabelElement} className="ad-promo-label-wrapper">
                      <span className="ad-promo-label">
                        {getDisplayValue(promoLabelElement, 'SALE')}
                      </span>
                    </SelectableElement>
                  ) : (
                    <span className="ad-promo-label">SALE</span>
                  )}
                </div>
                <div className="ad-promo-divider" />
                <div className="ad-promo-right">
                  {discountElement ? (
                    <SelectableElement element={discountElement} className="ad-discount-wrapper">
                      <span className="ad-discount">
                        {getDisplayValue(discountElement, '30%')}
                      </span>
                      <span className="ad-discount-off">OFF</span>
                    </SelectableElement>
                  ) : (
                    <>
                      <span className="ad-discount">30%</span>
                      <span className="ad-discount-off">OFF</span>
                    </>
                  )}
                </div>
              </div>

              {/* Product image */}
              <div className="ad-product-image-section">
                {productImageElement ? (
                  <SelectableElement element={productImageElement} className="ad-product-image-wrapper">
                    <img src={shoeImage} alt="Product" className="ad-product-img" />
                  </SelectableElement>
                ) : (
                  <img src={shoeImage} alt="Product" className="ad-product-img" />
                )}
              </div>

              {/* CTA */}
              {ctaElement && (
                <div className="ad-cta-section">
                  <SelectableElement element={ctaElement} className="ad-cta-wrapper">
                    <span className="ad-cta">{getDisplayValue(ctaElement, 'Shop Now')}</span>
                  </SelectableElement>
                </div>
              )}
            </div>
          )}

          {/* ==================== PAGE 1: COVER (Legacy Benefits) ==================== */}
          {pageNumber === 1 && !isProductAd && (
            <div className="cover-page">
              <div className="cover-accent-bar" />
              <div className="cover-main">
                <div className="cover-text-side">
                  <div className="cover-company-section">
                    {companyElement ? (
                      <SelectableElement element={companyElement} className="cover-company-wrapper">
                        <span className={`cover-company ${isApplied ? 'value-applied' : ''}`}>
                          {isApplied ? 'Acme Corporation' : 'ABC Company'}
                        </span>
                      </SelectableElement>
                    ) : (
                      <span className="cover-company">{isApplied ? 'Acme Corporation' : 'ABC Company'}</span>
                    )}
                  </div>
                  <div className="cover-title-section">
                    <h1 className="cover-title">Your Benefits</h1>
                    <div className="cover-title-accent" />
                  </div>
                  <div className="cover-employee-section">
                    {employeeElement ? (
                      <SelectableElement element={employeeElement} className="cover-employee-wrapper">
                        <span className={`cover-employee ${isApplied && mappings[employeeElement.id] ? 'value-applied' : ''}`}>
                          {isApplied && mappings[employeeElement.id]
                            ? `For ${getFieldValue(mappings[employeeElement.id])} employees`
                            : 'For xx employees'}
                        </span>
                      </SelectableElement>
                    ) : (
                      <span className="cover-employee">For xx employees</span>
                    )}
                  </div>
                  <div className="cover-date">
                    Effective January - December 2025
                  </div>
                </div>
                <div className="cover-image-side">
                  {heroElement ? (
                    <SelectableElement element={heroElement} className="cover-image-wrapper">
                      {isApplied && mappings[heroElement.id] ? (
                        <div className="cover-hero-filled">
                          <img src={heroImages[0]} alt="Benefits Hero" className="cover-hero-img" />
                        </div>
                      ) : (
                        <div className="cover-hero-placeholder">
                          <div className="placeholder-icon">🖼</div>
                          <span className="placeholder-text">Hero Image</span>
                        </div>
                      )}
                    </SelectableElement>
                  ) : (
                    <div className="cover-hero-placeholder">
                      <div className="placeholder-icon">🖼</div>
                      <span className="placeholder-text">Hero Image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="cover-bottom-accent">
                <div className="accent-pattern">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PAGE 2: OVERVIEW ==================== */}
          {pageNumber === 2 && (
            <div className="overview-page">
              {/* Header bar */}
              <div className="overview-header-bar">
                <div className="overview-logo">OneDigital</div>
              </div>

              {/* Main content */}
              <div className="overview-main">
                {/* Section title */}
                <div className="overview-section-header">
                  {summaryElement ? (
                    <SelectableElement element={summaryElement} className="overview-title-wrapper">
                      <h2 className="overview-section-title">Benefits Summary</h2>
                    </SelectableElement>
                  ) : (
                    <h2 className="overview-section-title">Benefits Summary</h2>
                  )}
                  <p className="overview-section-subtitle">Your personalized benefits package overview</p>
                </div>

                {/* Info cards */}
                <div className="overview-cards">
                  {/* Department card */}
                  <div className="overview-card">
                    <div className="card-icon">🏢</div>
                    <div className="card-content">
                      <span className="card-label">Department</span>
                      {departmentElement ? (
                        <SelectableElement element={departmentElement} className="card-value-wrapper">
                          <span className={`card-value ${isApplied && mappings[departmentElement.id] ? 'value-applied' : ''}`}>
                            {getDisplayValue(departmentElement, 'Engineering')}
                          </span>
                        </SelectableElement>
                      ) : (
                        <span className="card-value">Engineering</span>
                      )}
                    </div>
                  </div>

                  {/* Start date card */}
                  <div className="overview-card">
                    <div className="card-icon">📅</div>
                    <div className="card-content">
                      <span className="card-label">Start Date</span>
                      {startDateElement ? (
                        <SelectableElement element={startDateElement} className="card-value-wrapper">
                          <span className={`card-value ${isApplied && mappings[startDateElement.id] ? 'value-applied' : ''}`}>
                            {getDisplayValue(startDateElement, 'January 15, 2024')}
                          </span>
                        </SelectableElement>
                      ) : (
                        <span className="card-value">January 15, 2024</span>
                      )}
                    </div>
                  </div>

                  {/* Status card */}
                  <div className="overview-card">
                    <div className="card-icon">✓</div>
                    <div className="card-content">
                      <span className="card-label">Status</span>
                      <span className="card-value status-active">Active</span>
                    </div>
                  </div>
                </div>

                {/* Benefits preview */}
                <div className="benefits-preview">
                  <h3 className="benefits-preview-title">Included Benefits</h3>
                  <div className="benefits-grid">
                    <div className="benefit-item"><span className="benefit-check">✓</span> Medical Insurance</div>
                    <div className="benefit-item"><span className="benefit-check">✓</span> Dental Coverage</div>
                    <div className="benefit-item"><span className="benefit-check">✓</span> Vision Plan</div>
                    <div className="benefit-item"><span className="benefit-check">✓</span> 401(k) Retirement</div>
                    <div className="benefit-item"><span className="benefit-check">✓</span> Life Insurance</div>
                    <div className="benefit-item"><span className="benefit-check">✓</span> Disability</div>
                  </div>
                </div>
              </div>

              {/* Footer accent */}
              <div className="overview-footer-accent" />
            </div>
          )}

          {/* ==================== PAGE 3: CONTACT ==================== */}
          {pageNumber === 3 && (
            <div className="contact-page">
              {/* Header */}
              <div className="contact-header">
                <div className="contact-header-content">
                  <h2 className="contact-main-title">Contact Information</h2>
                  <p className="contact-header-subtitle">
                    Your advocate is here to help you with claims, ID cards, coverage questions, and more!
                  </p>
                </div>
              </div>

              {/* Contact details */}
              <div className="contact-main">
                <div className="contact-info-card">
                  <div className="contact-avatar">
                    <img src={heroImages[2]} alt="Advocate" className="avatar-img" />
                  </div>
                  <div className="contact-details">
                    <span className="contact-name">Your Benefits Advocate</span>
                    <span className="contact-phone">📞 1-866-736-6640</span>
                    <span className="contact-email">✉️ service@onedigital.com</span>
                    <span className="contact-hours">Monday - Friday, 8am-5pm EST</span>
                  </div>
                </div>

                {/* Contact table */}
                <div className="contact-table-section">
                  <h3 className="table-section-title">Provider Directory</h3>
                  {tableElement ? (
                    <SelectableElement element={tableElement} className="contact-table-wrapper">
                      <div className={`contact-table-container ${isApplied && mappings[tableElement.id] ? 'table-applied' : ''}`}>
                        <table className="premium-table">
                          <thead>
                            <tr>
                              <th>Benefit Type</th>
                              <th>Provider</th>
                              <th>Contact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {schema.tables.find(t => t.id === 'contact-info')?.rows.slice(0, 6).map((row, rowIndex) => (
                              <tr key={rowIndex} className="table-row">
                                <td className="benefit-cell">{row[0]}</td>
                                <td className="provider-cell">{row[1]}</td>
                                <td className="contact-cell">{row[2].split('\n')[0]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </SelectableElement>
                  ) : (
                    <div className="contact-table-container">
                      <table className="premium-table">
                        <thead>
                          <tr>
                            <th>Benefit Type</th>
                            <th>Provider</th>
                            <th>Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema.tables.find(t => t.id === 'contact-info')?.rows.slice(0, 6).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className="benefit-cell">{row[0]}</td>
                              <td className="provider-cell">{row[1]}</td>
                              <td className="contact-cell">{row[2].split('\n')[0]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="contact-footer">
                <span>Bilingual (Spanish) assistance is available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
