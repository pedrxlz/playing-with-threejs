import { RigidBody } from "@react-three/rapier";

const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

export function Floor() {
  return (
    <>
      <RigidBody position={[0, 0, 0]} rotation={[angleToRadians(-90), 0, 0]}>
        <mesh receiveShadow>
          <planeGeometry args={[100, 50]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>

      <pointLight position={[0, 10, 0]} />
    </>
  );
}
