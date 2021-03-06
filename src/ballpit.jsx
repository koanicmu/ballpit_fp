import { useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { MathUtils } from "three";

const randFloat = MathUtils.randFloat;

export default function Ballpit(props) {
  return (
    <group position={[0, 0, -20]}>
      <InstancedSpheres />
    </group>
  );
}

function InstancedSpheres({ count = 200 }) {
  const { viewport } = useThree();
  const [ref, api] = useSphere(index => ({
    mass: 100,
    position: [randFloat(-10, 10), randFloat(5, 10), randFloat(-10, 10)],
    args: [0.2],
  }));
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
      onClick={event => {
        api.applyImpulse([0, 10, 0], [0, 0, 0]);
        console.log("Ball clicked");
      }}
    >
      <sphereBufferGeometry args={[0.2, 32, 32]} />
      <meshLambertMaterial color='#ff7b00' />
    </instancedMesh>
  );
}
