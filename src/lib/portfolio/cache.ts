import { revalidateTag } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

export const portfolioContentCacheTag = 'portfolio-content'

const invalidatePortfolioContent = () => {
  try {
    revalidateTag(portfolioContentCacheTag, { expire: 0 })
  } catch {
    // Payload CLI commands do not run inside a Next.js request context.
    // Their writes still become visible when the time-based cache expires.
  }
}

export const revalidatePortfolioAfterCollectionChange: CollectionAfterChangeHook = ({ doc }) => {
  invalidatePortfolioContent()
  return doc
}

export const revalidatePortfolioAfterCollectionDelete: CollectionAfterDeleteHook = ({ doc }) => {
  invalidatePortfolioContent()
  return doc
}

export const revalidatePortfolioAfterGlobalChange: GlobalAfterChangeHook = ({ doc }) => {
  invalidatePortfolioContent()
  return doc
}
