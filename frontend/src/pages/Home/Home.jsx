import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GalleryPreview from "./components/GalleryPreview";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import WhyChooseUs from "./components/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <GalleryPreview />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home;