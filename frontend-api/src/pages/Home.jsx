import VideoCarousel from "../components/Home/VideoCarousel";
import AboutOfferings from "../components/Home/AboutOfferings";
// import StatsShowcase from "../components/Home/StatsShowcase";
import InstagramSection from "../components/Home/InstagramSection";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <VideoCarousel />
      <AboutOfferings/>
      {/* <StatsShowcase/> */}
      <InstagramSection/>
    </div>
  );
}
