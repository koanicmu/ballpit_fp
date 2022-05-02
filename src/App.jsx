import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sky, Environment, Stats } from "@react-three/drei";
import { Physics, Debug } from "@react-three/cannon";
import { Player } from "./Player";
import { Ground } from "./Ground";
import { Keyboard } from "./controls/keyboard";
import Ballpit from "./ballpit";

export default function App({ ready }) {
  return (
    <>
      <Stats showPanel={0} className='stats' />
      <Canvas shadows camera={{ fov: 60, near: 0.1, far: 10000 }}>
        <ambientLight intensity={0.5} />
        <Sky sunPosition={[70, -2, 0]} distance={10000} />
        <Environment files='/textures/sunset.hdr' />

        <Physics gravity={[0, -9.8, 0]} defaultContactMaterial={{ restitution: 0.1 }}>
          <Player />

          <Debug color='blue' scale={1.2}>
            <Ballpit />

            <Ground />
          </Debug>
        </Physics>
      </Canvas>
      <Keyboard />
    </>
  );
}
