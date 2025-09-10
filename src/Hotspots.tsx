import { Html } from "@react-three/drei"
import * as THREE from "three"
import useStore from "./store"

interface MarkerProps {
  hotspot: {
    id: number
    position: [number, number, number]
    text: string
  }
  selected: boolean
  onSelect: (id: number) => void
}

function Marker({ hotspot, selected, onSelect }: MarkerProps) {
  return (
    <group
      position={hotspot.position}
      onClick={(e) => {
        onSelect(hotspot.id)
        e.stopPropagation()
      }}
    >
      <mesh>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial
          emissive={
            selected
              ? new THREE.Color(0.8, 0.2, 0.2)
              : new THREE.Color(0.2, 0.6, 1)
          }
        />
      </mesh>

      <Html distanceFactor={5} occlude transform>
        <div
          className={`px-2 py-1 rounded-md text-xs shadow-lg ${
            selected
              ? "bg-blue-600 text-white ring-2 ring-blue-400"
              : "bg-gray-800 text-gray-100 border border-gray-700"
          }`}
        >
          {hotspot.text}
        </div>
      </Html>
    </group>
  )
}

export default function Hotspots() {
  const { hotspots, selectedId, setSelectedId } = useStore()

  return (
    <group>
      {hotspots.map((h) => (
        <Marker
          key={h.id}
          hotspot={h}
          selected={h.id === selectedId}
          onSelect={setSelectedId}
        />
      ))}
    </group>
  )
}
