import type { TimelineEvent } from '../types';

export const timelineEvents: TimelineEvent[] = [
  {
    period: '5 years prior',
    title: 'Term expiry approaches',
    description:
      'The current Lok Sabha or Vidhan Sabha term nears its end. The Election Commission begins preparation for fresh elections.',
    icon: '📅',
  },
  {
    period: '6–8 weeks before',
    title: 'Election announced',
    description:
      'ECI announces the election schedule. The Model Code of Conduct kicks in immediately — no new government schemes or announcements.',
    icon: '📢',
  },
  {
    period: '~4 weeks before',
    title: 'Nominations open',
    description:
      'Candidates file their nomination papers with the Returning Officer. Each candidate must declare assets, criminal cases, and education.',
    icon: '📝',
  },
  {
    period: '~3 weeks before',
    title: 'Scrutiny of nominations',
    description:
      'The Returning Officer examines all nominations. Invalid or incomplete nominations are rejected.',
    icon: '🔍',
  },
  {
    period: '~2.5 weeks before',
    title: 'Last date to withdraw',
    description:
      'Candidates can withdraw from the race until this date. After this, the final list of contesting candidates is published.',
    icon: '🚪',
  },
  {
    period: 'Campaign period',
    title: 'Campaigning',
    description:
      'Rallies, door-to-door campaigns, TV debates, and social media outreach. All campaigning must stop 48 hours before polling.',
    icon: '📣',
  },
  {
    period: '48 hours before',
    title: 'Silence period',
    description:
      'No campaigning allowed — the "cooling off" period. Voters reflect and make their decision without last-minute influence.',
    icon: '🤫',
  },
  {
    period: 'Polling day(s)',
    title: 'Voting day',
    description:
      'India often votes in multiple phases (up to 7 for Lok Sabha). Voters cast ballots on EVMs at their assigned polling booth.',
    icon: '🗳️',
  },
  {
    period: '2–3 days after last phase',
    title: 'Counting day',
    description:
      'EVMs are opened and counted. Results are declared constituency by constituency and uploaded live to results.eci.gov.in.',
    icon: '📊',
  },
  {
    period: 'Within days of results',
    title: 'Government formation',
    description:
      'The President invites the majority leader to form the government. The PM-designate must prove majority through a floor test.',
    icon: '🏛️',
  },
  {
    period: 'Oath day',
    title: 'Swearing-in ceremony',
    description:
      'The Prime Minister and Council of Ministers take the oath of office at Rashtrapati Bhavan. The new government is officially in power.',
    icon: '🇮🇳',
  },
];
