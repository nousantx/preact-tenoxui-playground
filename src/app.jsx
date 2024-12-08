import React, { useLayoutEffect, useState } from 'react'
import { init, tenoxuiConfig } from './lib/init'
import { MakeTenoxUI } from '@tenoxui/core/full'
import DOMPurify from 'dompurify'

export function App() {
  init()
  const [htmlContent, setHtmlContent] =
    useState(`<div class="center bg-neutral-900 text-neutral-50 box-250px br-1rem">
  <h1 class="fs-2rem fw-500 ls--0.035em">Hello World!</h1>
</div>`)

  useLayoutEffect(() => {
    const previewElement = document.getElementById('preview')
    if (!previewElement) return

    const tuiInstances = new Map()

    function initializeTenoxUI(config) {
      tuiInstances.clear()
      previewElement.querySelectorAll('*').forEach((element) => {
        const instance = new MakeTenoxUI({
          element,
          ...config
        }).useDOM()
        tuiInstances.set(element, instance)
      })
    }

    // Sanitize the HTML content before setting it
    const sanitizedContent = DOMPurify.sanitize(htmlContent)

    // Use a temporary element to parse the sanitized HTML
    const tempElement = document.createElement('div')
    tempElement.innerHTML = sanitizedContent

    // Clear the preview element
    previewElement.innerHTML = ''

    // Append sanitized content as child nodes
    while (tempElement.firstChild) {
      previewElement.appendChild(tempElement.firstChild)
    }

    try {
      initializeTenoxUI(tenoxuiConfig)
    } catch (error) {
      console.error('Error initializing TenoxUI:', error)
    }

    return () => {
      tuiInstances.clear()
    }
  }, [htmlContent])

  const handleInputChange = (event) => {
    setHtmlContent(event.target.value)
  }

  return (
    <main className="p-2rem">
      <div id="preview" className="p-1rem bdr-[1px_solid_#333]"></div>
      <textarea
        value={htmlContent}
        onChange={handleInputChange}
        className="mt-1rem w-full h-32"
        placeholder="Enter HTML here..."
      />
    </main>
  )
}

export default App
