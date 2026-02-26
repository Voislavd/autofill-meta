import template1Thumb from '../assets/images/template-1.png'
import template2Thumb from '../assets/images/template-2.png'
import template3Thumb from '../assets/images/template-3.png'
import template4Thumb from '../assets/images/template-4.png'
import template5Thumb from '../assets/images/template-5.png'
import template6Thumb from '../assets/images/template-6.png'
import shoe2 from '../assets/images/shoe-2.png'
import shoe3 from '../assets/images/shoe-3.png'
import shoe4 from '../assets/images/shoe-4.png'
import shoe5 from '../assets/images/shoe-5.png'
import shoe6 from '../assets/images/shoe-6.png'
import shoe7 from '../assets/images/shoe-7.png'
import shoe8 from '../assets/images/shoe-8.png'
import shoe9 from '../assets/images/shoe-9.png'

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
  { id: 'meta-catalogue', name: 'Meta Catalogue', connected: true },
  { id: 'google-sheets', name: 'Google Sheets', connected: true },
  { id: 'shopify-store', name: 'Shopify Store', connected: false }
]

export const CATALOGUE_FILTERS = {
  dateRange: [
    { id: 'last-7', label: 'Last 7 days', count: 40 },
    { id: 'last-30', label: 'Last 30 days', count: 85 },
    { id: 'all-time', label: 'All time', count: 120 },
  ],
  category: [
    { id: 'all', label: 'All categories', count: 120 },
    { id: 'running-shoes', label: 'Running Shoes', count: 28 },
    { id: 'apparel', label: 'Apparel', count: 35 },
    { id: 'accessories', label: 'Accessories', count: 22 },
    { id: 'outdoor', label: 'Outdoor Gear', count: 18 },
    { id: 'lifestyle', label: 'Lifestyle', count: 17 },
  ],
  status: [
    { id: 'new', label: 'New', count: 40 },
    { id: 'updated', label: 'Updated', count: 8 },
    { id: 'all', label: 'All', count: 120 },
  ],
}

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
    bgColor: '#F6F7F8',
    pages: [
      {
        id: 'page-1',
        title: 'Ad Creative',
        elements: [
          { id: 'el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 'el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 'el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 'el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 'el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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
        title: 'Ad Creative',
        elements: [
          { id: 't2-el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 't2-el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 't2-el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 't2-el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 't2-el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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
        title: 'Ad Creative',
        elements: [
          { id: 't3-el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 't3-el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 't3-el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 't3-el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 't3-el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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
        title: 'Ad Creative',
        elements: [
          { id: 't4-el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 't4-el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 't4-el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 't4-el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 't4-el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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
        title: 'Ad Creative',
        elements: [
          { id: 't5-el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 't5-el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 't5-el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 't5-el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 't5-el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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
        title: 'Ad Creative',
        elements: [
          { id: 't6-el-1', type: 'text', label: 'Product Name', mappedField: 'product-name' },
          { id: 't6-el-2', type: 'text', label: 'Promo Label', mappedField: 'promo-label' },
          { id: 't6-el-3', type: 'text', label: 'Discount %', mappedField: 'discount-percent' },
          { id: 't6-el-4', type: 'image', label: 'Product Image', mappedField: 'product-image' },
          { id: 't6-el-5', type: 'text', label: 'CTA Text', mappedField: 'cta-text' },
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

export const BATCH_PRODUCTS = [
  { id: 1, productName: 'Nike Air Zoom Trail', discount: '30%', promo: 'SALE', cta: 'Shop Now', image: shoe2 },
  { id: 2, productName: 'Adidas Ultraboost 23', discount: '25%', promo: 'NEW', cta: 'Buy Now', image: shoe3 },
  { id: 3, productName: 'Puma RS-X Reinvention', discount: '40%', promo: 'SALE', cta: 'Get Yours', image: shoe4 },
  { id: 4, productName: 'New Balance 990v6', discount: '15%', promo: 'LIMITED', cta: 'Order Now', image: shoe5 },
  { id: 5, productName: 'Reebok Nano X3', discount: '35%', promo: 'HOT DEAL', cta: 'Shop Now', image: shoe6 },
  { id: 6, productName: 'Asics Gel-Kayano 30', discount: '20%', promo: 'SALE', cta: 'Grab It', image: shoe7 },
  { id: 7, productName: 'Hoka Clifton 9', discount: '50%', promo: 'CLEARANCE', cta: 'Buy Now', image: shoe8 },
  { id: 8, productName: 'On Cloud 5', discount: '10%', promo: 'NEW', cta: 'Explore', image: shoe9 },
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

