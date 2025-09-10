import { Html, useGLTF } from "@react-three/drei"
import useStore from "./store"

export default function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const { hotspots } = useStore()

  return (
    <primitive object={scene}>
      {hotspots.map((h) => (
        <Html
          key={h.id}
          position={h.position}
          center
          distanceFactor={100}
          className="bg-blue-600 text-white text-xs px-2 py-1 rounded shadow"
        >
          {h.text}
        </Html>
      ))}
    </primitive>
  )
}
