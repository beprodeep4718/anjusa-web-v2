import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'

const InfiniteCarousel = () => {
    const item = useRef(null);
  const [timeline, setTimeline] = useState(null);

  useGSAP(() => {
    // Create a timeline for the animation
    const tl = gsap.timeline({
      repeat: -1,
      paused: false,
    });
    
    tl.to(item.current, {
      x: "-50%",
      duration: 10,
      ease: "linear",
    });
    setTimeline(tl);
  }, []);

  const handleMouseEnter = () => {
    if (timeline) timeline.pause();
  };

  const handleMouseLeave = () => {
    if (timeline) timeline.play();
  };
  return (
    <section className="w-full px-2 sm:px-4 lg:px-10 py-4 sm:py-6 my-20">
        <div 
          className="slider w-full overflow-x-hidden relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={item} className="wrapper w-max flex gap-2">
            <div className="w-[100%] h-full flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`img-${num}`} className="item flex items-center justify-center transition-all duration-500 ease-in-out">
                  <img 
                    src={`images/artwork/img${num}.webp`} 
                    alt={`Random image ${num}`} 
                    className="lg:w-[200px] w-[100px] h-full object-cover rounded" 
                  />
                </div>
              ))}
            </div>
            <div className="w-[100%] h-full flex gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={`img-dup-${num}`} className="item flex items-center justify-center transition-all duration-500 ease-in-out">
                  <img 
                    src={`images/artwork/img${num}.webp`} 
                    alt={`Random image ${num}`} 
                    className="lg:w-[200px] w-[100px] h-full object-cover rounded" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  )
}

export default InfiniteCarousel