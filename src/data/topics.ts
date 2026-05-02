import type { Topic } from '../types/index';

export const topics: Topic[] = [
  {
    id: 'voter-registration',
    label: 'Module 1',
    labelHindi: 'मतदाता पंजीकरण',
    title: 'Voter Registration',
    description:
      'Learn how to register as a voter, get your EPIC card, and make sure your name is on the electoral roll before election day.',
    icon: '📋',
    keyFacts: [
      {
        icon: '🎂',
        title: 'Age eligibility',
        description:
          'You can register once you turn 18 — apply through the NVSP portal (nvsp.in) or your nearest ERO office.',
        details: 'According to the Constitution of India, every citizen who is 18 years or older on the qualifying date (usually January 1st of the year) is eligible to be enrolled as a voter. You can apply for registration even if you are 17+ so that you are added as soon as you turn 18.',
      },
      {
        icon: '📝',
        title: 'Form 6',
        description:
          'Fill out Form 6 for new registration — available online at nvsp.in or the Voter Helpline App.',
        details: 'Form 6 is the specific application form for New Voters. You will need to provide basic personal details, address history, and upload supporting documents. It can be submitted online, via the app, or in person at your local Election Registration Office.',
      },
      {
        icon: '🪪',
        title: 'EPIC card',
        description:
          'Your Electors Photo Identity Card is your voter ID — it has your name, photo, and constituency details.',
        details: 'The EPIC card serves as a permanent identity proof for voting. While it is the primary document, you can also vote using other valid ID proofs like Aadhaar or Passport if your name is present in the official electoral roll.',
      },
      {
        icon: '🔍',
        title: 'Verify your name',
        description:
          'Check your name in the electoral roll at electoralsearch.eci.gov.in before every election.',
        details: 'Simply having a Voter ID card is not enough; your name must be in the current Electoral Roll. Always verify your name on the official ECI search portal a few weeks before the polling date to ensure you are not turned away at the booth.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Visit nvsp.in or download the Voter Helpline App',
        description:
          "The Election Commission's official portal. Select 'New Voter Registration' (Form 6).",
      },
      {
        number: 2,
        title: 'Fill in your details',
        description:
          'Name, age, address, relation\'s name, and upload a passport photo. Takes about 5 minutes.',
      },
      {
        number: 3,
        title: 'Submit supporting documents',
        description:
          'Proof of age (Aadhaar, birth certificate, marksheet) and proof of address.',
      },
      {
        number: 4,
        title: 'Track your application',
        description:
          'Use the reference number to track status. The BLO (Booth Level Officer) may visit for verification.',
      },
      {
        number: 5,
        title: 'Get your EPIC card',
        description:
          'Once approved, collect your voter ID card or download the e-EPIC from the Voter Helpline App.',
      },
    ],
    quiz: {
      question: 'When can an Indian citizen register to vote?',
      options: ['At age 21', 'At age 18', 'At age 25', 'At any age'],
      correctIndex: 1,
      explanation:
        'Every Indian citizen who has turned 18 (as of the qualifying date set by ECI) is eligible to register as a voter.',
    },
    aiSystemPrompt:
      'You are a neutral, civic-education assistant helping first-time voters in India. The user is learning about voter registration. Answer factually, concisely, and encourage civic participation. Reference official sources like nvsp.in and the Election Commission of India. Keep answers under 3 sentences.',
  },
  {
    id: 'types-of-elections',
    label: 'Module 2',
    labelHindi: 'चुनावों के प्रकार',
    title: 'Types of Elections',
    description:
      'Understand the difference between Lok Sabha, Vidhan Sabha, and local body elections — and what you\'re actually voting for.',
    icon: '🏛️',
    keyFacts: [
      {
        icon: '🇮🇳',
        title: 'Lok Sabha',
        description:
          'The lower house of India\'s bicameral Parliament. Members are directly elected by the citizens.',
        label: 'NATIONAL',
        meta: ['🇮🇳 543 seats', '⏱️ 5 Years'],
        details: 'The Lok Sabha (House of the People) is the lower house of India\'s bicameral Parliament. Members are elected by adult universal suffrage and a first-past-the-post system to represent their respective constituencies. The maximum strength of the House is 550 members.',
        seatsByState: [
          { state: 'Uttar Pradesh', seats: 80 },
          { state: 'Maharashtra', seats: 48 },
          { state: 'West Bengal', seats: 42 },
          { state: 'Bihar', seats: 40 },
          { state: 'Tamil Nadu', seats: 39 },
          { state: 'Karnataka', seats: 28 },
          { state: 'Rajasthan', seats: 25 },
        ]
      },
      {
        icon: '🏛️',
        title: 'Rajya Sabha',
        description:
          'The upper house of Parliament. Members are elected by the elected members of State Legislative Assemblies.',
        label: 'FEDERAL',
        meta: ['🏛️ 245 seats', '⏱️ 6 Years'],
        details: 'The Rajya Sabha (Council of States) is the upper house. It is a permanent body and is not subject to dissolution. However, one-third of the members retire every second year and are replaced by newly elected members.',
        seatsByState: [
          { state: 'Uttar Pradesh', seats: 31 },
          { state: 'Maharashtra', seats: 19 },
          { state: 'Tamil Nadu', seats: 18 },
          { state: 'West Bengal', seats: 16 },
          { state: 'Bihar', seats: 16 },
        ]
      },
      {
        icon: '🏢',
        title: 'Vidhan Sabha',
        description:
          'State Legislative Assemblies that govern individual states. Voters elect MLAs to represent them.',
        label: 'STATE',
        meta: ['🏢 Assembly', '👥 Elected MLAs'],
        details: 'Every state has a Vidhan Sabha. Like the Lok Sabha, its members are directly elected for a 5-year term. The size depends on the state\'s population.',
        seatsByState: [
          { state: 'Uttar Pradesh', seats: 403 },
          { state: 'West Bengal', seats: 294 },
          { state: 'Maharashtra', seats: 288 },
          { state: 'Bihar', seats: 243 },
        ]
      },
      {
        icon: '🏘️',
        title: 'Local Body',
        description:
          'Governance at the grass-roots level through Panchayats in villages and Municipalities in towns.',
        label: 'LOCAL',
        meta: ['🏘️ Panchayat', '🏛️ Municipal'],
        details: 'Local body elections (Panchayats and Municipalities) manage local infrastructure, sanitation, and primary education. These elections are conducted by State Election Commissions and are vital for direct community development.',
      },
      {
        icon: '📜',
        title: 'Election Commission',
        description:
          'The constitutional body responsible for conducting all elections in India.',
        label: 'AUTHORITY',
        meta: ['📜 Constitutional', '⚖️ Independent'],
        details: 'The Election Commission of India (ECI) is an autonomous constitutional authority responsible for administering election processes in India at both national and state levels. It ensures elections are free, fair, and impartial.',
      },
    ],
    callout: {
      title: 'Why Direct Elections Matter?',
      body: 'In a representative democracy like India, direct elections for the Lok Sabha and Vidhan Sabha ensure that sovereignty remains with the people. Every vote cast is a direct instruction to the government of the day.',
      quote: 'The right to vote is the most fundamental power a citizen holds in a republic.',
      attribution: 'CONSTITUTIONAL PERSPECTIVES',
    },
    steps: [
      {
        number: 1,
        title: 'Know your constituency',
        description:
          'India has 543 Lok Sabha and thousands of Vidhan Sabha constituencies. Find yours at eci.gov.in.',
      },
      {
        number: 2,
        title: "Understand who you're electing",
        description:
          'Lok Sabha → MP, Vidhan Sabha → MLA, Local body → Councilor or Sarpanch.',
      },
      {
        number: 3,
        title: 'Research the candidates',
        description:
          'Check candidate affidavits on myneta.info — they list criminal records, education, and assets.',
      },
      {
        number: 4,
        title: 'Remember the cycle',
        description:
          'Lok Sabha: every 5 years. State elections: their own schedule. Local body: varies by state.',
      },
    ],
    quiz: {
      question: 'How many seats are there in the Lok Sabha?',
      options: ['245', '543', '250', '800'],
      correctIndex: 1,
      explanation:
        'The Lok Sabha has 543 elected seats, one for each parliamentary constituency across India.',
    },
    aiSystemPrompt:
      'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about types of elections in India (Lok Sabha, Vidhan Sabha, local body). Be factual, balanced across all parties, and concise (under 3 sentences).',
  },
  {
    id: 'election-day',
    label: 'Module 3',
    labelHindi: 'मतदान दिवस',
    title: 'Election Day',
    description:
      'Everything you need to know about voting day — from finding your booth to pressing the button on the EVM.',
    icon: '🗳️',
    keyFacts: [
      {
        icon: '⏰',
        title: 'Polling hours',
        description:
          'Typically 7:00 AM to 6:00 PM — anyone in the queue by closing time MUST be allowed to vote.',
        details: 'The Election Commission sets standard hours for polling, usually 11 hours. Crucially, if you are in the queue at the official closing time (e.g., 6:00 PM), the presiding officer must issue slips to everyone in line and allow them to cast their vote, even if it takes several more hours.',
      },
      {
        icon: '🖥️',
        title: 'EVMs & VVPAT',
        description:
          'India uses Electronic Voting Machines with a VVPAT slip for verification — your vote leaves a paper trail.',
        details: 'When you press the button on the Ballot Unit, a paper slip is printed by the VVPAT machine. It shows the candidate\'s serial number, name, and symbol for 7 seconds behind a glass window before falling into a sealed box. This allows you to verify that your vote went exactly where you intended.',
      },
      {
        icon: '🪪',
        title: 'Valid photo ID',
        description:
          'EPIC is preferred, but Aadhaar, passport, driving license, PAN, and 8 other IDs are accepted.',
        details: 'While the Voter ID (EPIC) is the primary document, the ECI allows several alternatives for identity verification, including Aadhaar, MNREGA Job Card, Passbooks with photos, Health Insurance Smart Card (Ministry of Labour), Pension Document, and official identity cards for MPs/MLAs/MLCs.',
      },
      {
        icon: '🚫',
        title: 'NOTA option',
        description:
          'None of the Above is an option on every EVM — you can formally reject all candidates.',
        details: 'NOTA (None of the Above) was introduced in 2013 following a Supreme Court ruling. It allows a voter to officially record their dissatisfaction with all candidates in the fray. While NOTA does not affect the outcome of the election (the candidate with the highest votes still wins), it provides a powerful metric of public sentiment.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Find your polling booth',
        description:
          'Check your voter slip (delivered home) or search at electoralsearch.eci.gov.in. You can only vote at your assigned booth.',
      },
      {
        number: 2,
        title: 'Carry valid photo ID',
        description:
          'EPIC is preferred, but Aadhaar, passport, driving license, and 9 other IDs are also accepted.',
      },
      {
        number: 3,
        title: 'Get your finger inked',
        description:
          'The presiding officer checks your ID, you sign the register, and indelible ink is applied to your left index finger.',
      },
      {
        number: 4,
        title: 'Vote on the EVM',
        description:
          "Find your candidate's name and party symbol, press the blue button. VVPAT shows a slip for 7 seconds to confirm.",
      },
      {
        number: 5,
        title: 'Leave the booth',
        description:
          "Your vote is recorded. You've done your democratic duty! 🗳️",
      },
    ],
    quiz: {
      question: 'What does VVPAT stand for?',
      options: [
        'Voter Verifiable Paper Audit Trail',
        'Very Valid Paper Authentication Tool',
        'Voter Validation Process And Test',
        'Virtual Voting And Paper Trail',
      ],
      correctIndex: 0,
      explanation:
        'VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing your vote for 7 seconds, ensuring transparency.',
    },
    aiSystemPrompt:
      'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about Election Day procedures in India. Be factual, practical, and concise (under 3 sentences). Reference EVMs, VVPAT, and official ECI procedures.',
  },
  {
    id: 'vote-counting',
    label: 'Module 4',
    labelHindi: 'मतगणना',
    title: 'How Votes Are Counted',
    description:
      'From sealed EVMs in strongrooms to the final declaration of results — the counting process explained.',
    icon: '📊',
    keyFacts: [
      {
        icon: '🔒',
        title: 'Strongroom security',
        description:
          'EVM results are stored in the Control Unit — machines are sealed and stored under 24/7 armed security.',
        details: 'After polling, EVMs are placed in Strongrooms which are sealed in the presence of candidates. They are guarded by a multi-tier security system (CAPF and local police). Candidates and their agents are allowed to maintain a 24/7 vigil outside the strongroom until counting day.',
      },
      {
        icon: '📅',
        title: 'Counting day',
        description:
          'Counting happens 2–3 days after polling. Candidates and agents can observe the entire process.',
        details: 'On counting day, each table is assigned a counting supervisor and assistants. Candidates appoint agents to watch each table. The EVM\'s Control Unit displays the result for each candidate round by round after the seals are verified as intact.',
      },
      {
        icon: '🧾',
        title: 'VVPAT verification',
        description:
          'Slips from 5 randomly selected booths per constituency are matched against EVM totals.',
        details: 'As an additional layer of trust, the ECI randomly selects 5 polling stations in every assembly constituency (or assembly segment of a parliamentary constituency) to manually count the VVPAT paper slips and match them with the electronic results. Discrepancies are extremely rare.',
      },
      {
        icon: '📮',
        title: 'Postal ballots first',
        description:
          'Postal ballots (service voters, seniors 80+, PwD voters) are counted before EVM results.',
        details: 'Postal ballots are provided to specific categories like Service Voters (armed forces), voters on election duty, and recently, senior citizens above 80 and People with Disabilities (PwD). These are counted first, usually starting 30 minutes before the EVM counting begins.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Strongroom security',
        description:
          'After polling, EVMs are sealed and stored with CCTV, armed guards, and candidate agents can post their own seals.',
      },
      {
        number: 2,
        title: 'Counting day',
        description:
          'The Returning Officer supervises. EVMs are opened round by round from different booth clusters.',
      },
      {
        number: 3,
        title: 'VVPAT verification',
        description:
          '5 randomly selected booths per constituency have their paper slips counted and cross-verified.',
      },
      {
        number: 4,
        title: 'Results declared',
        description:
          'The candidate with the most votes wins (First Past the Post). Results go live on results.eci.gov.in.',
      },
    ],
    quiz: {
      question:
        'How many VVPAT machines per constituency are cross-verified with EVM totals?',
      options: ['All of them', '10', '5', '1'],
      correctIndex: 2,
      explanation:
        'The Supreme Court mandated verification of VVPAT slips from 5 randomly selected polling stations per constituency.',
    },
    aiSystemPrompt:
      'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about vote counting in India. Be factual, reassuring about election integrity, and concise (under 3 sentences). Reference EVMs, VVPAT, and ECI procedures.',
  },
  {
    id: 'government-formation',
    label: 'Module 5',
    labelHindi: 'सरकार का गठन',
    title: 'Formation of Government',
    description:
      'What happens after results are declared — from the magic number 272 to the oath at Rashtrapati Bhavan.',
    icon: '⚖️',
    keyFacts: [
      {
        icon: '🔢',
        title: 'Magic number: 272',
        description:
          'The party or coalition winning 272+ Lok Sabha seats (simple majority of 543) forms the government.',
        details: 'The Lok Sabha has 543 elected members. To form a stable government, a party or a pre-poll alliance needs 50% + 1 seat, which is 272. If no single party reaches this number, they must seek support from other parties to reach the majority mark.',
      },
      {
        icon: '🤝',
        title: 'Coalition politics',
        description:
          'In a hung parliament (no party gets 272), the President invites the largest party or coalition to prove majority.',
        details: 'If no party has a clear majority, it is called a "Hung Parliament". The President uses constitutional discretion to invite the leader of the party or coalition that is most likely to command a majority. They are then given a time frame to prove their support on the floor of the House.',
      },
      {
        icon: '🏛️',
        title: 'Floor test',
        description:
          'The PM must win a confidence vote in the Lok Sabha to prove majority support.',
        details: 'A Floor Test is the ultimate proof of majority. Members of the Lok Sabha vote to express confidence in the government. If the Prime Minister fails to get more than 50% of the votes of members present and voting, the government must resign.',
      },
      {
        icon: '📿',
        title: 'Oath ceremony',
        description:
          'The PM and Council of Ministers are sworn in by the President at Rashtrapati Bhavan.',
        details: 'The official journey begins with the Oath of Office and Secrecy. Administered by the President of India at the Rashtrapati Bhavan, the PM and ministers swear to uphold the Constitution and the sovereignty of India.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Results are declared',
        description:
          'ECI announces constituency-wise results. The party or coalition with 272+ seats claims majority.',
      },
      {
        number: 2,
        title: 'President invites PM',
        description:
          'The President of India invites the leader of the majority party/coalition to form the government.',
      },
      {
        number: 3,
        title: 'PM proves majority',
        description:
          'The new PM must win a floor test (confidence vote) in the Lok Sabha within the set time frame.',
      },
      {
        number: 4,
        title: 'Oath ceremony',
        description:
          'The PM and Council of Ministers are sworn in at Rashtrapati Bhavan. The government is officially in power.',
      },
    ],
    quiz: {
      question:
        'How many Lok Sabha seats does a party need for a simple majority?',
      options: ['200', '250', '272', '543'],
      correctIndex: 2,
      explanation:
        '272 seats (majority of 543) are needed to form the government at the centre.',
    },
    aiSystemPrompt:
      'You are a neutral civic-education assistant for first-time Indian voters. The user is learning about government formation in India. Explain factually, avoid political bias, and keep answers under 3 sentences.',
  },
];
