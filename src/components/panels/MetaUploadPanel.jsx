import { useState } from 'react'
import Dropdown from '../ui/Dropdown'
import metaIcon from '../../assets/icons/meta-icon.png'
import './panels.css'

export default function MetaUploadPanel({ onClose, onUploaded, designCount = 8 }) {
  const [isUploading, setIsUploading] = useState(false)

  const pageItems = [
    { value: 'all', label: `Pages 1-${designCount}` }
  ]

  const handleUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      onUploaded?.()
    }, 3000)
  }

  return (
    <div className="meta-upload-panel">
      <div className="meta-upload-header">
        <div className="meta-upload-header-left">
          <span className="meta-upload-title">Meta Business</span>
          <button className="meta-upload-more">···</button>
        </div>
        <button className="meta-upload-close" onClick={onClose}>×</button>
      </div>

      <div className="meta-upload-body">
        <div className="meta-upload-section">
          <label className="meta-upload-label">Choose pages</label>
          <Dropdown
            items={pageItems}
            value="all"
            onSelect={() => {}}
            fullWidth
          />
        </div>

        <div className="meta-upload-section">
          <label className="meta-upload-label">Upload to product</label>
          <div className="meta-upload-search">
            <span className="meta-search-icon">🔍</span>
            <input
              type="text"
              className="meta-search-input"
              defaultValue="shoes"
              readOnly
            />
            <button className="meta-search-filter">⚙</button>
            <img src={metaIcon} alt="Meta" className="meta-search-meta-icon" />
          </div>

          <div className="meta-product-card">
            <div className="meta-product-info">
              <span className="meta-product-name">Shoes</span>
              <span className="meta-product-id">Group ID: xxx</span>
            </div>
            <button className="meta-product-expand">⤢</button>
          </div>
        </div>
      </div>

      <div className="meta-upload-footer">
        <button
          className={`meta-upload-btn ${isUploading ? 'uploading' : ''}`}
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <span className="meta-btn-spinner" />
              <span>Uploading...</span>
            </>
          ) : (
            'Upload to Meta'
          )}
        </button>
      </div>
    </div>
  )
}
