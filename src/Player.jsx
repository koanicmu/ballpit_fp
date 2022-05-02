import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useThree, useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";
import { PointerLockControls } from "@react-three/drei";
import { useStore, setState, getState } from "./store";

const SPEED = 10;
const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" };
const moveFieldByKey = key => keys[key];
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
// const speed = new THREE.Vector3();

export const Player = props => {
  const position = useStore(state => state.position);
  const [ref, api] = useSphere(() => ({
    mass: 10,
    args: [2, 2],
    type: "Kinematic",
    position: position,
    ...props,
  }));
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    setState({ api, velocity });
    return () => setState({ api: null });
  }, [api]);

  const { forward, backward, left, right, jump } = usePlayerControls();
  const { camera } = useThree();
  useEffect(() => {
    api.velocity.subscribe(v => (velocity.current = v));
  }, [position]);
  useFrame(state => {
    ref.current.getWorldPosition(camera.position);
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05)
      api.velocity.set(velocity.current[0], 10, velocity.current[2]);
  });
  return (
    <>
      <PointerLockControls />
      <group ref={ref} />
    </>
  );
};

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = e => setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = e => setMovement(m => ({ ...m, [moveFieldByKey(e.code)]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};
