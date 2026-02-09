import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import DifferentialsSection from "@/components/sections/DifferentialsSection";
import Services from "@/components/sections/Services";
import PlansSection from "@/components/sections/PlansSection";
import History from "@/components/sections/History";
import Team from "@/components/sections/Partners";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground bg-background overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <DifferentialsSection />
        <Services />
        <History />
        <Team />
        <Testimonials />
        <PlansSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
