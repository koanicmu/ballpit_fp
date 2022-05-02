import { Suspense, cloneElement, useEffect, useState } from "react";

function Ready({ setReady }) {
  useEffect(
    () => () => {
      console.log("ready");
      void setReady(true);
    },
    []
  );
  return null;
}

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>{cloneElement(children, { ready: clicked && ready })}</Suspense>
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${clicked && "clicked"}`}>
        <div className='max-width-wrapper'>
          <div className='card' onClick={() => setClicked(true)}>
            <p>{!ready ? "loading" : "click to continue"}</p>
          </div>
        </div>
      </div>
      {clicked && <div className='dot' />}
    </>
  );
}
