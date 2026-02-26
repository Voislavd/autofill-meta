import template1Thumb from '../assets/images/template-1.png'
import template2Thumb from '../assets/images/template-2.png'
import template3Thumb from '../assets/images/template-3.png'
import template4Thumb from '../assets/images/template-4.png'
import template5Thumb from '../assets/images/template-5.png'
import template6Thumb from '../assets/images/template-6.png'

// Sample data for the Autofill prototype

export const PERSONAS = [
  { id: 'marketer', label: 'Marketer' },
  { id: 'admin', label: 'Admin' }
]

export const BRANDS = [
  { id: 'one-digital', label: 'One Digital' },
  { id: 'acme', label: 'Acme Corp' },
  { id: 'globex', label: 'Globex Inc' }
]

export const CATEGORIES = [
  { id: 'benefits', label: 'Benefits' },
  { id: 'onboarding', label: 'Onboarding' },
  { id: 'training', label: 'Training' }
]

export const CLIENTS = [
  { id: 'hyperscape', label: 'Hyperscape' },
  { id: 'techcorp', label: 'TechCorp' },
  { id: 'globalinc', label: 'GlobalInc' }
]

export const DATA_SOURCES = [
  { id: 'benefits-hris', name: 'Benefits HRIS One Digital', connected: true },
  { id: 'rates-db', name: 'Rates Database', connected: true },
  { id: 'payroll-system', name: 'Payroll System', connected: false }
]

export const SCHEMA = {
  id: 'meta-catalogue',
  name: 'Meta Catalogue',
  fields: [
    { id: 'product-name', label: 'Product name', type: 'text', sampleValue: 'Nike Air Zoom Trail' },
    { id: 'product-brand', label: 'Brand', type: 'text', sampleValue: 'Nike' },
    { id: 'product-price', label: 'Price', type: 'text', sampleValue: '$129.99' },
    { id: 'sale-price', label: 'Sale price', type: 'text', sampleValue: '$89.99' },
    { id: 'discount-percent', label: 'Discount %', type: 'text', sampleValue: '30%' },
    { id: 'product-category', label: 'Category', type: 'text', sampleValue: 'Running Shoes' },
    { id: 'product-description', label: 'Description', type: 'text', sampleValue: 'Lightweight trail running shoe with responsive cushioning' },
    { id: 'promo-label', label: 'Promo label', type: 'text', sampleValue: 'SALE' },
    { id: 'cta-text', label: 'CTA text', type: 'text', sampleValue: 'Shop Now' },
    { id: 'product-sku', label: 'SKU', type: 'text', sampleValue: 'NK-AZT-4821' },
  ],
  media: [
    { id: 'product-image', label: 'Product image', type: 'image', sampleValue: 'product-001.jpg' },
    { id: 'brand-logo', label: 'Brand logo', type: 'image', sampleValue: 'brand-logo.png' },
    { id: 'lifestyle-image', label: 'Lifestyle image', type: 'image', sampleValue: 'lifestyle-001.jpg' },
  ],
  tables: [
    {
      id: 'product-variants',
      label: 'Product variants',
      columns: ['Size', 'Color', 'Stock'],
      rows: [
        ['US 8', 'Blue/Red', '24'],
        ['US 9', 'Blue/Red', '18'],
        ['US 10', 'Blue/Red', '31'],
        ['US 11', 'Blue/Red', '12'],
        ['US 8', 'Black/White', '22'],
        ['US 9', 'Black/White', '15'],
      ]
    },
    {
      id: 'pricing-tiers',
      label: 'Pricing tiers',
      columns: ['Region', 'Currency', 'Price'],
      rows: [
        ['US', 'USD', '$89.99'],
        ['EU', 'EUR', '€82.99'],
      ]
    },
  ]
}

export const TEMPLATES = [
  {
    id: 'template-1',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template1Thumb,
    bgColor: '#F6F7F8', // Light gray
    pages: [
      {
        id: 'page-1',
        title: 'Cover',
        elements: [
          { id: 'el-1', type: 'text', label: 'ABC Company', x: 740, y: 178, width: 200, mappedField: 'company-name' },
          { id: 'el-2', type: 'text', label: 'For xx employees', x: 740, y: 663, width: 200, mappedField: 'employee-count' },
          { id: 'el-12', type: 'image', label: 'Hero Image', x: 740, y: 400, width: 300, height: 200, mappedField: 'hero-photo' },
          { id: 'el-13', type: 'image', label: 'Company Logo', x: 740, y: 100, width: 150, height: 80, mappedField: 'company-logo' },
        ]
      },
      {
        id: 'page-2',
        title: 'Overview',
        elements: [
          { id: 'el-10', type: 'text', label: 'Department Name', x: 100, y: 200, width: 200, mappedField: 'department' },
          { id: 'el-11', type: 'text', label: 'Start Date', x: 100, y: 300, width: 150, mappedField: 'start-date' },
          { id: 'el-14', type: 'text', label: 'Job Type', x: 100, y: 400, width: 150, mappedField: 'job-type' },
          { id: 'el-15', type: 'text', label: 'Job Title', x: 100, y: 450, width: 200, mappedField: 'job-title' },
          { id: 'el-16', type: 'text', label: 'Manager Name', x: 100, y: 500, width: 200, mappedField: 'manager-name' },
          { id: 'el-17', type: 'text', label: 'Office Location', x: 100, y: 550, width: 200, mappedField: 'office-location' },
          { id: 'el-18', type: 'text', label: 'Employee Type', x: 300, y: 200, width: 150, mappedField: 'employee-type' },
          { id: 'el-19', type: 'text', label: 'Employee ID', x: 300, y: 250, width: 150, mappedField: 'employee-id' },
          { id: 'el-20', type: 'image', label: 'Team Photo', x: 400, y: 400, width: 250, height: 180, mappedField: 'team-photo' },
        ]
      },
      {
        id: 'page-3',
        title: 'Contact',
        elements: [
          { id: 'el-4', type: 'table', label: 'Contact Information', x: 740, y: 300, width: 400, mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-2',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template2Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't2-page-1',
        title: 'Cover',
        elements: [
          { id: 't2-el-1', type: 'text', label: 'ABC Company', mappedField: 'company-name' },
          { id: 't2-el-2', type: 'text', label: 'For xx employees', mappedField: 'employee-count' },
          { id: 't2-el-3', type: 'image', label: 'Hero Image', mappedField: 'hero-photo' },
        ]
      },
      {
        id: 't2-page-2',
        title: 'Overview',
        elements: [
          { id: 't2-el-4', type: 'text', label: 'Department Name', mappedField: 'department' },
          { id: 't2-el-5', type: 'text', label: 'Start Date', mappedField: 'start-date' },
        ]
      },
      {
        id: 't2-page-3',
        title: 'Contact',
        elements: [
          { id: 't2-el-6', type: 'table', label: 'Contact Information', mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-3',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template3Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't3-page-1',
        title: 'Cover',
        elements: [
          { id: 't3-el-1', type: 'text', label: 'ABC Company', mappedField: 'company-name' },
          { id: 't3-el-2', type: 'text', label: 'For xx employees', mappedField: 'employee-count' },
          { id: 't3-el-3', type: 'image', label: 'Hero Image', mappedField: 'hero-photo' },
        ]
      },
      {
        id: 't3-page-2',
        title: 'Overview',
        elements: [
          { id: 't3-el-4', type: 'text', label: 'Department Name', mappedField: 'department' },
          { id: 't3-el-5', type: 'text', label: 'Start Date', mappedField: 'start-date' },
        ]
      },
      {
        id: 't3-page-3',
        title: 'Contact',
        elements: [
          { id: 't3-el-6', type: 'table', label: 'Contact Information', mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-4',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template4Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't4-page-1',
        title: 'Cover',
        elements: [
          { id: 't4-el-1', type: 'text', label: 'ABC Company', mappedField: 'company-name' },
          { id: 't4-el-2', type: 'text', label: 'For xx employees', mappedField: 'employee-count' },
          { id: 't4-el-3', type: 'image', label: 'Hero Image', mappedField: 'hero-photo' },
        ]
      },
      {
        id: 't4-page-2',
        title: 'Overview',
        elements: [
          { id: 't4-el-4', type: 'text', label: 'Department Name', mappedField: 'department' },
          { id: 't4-el-5', type: 'text', label: 'Start Date', mappedField: 'start-date' },
        ]
      },
      {
        id: 't4-page-3',
        title: 'Contact',
        elements: [
          { id: 't4-el-6', type: 'table', label: 'Contact Information', mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-5',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template5Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't5-page-1',
        title: 'Cover',
        elements: [
          { id: 't5-el-1', type: 'text', label: 'ABC Company', mappedField: 'company-name' },
          { id: 't5-el-2', type: 'text', label: 'For xx employees', mappedField: 'employee-count' },
          { id: 't5-el-3', type: 'image', label: 'Hero Image', mappedField: 'hero-photo' },
        ]
      },
      {
        id: 't5-page-2',
        title: 'Overview',
        elements: [
          { id: 't5-el-4', type: 'text', label: 'Department Name', mappedField: 'department' },
          { id: 't5-el-5', type: 'text', label: 'Start Date', mappedField: 'start-date' },
        ]
      },
      {
        id: 't5-page-3',
        title: 'Contact',
        elements: [
          { id: 't5-el-6', type: 'table', label: 'Contact Information', mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-6',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: true,
    thumbnail: template6Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't6-page-1',
        title: 'Cover',
        elements: [
          { id: 't6-el-1', type: 'text', label: 'ABC Company', mappedField: 'company-name' },
          { id: 't6-el-2', type: 'text', label: 'For xx employees', mappedField: 'employee-count' },
          { id: 't6-el-3', type: 'image', label: 'Hero Image', mappedField: 'hero-photo' },
        ]
      },
      {
        id: 't6-page-2',
        title: 'Overview',
        elements: [
          { id: 't6-el-4', type: 'text', label: 'Department Name', mappedField: 'department' },
          { id: 't6-el-5', type: 'text', label: 'Start Date', mappedField: 'start-date' },
        ]
      },
      {
        id: 't6-page-3',
        title: 'Contact',
        elements: [
          { id: 't6-el-6', type: 'table', label: 'Contact Information', mappedField: 'contact-info' },
        ]
      }
    ]
  },
  {
    id: 'template-7',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: false,
    thumbnail: template1Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't7-page-1',
        title: 'Ad Creative',
        elements: [
          { id: 't7-el-1', type: 'text', label: 'Product Name', mappedField: null },
          { id: 't7-el-2', type: 'text', label: 'Promo Label', mappedField: null },
          { id: 't7-el-3', type: 'text', label: 'Discount %', mappedField: null },
          { id: 't7-el-4', type: 'image', label: 'Product Image', mappedField: null },
          { id: 't7-el-5', type: 'text', label: 'CTA Text', mappedField: null },
        ]
      }
    ]
  },
  {
    id: 'template-8',
    title: 'Product Sale Ad',
    type: 'Social media post',
    category: 'product-ad',
    isMapped: false,
    thumbnail: template2Thumb,
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 't8-page-1',
        title: 'Ad Creative',
        elements: [
          { id: 't8-el-1', type: 'text', label: 'Product Name', mappedField: null },
          { id: 't8-el-2', type: 'text', label: 'Brand', mappedField: null },
          { id: 't8-el-3', type: 'text', label: 'Description', mappedField: null },
          { id: 't8-el-4', type: 'image', label: 'Lifestyle Image', mappedField: null },
          { id: 't8-el-5', type: 'text', label: 'CTA Text', mappedField: null },
        ]
      }
    ]
  }
]

// Helper to get unmapped counts
export function getUnmappedCounts(templateId) {
  const template = TEMPLATES.find(t => t.id === templateId)
  if (!template) return { fields: 0, media: 0, tables: 0 }
  
  const mappedFieldIds = new Set()
  template.pages.forEach(page => {
    page.elements.forEach(el => {
      if (el.mappedField) mappedFieldIds.add(el.mappedField)
    })
  })
  
  return {
    fields: SCHEMA.fields.length - [...mappedFieldIds].filter(id => 
      SCHEMA.fields.some(f => f.id === id)
    ).length,
    media: SCHEMA.media.length - [...mappedFieldIds].filter(id => 
      SCHEMA.media.some(m => m.id === id)
    ).length,
    tables: SCHEMA.tables.length - [...mappedFieldIds].filter(id => 
      SCHEMA.tables.some(t => t.id === id)
    ).length,
  }
}

