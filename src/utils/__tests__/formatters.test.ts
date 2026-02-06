import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency} from '../formatters'

describe('formatDate', () => {
  it('should format a valid date string in short format', () => {
    const dateString = '2024-01-15T10:30:00Z'

    const result = formatDate(dateString, 'short')

    expect(result).toContain('Jan')
    expect(result).toContain('15')
    expect(result).toContain('2024')

  })

  it('should return "N/A" when date string is null or undefined', () => {
    expect(formatDate(null)).toBe('N/A')
    expect(formatDate(undefined)).toBe('N/A')
  })

  it('should return "N/A" when date string is invalid', () => {
    expect(formatDate('invalid-date')).toBe('N/A')
  })
})

describe('formatCurrency', () => {
  it('should format currency in INR correctly', () => {
    const amount = 1000
    const result = formatCurrency(amount, 'INR')
    
    expect(result).toContain('₹')
    expect(result).toContain('1,000')
  })

  it('should return "N/A" for null or undefined amounts', () => {
    expect(formatCurrency(null)).toBe('N/A')
    expect(formatCurrency(undefined)).toBe('N/A')
  })
})