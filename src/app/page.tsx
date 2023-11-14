import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import './globals.css';
import MainHero from './components/hero/MainHero';
import MainHeroImage from './components/hero/MainHeroImage';
import FAQ from './components/faq/FAQ';
import About from './components/about/About';
import Tutorial from './components/tutoriial/Tutorial';
import Featured from './components/featured/Featured';

export default function Home() {
  return (
    <>
      <div className={`max-w-screen-xl mx-auto bg-white grid gap-y-16`}>
        <div className={`relative bg-white`}>
          <div className="max-w-7xl mx-auto">
            <div className={`relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32`}>
              <Header/>
              <MainHero/>
            </div>
          </div>
          <MainHeroImage />
        </div>
        <About />
        <Tutorial />
        <Featured />
        <FAQ />
        <Footer />
      </div>
    </>
  );
}
