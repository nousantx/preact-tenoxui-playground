import { useLayoutEffect, useState } from 'react'
import { init, tenoxuiConfig } from './lib/init'
import { MakeTenoxUI } from '@tenoxui/core/full'

export function App() {
  init()
  const [htmlContent, setHtmlContent] = useState(`<div class="center bg-neutral-900 text-neutral-50 box-250px br-1rem">
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
    previewElement.innerHTML = htmlContent

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
    <main class="p-2rem">
      <div id="preview" class="p-1rem bdr-[1px_solid_#333]"></div>
      <textarea
        value={htmlContent}
        onChange={handleInputChange}
        className="mt-1rem"
        placeholder="Enter HTML here..."
      />
    </main>
  )
}

export default App
