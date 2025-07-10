import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Cursor = () => {
  const cursorRef = useRef(null);
  const cursorRef2 = useRef(null);

  useGSAP(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX + 12, // Center the cursor
        y: e.clientY + 12, // Center the cursor
        duration: 0.4,
      });
      gsap.to(cursorRef2.current, {
        x: e.clientX + 12, // Center the cursor
        y: e.clientY + 12, // Center the cursor
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  });

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[24px] h-[24px] border-2 border-base-content rounded-full z-50 "
      ></div>
      <div
        ref={cursorRef2}
          className="fixed top-0 left-0 w-[24px] h-[24px] border-2 border-base-content rounded-full z-50 hidden pointer-events-none lg:block"
        ></div>
    </>
  );
};

export default Cursor;
