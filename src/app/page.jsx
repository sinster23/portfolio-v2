import AboutSection from "@/components/AboutSection";
import BannerSection from "@/components/BannerSection";
import HeroSection from "@/components/HeroSection";
import FlexBoxSectionSection from "@/components/FlexBoxSection";
import SkillsSection from "@/components/TechstackSection";
import ExperienceSection from "@/components/ExperienceSection";
import SelectedWorksSection from "@/components/WroksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/FooterSection";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BannerSection />
      <AboutSection />
      <FlexBoxSectionSection />
      <ExperienceSection />
      <SkillsSection />
      <SelectedWorksSection />
      <ContactSection />
      <Footer />
    </main>
  );
}