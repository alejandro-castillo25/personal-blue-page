import { AppContextProvider } from "./AppContextProvider";
import { Header } from "./Header";
import { Main } from "./Main";
import "./App.css";
import Orb from "@/components/ui/Orb";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <AppContextProvider>
      <Header />
      <Main />

      <Orb
        hoverIntensity={0.35}
        rotateOnHover={true}
        forceHoverState
        hue={45}
        className="fixed top-0 opacity-40 pointer-events-none -z-10"
      />

      <Toaster position="bottom-right" duration={4000}/>
      
    </AppContextProvider>
  );
}

export default App;
