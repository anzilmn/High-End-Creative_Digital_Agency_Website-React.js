const User = require('./models/User');
const Blog = require('./models/Blog');
const Portfolio = require('./models/Portfolio');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const CaseStudy = require('./models/CaseStudy');

module.exports = async function seedData() {
  try {
    // Seed Admin User
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({ username: 'admin', password: 'admin', role: 'admin' });
      console.log('✅ Admin user created (username: admin, password: admin)');
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany([
        { title: 'UI/UX Design', description: 'We craft pixel-perfect interfaces that convert visitors into loyal customers through research-driven design.', icon: '🎨', features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'], order: 1 },
        { title: 'Brand Identity', description: 'From logo to brand guidelines, we build identities that resonate, differentiate, and endure.', icon: '💎', features: ['Logo Design', 'Brand Strategy', 'Style Guides', 'Brand Collateral'], order: 2 },
        { title: 'Web Development', description: 'Full-stack development with modern technologies delivering fast, scalable, and secure web applications.', icon: '⚡', features: ['React / Next.js', 'Node.js / Express', 'MongoDB / PostgreSQL', 'REST & GraphQL APIs'], order: 3 },
        { title: 'Motion Design', description: 'Breathe life into your brand with stunning animations and motion graphics that captivate audiences.', icon: '🎬', features: ['UI Animations', 'Video Production', 'After Effects', 'Lottie Animations'], order: 4 },
        { title: 'Digital Strategy', description: 'Data-driven strategies that align your digital presence with business goals for measurable growth.', icon: '📈', features: ['SEO Optimization', 'Content Strategy', 'Analytics & Reporting', 'Conversion Rate Optimization'], order: 5 },
        { title: 'Mobile Apps', description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on every device.', icon: '📱', features: ['React Native', 'iOS & Android', 'App Store Optimization', 'Performance Tuning'], order: 6 }
      ]);
      console.log('✅ Services seeded');
    }

    // Seed Portfolio
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      await Portfolio.insertMany([
        { title: 'Nebula Finance App', description: 'A revolutionary fintech application redesign that increased user engagement by 340%. Clean, data-forward interface with dark mode.', category: 'UI', tags: ['Fintech', 'Mobile', 'Dark Mode'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', featured: true },
        { title: 'Aurum Luxury Brand', description: 'Complete brand identity for a high-end jewelry house. Gold-leaf aesthetics meet modern minimalism.', category: 'Branding', tags: ['Luxury', 'Identity', 'Print'], image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=800', featured: true },
        { title: 'Vertex SaaS Platform', description: 'Enterprise-grade SaaS dashboard built with React and Node.js. Handles 50K+ daily active users.', category: 'Development', tags: ['SaaS', 'React', 'Node.js'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', featured: false },
        { title: 'Pulse Health Dashboard', description: 'Real-time health monitoring interface for a medical startup. Accessibility-first design approach.', category: 'UI', tags: ['Healthcare', 'Dashboard', 'Accessibility'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', featured: false },
        { title: 'Echo Music Platform', description: 'Full-stack music streaming platform with real-time features, recommendation engine, and social components.', category: 'Development', tags: ['Music', 'Streaming', 'Full-Stack'], image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800', featured: true },
        { title: 'Terra Eco Rebrand', description: 'Sustainability-focused brand overhaul for an eco-conscious startup. Nature-inspired visual language.', category: 'Branding', tags: ['Sustainability', 'Rebrand', 'Green'], image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800', featured: false }
      ]);
      console.log('✅ Portfolio seeded');
    }

    // Seed Blogs
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      await Blog.insertMany([
        { title: 'The Future of UI: AI-Driven Design Systems', excerpt: 'How artificial intelligence is reshaping the way we build and scale design systems for modern products.', content: 'Artificial intelligence is no longer a distant concept in the design world. Today, AI tools are actively participating in the design process—from generating color palettes to suggesting layout variations and even predicting user behavior patterns. The most forward-thinking agencies are already integrating AI into their design workflows, not as a replacement for creativity, but as a powerful amplifier of it.\n\nDesign systems are evolving from static documentation to living, breathing entities that adapt to context. AI-powered design tokens can now automatically adjust spacing, typography, and color based on accessibility scores and brand guidelines. This shift means designers can focus more on strategy and less on repetitive tasks.\n\nThe agencies that will thrive in the next decade are those that embrace this partnership between human creativity and machine intelligence. The tools are here—the question is how boldly you choose to use them.', category: 'Design', tags: ['AI', 'Design Systems', 'Future'], image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800', author: 'Anzil Creative Team', views: 1247 },
        { title: 'Why Your Brand Needs a Motion Language', excerpt: 'Static brands are losing attention. Here is why motion design is the competitive edge your identity needs.', content: 'We live in an era of infinite scroll, micro-interactions, and immersive digital experiences. In this landscape, static brand identities feel incomplete. Motion has become a fundamental component of brand language—not decoration, but communication.\n\nA motion language is a coherent set of animation principles that guide how your brand moves, transitions, and responds. Just as typography and color communicate personality, motion communicates emotion and intention. Does your brand feel nimble? Powerful? Luxurious? Your animation easing curves answer that question before a single word is read.\n\nBuilding a motion language requires the same strategic rigor as building a visual identity. Start with brand values, translate them into kinetic metaphors, then codify them into reusable animation tokens that can be applied consistently across all digital touchpoints.', category: 'Branding', tags: ['Motion', 'Brand Identity', 'Animation'], image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800', author: 'Anzil Creative Team', views: 892 },
        { title: 'Building Scalable React Architectures in 2024', excerpt: 'Lessons learned from architecting React applications that scale to millions of users without falling apart.', content: 'Scaling React applications is less about raw performance optimization and more about architectural discipline. After building products that serve millions of users, the patterns that matter most are the ones that prevent complexity from compounding.\n\nThe most impactful architectural decision you can make is how you structure your state. Colocate state as close to its consumer as possible. Use server state management (React Query, SWR) for remote data, and reserve global state only for truly global concerns like authentication and theme preferences.\n\nComponent composition over configuration is another principle that pays compounding dividends. Build small, focused components that do one thing exceptionally well. The overhead of thinking about composability early is always less than the cost of refactoring tightly coupled components later.\n\nFinally, invest in your developer experience. Fast feedback loops through testing, type safety through TypeScript, and clear conventions through documented architecture decision records—these are what allow teams to move fast without breaking things.', category: 'Development', tags: ['React', 'Architecture', 'Scalability'], image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800', author: 'Anzil Dev Team', views: 2103 }
      ]);
      console.log('✅ Blogs seeded');
    }

    // Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      await Testimonial.insertMany([
        { name: 'Alexandra Chen', role: 'CEO', company: 'Nebula Finance', content: 'Anzil transformed our product completely. The new design increased our conversion rate by 340% in the first quarter alone. They don\'t just design—they think strategically about your business outcomes.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200' },
        { name: 'Marcus Williams', role: 'Founder', company: 'Echo Music', content: 'The team\'s technical depth is extraordinary. They built our entire platform from scratch in 3 months, and the code quality is immaculate. Still running on the same architecture two years later.', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
        { name: 'Priya Sharma', role: 'CMO', company: 'Terra Eco', content: 'Our rebrand completely shifted market perception. We went from being seen as a small startup to a serious player in the sustainability space. The brand strategy work was exceptional.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
        { name: 'James O\'Brien', role: 'Product Director', company: 'Vertex Systems', content: 'Six months in, our NPS score jumped from 32 to 71. The UX overhaul touched every part of the product and the results speak for themselves. I\'d hire them again without hesitation.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' }
      ]);
      console.log('✅ Testimonials seeded');
    }

    // Seed Case Studies
    const caseCount = await CaseStudy.countDocuments();
    if (caseCount === 0) {
      await CaseStudy.insertMany([
        { title: 'Reinventing Fintech UX', client: 'Nebula Finance', industry: 'Financial Technology', challenge: 'Nebula Finance had a powerful product hidden behind an overwhelming, data-dense interface. Users were abandoning the onboarding flow at 67%, and power users reported cognitive fatigue during daily use.', solution: 'We conducted 40+ user interviews and competitive analysis across 15 fintech products. Our solution was a radical simplification—progressive disclosure of complexity, a new information hierarchy, and a full design system built on accessibility-first principles. We also introduced a contextual AI assistant to guide new users.', results: ['340% increase in conversion rate', '67% → 12% onboarding abandonment', 'NPS score improved from 28 to 74', '2.3x increase in daily active usage', 'Won Awwwards Site of the Day'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200', tags: ['UX Research', 'Product Design', 'Design System'], featured: true },
        { title: 'Building an Audience of Millions', client: 'Echo Music', industry: 'Entertainment Technology', challenge: 'Echo Music wanted to compete with established streaming giants with a creator-first approach. They needed a complete platform—from architecture to interface—built within a tight 90-day timeline and budget.', solution: 'We designed and built the entire product: a React Native mobile app, React web app, and Node.js/MongoDB backend. The key differentiator was our social listening rooms feature—shared listening spaces where creators and fans could experience music together in real time.', results: ['1.2M users in first 6 months', 'Featured in Apple App Store', '4.8 star rating across 40K reviews', 'Raised $8M Series A post-launch', 'Winner - TechCrunch Disrupt 2023'], image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200', tags: ['Full-Stack Development', 'Mobile', 'Real-Time Features'], featured: true }
      ]);
      console.log('✅ Case studies seeded');
    }

  } catch (err) {
    console.error('Seed error:', err.message);
  }
};