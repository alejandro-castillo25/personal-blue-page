import { AppContextProvider } from "./AppContextProvider";
import { Header } from "./Header";
import { Main } from "./Main";
import "./App.css";
import Aurora from "@/components/ui/Aurora";
import MetaBalls from "@/components/ui/MetaBalls";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Main />


      <MetaBalls
        color="#263abe"
        cursorBallColor="#1a94db"
        cursorBallSize={1.2}
        ballCount={12}
        animationSize={25}
        enableMouseInteraction={false}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1.85}
        speed={0.15}
        className="fixed top-0 z-[-1] h-full w-full bg-transparent"
      />
      <Aurora
        colorStops={["#1a4bdb", "#3e38e9", "#263abe"]}
        blend={0.1}
        amplitude={1.0}
        speed={0.3}
        className="w-full h-full fixed top-0 z-[-1] bg-transparent opacity-50"
      />
    </AppContextProvider>
  );
}

export default App;
