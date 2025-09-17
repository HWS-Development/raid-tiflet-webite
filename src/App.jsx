import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ScrollToTop from "./components/ui/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Services from "./pages/Services";
import Activities from "./pages/Activity";
import Dining from "./pages/Dining";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RoomShow from "./pages/RoomShow";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/services" element={<Services />} /> 
          <Route path="/activities" element={<Activities />} /> 
          <Route path="/dining" element={<Dining />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms/:id" element={<RoomShow />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
