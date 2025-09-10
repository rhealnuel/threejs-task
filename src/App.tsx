import React, { useRef } from "react"
import MiniEditor from "./MiniEditor"
import useStore from "./store"

export default function App() {
  const fileRef = useRef<HTMLInputElement>(null)
  const { hotspots, selectedId, setSelectedId, setLabelText, clearAll, loadModel } = useStore()

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (!file.name.toLowerCase().endsWith(".glb")) {
    alert("Please choose a .glb file")
    return
  }
  const url = URL.createObjectURL(file)
  loadModel(url, file.name)

  // reset the input so the same file can be re-imported
  e.target.value = ""
}


  return (
    <div className="flex flex-col h-screen bg-gray-950 text-gray-100">
      {/* Topbar */}
      <header className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-gray-800 bg-gray-900/80 backdrop-blur">
        <h1 className="text-base font-semibold tracking-wide">Mini 3D Editor</h1>
        <div className="flex gap-2">
          <input
            ref={fileRef}
            type="file"
            accept=".glb"
            onChange={onPickFile}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-md cursor-pointer bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600"
          >
            Import .GLB
          </button>
          <button
            onClick={clearAll}
            className="rounded-md cursor-pointer bg-gray-700 px-3 py-1.5 text-sm font-medium hover:bg-gray-600"
          >
            Clear All
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-800 bg-gray-900 p-4 overflow-y-auto">
          <h2 className="text-sm font-semibold mb-2">Hotspots</h2>
          {hotspots.length === 0 && (
            <p className="text-sm text-gray-400 mb-4">Click the model to add a hotspot.</p>
          )}
          <ul className="space-y-3">
            {hotspots.map(h => (
              <li
                key={h.id}
                className={`rounded-lg border p-2 cursor-pointer ${
                  h.id === selectedId ? "border-blue-500 bg-gray-800" : "border-gray-700 bg-gray-950"
                }`}
                onClick={() => setSelectedId(h.id)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 px-2 py-0.5 rounded-full border border-gray-700 bg-gray-800">
                    #{h.id}
                  </span>
                  <input
                    value={h.text}
                    onChange={(e) => setLabelText(h.id, e.target.value)}
                    className="flex-1 rounded bg-gray-800 border border-gray-700 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Label"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {h.position.map(n => n.toFixed(2)).join(", ")}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-400 leading-relaxed">
            <strong>Tips:</strong><br />
            • Rotate: left-drag<br />
            • Pan: right-drag / two-finger drag<br />
            • Zoom: wheel / pinch<br />
            • Add hotspot: click the model
          </p>
        </aside>

        {/* Stage */}
        <main className="flex-1 relative bg-gray-950">
          <MiniEditor />
        </main>
      </div>
    </div>
  )
}
