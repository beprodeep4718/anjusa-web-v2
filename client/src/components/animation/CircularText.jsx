import React, { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const CircularText = () => {
  const text = " Anjusa Art & Computer Accademy";
  gsap.registerPlugin(useGSAP);
  const txt = useRef(null);
  const cont = useRef(null);
  useGSAP(() => {
    gsap.to(txt.current, {
      rotation: 360,
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, {
    scope: cont.current
  })
  return (
    <div ref={cont} className="absolute bottom-0 right-6 z-1">
      <div className="relative w-[200px] h-[200px] flex items-center justify-center rounded-full">
        <div ref={txt} className="absolute w-full h-full rounded-full">
          <p>
            {text.split("").map((char, i) => (
              <span
                key={i}
                className={`absolute font-[playfair-display] text-base-content origin-[0_100px] top-0 left-1/2`}
                style={{ transform: `rotate(${i * 360/text.length}deg)` }}
              >
                {char}
              </span>
            ))}
          </p>
        </div>
        <div className="text-3xl font-[playfair-display] tracking-wider">Anjusa</div>
      </div>
    </div>
  );
};

export default CircularText;
