import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef, useState } from 'react'
import { artworkImages } from '../../constants/images.js';

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
          <div ref={item} className="wrapper w-max  flex gap-2">
            <div className="w-[100%] h-full flex gap-2">
              {artworkImages.map((image) => (
                <div key={`img-${image.id}`} className="item flex items-start justify-center transition-all duration-500 ease-in-out">
                  <img 
                    src={image.path} 
                    alt={image.alt} 
                    className="lg:w-[200px] w-[100px] object-cover " 
                  />
                </div>
              ))}
            </div>
            <div className="w-[100%] h-full flex gap-2">
              {artworkImages.map((image) => (
                <div key={`img-dup-${image.id}`} className="item flex items-start justify-center transition-all duration-500 ease-in-out">
                  <img 
                    src={image.path} 
                    alt={image.alt} 
                    className="lg:w-[200px] w-[100px] object-cover " 
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