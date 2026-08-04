/**
 * Mock data for Lumicore Labs website
 * Production-ready content for all sections
 */

export const services = [
  {
    id: 'web-dev',
    icon: 'pi pi-globe',
    title: 'Web Development',
    shortDesc:
      'High-performance web applications built with modern frameworks and scalable architecture.',
    fullDesc:
      'We engineer web platforms that handle millions of users. From React & Vue SPAs to full-stack Node.js applications, our solutions are built for speed, security, and scale.',
    technologies: ['Vue 3', 'Express.js', 'PrimeVue', 'Tailwind CSS', 'MySQL'],
    color: '#3b82f6',
  },
  {
    id: 'saas-dev',
    icon: 'pi pi-cloud',
    title: 'SaaS & Automation',
    shortDesc: 'End-to-end SaaS engineering and AI-driven business workflow automation.',
    fullDesc:
      'We build multi-tenant SaaS platforms and integrate powerful AI workflows. From internal command centers to automated social media pipelines, we help businesses ship faster and scale efficiently.',
    technologies: ['n8n', 'Gemini AI', 'VPS Hosting', 'REST APIs', 'Pinia'],
    color: '#8b5cf6',
  },
  {
    id: 'seo-marketing',
    icon: 'pi pi-chart-line',
    title: 'Advanced SEO & AEO',
    shortDesc: 'Technical SEO and Answer Engine Optimization to dominate local and global search.',
    fullDesc:
      'Our search strategy combines geographical SEO (GEO) targeting specific corridors with dynamic JSON-LD schema implementation, ensuring your digital presence is authoritative and highly visible.',
    technologies: ['JSON-LD', 'AEO', 'Technical SEO', 'Directory Submissions', 'Analytics'],
    color: '#ec4899',
  },
  {
    id: 'branding',
    icon: 'pi pi-star',
    title: 'Branding Systems',
    shortDesc: 'Strategic brand identities that position businesses as market leaders.',
    fullDesc:
      'We create comprehensive brand systems — from logo concepts and typography to digital assets and marketing collateral — that make your company look credible and professional.',
    technologies: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Print Collateral', 'Marketing'],
    color: '#f59e0b',
  },
];

export const caseStudies = [
  {
    id: 1,
    title: 'Liyendra POS System',
    category: 'Web App',
    description:
      'A comprehensive Point of Sale (POS) and client management system engineered specifically for salon businesses.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['Vue 3', 'Express.js', 'MySQL', 'Tailwind CSS'],
    metrics: { uptime: '99.9%', speed: '<100ms', operations: 'Real-time' },
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'Transport Management System',
    category: 'SaaS',
    description: 'A comprehensive Transport Management System to track fleets, manage routes, and optimize logistics workflows.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    tags: ['Vue 3', 'Express.js', 'MySQL', 'Logistics'],
    metrics: { efficiency: '+40%', routing: 'Optimized', tracking: 'Real-time' },
    link: 'https://tms.lumicore-labs.com/',
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Salon POS & Management',
    category: 'Web App',
    description: 'A dedicated booking and POS platform for salons, featuring real-time appointments and employee management.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    tags: ['Vue 3', 'Express.js', 'Booking', 'POS'],
    metrics: { bookings: 'Automated', management: 'Centralized', ui: 'Modern' },
    link: 'https://salon-demo.lumicore-labs.com/',
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'AI Content Pipeline',
    category: 'SaaS',
    description: 'Automated content generation and distribution system integrating Gemini AI and n8n with social APIs.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    tags: ['Gemini API', 'n8n', 'VPS', 'Pinterest API'],
    metrics: { posts: 'Daily', channels: 'Multi-platform', latency: 'Low' },
    color: '#8b5cf6',
  },
  {
    id: 5,
    title: 'Digiwave',
    category: 'Branding',
    description: 'Digital presence and web application development for Digiwave, showcasing their digital services and portfolio.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['Web Design', 'Vue 3', 'SEO', 'Branding'],
    metrics: { traffic: 'Optimized', engagement: 'High', design: 'Responsive' },
    link: 'https://digiwave.lk/',
    color: '#ec4899',
  },
  {
    id: 6,
    title: 'Inco Tech Solutions',
    category: 'Branding',
    description:
      'Digital presence, launch strategy, and marketing collateral for a newly established local technology firm.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    tags: ['Brand Identity', 'Web Design', 'Marketing', 'Print Design'],
    metrics: { launch: 'Successful', reach: 'Local', engagement: 'Strong' },
    color: '#06b6d4',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Kavishan',
    role: 'Partner & Developer',
    company: 'Tech Collaborations',
    avatar: 'https://i.pravatar.cc/150?img=11',
    quote:
      "Working alongside this level of technical depth has completely streamlined our AI-driven projects. The architectural decisions made for our automation pipelines are unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Management',
    role: 'Operations',
    company: 'Liyendra Salon & Bridal House',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      'The custom POS system transformed how we handle daily operations. It perfectly aligns with our specific workflow needs and has made tracking our metrics effortless.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Founder',
    role: 'Director',
    company: 'Achari Tours',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      'The brand identity capturing Sri Lankan cultural heritage was executed perfectly. It immediately gave us the professional footprint we needed to attract the European market.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Director',
    role: 'Founder',
    company: 'Inco Tech Solutions',
    avatar: 'https://i.pravatar.cc/150?img=9',
    quote:
      "From the initial launch strategy to the final marketing collateral, the branding work established our credibility instantly. A highly reliable technical partner.",
    rating: 5,
  },
];

export const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Custom Solutions' },
  { value: 99, suffix: '%', label: 'Uptime' },
  { value: 24, suffix: '/7', label: 'Workflow Automation' },
];

export const categories = ['All', 'SaaS', 'Web App', 'Branding'];
