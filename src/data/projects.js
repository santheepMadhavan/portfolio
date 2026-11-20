export const projects = [
  {
    slug: 'learning-experience-platform',
    title: 'Learning Experience Platform',
    org: 'Hitachi Digital',
    kind: 'metrics',
    summary:
      "An AI-first LXP designed and built from concept to production for 30,000+ employees. Winner of a Brandon Hall Award for excellence in learning technology.",
    tags: ['Product design', 'React', 'Tailwind design system', 'RAG & LangChain'],
    metrics: [
      { value: '30,000+', label: 'employees on the platform' },
      { value: '8', label: 'engineers led' },
      { value: '$1.3M', label: 'saved per year by replacing vendors' },
      { value: '30+', label: 'reusable design-system components' },
    ],
    note: 'Learner and admin experiences, content, training, assessment and interview workflows.',
  },
  {
    slug: 'ai-pdf-learning-assistant',
    title: 'AI PDF Learning Assistant',
    org: 'Personal project',
    kind: 'chat',
    summary:
      "Upload a PDF and ask questions that are answered from the document's own content, using retrieval-augmented generation. A FastAPI backend with a swappable LLM provider sits behind a React chat interface.",
    tags: ['React (Vite)', 'Python', 'FastAPI', 'LangChain', 'RAG'],
  },
  {
    slug: 'disney-hotstar-playlist',
    title: 'Disney+ Hotstar Playlist',
    org: 'UX case study',
    kind: 'video',
    summary:
      'A playlist feature that lets elderly viewers watch their daily serials back to back, the way TV channels air them, instead of navigating home between every episode.',
    tags: ['UX case study', 'UX/UI design', 'Accessibility'],
    caseStudy: true,
  },
  {
    slug: 'interview-copilot',
    title: 'Interview Copilot',
    org: 'Hitachi Digital',
    kind: 'copilot',
    summary:
      'An AI tool that helps interviewers and talent acquisition teams run precise technical interviews, and evaluate candidates accurately and efficiently.',
    tags: ['Problem solving', 'Product design', 'Frontend development'],
  },
]

export const hotstarCase = {
  title: 'Disney+ Hotstar Playlist',
  heading: 'Simplifying Disney+ Hotstar for elderly users with a playlist feature',
  intro:
    'This case study explores how a simple playlist feature can make Disney+ Hotstar more accessible and user-friendly for elderly viewers, improving their overall streaming experience.',
  sections: [
    {
      name: 'Objective',
      body: [
        'Enhance the experience of elderly viewers moving from traditional TV channels to OTT platforms, by introducing a "Playlist" feature that simplifies their daily viewing of serials.',
      ],
    },
    {
      name: 'Problem statement',
      body: [
        'Many elderly users are used to watching 8–10 serials a day, aired one after another on TV channels. On Disney+ Hotstar they can reach the same serials, but after every episode they have to go back to the homepage, search for the next serial and select "Watch today\'s episode".',
        'That manual loop is tedious, especially for people who find digital platforms hard to navigate.',
      ],
    },
    {
      name: 'Proposed solution',
      body: [
        'The "Playlist" feature lets users create a sequence of their favourite serials. Instead of switching between serials by hand, the playlist plays the next available episode from the selected shows, mimicking how TV channels broadcast serials one after another.',
      ],
      lists: [
        {
          title: 'Key benefits',
          items: [
            ['Ease of use', 'Reduces repetitive navigation.'],
            ['Time saving', 'Plays serials continuously, without interruption.'],
            ['Familiar comfort', 'Gives people used to TV channels a smoother move to OTT.'],
          ],
        },
        {
          title: 'Target audience',
          items: [
            ['Primary', 'Elderly users moving from traditional TV channels to Disney+ Hotstar.'],
            ['Secondary', 'Anyone who prefers uninterrupted, sequential viewing of serials.'],
          ],
        },
      ],
    },
    {
      name: 'Feature overview',
      groups: [
        {
          title: 'Create a playlist',
          items: [
            'Select multiple serials and add them to a playlist.',
            'Customise the serial order and priority.',
          ],
        },
        {
          title: 'Auto-play in sequence',
          items: [
            'Once the playlist starts, episodes from different serials play one after another.',
            "The next available episode of each serial plays in the order the user set.",
          ],
        },
        {
          title: 'Playlist management',
          items: [
            'Edit, delete or reorder the playlist.',
            'Turn automatic episode skipping on or off for missed episodes.',
          ],
        },
      ],
    },
    {
      name: 'Prototype design',
      body: [
        "To bring the idea to life, I recreated the entire Disney+ Hotstar UI and designed a prototype of the Playlist feature. Every component was built from scratch, closely following Hotstar's design patterns so it stays consistent with their brand.",
      ],
    },
    {
      name: 'Outcome',
      body: [
        'The Playlist feature closes a real gap for elderly users moving from TV to OTT. By removing manual navigation and mimicking sequential TV viewing, it gives them a familiar experience that should improve satisfaction and engagement.',
      ],
    },
  ],
}
