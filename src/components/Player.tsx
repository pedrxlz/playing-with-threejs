import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import {
  BufferGeometry,
  Mesh,
  NormalBufferAttributes,
  Quaternion,
  Raycaster,
  Vector3,
} from "three";

interface PlayerProps {
  walk?: number;
  jump?: number;
  input?: () => { move: [number, number, number] };
}

export const Player = ({
  walk = 3,
  jump = 4,
  input = () => ({ move: [0, 0, 0] }),
}: PlayerProps) => {
  const api = useRef<RapierRigidBody>(null);
  const mesh = useRef<Mesh<BufferGeometry<NormalBufferAttributes>>>(null);

  const speed = new Vector3(walk / 2, jump, walk);
  const offset = new Vector3(0, 0, 0);
  const yaw = new Quaternion();
  const down = new Vector3(0, -1, 0);
  const raycaster = new Raycaster(new Vector3(0, 0, 0), down, 0, 2);

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const position = api.current.translation();
    const { move } = input();

    raycaster.set(new Vector3(position.x, position.y, position.z), down);

    offset.fromArray(move).normalize().multiply(speed).applyQuaternion(yaw);

    api.current.applyImpulse(offset, true);
  });

  return (
    <RigidBody ref={api} position={[0, 5, 0]} colliders="ball">
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshPhysicalMaterial color={"#080101"} />
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>
    </RigidBody>
  );
};
