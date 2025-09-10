import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Html, OrbitControls, Environment, Bounds } from "@react-three/drei"
import useStore from "./store"
import Model from "./Model"
import Hotspots from "./Hotspots"

export default function MiniEditor() {
  const { modelUrl, modelName } = useStore()

  const fallback = (
    <Html center className="text-sm text-gray-400 bg-gray-800/80 px-3 py-2 rounded w-[200px] h-fit">
      Import a .glb file to begin
    </Html>
  )

  return (
    <Canvas camera={{ position: [2.5, 2, 3.5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} />
      <Environment preset="city" />

      <Suspense fallback={fallback}>
        {modelUrl ? (
          <Bounds fit clip margin={1.2}>
            <Model url={modelUrl} name={modelName || "Model"} />
          </Bounds>
        ) : (
          fallback
        )}
      </Suspense>

      <Hotspots />

      <OrbitControls enableDamping enablePan />
    </Canvas>
  )
}
