import { Suspense, useCallback, useEffect } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Html, OrbitControls, Environment, Bounds } from "@react-three/drei"
import * as THREE from "three"
import useStore from "./store"
import Model from "./Model"

function ClickHandler() {
  const { addHotspot } = useStore()
  const { camera, scene, gl } = useThree()
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        addHotspot(intersects[0].point.clone())
      }
    },
    [camera, scene, gl, addHotspot]
  )

  useEffect(() => {
    gl.domElement.addEventListener("click", handleClick)
    return () => gl.domElement.removeEventListener("click", handleClick)
  }, [handleClick, gl.domElement])

  return null
}

export default function MiniEditor() {
  const { modelUrl } = useStore()

  const fallback = (
    <Html
      center
      className="text-sm text-gray-400 bg-gray-800/80 px-3 py-2 rounded w-[200px] h-fit"
    >
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
            <Model url={modelUrl} />
          </Bounds>
        ) : (
          fallback
        )}
      </Suspense>

      {modelUrl && <ClickHandler />}

      <OrbitControls enableDamping enablePan />
    </Canvas>
  )
}
