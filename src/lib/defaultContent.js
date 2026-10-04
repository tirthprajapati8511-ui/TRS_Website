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
  { label: "Executive Committee", href: "/committee" },
  { label: "Faculty Members", href: "/faculty" },
  { label: "Events", href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Achievements", href: "/achievements" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
];

export const JOIN_LINK = { label: "Join TRS", href: "/join" };

export const FEATURES = [
  { icon: "users", title: "Student Driven", desc: "By students, for students" },
  { icon: "tool", title: "Learning by Competing", desc: "From concepts to the arena" },
  { icon: "trophy", title: "Competitions", desc: "National & international exposure" },
  { icon: "lightbulb", title: "Winning Record", desc: "Results at national events" },
  { icon: "network", title: "Club", desc: "A place to learn, compete and grow" },
];

export const DEFAULT_CONTENT = {
  brand: {
    // Real brand assets, never redrawn — see components/Logo.jsx. TRS's
    // mark has a transparent background so one file works in both themes;
    // BVM's college seal doesn't, so it needs a separate light/dark file
    // or it shows as a white or black box against the wrong background.
    trsLogo: "/brand/trs-logo.png",
    bvmLogoLight: "/brand/bvm-college-logo.png",
    bvmLogoDark: "/brand/bvm-college-logo-dark.png",
  },

  hero: {
    eyebrow: "Robotics · Innovation · Club",
    headline: "Students. Robots.",
    headlineAccent: "Real Impact.",
    quote: "Robotics is 90% thinking, 10% building.",
    description:
      "TRS BVM Student Chapter is a club of passionate students working on robotics and automation to solve real-world challenges.",
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
        gallery: [],
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
        gallery: [],
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
        gallery: [],
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
        gallery: [],
        video: null,
        href: "/projects/autonomous-rover",
      },
      {
        id: "underwater-rov",
        name: "Underwater ROV",
        description: "An underwater robotic vehicle for exploration and research.",
        domains: ["Embedded", "Control", "Computer Vision"],
        image: null,
        gallery: [],
        video: null,
        href: "/projects/underwater-rov",
      },
      {
        id: "quadruped-robot",
        name: "Quadruped Robot",
        description: "A four-legged robot platform for research in locomotion and stability.",
        domains: ["Mechanics", "Control", "AI"],
        image: null,
        gallery: [],
        video: null,
        href: "/projects/quadruped-robot",
      },
    ],
    ctaPanel: {
      heading: "Not just building robots, but better engineers.",
      description:
        "Join a club that challenges you, supports you, and helps you turn ideas into impact.",
      buttonLabel: "Join TRS",
      buttonHref: "/join",
    },
  },

  achievements: {
    eyebrowTitle: "Achievements",
    description:
      "TRS represents BVM Engineering College at national and regional robotics competitions. The full archive, organised by academic year, lives on the Achievements page.",
    // The homepage's compact "recent highlights" preview is derived from
    // this at render time (see sections/Achievements.jsx) — newest year
    // first, in whatever order each year's items are listed here — rather
    // than being a second, separately hand-maintained list that can drift
    // out of sync with it.
    //
    // Full archive on the dedicated page — distinct from `events`, which
    // tracks upcoming competitions, not results. Each year holds its own
    // list of achievements; empty until real ones are added per year.
    archive: [
      { year: "2026–27", items: [] },
      { year: "2025–26", items: [] },
      { year: "2024–25", items: [] },
      { year: "2023–24", items: [] },
    ],
  },

  explore: {
    "eyebrow": "Explore TRS",
    "heading": "We compete, we learn, we grow",
    "motto": "LEARN | EXPLORE | INNOVATE",
    "about": [
      {
        "text": "TRS BVM is the authorised student chapter of The Robotics Society (TRS), India, at BVM Engineering College. The Robotics Society empowers technical institutions across India to start TRS Student Chapters — a group of researchers, industrialists and students working in different domains of robotics, together making our society."
      },
      {
        "text": "Regular meetings help us connect with every member and keep everyone updated with the latest technology, because we believe that technology will not replace great teachers, but technology in the hands of great teachers is transformational."
      },
      {
        "text": "We believe that any sufficiently advanced technology is equivalent to magic. That magic shows in our projects, built with the help of faculty and M.Tech students."
      },
      {
        "text": "We are a team not because we work together, but because we respect each other and welcome every member's ideas and projects from their innovative minds."
      }
    ],
    "whatWeDo": [
      {
        "title": "Events",
        "description": "Competitions and programmes we take part in, from Robofest and Robocon to SAUVC and NIDAR.",
        "href": "/events"
      },
      {
        "title": "Workshops",
        "description": "Webinars, hands-on sessions and hackathons that keep every member up to date.",
        "href": "/workshops"
      },
      {
        "title": "Projects",
        "description": "Rovers, drones, underwater robots, quadrupeds and more, built by our teams.",
        "href": "/projects"
      },
      {
        "title": "Achievements",
        "description": "Our results year by year, from Robofest 1.0 to today.",
        "href": "/achievements"
      }
    ],
    "domains": [
      "6-wheeled all-terrain rover (NVIDIA Jetson Nano)",
      "Quadruped robot",
      "PID-controlled line follower",
      "Micro mouse robot",
      "Aerial vehicles and drones",
      "Underwater robots",
      "2D plotter"
    ],
    "facilities": [
      "Robotics lab, accessible 24×7",
      "3D printer",
      "Demonstration robots",
      "Toolkits and machines, including a CNC machine",
      "Access to the mechanical workshop"
    ],
    "stats": [
      {
        "value": "24/7",
        "label": "Robotics lab access"
      }
    ],
    "ctaHeading": "Want to build with us?",
    "ctaDescription": "Membership is open to BVM students. See how to enrol and become part of the society.",
    "ctaLabel": "Join TRS",
    "ctaHref": "/join"
  },

  contact: {
    "eyebrow": "Contact",
    "heading": "Get in touch with TRS BVM",
    "intro": "Questions about joining, events or working with us? Reach the right person below, or write to us directly.",
    "mapQuery": "BVM Engineering College, Vallabh Vidyanagar, Anand, Gujarat 388120",
    "messageLabel": "Email us",
    "messageSubject": "Enquiry from the TRS BVM website",
    "contacts": [
      {
        "topic": "Membership and joining",
        "person": "Dr. Milendrakumar Manilal Solanki",
        "role": "TRS Membership In-Charge",
        "email": "mmsolanki@bvmengineering.ac.in",
        "phone": ""
      },
      {
        "topic": "Events and competitions",
        "person": "Placeholder name",
        "role": "Faculty coordinator",
        "email": "",
        "phone": ""
      },
      {
        "topic": "Sponsorship and collaboration",
        "person": "Placeholder name",
        "role": "Faculty / executive committee contact",
        "email": "",
        "phone": ""
      },
      {
        "topic": "Website issues",
        "person": "Placeholder name",
        "role": "Web development team",
        "email": "",
        "phone": ""
      }
    ],
    "faqs": [
      {
        "q": "Who can join TRS BVM?",
        "a": "Membership is open to students of BVM Engineering College."
      },
      {
        "q": "Is membership an online form?",
        "a": "No. Membership uses an official enrollment form that you download, fill in, sign and submit in person to the faculty enrollment contact. The steps are on the Join TRS page."
      },
      {
        "q": "How do I register for an event?",
        "a": "When registration is open, the event's page has a Register button that opens its registration form."
      }
    ]
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

  // Kept independent of `committee` on purpose — faculty are advisors and
  // mentors, not part of the student executive committee, so they get their
  // own content, admin tab, and section rather than being nested under it.
  faculty: {
    intro: "The faculty members who advise and mentor TRS BVM.",
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
      phone: "",
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
