export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 'ai-image',
    title: "AI Image Generator",
    description:
      "A full-stack application that uses DALL-E API to generate unique images based on user prompts with community showcase.",
    longDescription:
      "This AI-powered image generation platform leverages OpenAI's DALL-E API to create unique artwork from text descriptions. Users can generate, save, and share their creations through a community showcase. Features a responsive gallery, user profiles with generation history, and an intuitive prompt engineering interface with style presets.",
    image: "https://picsum.photos/seed/ai-image/800/600",
    tags: ["React", "Node.js", "OpenAI", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    id: 'crypto',
    title: "Crypto Dashboard",
    description:
      "Real-time cryptocurrency tracking dashboard with live price updates, historical charts, and portfolio tools.",
    longDescription:
      "A comprehensive cryptocurrency analytics dashboard providing real-time market data, historical price charts, and portfolio tracking. Built with Next.js for optimal performance, it integrates with multiple exchange APIs for accurate data. Features include customizable watchlists, price alerts, and detailed coin analysis.",
    image: "https://picsum.photos/seed/crypto/800/600",
    tags: ["Next.js", "Tailwind", "Chart.js", "CoinGecko API"],
    github: "#",
    demo: "#",
  },
  {
    id: 'portfolio-3d',
    title: "3D Portfolio",
    description:
      "An interactive 3D portfolio website built with React Three Fiber and advanced web animations.",
    longDescription:
      "An immersive portfolio experience showcasing the fusion of 3D graphics with modern web development. Features scroll-driven Three.js animations, physics-based interactions, and smooth page transitions. Achieves 60fps performance through optimized rendering and efficient state management.",
    image: "https://picsum.photos/seed/portfolio3d/800/600",
    tags: ["React", "Three.js", "R3F", "Motion"],
    github: "#",
    demo: "#",
  },
  {
    id: 'ecommerce',
    title: "E-Commerce Platform",
    description:
      "Full-featured e-commerce with real-time inventory, payments, and an admin dashboard.",
    longDescription:
      "A scalable e-commerce solution featuring a dynamic product catalog with advanced filtering, real-time inventory management, Stripe payment integration, order tracking, and a comprehensive admin dashboard. Supports multiple vendors and includes an AI-powered recommendation engine.",
    image: "https://picsum.photos/seed/ecommerce/800/600",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    github: "#",
    demo: "#",
  },
  {
    id: 'task-manager',
    title: "Task Manager Pro",
    description:
      "Kanban-style task management with real-time collaboration and AI-powered insights.",
    longDescription:
      "A powerful project management tool combining kanban boards with real-time collaboration, automated workflows, and AI-powered task prioritization. Team members collaborate with live cursors, shared boards, and instant notifications. Includes time tracking, sprint planning, and analytics.",
    image: "https://picsum.photos/seed/taskman/800/600",
    tags: ["React", "Socket.io", "Express", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    id: 'social-app',
    title: "Social Connect",
    description:
      "Social media platform with stories, real-time messaging, and content discovery.",
    longDescription:
      "A modern social networking platform designed for meaningful connections. Features ephemeral stories, real-time messaging with end-to-end encryption, ML-powered content discovery, and interactive community spaces. Built with React Native for cross-platform mobile support.",
    image: "https://picsum.photos/seed/socialapp/800/600",
    tags: ["React Native", "Firebase", "GraphQL", "ML Kit"],
    github: "#",
    demo: "#",
  },
  {
    id: 'analytics',
    title: "DataViz Analytics",
    description:
      "Business intelligence dashboard with interactive charts and predictive analytics.",
    longDescription:
      "An enterprise-grade analytics platform transforming raw data into actionable insights. Features D3.js visualizations, custom dashboard builder, automated report generation, and TensorFlow-powered predictive analytics. Supports multiple data sources with real-time streaming.",
    image: "https://picsum.photos/seed/dataviz/800/600",
    tags: ["D3.js", "Python", "FastAPI", "TensorFlow"],
    github: "#",
    demo: "#",
  },
  {
    id: 'weather-app',
    title: "Weather Forecast",
    description:
      "Beautiful weather application with location-based forecasts and animated visualizations.",
    longDescription:
      "A visually stunning weather application combining accurate meteorological data with beautiful animations. Features multi-day forecasts, interactive weather maps, severe weather alerts, and air quality monitoring. Uses location services for automatic updates with detailed hourly and weekly forecasts.",
    image: "https://picsum.photos/seed/weatherapp/800/600",
    tags: ["React", "OpenWeather API", "Mapbox", "PWA"],
    github: "#",
    demo: "#",
  },
];
