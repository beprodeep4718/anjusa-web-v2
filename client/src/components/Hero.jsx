import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { ArrowUpRight } from "lucide-react";
import CircularText from "./animation/CircularText";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <div className="relative hero bg-base-300 min-h-screen overflow-hidden z-1">
      <div className="absolute h-screen w-20 lg:flex flex-col items-center justify-between left-0 hidden gap-1">
        <div className="w-[0.5px] grow-1 bg-base-content"></div>
        <div className="w-[10px] h-[10px] bg-base-content"></div>
      </div>
      <CircularText />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="hero-content flex-col lg:flex-row"
      >
        <Swiper
          modules={[Autoplay]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-[90vw] lg:w-[60vw] rounded-lg shadow-lg"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <SwiperSlide key={i}>
              <div className="w-full h-44 lg:h-72 shadow-lg rounded-lg overflow-hidden">
                <img
                  src={`images/slide/img${i}.jpg`}
                  alt={`Slide ${i}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <h1 className="text-5xl tracking-wider font-semibold font-[playfair-display]">
            Portray Your Imagination
          </h1>
          <p className="py-6 font-[inter] text-sm tracking-wider">
            Unlish your creativity with our stunning collection of images.
            Whether you're looking for inspiration, a perfect background, or
            just something to brighten your day, we have it all. Explore our
            gallery and let your imagination run wild!
          </p>
          <button className="btn btn-accent btn-outline rounded-full font-[inter] font-light">
            Contact Us <ArrowUpRight strokeWidth={1} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
