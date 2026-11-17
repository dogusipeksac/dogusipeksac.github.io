import { useEffect } from 'react'

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes('HAREKET')
      ? title
      : `${title} | HAREKET — Kas & Egzersiz Rehberi`
    document.title = fullTitle

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', fullTitle)

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', description)

      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', description)
    }
  }, [title, description])
}
