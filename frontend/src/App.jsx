import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="bg-background text-primary min-h-screen font-sans">
        <Navbar />
        <Routes>
          {/* Public Portfolio Pages (Everyone can access) */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Pages (Restricted) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch-all Route for 404 */}
          <Route path="*" element={<h2 className="text-center mt-20 text-2xl">404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
