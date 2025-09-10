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
    distanceFactor={60} // lowered from 100 so it's visible
    className="bg-blue-600 text-white 
               text-[10px] sm:text-xs md:text-sm lg:text-base 
               px-1.5 sm:px-2 md:px-3 lg:px-4 
               py-0.5 sm:py-1 md:py-1.5 lg:py-2 
               rounded shadow"
  >
    {h.text}
  </Html>
))}

    </primitive>
  )
}
