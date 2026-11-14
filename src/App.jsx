import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import RouteHead from './components/seo/RouteHead.jsx';
import ScrollManager from './components/navigation/ScrollManager.jsx';
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import HowWeWork from './pages/HowWeWork.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-[#FFF2DF] text-[#3E2522] font-sans selection:bg-[#D3A376] selection:text-[#3E2522] flex flex-col">
      <RouteHead />
      <ScrollManager />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Header key={pathname} />
      <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
