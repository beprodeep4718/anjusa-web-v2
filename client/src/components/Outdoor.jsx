import React from "react";
import outdoor from "../constants/data";
import { MapPinned } from "lucide-react";
import { motion } from "motion/react";

const Outdoor = () => {
  return (
    <section className="outdoor-class w-full min-h-screen bg-base-300 lg:px-6 px-4 py-6 my-20">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="lg:text-6xl text-4xl font-[playfair-display] text-center"
      >
        Outdoor Classes
      </motion.h1>
      <p className="text-center text-lg my-4 font-[inter] tracking-wider text-base-content">
        Explore our outdoor classes and immerse yourself in nature.
      </p>
      <div className="o-cont my-20 lg:px-4 py-6">
        {outdoor.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className={`outdoor-box relative flex ${
              index % 2 == 0
                ? "lg:flex-row flex-col"
                : "flex-col lg:flex-row-reverse"
            } items-center justify-between gap-5 border-t-[1px] py-4`}
          >
            <div className="absolute h-[10px] w-[10px] -top-[5px] right-0 bg-base-content"></div>
            <div className="absolute h-[5px] w-[5px] -top-[2.5px] right-[2.5px] bg-base-300"></div>
            <div className="absolute h-[10px] w-[10px] -top-[5px] left-0 bg-base-content"></div>
            <div className="absolute h-[5px] w-[5px] -top-[2.5px] left-[2.5px] bg-base-300"></div>
            <div className="flex-1 ">
              <img
                className="outdoor-image rounded-lg shadow-md h-full w-full lg:grayscale hover:grayscale-0 transition-all duration-300"
                src={item.image}
                alt=""
              />
            </div>
            <div
              className={`flex-2 flex flex-col ${
                index % 2 == 0 ? "lg:items-end" : "lg:items-start"
              } justify-center gap-5`}
            >
              <h2 className="text-3xl lg:text-4xl tracking-wider font-semibold mb-4 font-[playfair-display] text-base-content">
                {item.title}
              </h2>
              <p className="text-sm flex items-center gap-2 font-[inter] tracking-wider text-base-content">
                <MapPinned strokeWidth={1} /> {item.location}
              </p>
              <p className="text-sm flex items-center gap-2 font-[inter] tracking-wider text-base-content">
                {item.coordinates}
              </p>
              <p className="text-sm flex items-center gap-2 font-[inter] tracking-wider text-base-content">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Outdoor;
