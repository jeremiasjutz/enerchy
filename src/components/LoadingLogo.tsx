import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";
import gsap from "gsap";
import { useThree } from "@react-three/fiber";

const duration = 1;
const initialXRotation = Math.PI * -0.5;
const ease = "power3.inOut";

export default function LoadingLogo({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const camera = useThree((state) => state.camera);
  const mesh = useRef<Mesh>(null!);
  const material = useRef<MeshStandardMaterial>(null!);
  const texture = useTexture("/enerchyAlphaMap.png", (texture) => {
    if (!Array.isArray(texture)) {
      texture.wrapS = RepeatWrapping;
      texture.repeat.x = 3;
    }
  });

  useEffect(() => {
    gsap.to(mesh.current.rotation, {
      y: Math.PI * 2,
      duration: duration * 4,
      ease: "none",
      repeat: Infinity,
    });
    gsap.to(mesh.current.rotation, {
      x: 0,
      delay: duration,
      duration: duration * 2,
      ease,
    });
    gsap.to(camera.position, {
      y: -5,
      delay: duration,
      duration: duration * 2,
      ease,
    });
    gsap.to(camera.position, {
      z: 15,
      delay: duration,
      duration,
      ease,
      onComplete,
    });
  }, []);

  return (
    <>
      <ambientLight />
      <mesh ref={mesh} rotation-x={initialXRotation}>
        <cylinderGeometry args={[1, 1, 0.5, 64]} />
        <meshStandardMaterial
          ref={material}
          alphaMap={texture}
          transparent={true}
          attach="material-0"
          side={DoubleSide}
        />
        <TransparentMaterial attach="material-1" />
        <TransparentMaterial attach="material-2" />
      </mesh>
    </>
  );
}

function TransparentMaterial({ attach }: { attach: string }) {
  return <meshBasicMaterial attach={attach} transparent opacity={0} />;
}
