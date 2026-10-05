import { SCORE_LIMITS, type Product, type ProductScores } from '../types'

export function netProfit(p: Pick<Product, 'sellPrice' | 'buyPrice' | 'shipping' | 'commission' | 'ads' | 'packaging'>): number {
  return p.sellPrice - p.buyPrice - p.shipping - p.commission - p.ads - p.packaging
}

export function margin(p: Pick<Product, 'sellPrice' | 'buyPrice' | 'shipping' | 'commission' | 'ads' | 'packaging'>): number {
  if (p.sellPrice <= 0) return 0
  return (netProfit(p) / p.sellPrice) * 100
}

export function scoreTotal(scores: ProductScores): number {
  return (Object.keys(SCORE_LIMITS) as (keyof ProductScores)[]).reduce((sum, key) => {
    const max = SCORE_LIMITS[key]
    const value = Math.min(max, Math.max(0, scores[key] || 0))
    return sum + value
  }, 0)
}

export function emptyScores(): ProductScores {
  return {
    demand: 0,
    profit: 0,
    competition: 0,
    startupRisk: 0,
    content: 0,
    brand: 0,
    shipping: 0,
    returns: 0,
  }
}
