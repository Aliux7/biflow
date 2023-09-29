
import Category from "./components/category/Category";
import Featured from "./components/featured/Featured";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import './globals.css'
// import { EncryptStorage } from 'encrypt-storage';

// export const encryptStorage = new EncryptStorage('binusflower', {
//   encAlgorithm: 'Rabbit',
// });

export default function Home() {

  return (
    <>
      <Header/>
      <main>
        <Category/>
        <Featured/>
      </main>
      <Footer/>
    </>
  )
}
