import type {
  Project,
  Skill,
  Testimonial,
  Stat,
  Service,
  Product,
  Video,
  TimelineItem,
  FaqItem,
} from "@/types";

export const featuredProjects: Project[] = [
  {
    slug: "northwind-finance",
    title: "Northwind Finance",
    category: "SaaS Dashboard",
    year: "2026",
    description:
      "A real-time analytics dashboard for a fintech startup, rebuilt from a legacy jQuery app into a fast, accessible Next.js product.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
    ],
    problem:
      "Northwind's legacy dashboard was built on jQuery and server-rendered PHP views. Every new chart took a sprint to ship, and load times regularly exceeded 6 seconds on their busiest page.",
    solution:
      "I rebuilt the product on Next.js with a typed data layer, replaced ad-hoc chart scripts with a single Recharts-based component library, and moved heavy calculations server-side.",
    process: [
      "Audited the existing app and interviewed 6 traders to map real workflows",
      "Designed a component library in Figma, validated with the design lead",
      "Built the app incrementally behind a feature flag, page by page",
      "Ran a two-week beta with the trading desk before full rollout",
    ],
    features: [
      "Real-time portfolio view with sub-second updates",
      "Custom chart library shared across 14 dashboard views",
      "Role-based access control for traders, analysts, and admins",
      "CSV and PDF export on every table",
    ],
    performance: [
      { label: "Load time (before to after)", value: "6.1s to 0.9s" },
      { label: "Lighthouse Performance", value: "98" },
      { label: "Bundle size reduction", value: "-62%" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    client: "Northwind Finance",
    role: "Lead Frontend Engineer & Designer",
    duration: "14 weeks",
  },
  {
    slug: "arclight-studio",
    title: "Arclight Studio",
    category: "Agency Website",
    year: "2025",
    description:
      "A motion-forward marketing site for a boutique architecture firm, with scroll-driven storytelling and a custom CMS.",
    tech: ["Next.js", "GSAP", "Sanity"],
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=1400&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=80",
    ],
    problem:
      "Arclight's portfolio lived in a static PDF emailed to prospective clients. There was no way to browse past work by typology, and updating it meant re-designing the whole document.",
    solution:
      "I built a scroll-driven site on Next.js with a Sanity-powered CMS so the studio's own team can publish new projects without touching code, paired with GSAP scroll sequences for each project case study.",
    process: [
      "Mapped every existing project into a structured content model",
      "Prototyped the scroll sequence in CodePen before building it in GSAP",
      "Trained the studio's office manager to publish new case studies",
      "Launched alongside a new brand identity from their design partner",
    ],
    features: [
      "Custom CMS with drag-and-drop project ordering",
      "Scroll-triggered image sequences per case study",
      "Filterable project index by typology and location",
      "Fully editable without a developer",
    ],
    performance: [
      { label: "Time to publish a new project", value: "3 days to 20 min" },
      { label: "Lighthouse Performance", value: "96" },
      { label: "Avg. session duration", value: "+140%" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    client: "Arclight Studio",
    role: "Frontend Developer",
    duration: "9 weeks",
  },
  {
    slug: "loop-commerce",
    title: "Loop Commerce",
    category: "E-Commerce",
    year: "2025",
    description:
      "A headless storefront for a sustainable fashion brand, optimized to a 98+ Lighthouse score across every page.",
    tech: ["Next.js", "Shopify", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=80",
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80",
    ],
    problem:
      "Loop's Shopify theme was slow, generic, and didn't reflect the brand's sustainability story. Mobile conversion lagged 40% behind desktop.",
    solution:
      "I went headless: Next.js on the frontend, Shopify as the commerce backend via Storefront API, with every product image served through next/image and checkout kept on Shopify's PCI-compliant flow.",
    process: [
      "Benchmarked the existing theme's Core Web Vitals as a baseline",
      "Rebuilt the PDP and collection pages first, the highest-traffic pages",
      "A/B tested the new mobile checkout entry point",
      "Migrated the remaining pages over three release windows",
    ],
    features: [
      "Headless storefront on Shopify Storefront API",
      "Sub-1s largest contentful paint on product pages",
      "Size and fit guide embedded per product",
      "Wishlist synced across devices",
    ],
    performance: [
      { label: "Mobile Lighthouse Performance", value: "98" },
      { label: "Mobile conversion rate", value: "+35%" },
      { label: "LCP (product pages)", value: "0.8s" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    client: "Loop Commerce",
    role: "Frontend Developer",
    duration: "11 weeks",
  },
  {
    slug: "pathfinder-health",
    title: "Pathfinder Health",
    category: "Web App",
    year: "2024",
    description:
      "A patient scheduling platform designed for clarity under stress, WCAG AA compliant with a focus on plain language.",
    tech: ["React", "TypeScript", "Zod"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=80",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1400&q=80",
    ],
    problem:
      "Patients scheduling appointments through Pathfinder's old portal abandoned the flow 47% of the time, often citing confusing medical terminology and poor mobile support.",
    solution:
      "I redesigned the scheduling flow around plain-language prompts, added inline validation with Zod, and rebuilt the whole app to meet WCAG AA, tested with a screen-reader user panel.",
    process: [
      "Ran a content audit and rewrote every form label in plain language",
      "Prototyped with three assistive-technology users before building",
      "Built the form flow with React Hook Form and Zod schema validation",
      "Ran an external WCAG AA audit before launch",
    ],
    features: [
      "Plain-language scheduling flow with inline validation",
      "Full keyboard navigation and screen reader support",
      "SMS and email reminders with one-tap reschedule",
      "Works fully on 3G connections in rural coverage areas",
    ],
    performance: [
      { label: "Booking abandonment", value: "47% to 12%" },
      { label: "Accessibility score", value: "100" },
      { label: "Support tickets (scheduling)", value: "-58%" },
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    client: "Pathfinder Health",
    role: "Frontend Engineer",
    duration: "16 weeks",
  },
];

export const stats: Stat[] = [
  { value: "60+", label: "Projects delivered" },
  { value: "38", label: "Clients worldwide" },
  { value: "6", label: "Years in practice" },
  { value: "99", label: "Avg. Lighthouse score" },
];

export const skills: Skill[] = [
  { name: "React / Next.js", level: 96 },
  { name: "TypeScript", level: 92 },
  { name: "Tailwind CSS", level: 95 },
  { name: "Motion & Interaction Design", level: 88 },
  { name: "Accessibility (WCAG)", level: 85 },
  { name: "Performance Engineering", level: 90 },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "Node.js",
  "Figma",
];

export const services: Service[] = [
  {
    title: "Web Design",
    description:
      "Visual identity and interface design that gives your product a point of view, not just a template.",
    icon: "PenTool",
    deliverables: ["Design system", "High-fidelity Figma files", "Responsive layouts", "Design handoff docs"],
    startingPrice: "$2,400",
  },
  {
    title: "Frontend Development",
    description:
      "Production-grade builds in React and Next.js, fast, typed, accessible, and easy to maintain.",
    icon: "Code2",
    deliverables: ["Typed component library", "CI-ready repo", "Deployment setup", "Documentation"],
    startingPrice: "$4,800",
  },
  {
    title: "Landing Pages",
    description:
      "High-conversion pages built for launches, campaigns, and fundraising, live in days, not months.",
    icon: "Rocket",
    deliverables: ["Copywriting pass", "A/B-ready variants", "Analytics setup", "1-week turnaround"],
    startingPrice: "$1,200",
  },
  {
    title: "Portfolio Websites",
    description:
      "A site that makes the work the main character, built for designers, photographers, and studios.",
    icon: "Image",
    deliverables: ["Case study templates", "CMS for new work", "Custom domain setup"],
    startingPrice: "$1,800",
  },
  {
    title: "Business Websites",
    description:
      "Marketing sites that convert visitors into leads, with a CMS your team can actually use.",
    icon: "Building2",
    deliverables: ["Up to 8 pages", "CMS integration", "SEO foundation", "Contact form + CRM hookup"],
    startingPrice: "$3,200",
  },
  {
    title: "Admin Dashboards",
    description:
      "Internal tools and dashboards designed for the people who'll use them 40 hours a week.",
    icon: "LayoutDashboard",
    deliverables: ["Data visualization", "Role-based access", "Bulk actions & filters", "Export tooling"],
    startingPrice: "$5,600",
  },
  {
    title: "Performance Optimization",
    description:
      "Turning slow, bloated sites into fast ones. Real Core Web Vitals improvements, not just Lighthouse theatre.",
    icon: "Gauge",
    deliverables: ["Full performance audit", "Bundle analysis", "Image & font optimization", "Before/after report"],
    startingPrice: "$1,600",
  },
  {
    title: "Website Redesign",
    description:
      "Keep what works, fix what doesn't. A structured redesign process with minimal downtime.",
    icon: "Repeat",
    deliverables: ["Heuristic audit", "Phased rollout plan", "Redirect mapping", "Analytics continuity"],
    startingPrice: "$3,600",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Ariana Cole",
    role: "Founder",
    company: "Northwind Finance",
    quote:
      "Mehedi rebuilt our dashboard from scratch and it felt like a completely different company shipped it. Faster, cleaner, and our support tickets about the UI dropped to zero.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
  {
    name: "Jonas Weber",
    role: "Creative Director",
    company: "Arclight Studio",
    quote:
      "He understands motion the way a good editor understands pacing, nothing moves without a reason. Our site finally looks as considered as our buildings.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  },
  {
    name: "Priya Nathan",
    role: "Head of Product",
    company: "Loop Commerce",
    quote:
      "We handed him a messy Shopify theme and got back a storefront that outperforms competitors twice our size on page speed.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export const navLinks = [
  { label: "Work", href: "/projects" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "Videos", href: "/videos" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export const products: Product[] = [
  {
    slug: "aurora-saas-dashboard-kit",
    name: "Aurora - SaaS Dashboard Kit",
    category: "Dashboard Template",
    price: 89,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
    ],
    description:
      "A full SaaS dashboard starter built on Next.js and Tailwind: auth screens, billing, settings, charts, and 40+ components ready to wire to your API.",
    features: [
      "40+ components: tables, charts, modals, forms",
      "Dark and light themes included",
      "Auth flow screens (login, signup, reset)",
      "Fully typed with TypeScript",
      "Figma source file included",
    ],
    faqs: [
      { question: "Does this include a backend?", answer: "No, Aurora is frontend-only. It ships with mock data and typed interfaces so you can wire it to any API." },
      { question: "Can I use this for client work?", answer: "Yes, the license covers unlimited personal and client projects, not resale of the template itself." },
      { question: "Do I get free updates?", answer: "Yes, all future updates to this kit are included at no extra cost." },
    ],
    rating: 4.9,
    reviewCount: 128,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    slug: "north-landing-page-pro",
    name: "North - Landing Page Pro",
    category: "Landing Page",
    price: 49,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
    ],
    description:
      "A conversion-focused SaaS landing page with pricing, FAQ, and testimonial sections, animated with Framer Motion out of the box.",
    features: [
      "Hero, pricing, FAQ, testimonial sections",
      "Framer Motion scroll animations included",
      "Fully responsive down to 320px",
      "One-click deploy to Vercel",
    ],
    faqs: [
      { question: "Is this a Figma file or code?", answer: "Both, you get the coded Next.js project and the Figma source." },
      { question: "Can I change the color palette?", answer: "Yes, colors are defined as CSS variables and Tailwind tokens for quick theming." },
    ],
    rating: 4.8,
    reviewCount: 94,
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
  {
    slug: "ledger-admin-panel",
    name: "Ledger - Admin Panel",
    category: "Admin Panel",
    price: 129,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
    ],
    description:
      "A complete admin panel with CRUD tables, role-based navigation, analytics widgets, and a settings suite, the same architecture used in DBM Studio's own admin.",
    features: [
      "CRUD table components with sorting & filtering",
      "Role-based sidebar navigation",
      "Analytics widgets built on Recharts",
      "Media library and settings pages included",
    ],
    faqs: [
      { question: "Does it include authentication?", answer: "It includes auth UI screens; you connect your own auth provider (NextAuth, Clerk, etc.)." },
      { question: "Is this the same admin panel shown in your portfolio?", answer: "Yes, this is the production architecture behind the DBM Studio admin." },
    ],
    rating: 5.0,
    reviewCount: 61,
    tech: ["Next.js", "TypeScript", "Recharts"],
  },
  {
    slug: "component-library-ui-kit",
    name: "Atlas - React UI Kit",
    category: "UI Kit",
    price: 69,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1400&q=80",
    ],
    description:
      "60+ accessible React components, buttons, modals, tabs, toasts, and more, built on Radix primitives and styled with Tailwind.",
    features: [
      "60+ components, all keyboard accessible",
      "Built on Radix UI primitives",
      "Storybook documentation included",
      "Copy-paste or install as a package",
    ],
    faqs: [
      { question: "Is this compatible with shadcn/ui?", answer: "Yes, components follow the same copy-into-your-repo pattern as shadcn/ui." },
    ],
    rating: 4.7,
    reviewCount: 203,
    tech: ["React", "Radix UI", "Tailwind CSS"],
  },
];

export const videos: Video[] = [
  {
    id: "v1",
    youtubeId: "dQw4w9WgXcQ",
    title: "Building a Dashboard Layout with Next.js App Router",
    category: "Tutorial",
    duration: "18:42",
    views: "24K",
    publishedAt: "2026-06-01",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "v2",
    youtubeId: "dQw4w9WgXcQ",
    title: "Scroll-Triggered Animations with GSAP, Step by Step",
    category: "Tutorial",
    duration: "22:10",
    views: "31K",
    publishedAt: "2026-05-10",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "v3",
    youtubeId: "dQw4w9WgXcQ",
    title: "Northwind Finance: Full Design Walkthrough",
    category: "Case Study",
    duration: "14:05",
    views: "18K",
    publishedAt: "2026-04-22",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
  },
  {
    id: "v4",
    youtubeId: "dQw4w9WgXcQ",
    title: "How I Structure a Next.js Project for Scale",
    category: "Talk",
    duration: "27:33",
    views: "42K",
    publishedAt: "2026-03-15",
    thumbnail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
  },
  {
    id: "v5",
    youtubeId: "dQw4w9WgXcQ",
    title: "Accessible Forms: The Details Everyone Skips",
    category: "Tutorial",
    duration: "16:48",
    views: "12K",
    publishedAt: "2026-02-28",
    thumbnail: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80",
  },
  {
    id: "v6",
    youtubeId: "dQw4w9WgXcQ",
    title: "Freelance Pricing Q&A, Live Stream Replay",
    category: "Talk",
    duration: "51:20",
    views: "9K",
    publishedAt: "2026-02-05",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
];

export const timeline: TimelineItem[] = [
  {
    year: "2026",
    title: "Founder",
    org: "DBM Studio",
    description:
      "Went independent full-time, focused on premium frontend builds and design systems for founders and small teams.",
    type: "experience",
  },
  {
    year: "2023 - 2026",
    title: "Senior Frontend Engineer",
    org: "Alto Digital (Agency)",
    description:
      "Led frontend on 20+ client projects, from marketing sites to internal dashboards, and mentored two junior developers.",
    type: "experience",
  },
  {
    year: "2022",
    title: "AWS Certified Cloud Practitioner",
    org: "Amazon Web Services",
    description: "Certification covering core cloud infrastructure and deployment concepts.",
    type: "achievement",
  },
  {
    year: "2020 - 2023",
    title: "Frontend Developer",
    org: "Kestrel Software",
    description:
      "First full-time role, building and maintaining a B2B SaaS product's React frontend.",
    type: "experience",
  },
  {
    year: "2020",
    title: "B.Sc. in Computer Science",
    org: "University of Dhaka",
    description: "Focused coursework on human-computer interaction and web systems.",
    type: "education",
  },
];

export const aboutFaqs: FaqItem[] = [
  { question: "What tools do you use daily?", answer: "VS Code, Figma, Next.js, and a terminal I've spent way too long customizing." },
  { question: "Do you work with teams or solo founders?", answer: "Both, roughly half my projects are with in-house teams, half with solo founders." },
  { question: "What's your typical process?", answer: "Discovery call, a scoped proposal, design in Figma, then a phased build with weekly check-ins." },
];

export const contactFaqs: FaqItem[] = [
  { question: "What's your typical turnaround?", answer: "Landing pages: 1-2 weeks. Full sites: 4-10 weeks depending on scope. I'll give you a firm date in the proposal." },
  { question: "Do you offer ongoing maintenance?", answer: "Yes, monthly retainers are available for updates, monitoring, and small feature work after launch." },
  { question: "What do you need from me to start?", answer: "Brand assets if you have them, examples of sites you like, and a rough idea of your timeline and budget." },
  { question: "Do you work with international clients?", answer: "Yes, I work with clients across time zones and keep async communication tight via email and Slack." },
];
