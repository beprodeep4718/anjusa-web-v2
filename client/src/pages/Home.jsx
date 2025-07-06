import Hero from "../components/Hero";
import NoticeSection from "../components/NoticeSection";
import Outdoor from "../components/Outdoor";
import InfiniteCarousel from "../components/animation/InfiniteCarousel";

const Home = () => {
  return (
    <>
      <Hero />
      <NoticeSection />
      <InfiniteCarousel />
      <Outdoor />
    </>
  );
};

export default Home;
