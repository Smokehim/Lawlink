import Navbar from "./componetsMain/navbar";
import Heroe from "./componetsMain/main";
import Cards from "./componetsMain/cards";
import Law from "./componetsMain/law";
import Laws from "./componetsMain/lawtype";
import Question from "./componetsMain/Question";
import Connect from "./componetsMain/connect";
import Footer from "./componetsMain/footer";
export default function Home() {
  return (
    <div className="p-0 ">
      
      <main>
        <section>
          <Heroe/>
        </section>
        <section>
          <Cards/>
          <Law/>
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
