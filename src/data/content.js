/**
 * Site content.
 *
 * Anything marked TODO(exec) is a slot the incoming executive team fills in.
 * Nothing here invents a statistic. If a number is not sourced, it is absent
 * rather than plausible.
 */

/* Exactly five bullets per unit, noun phrases, never sentences. The
   discipline is what makes a long page scan fast. */
export const pillars = [
  {
    id: 'workshops',
    icon: 'd-workshop',
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
    heading: 'Competitions with a scoreboard.',
    body: 'LeetQuest runs on a bi-weekly cycle through the term, tracking performance across iterations so progress is visible.',
    cta: { label: 'See how LeetQuest works', href: '/events#leetquest' },
    bullets: [
      'Bi-weekly problem sets',
      'Cross-iteration performance tracking',
      'Open to every UTM student',
      'Editorial writeups after each round',
      'Prizes at the end of each cycle',
    ],
  },
  {
    id: 'research',
    icon: 'beaker',
    heading: 'Research that gets published.',
    body: 'Project teams take a question from proposal through to a written result, with the aim of submitting the work externally.',
    cta: { label: 'See current projects', href: '/projects' },
    bullets: [
      'Faculty-supervised project teams',
      'Reproducible experiment pipelines',
      'Peer review inside the society',
      'Conference and workshop submissions',
      'An open-access undergraduate journal',
    ],
  },
];

/* The four programs, one line each. */
export const programs = [
  { icon: 'd-terminal', title: 'Weekly build sessions.', body: 'Open room, shared problems, no agenda beyond shipping something.' },
  { icon: 'people',     title: 'Mentor pairing.',        body: 'Newer members pair with someone a year or two ahead of them.' },
  { icon: 'd-journal',  title: 'The journal.',           body: 'An open-access venue for undergraduate work that would otherwise go unread.' },
  { icon: 'envelope',   title: 'Industry nights.',       body: 'Practitioners talk through what the work actually looks like day to day.' },
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
    path: '/projects#fixit',
    meta: 'Research',
    href: '/projects#fixit',
  },
];

export const events = [
  {
    id: 'seminar-series',
    icon: 'd-workshop',
    name: 'AI Seminar Series',
    term: '2026',
    cadence: 'Through the term',
    body: 'Speaker workshops on current work in artificial intelligence, including sessions on AI in games. Each session is self-contained, so joining late costs nothing.',
    status: 'Running',
  },
  {
    id: 'leetquest',
    icon: 'trophy',
    name: 'LeetQuest',
    term: '2025 onward',
    cadence: 'Bi-weekly',
    body: 'A programming competition for UTM students. Performance is tracked across iterations rather than scored once, so the reward goes to improvement as much as to raw placement.',
    status: 'Running',
  },
  {
    id: 'build-sessions',
    icon: 'd-terminal',
    name: 'Build sessions',
    term: 'Weekly',
    cadence: 'Weekly',
    body: 'An open working room. Bring a project, a problem set, or nothing at all. Most project teams formed here rather than through an application.',
    status: 'Running',
  },
  {
    id: 'industry-nights',
    icon: 'people',
    name: 'Industry nights',
    term: 'Termly',
    cadence: 'Once or twice a term',
    body: 'Practitioners walk through real work: what the modeling actually looked like, what broke, and what they would do differently.',
    // TODO(exec): confirm dates before the term starts.
    status: 'Scheduling',
  },
];

export const projects = [
  {
    id: 'fixit',
    icon: 'beaker',
    name: 'Project Fixit',
    status: 'Published',
    body: 'Machine learning research on program repair in an educational setting. The team took the work from proposal through to an external venue.',
    // TODO(exec): add the paper link and confirm the exact venue citation.
    detail: 'Presented at SPLICE, ACM Learning at Scale.',
    stack: ['Machine learning', 'Education research', 'Program analysis'],
  },
  {
    id: 'journal',
    icon: 'd-journal',
    name: 'The undergraduate journal',
    status: 'In progress',
    body: 'An open-access venue for undergraduate research at UTM, built so that work done in a project team has somewhere to land.',
    detail: 'Accepting submissions from UTM students.',
    stack: ['Open access', 'Peer review', 'Editorial'],
  },
  {
    id: 'open-slot',
    icon: 'd-model',
    name: 'Your project.',
    status: 'Open',
    body: 'Project teams form each term around a question someone in the society wants answered. If you have one, it can become a team.',
    detail: 'Proposals open at the start of each term.',
    stack: ['Any domain', 'Faculty supervision available'],
  },
];
