/**
 * Site content.
 *
 * Anything marked TODO(exec) is a slot the incoming executive team fills in.
 * Nothing here invents a statistic. If a number is not sourced, it is absent
 * rather than plausible.
 */

/* Exactly five bullets per unit, noun phrases, never sentences. The
   discipline is what makes a long page scan fast.

   `short` and `line` are the map: one noun and one clause, sized for a
   block on the floorplan above. `heading` and `body` are the depth. */
export const pillars = [
  {
    id: 'workshops',
    icon: 'd-workshop',
    short: 'Workshops.',
    line: 'Speaker sessions and hands-on labs, assuming no background.',
    heading: 'Workshops that start from zero.',
    body: 'Speaker sessions and hands-on labs covering the methods behind modern machine learning, taught assuming no background.',
    cta: { label: 'See the seminar series', href: '/events' },
    bullets: [
      'Model architecture walkthroughs',
      'Applied statistics and inference',
      'Data cleaning and feature design',
      'Evaluation and failure analysis',
      'Guest sessions from industry and faculty',
    ],
  },
  {
    id: 'competitions',
    icon: 'trophy',
    short: 'Competitions.',
    line: 'A hackathon, a coding challenge, and games with prizes on them.',
    heading: 'Competitions with something on the line.',
    body: 'A hackathon, coding challenges, and campus-wide games run across both terms. Teams are small, the problems are computing and mathematics, and the winners get something for it.',
    cta: { label: 'See what is running', href: '/events#competitions' },
    bullets: [
      'EmberHacks, an eight-hour hackathon',
      'Coding challenges against the clock',
      'Campus-wide puzzle hunts',
      'Teams of three or four',
      'Open to every UTM student',
    ],
  },
  {
    id: 'research',
    icon: 'beaker',
    short: 'Research.',
    line: 'Project teams taking a question through to a written result.',
    heading: 'Research that gets published.',
    body: 'Project teams take a question from proposal through to a written result, with the aim of submitting the work externally.',
    cta: { label: 'See the journal', href: '/research' },
    bullets: [
      'Faculty-supervised project teams',
      'Reproducible experiment pipelines',
      'Peer review inside the society',
      'Conference and workshop submissions',
      'An open-access undergraduate journal',
    ],
  },
];

/* Everything else: the evenings that are not a talk, a competition, or a
   paper. These are the only part of the year with no page of their own,
   which is what earns them the homepage slot. Build sessions and mentor
   pairing ran in 2025-26 and are gone rather than left standing. */
export const programs = [
  { icon: 'trophy',     title: 'Halloween Jeopardy.',   body: 'Computing, mathematics and statistics trivia, in costume, in teams, for prizes.' },
  { icon: 'd-workshop', title: '3D printing workshop.', body: 'A hands-on printing session, run during Deerhacks.' },
  { icon: 'people',     title: 'Slideshow karaoke.',    body: 'Present a deck you have never seen before, with no preparation.' },
  { icon: 'calendar',   title: 'Exam destressor.',      body: 'Games, hot chocolate, and an hour off before December.' },
];

export const news = [
  {
    title: 'The Niagara supercomputer is receiving a $52 million upgrade, with free access for students working under faculty supervision.',
    path: '/news/niagara-upgrade',
    meta: 'Compute',
    // TODO(exec): link the UofT announcement and confirm the completion window.
    href: null,
  },
  {
    title: 'AI Seminar Series 2026 opens with sessions on model behaviour, evaluation, and the state of AI in games.',
    path: '/events#seminar-series',
    meta: 'Events',
    href: '/events#seminar-series',
  },
  {
    title: 'Project Fixit reached publication, with the team presenting machine learning research at SPLICE, ACM Learning at Scale.',
    path: '/research#fixit',
    meta: 'Research',
    href: '/research#fixit',
  },
];

/* The 2026-27 program, grouped by kind rather than by date.
   Dates are internal until each event is confirmed, so nothing here
   carries one: the term tag is as specific as a public page should be
   until the exec says otherwise. Venues and sponsor names named as
   examples in the planning document are deliberately not repeated. */
export const eventGroups = [
  {
    id: 'competitions',
    kind: 'Competition',
    icon: 'trophy',
    short: 'Competitions.',
    line: 'Hackathons, coding challenges, and games with prizes on them.',
    heading: 'Competitions.',
    body: 'Small teams, computing and mathematics problems, and something on the line.',
    items: [
      {
        id: 'capture-the-flag', term: 'Fall', name: 'Campus capture the flag.',
        body: 'Teams of three or four race across campus solving computing and mathematics clues hidden at key locations.',
        note: 'Prizes for first and second place.',
      },
      {
        id: 'emberhacks', term: 'Fall', name: 'EmberHacks.',
        body: 'A hackathon run over a single day. Teams build a project in eight hours with mentorship and sponsor support, competing across several tracks.',
        note: 'Prizes across multiple tracks.',
      },
      {
        id: 'jeopardy', term: 'Fall', name: 'Halloween Jeopardy.',
        body: 'Computing, mathematics and statistics Jeopardy, with categories running from algorithms through UTM trivia to tech pop culture. Teams of three or four.',
        note: 'Costumes encouraged.',
      },
      {
        id: 'coding-challenge', term: 'Winter', name: 'Coding challenge.',
        body: 'A problem-set competition. Teams work through computing puzzles against the clock.',
        note: 'Prizes for the top teams.',
      },
    ],
  },
  {
    id: 'talks',
    kind: 'Talk',
    icon: 'd-workshop',
    short: 'Talks.',
    line: 'Professors on their research, practitioners on the job.',
    heading: 'Talks and panels.',
    body: 'The people doing the work, describing what it actually involves.',
    items: [
      {
        id: 'academia-night', term: 'Fall', name: 'Academia night.',
        body: 'A panel of UTM professors, upper-year students and recent graduates on careers in technology, data and computing.',
        note: 'Open to all students.',
      },
      {
        id: 'industry-panel', term: 'Winter', name: 'Industry speaker panel.',
        body: 'A moderated panel with AI engineers, data scientists and machine learning researchers on deploying language models in production and where the engineering is heading. Open questions and networking afterwards.',
        // TODO(exec): name the firms here once speakers are confirmed.
        note: null,
      },
      {
        id: 'beyond-campus', term: 'Winter', name: 'UTMSAM beyond campus.',
        body: 'A conference hosted inside a tech office in downtown Toronto: talks, product deep-dives from practitioners, and a networking mixer.',
        // TODO(exec): confirm the host office before publishing a venue.
        note: null,
      },
      {
        id: 'seminar-series', term: 'Winter', name: 'AI seminar series.',
        body: 'A series of talks led by different professors on current work in artificial intelligence. Each session is self-contained, so joining late costs nothing.',
        note: null,
      },
    ],
  },
  {
    id: 'workshops',
    icon: 'people',
    kind: 'Workshop',
    short: 'Workshops.',
    line: 'Hands-on sessions and the evenings that are just for fun.',
    heading: 'Workshops and socials.',
    body: 'Some of it is a skill you leave with. Some of it is an hour off.',
    items: [
      {
        id: 'printing', term: 'Winter', name: '3D printing workshop.',
        body: 'A hands-on printing session run during Deerhacks.',
        note: 'Run with Deerhacks.',
      },
      {
        id: 'karaoke', term: 'Winter', name: 'Slideshow karaoke.',
        body: 'Participants present a slideshow they have never seen before, live, with no preparation.',
        note: 'Run with MCSS.',
      },
      {
        id: 'destressor', term: 'Fall', name: 'Exam destressor.',
        body: 'Games, hot chocolate and snacks. One hour off before the December crunch.',
        note: 'Co-hosted with other student clubs.',
      },
    ],
  },
];

/* ------------------------------------------------------------------
   About. The long-form page: what the society is, how a year runs,
   who it is for, what comes out of it, and who runs it. Prose lives
   here rather than in the page so copy edits never touch markup.
   ------------------------------------------------------------------ */
export const about = {
  heading: 'Acquire order in chaos.',
  lede: 'UTMSAM is a student-run society at the University of Toronto Mississauga for people who want to apply machine learning, artificial intelligence, data science, algorithm development and mathematical modeling to real problems.',

  /* The page is a wall of tiles, so everything here is one line long.
     A tile that needs three paragraphs is the wrong tile. */
  what: { heading: 'What we are.' },

  audience: {
    heading: 'You do not need a background in any of this.',
    line: 'There is no application and no interview. Joining is a form, and after that showing up is the whole membership process.',
  },

  year: {
    heading: 'How a year runs.',
    line: 'A term opens campus-wide with a puzzle hunt and a hackathon, carries the talks through its middle, and closes with a seminar series. Winter takes the society downtown once.',
  },

  output: {
    heading: 'CODEX.',
    line: 'The Journal of Computing, Data, and Exploration: the open-access journal UTMSAM runs for undergraduate research at UTM, published on the University of Toronto Libraries platform. Its first volume came out in September 2025 carrying six articles, edited by Prof. Rutwa Engineer.',
  },

  running: {
    line: 'A recognised student society at the University of Toronto Mississauga, run by a student executive of seven with two faculty advisors: Rutwa Engineer and Joshua Jung.',
  },
};

/* ------------------------------------------------------------------
   Research. CODEX is the lead: it exists, it has published, and the
   articles are the content. Project Fixit is the prior work.
   ------------------------------------------------------------------ */
export const research = {
  heading: 'Work that gets published.',
  // Broken by hand: the banner is two lines by design, and letting the
  // measure decide gives a three-line ragged heading at most widths.
  headingLines: ['Work that', 'gets published.'],
  lede: 'UTMSAM runs an open-access journal for undergraduate research, and has taken work to an external conference. This is where both live.',
  heroLede: 'An open-access journal for undergraduate research',

  blocks: [
    { href: '#codex',    icon: 'd-journal', short: 'CODEX.',    line: 'The journal UTMSAM runs, and how it is put together.' },
    { href: '#articles', icon: 'd-model',   short: 'Articles.', line: 'Six papers in the first volume, free to read.' },
    { href: '#fixit',    icon: 'beaker',    short: 'Past work.', line: 'Project Fixit, presented at ACM Learning at Scale.' },
  ],

  codex: {
    name: 'CODEX.',
    fullName: 'The Journal of Computing, Data, and Exploration',
    url: 'https://jps.library.utoronto.ca/index.php/mcsjournal',
    body: [
      'CODEX is a student-led, open-access journal showcasing original research articles written by undergraduate students at UTM on topics across computational sciences, statistics and mathematical sciences. It sits under the Mathematical and Computational Sciences department and is published on the University of Toronto Libraries journal platform.',
      'Prof. Rutwa Engineer is the journal’s academic director and editor-in-chief, and one of UTMSAM’s two faculty advisors.',
    ],
    volume: {
      label: 'Vol. 1 No. 1',
      published: 'September 2025',
      theme: 'The first volume takes the integration of knowledge and practice as its theme: computing and data methods applied to problems across disciplines, from algorithmic work through to the human dimensions of technology.',
    },
    // TODO(exec): update when the second edition is released.
    articles: [
      { title: 'Student-Faculty Co-Creation of Open Educational Resources for Learning Applied Statistics with Open Source Software Tools', authors: 'Nurlana Alili, Xi Su' },
      { title: 'Predicting Protein Functions: A Deep Learning Approach to Unraveling Biological Complexity', authors: 'Dev Shah, Uyiosa Iyekekpolor, Adam Hameed, Tanish Roy' },
      { title: 'Multiscale Regression for Chronic Kidney Disease via Age-Curvature and Electrolytes', authors: 'Mingyu Sun' },
      { title: 'Multi-Modal Deep Learning for Retinal Analysis', authors: 'Dev Shah, Saadullah Shahzad, Inaam Azeezur-Rahman, Tanish Roy' },
      { title: 'Goldbach’s Conjecture', authors: 'Mariana Vazquez Coello' },
      { title: 'Building an Emphatic AI Coach & Agent', authors: 'Dev Vora, Dev Shah, Tanish Roy, Mehtab Cheema, Saadullah Shahzad' },
    ],
  },

  fixit: {
    name: 'Project Fixit.',
    status: 'Published',
    body: 'Machine learning research on program repair in an educational setting. The team took the work from proposal through to an external venue, presenting at SPLICE, ACM Learning at Scale.',
    // TODO(exec): add the paper link and confirm the exact citation.
  },
};

/* ------------------------------------------------------------------
   Team. Names and positions only for now: portraits fall back to
   BlockPortrait, which is the brand material standing in for a photo
   rather than a generic avatar. Add a photo and it disappears.
   ------------------------------------------------------------------ */
export const team = {
  heading: 'Who runs it.',
  lede: 'The executive for 2026–27, and the two faculty advisors the society works with.',

  // TODO(exec): add `photo` and `bio` per person as they come in.
  exec: [
    { name: 'Yashika Jain',  role: 'Co-President' },
    { name: 'Sreya Sunil',   role: 'Co-President' },
    { name: 'Aarav Pradhan', role: 'VP Finance' },
    { name: 'Abdullah Omar', role: 'VP Human Resource' },
    { name: 'Ericsson Cui',  role: 'VP Technology' },
    { name: 'Rozhin Ansari', role: 'VP Communication' },
    { name: 'Aryan Goyal',   role: 'VP Events' },
  ],

  advisors: [
    {
      name: 'Rutwa Engineer',
      role: 'Faculty Advisor',
      note: 'Academic director and editor-in-chief of CODEX, the journal UTMSAM runs.',
    },
    { name: 'Joshua Jung', role: 'Faculty Advisor', note: null },
  ],
};

/* Page-level copy for the events index. */
export const eventsPage = {
  heading: 'What’s running.',
  lede: 'Eleven initiatives across the Fall and Winter terms, from an eight-hour hackathon to an hour of hot chocolate before exams.',
  note: 'Dates are announced on Instagram and Discord as each event is confirmed.',
};
