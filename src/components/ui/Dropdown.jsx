import { useState, useRef, useEffect } from 'react'
import chevronDown from '../../assets/icons/chevron-down.png'
import './Dropdown.css'

export default function Dropdown({ 
  items, 
  value,
  onSelect, 
  chipStyle = false,
  fullWidth = false 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(items[0]?.value)
  const dropdownRef = useRef(null)

  const selected = value !== undefined ? value : internalValue
  const selectedLabel = items.find(i => i.value === selected)?.label || items[0]?.label

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSelect = (item) => {
    if (value === undefined) {
      setInternalValue(item.value)
    }
    setIsOpen(false)
    onSelect?.(item)
  }

  return (
    <div 
      className={`dropdown ${isOpen ? 'open' : ''} ${fullWidth ? 'full-width' : ''}`}
      ref={dropdownRef}
    >
      <button 
        className={`dropdown-trigger ${chipStyle ? 'chip-style' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-trigger-label">{selectedLabel}</span>
        <img src={chevronDown} alt="" className="dropdown-arrow" />
      </button>
      <div className="dropdown-menu">
        {items.map((item) => (
          <div
            key={item.value}
            className={`dropdown-item ${selected === item.value ? 'selected' : ''}`}
            onClick={() => handleSelect(item)}
          >
            {item.icon && <span className="dropdown-item-icon" />}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
