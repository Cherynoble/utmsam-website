/**
 * The team.
 *
 * HOW TO FILL THIS IN
 * -------------------
 * Every executive slot below is a placeholder. To publish a member, set
 * `name` to their name and fill `program` and `focus`. A slot with
 * `name: null` renders as "To be announced" and stays on the page, so the
 * structure of the team is visible before the roster is final.
 *
 * `photo` is a path under /public/team/ (for example '/team/president.jpg').
 * While it is null the card renders a block portrait built from the brand
 * material, seeded off the role name. Photos should be square, at least
 * 640x640, and cropped to the shoulders.
 *
 * Order in this array is the order on the page.
 */

export const faculty = [
  // TODO(exec): confirm titles and affiliations with both advisors before launch.
  { role: 'Faculty advisor', name: 'Rutwa Engineer', program: null, focus: null, photo: null },
  { role: 'Faculty advisor', name: 'Joshua Jung',    program: null, focus: null, photo: null },
];

export const executive = [
  {
    role: 'President',
    name: null,
    program: null,
    focus: 'Sets direction for the year and represents the society to the university.',
    photo: null,
  },
  {
    role: 'Vice-President, Technology',
    name: null,
    program: null,
    focus: 'Runs build sessions and owns the technical direction of project teams.',
    photo: null,
  },
  {
    role: 'Vice-President, Events',
    name: null,
    program: null,
    focus: 'Programs the seminar series, competitions, and industry nights.',
    photo: null,
  },
  {
    role: 'Vice-President, Finance',
    name: null,
    program: null,
    focus: 'Manages the budget, funding applications, and sponsor relationships.',
    photo: null,
  },
  {
    role: 'Vice-President, Communications',
    name: null,
    program: null,
    focus: 'Owns the site, the newsletter, and everything the society publishes.',
    photo: null,
  },
  {
    role: 'Vice-President, Human Resources',
    name: null,
    program: null,
    focus: 'Handles recruitment, onboarding, and the mentor pairing program.',
    photo: null,
  },
];

/** Roles the society is actively recruiting for. Empty array hides the section. */
export const openRoles = [
  { role: 'Director, Research',   focus: 'Coordinate project teams and the review process for the journal.' },
  { role: 'Director, Design',     focus: 'Extend the visual system across events, slides, and the site.' },
  { role: 'General member',       focus: 'No application, no prerequisites. Show up to a build session.' },
];
