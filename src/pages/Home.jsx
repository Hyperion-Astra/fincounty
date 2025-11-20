import Hero from "../components/Hero";
import FeatureBoxes from "../components/FeatureBoxes";
import MortgagePromo from "../components/MortgagePromo";
import BankingTools from "../components/BankingTools";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <MortgagePromo />
      <FeatureBoxes />
      <BankingTools />
      <Testimonials />
      {/* other sections will follow */}
    </>
  );
}
