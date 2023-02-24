import Bio from "./component/bio";
import Contact from "./component/contact";
import Header from "./component/header";
import Langagues from "./component/languages";

function App() {
  return (
    <div className="h-max md:h-[100vh] flex flex-col max-w-screen-desktop mx-auto items-center justify-between">
      <Header />
      <div>
        <Bio />
        <Langagues />
      </div>
      <Contact />
    </div>
  );
}

export default App;
