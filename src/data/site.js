export const site = {
  name: 'UTMSAM',
  longName: 'University of Toronto Mississauga Society for Algorithmic Modeling',
  // External records (UTM MCS, UTMSU, ulife, LinkedIn) use the British
  // spelling and a shortened form. Listed as alternateName so search and
  // answer engines resolve all of them to one organisation.
  altNames: [
    'UTMSAM',
    'UTM Society for Algorithmic Modelling',
    'University of Toronto Mississauga Society for Algorithmic Modelling',
  ],
  tagline: 'A student-run society applying machine learning, data science, and mathematical modeling to real problems.',
  signupUrl: 'https://forms.gle/2LsfwmEQU4QnPyaZ6',
  instagram: 'https://instagram.com/utmsam',
  // Not linked in the UI, but claimed in the Organization record so search
  // and answer engines resolve these profiles to the same society.
  // Reddit (r/UTMSAM) is listed on the UTM MCS page but could not be
  // verified, so it stays out until someone confirms it. Verified 2026-08-22.
  otherProfiles: [
    'https://www.linkedin.com/company/utm-sam',
    'https://www.facebook.com/UTMSAM',
    'https://github.com/UTM-Society-for-Algorithmic-Modelling',
  ],
  discord: 'https://discord.gg/k6cP6PdTFF',
  email: 'sam@utmsu.ca',
};

export const nav = [
  { href: '/about',    label: 'About' },
  { href: '/events',   label: 'Events' },
  { href: '/research', label: 'Research' },
  { href: '/team',     label: 'Team' },
  { href: '/sponsors', label: 'Sponsors' },
];
