// Default / fallback content for every editable section of the homepage.
// This is what ships if the local content API is unreachable (e.g. a static
// production build with no server behind it). The live, editable copy lives
// in content.json once the admin panel has saved something.
//
// Nothing factual here is real TRS data — replace with confirmed information
// as it becomes available. Anything with the word "Placeholder" in it is a
// deliberate stand-in, not a claim.
//
// EVENT DATA MODEL — see `events.items[].teams` below. One shape covers both
// organisational patterns TRS competitions actually use:
//   - "multi-team"  (e.g. RoboFest): several independent teams, each with
//     its own category / leader / faculty advisor.
//   - "single-team" (e.g. Robocon, SAUVC): one team whose members hold
//     different internal leadership roles.
// Both are just entries in the same `teams` array — a team either has a
// flat `category`/`leader`, or an internal `roles` list. No competition gets
// its own hard-coded template.

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore TRS", href: "/explore" },
  { label: "Committee", href: "/committee" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
];

export const JOIN_LINK = { label: "Join TRS", href: "/join" };

export const FEATURES = [
  { icon: "users", title: "Student Driven", desc: "By students, for students" },
  { icon: "tool", title: "Hands-on Learning", desc: "From concepts to real systems" },
  { icon: "trophy", title: "Competitions", desc: "National & international exposure" },
  { icon: "lightbulb", title: "Innovation", desc: "Ideas that create real impact" },
  { icon: "network", title: "Community", desc: "A place to learn, build and grow" },
];

export const DEFAULT_CONTENT = {
  hero: {
    eyebrow: "Robotics · Innovation · Community",
    headline: "Students. Robots.",
    headlineAccent: "Real Impact.",
    quote: "Robotics is 90% thinking, 10% building.",
    description:
      "TRS BVM Student Chapter is a community of passionate students working on robotics and automation to solve real-world challenges.",
    ctaPrimaryLabel: "Explore TRS",
    ctaPrimaryHref: "/explore",
    ctaSecondaryLabel: "Join TRS",
    ctaSecondaryHref: "/join",
    locationLine1: "BVM Engineering College",
    locationLine2: "Vallabh Vidyanagar, Gujarat",
    // Drop a file at public/brand/hero-campus.jpg and it appears automatically
    // — until then the section falls back to a plain navy panel. Plain
    // root-relative path: Hero.jsx resolves it against BASE_URL via
    // assetUrl(), same as every other content-driven image path.
    image: "/brand/hero-campus.jpg",
    imageAlt: "BVM Engineering College campus",
  },

  events: {
    items: [
      {
        id: "robofest-6",
        name: "ROBOFEST 6.0",
        dateLabel: "15 – 18 Feb 2026",
        status: "Registration Open",
        statusTone: "accent",
        location: "BVM Engineering College",
        description: "Annual robotics competition featuring multiple categories and teams.",
        image: null,
        href: "/events/robofest-6",
        structure: "multi-team",
        teams: [
          { name: "Team A", category: "Placeholder category", leader: "Placeholder", facultyAdvisor: "Placeholder" },
          { name: "Team B", category: "Placeholder category", leader: "Placeholder", facultyAdvisor: "Placeholder" },
        ],
      },
      {
        id: "sauvc-2026",
        name: "SAUVC 2026",
        dateLabel: "Jan – Mar 2026",
        status: "Applications Open",
        statusTone: "good",
        location: "To Be Announced",
        description: "Student Autonomous Underwater Vehicle Competition.",
        image: null,
        href: "/events/sauvc-2026",
        structure: "single-team",
        teams: [
          {
            name: "TRS SAUVC Team",
            roles: [
              { title: "Team Lead", person: "Placeholder" },
              { title: "Electronics Lead", person: "Placeholder" },
              { title: "Mechanical Lead", person: "Placeholder" },
            ],
            facultyAdvisor: "Placeholder",
          },
        ],
      },
      {
        id: "robocon-2026",
        name: "ROBOCON 2026",
        dateLabel: "Apr 2026",
        status: "Coming Soon",
        statusTone: "neutral",
        location: "ABU Robocon",
        description: "Asia-Pacific Broadcasting Union Robocon Competition.",
        image: null,
        href: "/events/robocon-2026",
        structure: "single-team",
        teams: [
          {
            name: "TRS Robocon Team",
            roles: [
              { title: "Overall Team Lead", person: "Placeholder" },
              { title: "Software Lead", person: "Placeholder" },
              { title: "Mechanical Lead", person: "Placeholder" },
              { title: "Electronics Lead", person: "Placeholder" },
            ],
            facultyAdvisor: "Placeholder",
          },
        ],
      },
    ],
  },

  projects: {
    eyebrowTitle: "Our Projects",
    heading: "Selected work from our technical divisions.",
    items: [
      {
        id: "autonomous-rover",
        name: "Autonomous Rover",
        description: "A versatile rover platform for autonomous navigation and mapping.",
        domains: ["Navigation", "Perception", "Control"],
        image: null,
        href: "/projects/autonomous-rover",
      },
      {
        id: "underwater-rov",
        name: "Underwater ROV",
        description: "An underwater robotic vehicle for exploration and research.",
        domains: ["Embedded", "Control", "Computer Vision"],
        image: null,
        href: "/projects/underwater-rov",
      },
      {
        id: "quadruped-robot",
        name: "Quadruped Robot",
        description: "A four-legged robot platform for research in locomotion and stability.",
        domains: ["Mechanics", "Control", "AI"],
        image: null,
        href: "/projects/quadruped-robot",
      },
    ],
    ctaPanel: {
      heading: "Not just building robots, but better engineers.",
      description:
        "Join a community that challenges you, supports you, and helps you turn ideas into impact.",
      buttonLabel: "Join TRS",
      buttonHref: "/join",
    },
  },

  achievements: {
    eyebrowTitle: "Achievements",
    description:
      "TRS represents BVM Engineering College at national and regional robotics competitions. The full archive, organised by academic year, lives on the Achievements page.",
    recent: [
      { year: "PLACEHOLDER", title: "ABU Robocon", detail: "National / zonal round participation — result to be added." },
      { year: "PLACEHOLDER", title: "RoboFest", detail: "Inter-college robotics event — result to be added." },
      { year: "PLACEHOLDER", title: "Technical Exhibition", detail: "Project showcase and recognition — detail to be added." },
    ],
    // Full archive on the dedicated page will be organised like this —
    // distinct from `events`, which tracks upcoming competitions, not results.
    archiveYears: ["2026–27", "2025–26", "2024–25", "2023–24"],
  },

  workshops: {
    eyebrowTitle: "Workshops",
    items: [
      {
        id: "ros-fundamentals",
        title: "ROS Fundamentals",
        dateLabel: "To Be Announced",
        status: "Coming Soon",
        description: "An introductory, hands-on session on the Robot Operating System.",
        // Registration will point straight at the relevant Google Form once set.
        formHref: null,
      },
    ],
  },

  committee: {
    intro:
      "The students who run TRS BVM day to day — organising events, leading projects, and keeping the society running.",
    // Empty by default rather than placeholder names — a committee list is
    // specific enough that a fake one would read as a real claim. Add real
    // members through the admin panel.
    members: [],
  },

  join: {
    heading: "Joining TRS is on paper, on purpose.",
    description:
      "Membership isn't an online form — it's an official enrollment form you download, fill in, and submit in person. That's how we keep it a real commitment.",
    steps: [
      "Download the official enrollment form (PDF).",
      "Fill it in and get it signed where required.",
      "Submit it physically to the faculty enrollment contact.",
    ],
    formHref: null,
    facultyContact: {
      name: "Placeholder — Faculty Coordinator",
      role: "Faculty Enrollment Contact",
      email: "placeholder@bvmengineering.ac.in",
      photo: null,
    },
  },

  footer: {
    description:
      "TRS BVM Student Chapter is a student-driven robotics and engineering society at BVM Engineering College, designing, building and competing with robots.",
    addressLines: ["BVM Engineering College", "Vallabh Vidyanagar, Anand, Gujarat 388120"],
    email: "trs@bvm.ac.in",
    phone: "+91 2692 230104 (College)",
    socials: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "X", href: "#" },
    ],
    parentOrg: {
      name: "The Robotics Society",
      note: "An authorized student chapter of",
    },
  },
};
