import  { useMemo } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import useStore from "./store"

interface Props {
  url: string
  name?: string
}

export default function Model({ url, name }: Props) {
  const gltf = useLoader(GLTFLoader, url)
  const { addHotspot } = useStore()

  const scene = useMemo(() => {
    gltf.scene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
    return gltf.scene
  }, [gltf])

  const handleClick = (e: any) => {
    addHotspot(e.point)
    e.stopPropagation()
  }

  return (
    <group name={name || "Model"} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  )
}
