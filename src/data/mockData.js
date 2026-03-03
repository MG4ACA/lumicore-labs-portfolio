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
    technologies: ['Vue 3', 'React', 'Next.js', 'Node.js', 'PostgreSQL'],
    color: '#3b82f6',
  },
  {
    id: 'saas-dev',
    icon: 'pi pi-cloud',
    title: 'SaaS Development',
    shortDesc: 'End-to-end SaaS product engineering — from MVP to enterprise-grade platforms.',
    fullDesc:
      'We build multi-tenant SaaS platforms with subscription billing, analytics dashboards, API integrations, and auto-scaling infrastructure. Ship faster, scale infinitely.',
    technologies: ['Microservices', 'AWS', 'Stripe', 'Redis', 'Docker'],
    color: '#8b5cf6',
  },
  {
    id: 'ui-ux',
    icon: 'pi pi-palette',
    title: 'UI/UX Engineering',
    shortDesc: 'Research-driven design systems that convert visitors into customers.',
    fullDesc:
      'Our design process combines user research, behavioral psychology, and modern interaction patterns to create interfaces that feel intuitive and drive measurable business outcomes.',
    technologies: ['Figma', 'Design Systems', 'A/B Testing', 'Prototyping', 'Motion Design'],
    color: '#ec4899',
  },
  {
    id: 'branding',
    icon: 'pi pi-star',
    title: 'Branding Systems',
    shortDesc: 'Strategic brand identities that position startups as market leaders.',
    fullDesc:
      'We create comprehensive brand systems — from logo and typography to voice guidelines and digital assets — that make your startup look and feel like a funded, credible company.',
    technologies: ['Brand Strategy', 'Visual Identity', 'Guidelines', 'Digital Assets', 'Motion'],
    color: '#f59e0b',
  },
];

export const caseStudies = [
  {
    id: 1,
    title: 'NexaPay',
    category: 'SaaS',
    description:
      'A fintech payment orchestration platform serving 200+ merchants across Southeast Asia.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    tags: ['Vue 3', 'Node.js', 'Stripe', 'AWS'],
    metrics: { users: '50K+', uptime: '99.9%', transactions: '$2M+' },
    color: '#3b82f6',
  },
  {
    id: 2,
    title: 'HealthSync',
    category: 'Web App',
    description: 'AI-powered patient management system for a network of 40+ clinics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
    tags: ['React', 'Python', 'TensorFlow', 'GCP'],
    metrics: { clinics: '40+', patients: '120K', accuracy: '97%' },
    color: '#10b981',
  },
  {
    id: 3,
    title: 'Brandwave',
    category: 'Branding',
    description: 'Complete brand identity and digital presence for a Series A e-commerce startup.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Brand Strategy', 'UI/UX', 'Webflow', 'Motion'],
    metrics: { conversion: '+180%', engagement: '+240%', revenue: '+$1.2M' },
    color: '#f59e0b',
  },
  {
    id: 4,
    title: 'CloudDesk',
    category: 'SaaS',
    description: 'Remote team collaboration platform with real-time document editing and video.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    tags: ['Vue 3', 'WebRTC', 'Socket.io', 'K8s'],
    metrics: { teams: '500+', messages: '1M+/day', latency: '<50ms' },
    color: '#8b5cf6',
  },
  {
    id: 5,
    title: 'EduVerse',
    category: 'Web App',
    description: 'Gamified learning management system for K-12 education with AI tutoring.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
    tags: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
    metrics: { students: '25K', completion: '89%', rating: '4.9/5' },
    color: '#ec4899',
  },
  {
    id: 6,
    title: 'LogiTrack',
    category: 'SaaS',
    description:
      'Supply chain visibility platform with real-time GPS tracking and predictive analytics.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    tags: ['React', 'Go', 'Kafka', 'TimescaleDB'],
    metrics: { shipments: '100K+', savings: '$4M', accuracy: '99.2%' },
    color: '#06b6d4',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Marcus Chen',
    role: 'CEO & Co-founder',
    company: 'NexaPay',
    avatar: 'https://i.pravatar.cc/150?img=11',
    quote:
      "Lumicore Labs didn't just build our platform — they engineered a system that scaled from 0 to 50K users without a single architecture change. Their technical depth is unmatched.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Lindström',
    role: 'VP of Product',
    company: 'HealthSync',
    avatar: 'https://i.pravatar.cc/150?img=5',
    quote:
      'Working with Lumicore felt like having a world-class engineering team embedded in our company. They understood our vision from day one and delivered beyond expectations.',
    rating: 5,
  },
  {
    id: 3,
    name: 'James Morrison',
    role: 'Founder',
    company: 'Brandwave',
    avatar: 'https://i.pravatar.cc/150?img=12',
    quote:
      'The brand identity and web presence Lumicore created directly contributed to closing our Series A. Investors kept commenting on how polished and professional everything looked.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Anika Patel',
    role: 'CTO',
    company: 'CloudDesk',
    avatar: 'https://i.pravatar.cc/150?img=9',
    quote:
      "Their code quality is exceptional. Clean architecture, comprehensive testing, and documentation that actually makes sense. We've been shipping features 3x faster since the handoff.",
    rating: 5,
  },
];

export const stats = [
  { value: 85, suffix: '+', label: 'Projects Delivered' },
  { value: 40, suffix: '+', label: 'Startup Clients' },
  { value: 99, suffix: '%', label: 'Client Retention' },
  { value: 12, suffix: '+', label: 'Countries Served' },
];

export const categories = ['All', 'SaaS', 'Web App', 'Branding'];
