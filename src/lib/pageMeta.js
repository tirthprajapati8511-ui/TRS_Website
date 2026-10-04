// One place that knows each page's browser-tab title and link-preview text.
// Used by the app (tab title on navigation) and by scripts/spa-routes.mjs
// (the static HTML written for every route, which is what WhatsApp,
// LinkedIn and search engines read).

export const SITE_NAME = "TRS BVM — The Robotics Society";
const SUFFIX = " — TRS BVM";

const STATIC = {
  "/": {
    title: SITE_NAME,
    description:
      "TRS BVM is the robotics club of BVM Engineering College, Vallabh Vidyanagar — competing at national and international robotics competitions.",
  },
  "/explore": {
    title: "Explore TRS",
    description: "Who we are, what we do, and our journey in robotics competitions since 2019.",
  },
  "/committee": {
    title: "Executive Committee",
    description: "The student executive committee running TRS BVM this year.",
  },
  "/faculty": {
    title: "Faculty Members",
    description: "The faculty who guide and mentor TRS BVM.",
  },
  "/events": {
    title: "Events",
    description: "Competitions and events TRS BVM is preparing for.",
  },
  "/projects": {
    title: "Projects",
    description: "Robots and systems built by the teams of TRS BVM.",
  },
  "/achievements": {
    title: "Achievements",
    description: "Results of TRS BVM at national and international robotics competitions, year by year.",
  },
  "/workshops": {
    title: "Workshops",
    description: "Hands-on sessions and webinars from TRS BVM.",
  },
  "/join": {
    title: "Join TRS",
    description: "How to become a member of TRS BVM.",
  },
  "/contact": {
    title: "Contact",
    description: "Get in touch with TRS BVM — email, phone, address and who to contact for what.",
  },
};

export function normalizePath(pathname) {
  const p = pathname.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

export function getPageMeta(pathname, content) {
  const path = normalizePath(pathname);
  if (STATIC[path]) {
    const { title, description } = STATIC[path];
    return { title: path === "/" ? title : title + SUFFIX, description, image: null };
  }
  const m = path.match(/^\/(events|projects)\/(.+)$/);
  if (m && content) {
    const list = content[m[1]]?.items ?? [];
    const item = list.find((x) => x.id === m[2]);
    if (item) {
      const name = item.name;
      return {
        title: name + SUFFIX,
        description: item.description || STATIC["/" + m[1]].description,
        image: item.image ?? null,
      };
    }
  }
  return { title: "Page not found" + SUFFIX, description: STATIC["/"].description, image: null };
}
