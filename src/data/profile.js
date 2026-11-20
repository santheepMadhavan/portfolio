const CAREER_START = new Date(2019, 4, 1) // May 2019, first role at Infosys

export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 3600 * 1000),
)

export const profile = {
  name: 'Santheep Madhavan',
  firstName: 'Santheep',
  role: 'Senior Frontend Engineer & UX Designer',
  location: 'Chennai, India',
  headline: ['I design it,', 'then I build it,', 'with AI', 'in the loop.'],
  intro: `Design-led frontend engineer with ${yearsOfExperience}+ years of building production web apps, now focused on AI-native products. I shape the problem in Figma first, then ship it in React and TypeScript.`,
  summary: [
    `I lead an 8-engineer team at Hitachi Digital that took an AI-first Learning Experience Platform from concept to production for 30,000+ employees. It won a Brandon Hall Award.`,
    `Every solution starts with design: design thinking, wireframes and prototypes come before code. Then I bring a product mindset to scope, prioritise and own features end to end.`,
    `I work hands-on with RAG, LangChain, agents, MCP and Python/FastAPI, and I'm client-facing by default: I gather requirements from executives, present designs and stay with a feature until it's in production.`,
  ],
  email: 'adamsantheep18@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/santheep18',
    github: 'https://github.com/santheepMadhavan',
    resume: 'https://canva.link/x92q9zxls4m31od',
  },
}
