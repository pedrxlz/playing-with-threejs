import {
  Environment,
  KeyboardControls,
  OrbitControls,
  useKeyboardControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import "./App.css";
import { Floor } from "./components/Floor";
import { Player } from "./components/Player";
import { Controls, getInput, keyBoardmap } from "./utils/input";

const Scene = () => {
  const [_, get] = useKeyboardControls<Controls>();

  return (
    <group>
      <Floor />
      <Player walk={2} jump={5} input={() => getInput(get)} />
    </group>
  );
};

function App() {
  return (
    <div className="h-screen w-screen">
      <KeyboardControls map={keyBoardmap}>
        <Canvas
          shadows
          className=""
          camera={{
            position: [0, 20, 30],
            fov: 60,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={null}>
            <Physics debug>
              <Scene />
            </Physics>
            <ambientLight intensity={0.2} color={"#89ebe2"} />
            <Environment preset="sunset" />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
