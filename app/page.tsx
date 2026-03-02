
import Heroe from "./componetsMain/main";
import Cards from "./componetsMain/cards";
import Laws from "./componetsMain/lawtype";
import Question from "./componetsMain/Question";
import Connect from "./componetsMain/connect";
import Footer from "./componetsMain/footer";
import Navbar from "./componetsMain/navbar";
export default function Home() {
  return (
    <div className="p-0  ">
      <header>
        <Navbar/>
      </header>
      <main className="bg-gradient-to-br from-blue-50 to-indigo-100">
        <section>
          <Heroe/>
        </section>
        <section>
          <Cards/>
          <Laws/>
          <Question/>
          <Connect/>
        </section>
      </main>
      <footer className="bg-black text-white">
        <Footer/>
      </footer>
    </div>
  );
}
