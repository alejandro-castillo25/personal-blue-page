import { AppContextProvider } from "./AppContextProvider";
import { Header } from "./Header";
import { Main } from "./Main";
import "./App.css";
import Aurora from "@/components/ui/Aurora";
import Orb from "@/components/ui/Orb";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Main />

      <Aurora
        colorStops={["#1a4bdb", "#3e38e9", "#263abe"]}
        blend={0.1}
        amplitude={1.0}
        speed={0.3}
        className="w-full h-full fixed top-0 z-[-1] bg-transparent opacity-50"
      />
      <Orb
        hoverIntensity={0.75}
        rotateOnHover={false}
        hue={45}
        className="fixed top-0 opacity-40 pointer-events-none"
      />
    </AppContextProvider>
  );
}

export default App;
