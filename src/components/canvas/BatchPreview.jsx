import './canvas-preview.css'

export default function BatchPreview({ designs }) {
  if (!designs || designs.length === 0) return null

  return (
    <div className="batch-preview">
      <div className="batch-scroll-container">
        {designs.map((product, index) => (
          <div key={product.id} className="batch-design-item">
            <div className="page-header">
              <span className="page-label">Design {index + 1}</span>
              <span className="page-title-input">- {product.productName}</span>
              <div className="page-actions">
                <button className="page-action">⌄</button>
                <button className="page-action">⌃</button>
                <button className="page-action">🔒</button>
                <button className="page-action">📋</button>
                <button className="page-action">🗑</button>
                <button className="page-action">⊕</button>
              </div>
            </div>

            <div className="page-content is-applied">
              <div className="page-visual">
                <div className="product-ad-page">
                  <div className="ad-accent ad-accent-tl" />
                  <div className="ad-accent ad-accent-br" />

                  <div className="ad-product-name-section">
                    <span className="ad-product-name">{product.productName.toUpperCase()}</span>
                  </div>

                  <div className="ad-promo-row">
                    <div className="ad-promo-left">
                      <span className="ad-promo-label">{product.promo}</span>
                    </div>
                    <div className="ad-promo-divider" />
                    <div className="ad-promo-right">
                      <span className="ad-discount">{product.discount}</span>
                      <span className="ad-discount-off">OFF</span>
                    </div>
                  </div>

                  <div className="ad-product-image-section">
                    <img src={product.image} alt={product.productName} className="ad-product-img" />
                  </div>

                  <div className="ad-cta-section">
                    <span className="ad-cta">{product.cta}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
