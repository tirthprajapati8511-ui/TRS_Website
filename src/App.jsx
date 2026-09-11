import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import FeatureStrip from "./sections/FeatureStrip";
import HomeUpdates from "./sections/HomeUpdates";
import Projects from "./sections/Projects";
import Achievements from "./sections/Achievements";
import PageShell from "./pages/PageShell";
import Join from "./pages/Join";
import Committee from "./pages/Committee";
import AchievementsPage from "./pages/Achievements";
import AdminPage from "./admin/AdminPage";
import ScrollProgress from "./components/ScrollProgress";

// Shared chrome for every public page — only the admin panel opts out.
function SiteLayout() {
  return (
    <div className="bg-bg text-ink min-h-screen flex flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <HomeUpdates />
      <Projects />
      <Achievements />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<PageShell title="Explore TRS" />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/events" element={<PageShell title="Events" />} />
        <Route path="/events/:eventId" element={<PageShell title="Event Details" />} />
        <Route path="/projects" element={<PageShell title="Projects" />} />
        <Route path="/projects/:projectId" element={<PageShell title="Project Details" />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/workshops" element={<PageShell title="Workshops" />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<PageShell title="Contact" />} />
        <Route path="*" element={<PageShell title="Page not found" description="That page doesn't exist yet." />} />
      </Route>
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
