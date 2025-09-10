import { create } from "zustand"
import * as THREE from "three"

interface Hotspot {
  id: number
  position: [number, number, number]
  text: string
}

interface Store {
  modelUrl: string | null
  modelName: string | null
  hotspots: Hotspot[]
  selectedId: number | null
  loadModel: (url: string, name: string) => void
  addHotspot: (pos: THREE.Vector3) => void
  setLabelText: (id: number, text: string) => void
  setSelectedId: (id: number | null) => void
  clearAll: () => void
}

let nextId = 1

const useStore = create<Store>((set) => ({
  modelUrl: null,
  modelName: null,
  hotspots: [],
  selectedId: null,

  loadModel: (url, name) =>
    set({
      modelUrl: url,
      modelName: name,
      hotspots: [],
      selectedId: null,
    }),

  addHotspot: (pos) =>
    set((state) => {
      const id = nextId++
      return {
        hotspots: [
          ...state.hotspots,
          { id, position: [pos.x, pos.y, pos.z], text: `Label ${id}` },
        ],
        selectedId: id,
      }
    }),

  setLabelText: (id, text) =>
    set((state) => ({
      hotspots: state.hotspots.map((h) =>
        h.id === id ? { ...h, text } : h
      ),
    })),

  setSelectedId: (id) => set({ selectedId: id }),

  clearAll: () =>
    set({
      hotspots: [],
      selectedId: null,
    }),
}))

export default useStore
