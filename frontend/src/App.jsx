import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="bg-background text-primary min-h-screen font-sans">
      <Navbar />
      <div>
        <Home />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}


export default App;
