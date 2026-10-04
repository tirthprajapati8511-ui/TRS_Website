import { useEffect } from "react";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import FeatureStrip from "./sections/FeatureStrip";
import HomeUpdates from "./sections/HomeUpdates";
import Projects from "./sections/Projects";
import Achievements from "./sections/Achievements";
import NotFound from "./pages/NotFound";
import Explore from "./pages/Explore";
import Contact from "./pages/Contact";
import WorkshopsList from "./pages/WorkshopsList";
import Join from "./pages/Join";
import Committee from "./pages/Committee";
import Faculty from "./pages/Faculty";
import AchievementsPage from "./pages/Achievements";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import ProjectsList from "./pages/ProjectsList";
import ProjectDetail from "./pages/ProjectDetail";
import AdminPage from "./admin/AdminPage";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import InstagramFeed from "./sections/InstagramFeed";
import HeroStats from "./sections/HeroStats";
import { useContent } from "./lib/ContentContext";
import { getPageMeta } from "./lib/pageMeta";

// Shared chrome for every public page — only the admin panel opts out.
function SiteLayout() {
  const { pathname } = useLocation();

  const content = useContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.title = getPageMeta(pathname, content).title;
  }, [pathname, content]);

  return (
    <div className="bg-bg text-ink min-h-screen flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <motion.main
        id="main"
        tabIndex={-1}
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </motion.main>
      <Footer />
      <BackToTop />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <HeroStats />
      <FeatureStrip />
      <HomeUpdates />
      <Projects />
      <Achievements />
      <InstagramFeed />
    </>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/workshops" element={<WorkshopsList />} />
        <Route path="/join" element={<Join />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
    </MotionConfig>
  );
}

export default App;
