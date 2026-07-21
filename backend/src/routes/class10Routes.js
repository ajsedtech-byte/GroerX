import express from "express";

const router = express.Router();

const STUDENT_ID = "demo-student";

const submissions = new Map();

const scoring = {
  type: "riasec-option-map",
  selectedOptionScore: 5,
  mapping: {
    A: "R",
    B: "I",
    C: "A",
    D: "S",
    E: "E",
    F: "C",
  },
};

const riasecMeta = [
  {
    key: "A",
    riasec: "R",
    dimension: "Realistic",
    traits: { realistic: 5 },
    streamWeights: { vocational: 4, "science-pcm": 2 },
  },
  {
    key: "B",
    riasec: "I",
    dimension: "Investigative",
    traits: { investigative: 5 },
    streamWeights: { "science-pcm": 4, "science-pcb": 3 },
  },
  {
    key: "C",
    riasec: "A",
    dimension: "Artistic",
    traits: { artistic: 5 },
    streamWeights: { "arts-humanities": 4, vocational: 2 },
  },
  {
    key: "D",
    riasec: "S",
    dimension: "Social",
    traits: { social: 5 },
    streamWeights: { "arts-humanities": 4, "science-pcb": 2 },
  },
  {
    key: "E",
    riasec: "E",
    dimension: "Enterprising",
    traits: { enterprising: 5 },
    streamWeights: { commerce: 4, "arts-humanities": 2 },
  },
  {
    key: "F",
    riasec: "C",
    dimension: "Conventional",
    traits: { conventional: 5 },
    streamWeights: { commerce: 4, "science-pcm": 1.5 },
  },
];

function makeOptions(options) {
  return options.map((text, index) => ({
    ...riasecMeta[index],
    text,
    score: 5,
  }));
}

function makeQuestion(round, questionNo, questionText, options) {
  return {
    id: `riasec-r${round}-q${questionNo}`,
    _id: `riasec-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "riasec",
    testName: "RIASEC Interest Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension: "RIASEC",
    questionType: "single-choice",
    options: makeOptions(options),
    scoring,
    isActive: true,
    active: true,
  };
}

const round1Raw = [
  [
    1,
    "Which activity would you enjoy the most during your summer vacation?",
    [
      "Repairing a bicycle or fixing electronic gadgets",
      "Performing science experiments",
      "Painting a beautiful landscape",
      "Teaching children in your neighborhood",
      "Selling handmade products online",
      "Organizing books in a library",
    ],
  ],
  [
    2,
    "Your school starts six new clubs. Which one do you join first?",
    [
      "Robotics Club",
      "Science Club",
      "Drama Club",
      "Community Service Club",
      "Entrepreneurship Club",
      "Finance Club",
    ],
  ],
  [
    3,
    "Which YouTube channel would you watch first?",
    [
      "DIY Machine Building",
      "Space Science",
      "Digital Art",
      "Psychology",
      "Startup Stories",
      "Productivity Tips",
    ],
  ],
  [
    4,
    "If your school announces a competition, which one excites you the most?",
    [
      "Robotics Competition",
      "Science Quiz",
      "Poster Design",
      "Debate Competition",
      "Business Pitch",
      "Data Management Challenge",
    ],
  ],
  [
    5,
    "You receive ₹10,000 for a school project. What would you build?",
    [
      "A robot",
      "A research experiment",
      "An art exhibition",
      "A community learning center",
      "A student startup",
      "A school database",
    ],
  ],
  [
    6,
    "Which type of homework do you enjoy most?",
    [
      "Building a working model",
      "Research report",
      "Creative presentation",
      "Group awareness campaign",
      "Business plan",
      "Spreadsheet work",
    ],
  ],
  [
    7,
    "Which activity sounds most exciting?",
    [
      "Repairing a computer",
      "Discovering a new planet",
      "Designing a game character",
      "Helping an elderly person",
      "Running a company",
      "Organizing school records",
    ],
  ],
  [
    8,
    "If you could spend one day with a professional, who would it be?",
    [
      "Mechanical Engineer",
      "Scientist",
      "Film Director",
      "Teacher",
      "CEO",
      "Chartered Accountant",
    ],
  ],
  [
    9,
    "Which school subject would you study even if there were no exams?",
    [
      "Robotics",
      "Physics",
      "Fine Arts",
      "Psychology",
      "Business Studies",
      "Mathematics",
    ],
  ],
  [
    10,
    "Your dream room would mostly contain",
    [
      "Machines and tools",
      "Science books",
      "Paintings and music",
      "People and discussions",
      "Business magazines",
      "Files and planners",
    ],
  ],
  [
    11,
    "You are asked to organize a school event. Which responsibility do you choose?",
    [
      "Stage setup",
      "Research and facts",
      "Decorations",
      "Managing volunteers",
      "Sponsorship",
      "Registration desk",
    ],
  ],
  [
    12,
    "Which activity gives you the most satisfaction?",
    [
      "Building something useful",
      "Solving a difficult problem",
      "Creating something beautiful",
      "Helping someone succeed",
      "Leading a team",
      "Keeping everything organized",
    ],
  ],
  [
    13,
    "What would you rather buy with your savings?",
    [
      "Tool kit",
      "Telescope",
      "Graphic tablet",
      "Charity books",
      "Small business supplies",
      "Planner and stationery",
    ],
  ],
  [
    14,
    "Which summer camp would you attend?",
    [
      "Adventure Engineering",
      "Space Science",
      "Creative Arts",
      "Leadership & Service",
      "Entrepreneurship",
      "Financial Literacy",
    ],
  ],
  [
    15,
    "Which school project sounds most fun?",
    [
      "Solar-powered car",
      "Water purification research",
      "School mural",
      "Mental health campaign",
      "Student business fair",
      "Digital attendance system",
    ],
  ],
  [
    16,
    "Your teacher gives complete freedom for a project. What do you choose?",
    [
      "Build a machine",
      "Conduct research",
      "Produce a short movie",
      "Organize a community drive",
      "Launch a mini startup",
      "Create a filing system",
    ],
  ],
  [
    17,
    "Which career documentary would you watch?",
    [
      "Civil Engineer",
      "Neuroscientist",
      "Fashion Designer",
      "Clinical Psychologist",
      "Entrepreneur",
      "Investment Banker",
    ],
  ],
  [
    18,
    "Your school introduces a new lab. Which one interests you most?",
    [
      "Robotics Lab",
      "AI Research Lab",
      "Design Studio",
      "Counseling Center",
      "Startup Incubator",
      "Finance Lab",
    ],
  ],
  [
    19,
    "Which competition would you enter?",
    [
      "Drone Building",
      "Math Olympiad",
      "Digital Art",
      "Public Speaking",
      "Startup Challenge",
      "Accounting Quiz",
    ],
  ],
  [
    20,
    "If success meant doing something every day, what would you choose?",
    ["Building", "Discovering", "Creating", "Helping", "Leading", "Organizing"],
  ],
];

const round2Raw = [
  [
    21,
    "Which type of school assignment would you choose first?",
    [
      "Create a working model",
      "Study a scientific topic deeply",
      "Design a poster or visual story",
      "Help classmates understand the topic",
      "Present and convince the class",
      "Prepare a neat report with proper data",
    ],
  ],
  [
    22,
    "If you were part of a school exhibition, what role would you prefer?",
    [
      "Set up the equipment and models",
      "Explain the science behind the project",
      "Design the stall creatively",
      "Guide visitors and answer their questions",
      "Promote the stall and attract people",
      "Manage entries, lists, and records",
    ],
  ],
  [
    23,
    "Which app idea would you like to build or work on?",
    [
      "An app that controls machines or devices",
      "An app that explains science concepts",
      "An app for drawing, music, or design",
      "An app that helps students with doubts",
      "An app for buying and selling products",
      "An app that manages notes, tasks, and schedules",
    ],
  ],
  [
    24,
    "What kind of problem do you naturally like solving?",
    [
      "A broken object or device",
      "A difficult science or logic question",
      "A design or presentation problem",
      "A conflict between people",
      "A challenge to win support or customers",
      "A messy system that needs organization",
    ],
  ],
  [
    25,
    "Which activity would make you feel most productive?",
    [
      "Fixing something that was not working",
      "Finding the reason behind a problem",
      "Creating something original",
      "Helping someone improve",
      "Getting people to join your idea",
      "Completing a checklist accurately",
    ],
  ],
  [
    26,
    "Which career environment sounds most comfortable to you?",
    [
      "Workshop, lab, or field site",
      "Research lab or innovation center",
      "Studio, media room, or creative space",
      "Classroom, counseling room, or hospital",
      "Office where decisions and deals happen",
      "Office with data, systems, and records",
    ],
  ],
  [
    27,
    "Your friend asks for help. What do you prefer helping with?",
    [
      "Repairing their device",
      "Understanding a difficult concept",
      "Making their project look attractive",
      "Solving their personal problem",
      "Preparing them for a speech or pitch",
      "Organizing their notes and timetable",
    ],
  ],
  [
    28,
    "Which type of school responsibility would you accept?",
    [
      "Managing stage lights and sound",
      "Preparing facts and research points",
      "Designing banners and invitations",
      "Coordinating students and volunteers",
      "Getting sponsors or chief guests",
      "Managing attendance and documents",
    ],
  ],
  [
    29,
    "What kind of videos do you save most often?",
    [
      "DIY, tools, machines, or repair videos",
      "Science, space, facts, or experiments",
      "Design, art, music, or editing videos",
      "Self-improvement or helping people videos",
      "Business, sales, startup, or leadership videos",
      "Productivity, planning, finance, or Excel videos",
    ],
  ],
  [
    30,
    "Which type of challenge would you enjoy most?",
    [
      "Build something with limited materials",
      "Solve a mystery using clues",
      "Create a unique design in one hour",
      "Help a group work together",
      "Convince judges to choose your idea",
      "Organize scattered information correctly",
    ],
  ],
  [
    31,
    "Which school trip would excite you most?",
    [
      "Factory or engineering workshop",
      "Science museum or research lab",
      "Art gallery or film studio",
      "NGO, hospital, or community center",
      "Startup office or business expo",
      "Bank, stock exchange, or admin office",
    ],
  ],
  [
    32,
    "Which achievement would make you proud?",
    [
      "Building a useful device",
      "Winning a science or logic competition",
      "Creating a viral design or performance",
      "Helping many students improve",
      "Starting a successful student business",
      "Managing a large event perfectly",
    ],
  ],
  [
    33,
    "What do you usually notice first in any situation?",
    [
      "How things are working physically",
      "Why something is happening",
      "How it looks and feels",
      "How people are feeling",
      "Who is leading and deciding",
      "How things are arranged and managed",
    ],
  ],
  [
    34,
    "Which task would you prefer during a group project?",
    [
      "Making the model or prototype",
      "Finding facts, reasons, and data",
      "Creating visuals and presentation style",
      "Supporting team members and explaining",
      "Leading the group and assigning work",
      "Making the final document systematic",
    ],
  ],
  [
    35,
    "Which type of book would you pick first?",
    [
      "How machines and technology work",
      "Science discoveries and mysteries",
      "Stories, design, art, or poetry",
      "Human behaviour and relationships",
      "Business, leadership, or success stories",
      "Money, planning, or data management",
    ],
  ],
  [
    36,
    "Which kind of work would you not mind doing for hours?",
    [
      "Hands-on building or repairing",
      "Researching and solving complex questions",
      "Designing, writing, editing, or creating",
      "Teaching, guiding, or listening to people",
      "Planning, leading, selling, or negotiating",
      "Sorting, calculating, recording, or organizing",
    ],
  ],
  [
    37,
    "If you started a school project with friends, what would be your strength?",
    [
      "Making things work practically",
      "Understanding the problem deeply",
      "Making the idea attractive and original",
      "Keeping the team connected",
      "Taking decisions and pitching the idea",
      "Tracking tasks, money, and deadlines",
    ],
  ],
  [
    38,
    "Which school award would you like to win?",
    [
      "Best Innovator",
      "Best Researcher",
      "Best Creative Performer",
      "Best Helper or Mentor",
      "Best Leader",
      "Most Organized Student",
    ],
  ],
  [
    39,
    "Which situation would make you feel most confident?",
    [
      "When I am using tools or building something",
      "When I am solving a difficult question",
      "When I am presenting a creative idea",
      "When I am helping or guiding someone",
      "When I am leading or convincing people",
      "When I am managing details correctly",
    ],
  ],
  [
    40,
    "If you had to choose one school role for the year, what would you choose?",
    [
      "Technical setup in-charge",
      "Research and quiz in-charge",
      "Creative design in-charge",
      "Student support in-charge",
      "Event leadership in-charge",
      "Records and finance in-charge",
    ],
  ],
];

const round3Raw = [
  [
    41,
    "If your class had to solve a real school problem, which part would you choose?",
    [
      "Fix the physical setup or equipment",
      "Study the root cause of the problem",
      "Design posters or creative awareness material",
      "Talk to students and understand their concerns",
      "Convince teachers and students to support the idea",
      "Create a proper plan, list, and tracking sheet",
    ],
  ],
  [
    42,
    "Which type of project would you feel excited to present?",
    [
      "A working machine or device",
      "A scientific discovery or experiment",
      "A creative artwork, video, or performance",
      "A project that helps people",
      "A business or startup idea",
      "A well-organized data report",
    ],
  ],
  [
    43,
    "Which role suits you best in a team activity?",
    ["Builder", "Researcher", "Designer", "Supporter", "Leader", "Organizer"],
  ],
  [
    44,
    "Which kind of problem would you like to solve in the future?",
    [
      "Technical and mechanical problems",
      "Scientific and research problems",
      "Creative and design problems",
      "People and social problems",
      "Business and growth problems",
      "System and management problems",
    ],
  ],
  [
    45,
    "If you had free time after school, what would you prefer doing?",
    [
      "Making or repairing something",
      "Reading about science or technology",
      "Drawing, editing, writing, or creating",
      "Helping a friend or younger student",
      "Planning a small business idea",
      "Organizing your room, notes, or schedule",
    ],
  ],
  [
    46,
    "Which type of school event would you like to be part of?",
    [
      "Science and robotics fair",
      "Quiz or research symposium",
      "Art, music, or drama fest",
      "Community service drive",
      "Business or leadership summit",
      "Administration and registration team",
    ],
  ],
  [
    47,
    "Which task feels most natural to you?",
    [
      "Using tools and equipment",
      "Analyzing information",
      "Expressing ideas creatively",
      "Understanding people",
      "Taking charge",
      "Following a system",
    ],
  ],
  [
    48,
    "If you could learn one skill this month, what would you choose?",
    [
      "Basic electronics or mechanics",
      "Coding, science, or research methods",
      "Graphic design, writing, or video editing",
      "Counselling, communication, or teaching",
      "Sales, leadership, or entrepreneurship",
      "Excel, accounting, or planning",
    ],
  ],
  [
    49,
    "Which kind of future workplace attracts you most?",
    [
      "A place with machines, tools, or real-world work",
      "A place with experiments, data, and discovery",
      "A place with creativity, media, or design",
      "A place where you work closely with people",
      "A place where you lead teams and make decisions",
      "A place where processes and records are important",
    ],
  ],
  [
    50,
    "What type of achievement would make your parents proud and you happy?",
    [
      "Creating something practical that works",
      "Solving a difficult academic or scientific problem",
      "Winning a creative competition",
      "Helping people improve their lives",
      "Building a successful business or team",
      "Managing something with discipline and accuracy",
    ],
  ],
  [
    51,
    "If a teacher gives you a difficult task, what do you do first?",
    [
      "Start trying it practically",
      "Understand the logic behind it",
      "Think of a creative way to present it",
      "Ask how it affects people",
      "Plan how to complete and lead it",
      "Break it into steps and make a checklist",
    ],
  ],
  [
    52,
    "Which type of competition would you enjoy preparing for?",
    [
      "Model making or robotics",
      "Science fair or olympiad",
      "Painting, writing, drama, or music",
      "Debate, mentoring, or social awareness",
      "Business pitch or leadership challenge",
      "Accounting, data, or quiz management",
    ],
  ],
  [
    53,
    "Which activity gives you energy instead of making you tired?",
    [
      "Doing hands-on practical work",
      "Solving deep questions",
      "Creating something new",
      "Helping and guiding people",
      "Leading and convincing others",
      "Arranging and completing tasks properly",
    ],
  ],
  [
    54,
    "If you were given a school budget, what would you prefer to manage?",
    [
      "Buying tools and materials",
      "Funding science experiments",
      "Creative decorations and media",
      "Student welfare activities",
      "Sponsorship and revenue ideas",
      "Accounts, bills, and records",
    ],
  ],
  [
    55,
    "Which type of person do you admire most?",
    [
      "Someone who builds useful things",
      "Someone who discovers new knowledge",
      "Someone who creates beautiful work",
      "Someone who helps and teaches others",
      "Someone who leads and builds companies",
      "Someone who is disciplined and well-organized",
    ],
  ],
  [
    56,
    "Which task would you choose during a school startup fair?",
    [
      "Build the product prototype",
      "Research the problem and solution",
      "Design the logo, poster, and stall",
      "Explain the idea to visitors kindly",
      "Pitch the idea and handle sales",
      "Manage money, entries, and records",
    ],
  ],
  [
    57,
    "Which sentence sounds most like you?",
    [
      "I like working with real objects.",
      "I like understanding why things happen.",
      "I like expressing ideas in my own way.",
      "I like helping people feel better or learn better.",
      "I like taking initiative and leading.",
      "I like keeping things planned and structured.",
    ],
  ],
  [
    58,
    "If you could improve your school, what would you focus on?",
    [
      "Better labs, tools, and practical facilities",
      "Better science learning and experiments",
      "Better creative spaces and events",
      "Better student support and counselling",
      "Better clubs, leadership, and opportunities",
      "Better systems, schedules, and records",
    ],
  ],
  [
    59,
    "Which type of challenge would you accept immediately?",
    [
      "Build a useful object in two hours",
      "Solve a complex puzzle or research question",
      "Create a campaign video or poster",
      "Mentor a junior student for one week",
      "Lead a team to complete a target",
      "Organize a messy event plan properly",
    ],
  ],
  [
    60,
    "What kind of work makes you feel most confident?",
    [
      "Practical work with tools or materials",
      "Thinking, researching, and solving",
      "Creative work with ideas and design",
      "People-focused work",
      "Leadership and business-focused work",
      "Planning and detail-focused work",
    ],
  ],
];

const round4Raw = [
  [
    61,
    "Which type of activity would you choose for a school innovation day?",
    [
      "Build a working device or tool",
      "Research a new scientific idea",
      "Create a visual campaign or performance",
      "Plan an activity to help students",
      "Pitch a business or leadership idea",
      "Organize the schedule, data, and records",
    ],
  ],
  [
    62,
    "If your class had to make a useful product, what role would you take?",
    [
      "Make the product physically",
      "Test and improve how it works",
      "Design the look and branding",
      "Explain it to users and collect feedback",
      "Sell the product and convince buyers",
      "Track cost, stock, and orders",
    ],
  ],
  [
    63,
    "Which type of task do you usually enjoy more than others?",
    [
      "Hands-on practical tasks",
      "Thinking and analysis tasks",
      "Creative expression tasks",
      "Helping and communication tasks",
      "Leadership and decision tasks",
      "Planning and accuracy tasks",
    ],
  ],
  [
    64,
    "Which school club responsibility would suit you best?",
    [
      "Equipment and setup manager",
      "Research and knowledge manager",
      "Design and content manager",
      "Member support manager",
      "President or campaign leader",
      "Records and finance manager",
    ],
  ],
  [
    65,
    "If you had to solve a community problem, what would you do first?",
    [
      "Build or repair something useful",
      "Study the facts and causes",
      "Create awareness through design or media",
      "Talk to people and understand their needs",
      "Bring people together and lead the solution",
      "Create a proper plan and maintain records",
    ],
  ],
  [
    66,
    "Which activity would you enjoy during a career fair?",
    [
      "Trying machines, tools, or demonstrations",
      "Listening to science and research talks",
      "Exploring design, media, or creative careers",
      "Talking to counsellors and people helpers",
      "Meeting entrepreneurs and leaders",
      "Understanding finance, management, and systems",
    ],
  ],
  [
    67,
    "What kind of school project partner would you prefer to be?",
    [
      "The one who builds the model",
      "The one who finds the logic",
      "The one who makes it attractive",
      "The one who helps everyone understand",
      "The one who leads and presents",
      "The one who keeps everything organized",
    ],
  ],
  [
    68,
    "Which type of career problem would you like to solve one day?",
    [
      "Making machines or systems work better",
      "Finding scientific answers",
      "Making products or ideas more beautiful",
      "Improving people's lives",
      "Growing a company or idea",
      "Managing money, data, and operations",
    ],
  ],
  [
    69,
    "Which school activity would you volunteer for first?",
    [
      "Setting up technical equipment",
      "Preparing facts and research content",
      "Designing posters or stage themes",
      "Guiding juniors or visitors",
      "Anchoring, leading, or promoting",
      "Managing registration and lists",
    ],
  ],
  [
    70,
    "If you had one full day to learn anything, what would you choose?",
    [
      "How engines, robots, or tools work",
      "How the universe, body, or technology works",
      "How to design, write, edit, or perform better",
      "How to teach, counsel, or communicate better",
      "How to sell, lead, or start a business",
      "How to manage accounts, data, and systems",
    ],
  ],
  [
    71,
    "Which type of result makes you happiest?",
    [
      "Something I built works properly",
      "I understood a difficult concept",
      "People liked my creative work",
      "Someone improved because of my help",
      "People followed my idea or leadership",
      "Everything was completed in an organized way",
    ],
  ],
  [
    72,
    "Which future task sounds most exciting?",
    [
      "Designing a useful machine or product",
      "Solving a research or technology problem",
      "Creating a brand, story, video, or design",
      "Helping students, patients, or communities",
      "Leading a team or building a business",
      "Managing finance, operations, or records",
    ],
  ],
  [
    73,
    "Which sentence best describes your working style?",
    [
      "I learn best by doing things practically.",
      "I learn best by questioning and researching.",
      "I learn best by imagining and creating.",
      "I learn best by discussing with people.",
      "I learn best by taking responsibility.",
      "I learn best by following a clear structure.",
    ],
  ],
  [
    74,
    "Which type of competition would you enjoy even if it was difficult?",
    [
      "Engineering model challenge",
      "Science research challenge",
      "Creative design challenge",
      "Social impact challenge",
      "Leadership or startup challenge",
      "Finance or data challenge",
    ],
  ],
  [
    75,
    "If your school gave you a leadership role, what would you prefer?",
    [
      "Technical operations head",
      "Research and knowledge head",
      "Creative and media head",
      "Student support head",
      "Event and strategy head",
      "Planning and documentation head",
    ],
  ],
  [
    76,
    "Which activity would you choose for a weekend workshop?",
    [
      "Robotics or electronics",
      "Science, AI, or problem solving",
      "Photography, design, or storytelling",
      "Public speaking or peer mentoring",
      "Entrepreneurship or sales",
      "Finance, Excel, or project management",
    ],
  ],
  [
    77,
    "What kind of work do you respect most?",
    [
      "Work that creates real practical things",
      "Work that discovers truth and knowledge",
      "Work that creates beauty and meaning",
      "Work that supports and improves people",
      "Work that creates growth and opportunity",
      "Work that brings order and reliability",
    ],
  ],
  [
    78,
    "Which subject project would you choose if marks were not involved?",
    [
      "Build a working science model",
      "Investigate a scientific question",
      "Create a documentary or art project",
      "Run an awareness or teaching campaign",
      "Prepare a business plan",
      "Create a data dashboard or report",
    ],
  ],
  [
    79,
    "Which type of responsibility do people usually give you?",
    [
      "Fixing or setting up things",
      "Finding information or solving doubts",
      "Making things look better",
      "Helping or explaining to others",
      "Leading or convincing people",
      "Managing details and records",
    ],
  ],
  [
    80,
    "If you had to choose one word for your natural strength, what would it be?",
    ["Practical", "Analytical", "Creative", "Helpful", "Influential", "Organized"],
  ],
];

const round5Raw = [
  [
    81,
    "Which type of real-world problem would you like to work on?",
    [
      "Building better tools, machines, or physical systems",
      "Finding scientific or technical solutions",
      "Creating better designs, stories, or experiences",
      "Helping people learn, grow, or feel supported",
      "Building businesses, teams, or opportunities",
      "Improving systems, records, and processes",
    ],
  ],
  [
    82,
    "Which task would you choose in a school career project?",
    [
      "Create a working prototype",
      "Research future career trends",
      "Design the presentation creatively",
      "Interview people and understand their needs",
      "Present the idea confidently to others",
      "Organize the data and final report",
    ],
  ],
  [
    83,
    "Which kind of achievement would feel most meaningful to you?",
    [
      "Making something useful with your hands",
      "Solving a question others found difficult",
      "Creating something people remember",
      "Helping someone choose the right path",
      "Leading a team to success",
      "Completing everything with accuracy",
    ],
  ],
  [
    84,
    "If you could join one training program, which would you choose?",
    [
      "Robotics, mechanics, or electronics training",
      "Science, coding, or research training",
      "Design, writing, music, or filmmaking training",
      "Teaching, counselling, or communication training",
      "Leadership, sales, or entrepreneurship training",
      "Accounting, Excel, planning, or management training",
    ],
  ],
  [
    85,
    "Which type of work would make you feel independent?",
    [
      "Repairing or building things myself",
      "Finding answers through research myself",
      "Creating original work myself",
      "Helping people solve problems myself",
      "Starting and leading something myself",
      "Managing tasks and responsibilities myself",
    ],
  ],
  [
    86,
    "Which role would you choose in a student-led company?",
    [
      "Product maker",
      "Research analyst",
      "Creative designer",
      "Customer support lead",
      "Sales and strategy lead",
      "Finance and operations manager",
    ],
  ],
  [
    87,
    "Which type of work would you prefer during holidays?",
    [
      "Hands-on technical internship",
      "Research or lab internship",
      "Creative design or media internship",
      "Teaching or volunteering internship",
      "Sales, marketing, or startup internship",
      "Office, accounts, or data internship",
    ],
  ],
  [
    88,
    "Which question do you usually ask first?",
    [
      "How does this work practically?",
      "Why does this happen?",
      "How can this look or feel better?",
      "How will this affect people?",
      "How can we grow or win with this?",
      "How can this be organized properly?",
    ],
  ],
  [
    89,
    "Which kind of project would you continue even without marks?",
    [
      "A working model or repair project",
      "A science or research project",
      "A creative writing, art, or video project",
      "A student help or awareness project",
      "A business or leadership project",
      "A planning, finance, or documentation project",
    ],
  ],
  [
    90,
    "Which kind of classroom activity do you enjoy most?",
    [
      "Practical demonstrations",
      "Problem-solving discussions",
      "Creative presentations",
      "Group discussions and helping others",
      "Leadership activities and debates",
      "Worksheets, records, and structured tasks",
    ],
  ],
  [
    91,
    "Which type of responsibility would you take in an annual function?",
    [
      "Sound, lights, and technical setup",
      "Researching script facts and event details",
      "Theme, decoration, and creative direction",
      "Managing students and supporting participants",
      "Leading the event and handling guests",
      "Maintaining schedules, lists, and records",
    ],
  ],
  [
    92,
    "Which future career path sounds most exciting?",
    [
      "Engineering, architecture, or technical work",
      "Science, research, medicine, or technology",
      "Design, media, writing, or performing arts",
      "Teaching, psychology, counselling, or social work",
      "Business, management, sales, or entrepreneurship",
      "Finance, administration, analytics, or operations",
    ],
  ],
  [
    93,
    "Which activity would you choose for a national-level competition?",
    [
      "Build an innovative machine",
      "Solve a scientific or mathematical problem",
      "Create a film, artwork, or story",
      "Design a social impact campaign",
      "Pitch a startup idea",
      "Create a business plan with numbers",
    ],
  ],
  [
    94,
    "Which type of feedback do you like receiving?",
    [
      "Your model works really well.",
      "Your logic and research are strong.",
      "Your idea is very creative.",
      "You helped people understand better.",
      "You led the team confidently.",
      "Your work is very organized and accurate.",
    ],
  ],
  [
    95,
    "Which area would you like to improve first?",
    [
      "Practical skills",
      "Logical and analytical thinking",
      "Creative expression",
      "Communication and empathy",
      "Leadership and confidence",
      "Planning and discipline",
    ],
  ],
  [
    96,
    "Which type of daily work routine would suit you best?",
    [
      "Doing practical tasks and solving real problems",
      "Studying, researching, and analyzing deeply",
      "Creating, designing, writing, or performing",
      "Meeting, helping, teaching, or guiding people",
      "Planning, leading, selling, or negotiating",
      "Managing data, documents, money, and systems",
    ],
  ],
  [
    97,
    "Which type of school memory would you like to be known for?",
    [
      "The student who could build or fix anything",
      "The student who could solve difficult questions",
      "The student with the most creative ideas",
      "The student who always helped others",
      "The student who led and motivated everyone",
      "The student who managed everything perfectly",
    ],
  ],
  [
    98,
    "If you had to choose one project for your portfolio, what would it be?",
    [
      "A working machine or prototype",
      "A research paper or experiment",
      "A creative design, video, or story",
      "A social service or mentoring project",
      "A startup or leadership project",
      "A dashboard, report, or organized system",
    ],
  ],
  [
    99,
    "Which type of success would satisfy you most?",
    [
      "Creating something that solves a practical problem",
      "Discovering or understanding something important",
      "Expressing ideas in a powerful and original way",
      "Making a positive difference in people's lives",
      "Building something successful with leadership",
      "Creating order, stability, and reliable results",
    ],
  ],
  [
    100,
    "At the end of Class 10, what would you like to understand about yourself?",
    [
      "What practical and technical work suits me",
      "What analytical and scientific work suits me",
      "What creative and expressive work suits me",
      "What people-focused work suits me",
      "What leadership and business work suits me",
      "What organized and detail-focused work suits me",
    ],
  ],
];

const riasecQuestionsByRound = {
  1: round1Raw.map(([questionNo, questionText, options]) =>
    makeQuestion(1, questionNo, questionText, options)
  ),
  2: round2Raw.map(([questionNo, questionText, options]) =>
    makeQuestion(2, questionNo, questionText, options)
  ),
  3: round3Raw.map(([questionNo, questionText, options]) =>
    makeQuestion(3, questionNo, questionText, options)
  ),
  4: round4Raw.map(([questionNo, questionText, options]) =>
    makeQuestion(4, questionNo, questionText, options)
  ),
  5: round5Raw.map(([questionNo, questionText, options]) =>
    makeQuestion(5, questionNo, questionText, options)
  ),
};

const aptitudeScoring = {
  type: "correct-answer",
  correctScore: 1,
  wrongScore: 0,
};

function makeAptitudeQuestion(round, questionNo, questionText, options, correctKey, dimension, explanation = "") {
  return {
    id: `aptitude-r${round}-q${questionNo}`,
    _id: `aptitude-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "aptitude",
    testName: "Aptitude Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options: options.map((text, index) => ({
      key: String.fromCharCode(65 + index),
      text,
      score: String.fromCharCode(65 + index) === correctKey ? 1 : 0,
      isCorrect: String.fromCharCode(65 + index) === correctKey,
    })),
    correctAnswer: correctKey,
    explanation,
    scoring: aptitudeScoring,
    isActive: true,
    active: true,
  };
}

const aptitudeRound1Raw = [
  [
    1,
    "If 12 notebooks cost ₹180, what is the cost of 1 notebook?",
    ["₹10", "₹12", "₹15", "₹18"],
    "C",
    "Numerical Ability",
    "180 divided by 12 equals 15.",
  ],
  [
    2,
    "Find the next number in the series: 2, 4, 8, 16, ?",
    ["20", "24", "30", "32"],
    "D",
    "Each number is multiplied by 2.",
  ],
  [
    3,
    "A train covers 120 km in 2 hours. What is its speed?",
    ["40 km/h", "50 km/h", "60 km/h", "80 km/h"],
    "C",
    "Speed",
    "Speed = Distance / Time = 120 / 2 = 60 km/h.",
  ],
  [
    4,
    "Which word does not belong to the group?",
    ["Apple", "Mango", "Carrot", "Banana"],
    "C",
    "Logical Classification",
    "Carrot is a vegetable, others are fruits.",
  ],
  [
    5,
    "If A = 1, B = 2, C = 3, then what is the value of DOG?",
    ["24", "25", "26", "27"],
    "C",
    "Coding-Decoding",
    "D = 4, O = 15, G = 7. Total = 26.",
  ],
  [
    6,
    "A person buys a pen for ₹20 and sells it for ₹25. What is the profit?",
    ["₹3", "₹5", "₹10", "₹15"],
    "B",
    "Profit and Loss",
    "Profit = Selling Price - Cost Price = 25 - 20 = 5.",
  ],
  [
    7,
    "Complete the analogy: Doctor is to Hospital as Teacher is to ____.",
    ["Book", "School", "Student", "Class"],
    "B",
    "Verbal Reasoning",
    "A doctor works in a hospital; a teacher works in a school.",
  ],
  [
    8,
    "What is 25% of 200?",
    ["25", "40", "50", "100"],
    "C",
    "Percentage",
    "25% of 200 = 200 × 25 / 100 = 50.",
  ],
  [
    9,
    "Which number is missing: 5, 10, 15, __, 25",
    ["18", "20", "22", "24"],
    "B",
    "Number Series",
    "The series increases by 5.",
  ],
  [
    10,
    "If today is Monday, what day will it be after 10 days?",
    ["Wednesday", "Thursday", "Friday", "Saturday"],
    "B",
    "Calendar Reasoning",
    "10 days after Monday is Thursday.",
  ],
  [
    11,
    "A rectangle has length 10 cm and breadth 5 cm. What is its area?",
    ["15 sq cm", "30 sq cm", "50 sq cm", "100 sq cm"],
    "C",
    "Mensuration",
    "Area = length × breadth = 10 × 5 = 50.",
  ],
  [
    12,
    "Find the odd one out.",
    ["Square", "Circle", "Triangle", "Cube"],
    "D",
    "Logical Classification",
    "Cube is a 3D shape; others are 2D shapes.",
  ],
  [
    13,
    "If 6 workers complete a task in 4 days, how many worker-days are needed?",
    ["10", "12", "24", "30"],
    "C",
    "Work and Time",
    "Worker-days = workers × days = 6 × 4 = 24.",
  ],
  [
    14,
    "Which is the smallest fraction?",
    ["1/2", "1/3", "1/4", "1/5"],
    "D",
    "Fractions",
    "Among unit fractions, larger denominator means smaller value.",
  ],
  [
    15,
    "If CAT is coded as DBU, how is DOG coded?",
    ["EPH", "FQI", "DPH", "ENH"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: D→E, O→P, G→H.",
  ],
  [
    16,
    "A shopkeeper gives 10% discount on ₹500. What is the discount amount?",
    ["₹25", "₹40", "₹50", "₹100"],
    "C",
    "Percentage",
    "10% of 500 = 50.",
  ],
  [
    17,
    "Find the next number: 3, 6, 12, 24, ?",
    ["30", "36", "42", "48"],
    "D",
    "Number Series",
    "Each number is multiplied by 2.",
  ],
  [
    18,
    "Which word is opposite of 'Expand'?",
    ["Increase", "Extend", "Reduce", "Open"],
    "C",
    "Verbal Ability",
    "The opposite of expand is reduce or contract.",
  ],
  [
    19,
    "If 9 + 6 = 15, then 15 - 6 = ?",
    ["6", "7", "8", "9"],
    "D",
    "Basic Arithmetic",
    "15 minus 6 equals 9.",
  ],
  [
    20,
    "A clock shows 3:00. What is the angle between hour and minute hand?",
    ["60°", "75°", "90°", "120°"],
    "C",
    "Clock Reasoning",
    "At 3:00, the hands are at right angle, so angle is 90°.",
  ],
];
const aptitudeRound2Raw = [
  [
    21,
    "A shopkeeper sells an item for ₹240 after giving a 20% discount. What was the marked price?",
    ["₹260", "₹280", "₹300", "₹320"],
    "C",
    "Percentage",
    "If selling price is 80% of marked price, marked price = 240 / 0.8 = 300.",
  ],
  [
    22,
    "Find the next number: 7, 14, 28, 56, ?",
    ["84", "98", "112", "120"],
    "C",
    "Number Series",
    "Each number is multiplied by 2. So 56 × 2 = 112.",
  ],
  [
    23,
    "If 15 pens cost ₹225, what is the cost of 8 pens?",
    ["₹100", "₹110", "₹120", "₹150"],
    "C",
    "Ratio and Proportion",
    "Cost of 1 pen = 225 / 15 = 15. Cost of 8 pens = 8 × 15 = 120.",
  ],
  [
    24,
    "Which number does not belong to the group?",
    ["16", "25", "36", "45"],
    "D",
    "Logical Classification",
    "16, 25, and 36 are perfect squares. 45 is not a perfect square.",
  ],
  [
    25,
    "If ROSE is coded as SPTF, how is LION coded?",
    ["MJPO", "KJNM", "MJON", "NJPO"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: L→M, I→J, O→P, N→O.",
  ],
  [
    26,
    "A student scored 72 marks out of 90. What is the percentage?",
    ["70%", "75%", "80%", "85%"],
    "C",
    "Percentage",
    "Percentage = 72 / 90 × 100 = 80%.",
  ],
  [
    27,
    "Complete the analogy: Finger is to Hand as Toe is to ____.",
    ["Leg", "Foot", "Arm", "Knee"],
    "B",
    "Verbal Reasoning",
    "Finger is part of a hand; toe is part of a foot.",
  ],
  [
    28,
    "A car travels 180 km in 3 hours. What is its speed?",
    ["50 km/h", "55 km/h", "60 km/h", "65 km/h"],
    "C",
    "Speed",
    "Speed = Distance / Time = 180 / 3 = 60 km/h.",
  ],
  [
    29,
    "Find the missing number: 4, 9, 16, 25, ?",
    ["30", "32", "36", "49"],
    "C",
    "Number Series",
    "The series is squares: 2², 3², 4², 5², so next is 6² = 36.",
  ],
  [
    30,
    "If the cost price is ₹500 and profit is ₹100, what is the selling price?",
    ["₹400", "₹500", "₹600", "₹700"],
    "C",
    "Profit and Loss",
    "Selling Price = Cost Price + Profit = 500 + 100 = 600.",
  ],
  [
    31,
    "Which word is opposite of 'Ancient'?",
    ["Old", "Modern", "Historic", "Past"],
    "B",
    "Verbal Ability",
    "The opposite of ancient is modern.",
  ],
  [
    32,
    "A square has side 9 cm. What is its area?",
    ["18 sq cm", "36 sq cm", "72 sq cm", "81 sq cm"],
    "D",
    "Mensuration",
    "Area of square = side × side = 9 × 9 = 81 sq cm.",
  ],
  [
    33,
    "If 3x = 27, what is the value of x?",
    ["6", "7", "8", "9"],
    "D",
    "Algebra",
    "x = 27 / 3 = 9.",
  ],
  [
    34,
    "Find the odd one out.",
    ["Chair", "Table", "Bench", "Shirt"],
    "D",
    "Logical Classification",
    "Chair, table, and bench are furniture. Shirt is clothing.",
  ],
  [
    35,
    "What is the average of 10, 20, 30, and 40?",
    ["20", "25", "30", "35"],
    "B",
    "Average",
    "Average = (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25.",
  ],
  [
    36,
    "If BOOK is coded as CPPL, how is PEN coded?",
    ["QFO", "ODM", "QEN", "RFO"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: P→Q, E→F, N→O.",
  ],
  [
    37,
    "A man spends ₹350 out of ₹500. How much percentage did he spend?",
    ["60%", "65%", "70%", "75%"],
    "C",
    "Percentage",
    "Percentage spent = 350 / 500 × 100 = 70%.",
  ],
  [
    38,
    "Find the next number: 1, 4, 9, 16, 25, ?",
    ["30", "35", "36", "49"],
    "C",
    "Number Series",
    "The series is perfect squares: 1², 2², 3², 4², 5², so next is 6² = 36.",
  ],
  [
    39,
    "If 8 workers complete a job in 5 days, how many worker-days are required?",
    ["13", "20", "35", "40"],
    "D",
    "Work and Time",
    "Worker-days = workers × days = 8 × 5 = 40.",
  ],
  [
    40,
    "At 6:00, what is the angle between the hour hand and minute hand?",
    ["90°", "120°", "150°", "180°"],
    "D",
    "Clock Reasoning",
    "At 6:00, the hands are opposite each other, so the angle is 180°.",
  ],
];
const aptitudeRound3Raw = [
  [
    41,
    "If a number is doubled and then 6 is added, the result is 26. What is the number?",
    ["8", "10", "12", "14"],
    "B",
    "Algebra",
    "Let the number be x. 2x + 6 = 26, so 2x = 20 and x = 10.",
  ],
  [
    42,
    "Find the next number: 5, 11, 23, 47, ?",
    ["92", "94", "95", "96"],
    "C",
    "Number Series",
    "Each number is multiplied by 2 and then 1 is added: 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95.",
  ],
  [
    43,
    "A person walks 3 km north, then 4 km east. How far is he from the starting point?",
    ["5 km", "6 km", "7 km", "8 km"],
    "A",
    "Direction and Distance",
    "Using Pythagoras theorem: distance = √(3² + 4²) = √25 = 5 km.",
  ],
  [
    44,
    "What is 15% of 600?",
    ["60", "75", "90", "120"],
    "C",
    "Percentage",
    "15% of 600 = 600 × 15 / 100 = 90.",
  ],
  [
    45,
    "If the ratio of boys to girls is 3:2 and there are 30 students, how many boys are there?",
    ["12", "15", "18", "20"],
    "C",
    "Ratio and Proportion",
    "Total ratio parts = 3 + 2 = 5. Boys = 3/5 × 30 = 18.",
  ],
  [
    46,
    "Complete the analogy: Pen is to Write as Knife is to ____.",
    ["Cut", "Eat", "Cook", "Hold"],
    "A",
    "Verbal Reasoning",
    "A pen is used to write; a knife is used to cut.",
  ],
  [
    47,
    "Find the odd one out.",
    ["Red", "Blue", "Green", "Circle"],
    "D",
    "Logical Classification",
    "Red, blue, and green are colours. Circle is a shape.",
  ],
  [
    48,
    "A number is increased by 20% and becomes 120. What was the original number?",
    ["80", "90", "100", "110"],
    "C",
    "Percentage",
    "120 is 120% of the original number. Original number = 120 / 1.2 = 100.",
  ],
  [
    49,
    "If 5 pencils cost ₹35, what is the cost of 12 pencils?",
    ["₹72", "₹78", "₹84", "₹90"],
    "C",
    "Ratio and Proportion",
    "Cost of 1 pencil = 35 / 5 = 7. Cost of 12 pencils = 12 × 7 = 84.",
  ],
  [
    50,
    "Find the next number: 81, 27, 9, 3, ?",
    ["0", "1", "2", "6"],
    "B",
    "Number Series",
    "Each number is divided by 3. So 3 / 3 = 1.",
  ],
  [
    51,
    "If TABLE is coded as UBCMF, how is CHAIR coded?",
    ["DIBJS", "DHAJS", "DIBIR", "CGZHQ"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: C→D, H→I, A→B, I→J, R→S.",
  ],
  [
    52,
    "A tank can be filled in 6 hours. How much of the tank is filled in 2 hours?",
    ["1/2", "1/3", "1/4", "2/3"],
    "B",
    "Work and Time",
    "In 1 hour, 1/6 tank is filled. In 2 hours, 2/6 = 1/3 tank is filled.",
  ],
  [
    53,
    "The perimeter of a square is 48 cm. What is the length of one side?",
    ["8 cm", "10 cm", "12 cm", "16 cm"],
    "C",
    "Mensuration",
    "Perimeter of square = 4 × side. Side = 48 / 4 = 12 cm.",
  ],
  [
    54,
    "Which word is opposite of 'Brave'?",
    ["Bold", "Strong", "Cowardly", "Fearless"],
    "C",
    "Verbal Ability",
    "The opposite of brave is cowardly.",
  ],
  [
    55,
    "If 7 + 3 = 20, 8 + 4 = 24, then 9 + 5 = ? using the same pattern.",
    ["26", "27", "28", "30"],
    "C",
    "Pattern Recognition",
    "The pattern is (first number + second number) × 2. So (9 + 5) × 2 = 28.",
  ],
  [
    56,
    "A student gets 45 marks out of 60. What is the percentage?",
    ["65%", "70%", "75%", "80%"],
    "C",
    "Percentage",
    "Percentage = 45 / 60 × 100 = 75%.",
  ],
  [
    57,
    "If one dozen bananas cost ₹60, what is the cost of 5 bananas?",
    ["₹20", "₹25", "₹30", "₹35"],
    "B",
    "Unitary Method",
    "One dozen = 12 bananas. Cost of 1 banana = 60 / 12 = 5. Cost of 5 bananas = 25.",
  ],
  [
    58,
    "At 9:00, what is the angle between the hour hand and minute hand?",
    ["60°", "90°", "120°", "180°"],
    "B",
    "Clock Reasoning",
    "At 9:00, the hands form a right angle, so the angle is 90°.",
  ],
  [
    59,
    "Find the missing number: 2, 6, 12, 20, 30, ?",
    ["36", "40", "42", "45"],
    "C",
    "Number Series",
    "The differences are 4, 6, 8, 10. Next difference is 12, so 30 + 12 = 42.",
  ],
  [
    60,
    "A shirt costs ₹800. After a 25% discount, what is the selling price?",
    ["₹500", "₹550", "₹600", "₹650"],
    "C",
    "Percentage",
    "25% of 800 = 200. Selling price = 800 - 200 = 600.",
  ],
];
const aptitudeRound4Raw = [
  [
    61,
    "If the simple interest on ₹2000 for 2 years is ₹400, what is the rate of interest per year?",
    ["5%", "8%", "10%", "12%"],
    "C",
    "Simple Interest",
    "Simple Interest = P × R × T / 100. So 400 = 2000 × R × 2 / 100. R = 10%.",
  ],
  [
    62,
    "Find the next number: 2, 6, 18, 54, ?",
    ["108", "120", "144", "162"],
    "D",
    "Number Series",
    "Each number is multiplied by 3. So 54 × 3 = 162.",
  ],
  [
    63,
    "A man sells an item for ₹750 and makes a profit of ₹150. What was the cost price?",
    ["₹500", "₹550", "₹600", "₹650"],
    "C",
    "Profit and Loss",
    "Cost Price = Selling Price - Profit = 750 - 150 = 600.",
  ],
  [
    64,
    "If 4 kg of rice costs ₹240, what is the cost of 7 kg of rice?",
    ["₹360", "₹400", "₹420", "₹480"],
    "C",
    "Unitary Method",
    "Cost of 1 kg = 240 / 4 = 60. Cost of 7 kg = 7 × 60 = 420.",
  ],
  [
    65,
    "Choose the odd one out.",
    ["January", "March", "June", "July"],
    "C",
    "Logical Classification",
    "January, March, and July have 31 days. June has 30 days.",
  ],
  [
    66,
    "If MOBILE is coded as NPCJMF, how is TABLE coded?",
    ["UBCMF", "SZAJD", "UBDMF", "UACMF"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: T→U, A→B, B→C, L→M, E→F.",
  ],
  [
    67,
    "A student answered 36 questions correctly out of 45. What percentage is correct?",
    ["75%", "80%", "85%", "90%"],
    "B",
    "Percentage",
    "Percentage = 36 / 45 × 100 = 80%.",
  ],
  [
    68,
    "Complete the analogy: Book is to Reading as Food is to ____.",
    ["Cooking", "Eating", "Buying", "Serving"],
    "B",
    "Verbal Reasoning",
    "A book is used for reading; food is used for eating.",
  ],
  [
    69,
    "Find the missing number: 3, 8, 15, 24, 35, ?",
    ["46", "47", "48", "49"],
    "C",
    "Number Series",
    "Differences are 5, 7, 9, 11. Next difference is 13, so 35 + 13 = 48.",
  ],
  [
    70,
    "A rectangle has area 96 sq cm and length 12 cm. What is its breadth?",
    ["6 cm", "8 cm", "10 cm", "12 cm"],
    "B",
    "Mensuration",
    "Breadth = Area / Length = 96 / 12 = 8 cm.",
  ],
  [
    71,
    "Which word is opposite of 'Temporary'?",
    ["Short", "Permanent", "Weak", "Small"],
    "B",
    "Verbal Ability",
    "The opposite of temporary is permanent.",
  ],
  [
    72,
    "If the average of 5 numbers is 20, what is their total sum?",
    ["80", "90", "100", "120"],
    "C",
    "Average",
    "Total sum = Average × Number of values = 20 × 5 = 100.",
  ],
  [
    73,
    "A train running at 80 km/h covers a distance in 3 hours. What distance does it cover?",
    ["160 km", "200 km", "220 km", "240 km"],
    "D",
    "Speed Distance Time",
    "Distance = Speed × Time = 80 × 3 = 240 km.",
  ],
  [
    74,
    "If 18 is 30% of a number, what is the number?",
    ["50", "55", "60", "65"],
    "C",
    "Percentage",
    "Number = 18 × 100 / 30 = 60.",
  ],
  [
    75,
    "Find the next number: 10, 20, 40, 80, ?",
    ["100", "120", "140", "160"],
    "D",
    "Number Series",
    "Each number is multiplied by 2. So 80 × 2 = 160.",
  ],
  [
    76,
    "If the side of a square is doubled, what happens to its area?",
    ["It becomes double", "It becomes triple", "It becomes four times", "It remains same"],
    "C",
    "Mensuration",
    "Area of square depends on side × side. Doubling side makes area 4 times.",
  ],
  [
    77,
    "A sum of ₹900 is divided among A, B, and C in the ratio 2:3:4. What is B's share?",
    ["₹200", "₹300", "₹400", "₹500"],
    "B",
    "Ratio and Proportion",
    "Total parts = 2 + 3 + 4 = 9. B's share = 3/9 × 900 = 300.",
  ],
  [
    78,
    "If EARTH is coded as FBSUI, how is WATER coded?",
    ["XBUFS", "VZSDQ", "XATFS", "XBUDS"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: W→X, A→B, T→U, E→F, R→S.",
  ],
  [
    79,
    "At 12:30, approximately what is the angle between the hour hand and minute hand?",
    ["150°", "165°", "180°", "195°"],
    "B",
    "Clock Reasoning",
    "At 12:30, minute hand is at 6 and hour hand is halfway between 12 and 1. Angle = 165°.",
  ],
  [
    80,
    "A number when divided by 8 gives quotient 12 and remainder 5. What is the number?",
    ["91", "96", "101", "105"],
    "C",
    "Basic Arithmetic",
    "Number = divisor × quotient + remainder = 8 × 12 + 5 = 101.",
  ],
];
const aptitudeRound5Raw = [
  [
    81,
    "If 40% of a number is 160, what is the number?",
    ["300", "350", "400", "450"],
    "C",
    "Percentage",
    "Number = 160 × 100 / 40 = 400.",
  ],
  [
    82,
    "Find the next number: 4, 10, 22, 46, ?",
    ["88", "92", "94", "96"],
    "C",
    "Number Series",
    "Each number is multiplied by 2 and then 2 is added. 46 × 2 + 2 = 94.",
  ],
  [
    83,
    "A shopkeeper buys an item for ₹700 and sells it for ₹840. What is the profit percentage?",
    ["15%", "18%", "20%", "25%"],
    "C",
    "Profit and Loss",
    "Profit = 840 - 700 = 140. Profit percentage = 140 / 700 × 100 = 20%.",
  ],
  [
    84,
    "If 9 books cost ₹720, what is the cost of 5 books?",
    ["₹360", "₹380", "₹400", "₹420"],
    "C",
    "Unitary Method",
    "Cost of 1 book = 720 / 9 = 80. Cost of 5 books = 5 × 80 = 400.",
  ],
  [
    85,
    "Choose the odd one out.",
    ["Mercury", "Venus", "Earth", "Moon"],
    "D",
    "Logical Classification",
    "Mercury, Venus, and Earth are planets. Moon is a satellite.",
  ],
  [
    86,
    "If SCHOOL is coded as TDIPPM, how is CLASS coded?",
    ["DMBTT", "BKBSS", "DLAUT", "DMBSS"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: C→D, L→M, A→B, S→T, S→T.",
  ],
  [
    87,
    "A student scored 84 marks out of 120. What is the percentage?",
    ["60%", "65%", "70%", "75%"],
    "C",
    "Percentage",
    "Percentage = 84 / 120 × 100 = 70%.",
  ],
  [
    88,
    "Complete the analogy: Bird is to Nest as Bee is to ____.",
    ["Hive", "Tree", "Honey", "Flower"],
    "A",
    "Verbal Reasoning",
    "A bird lives in a nest; a bee lives in a hive.",
  ],
  [
    89,
    "Find the missing number: 6, 12, 20, 30, 42, ?",
    ["54", "56", "58", "60"],
    "B",
    "Number Series",
    "Differences are 6, 8, 10, 12. Next difference is 14, so 42 + 14 = 56.",
  ],
  [
    90,
    "A rectangle has perimeter 50 cm. Its length is 15 cm. What is its breadth?",
    ["8 cm", "10 cm", "12 cm", "15 cm"],
    "B",
    "Mensuration",
    "Perimeter = 2(length + breadth). 50 = 2(15 + breadth), so breadth = 10 cm.",
  ],
  [
    91,
    "Which word is opposite of 'Transparent'?",
    ["Clear", "Visible", "Opaque", "Bright"],
    "C",
    "Verbal Ability",
    "The opposite of transparent is opaque.",
  ],
  [
    92,
    "The average of 6 numbers is 18. What is their total sum?",
    ["96", "100", "108", "112"],
    "C",
    "Average",
    "Total sum = average × number of values = 18 × 6 = 108.",
  ],
  [
    93,
    "A cyclist travels at 15 km/h for 4 hours. What distance does he cover?",
    ["45 km", "50 km", "55 km", "60 km"],
    "D",
    "Speed Distance Time",
    "Distance = Speed × Time = 15 × 4 = 60 km.",
  ],
  [
    94,
    "If 24 is 60% of a number, what is the number?",
    ["36", "40", "44", "48"],
    "B",
    "Percentage",
    "Number = 24 × 100 / 60 = 40.",
  ],
  [
    95,
    "Find the next number: 100, 50, 25, 12.5, ?",
    ["5", "6", "6.25", "7.5"],
    "C",
    "Number Series",
    "Each number is divided by 2. 12.5 / 2 = 6.25.",
  ],
  [
    96,
    "If the radius of a circle is doubled, what happens to its area?",
    ["It becomes double", "It becomes triple", "It becomes four times", "It remains same"],
    "C",
    "Mensuration",
    "Area of circle is proportional to radius squared. Doubling radius makes area four times.",
  ],
  [
    97,
    "A sum of ₹1200 is divided in the ratio 1:2:3. What is the largest share?",
    ["₹200", "₹400", "₹600", "₹800"],
    "C",
    "Ratio and Proportion",
    "Total parts = 1 + 2 + 3 = 6. Largest share = 3/6 × 1200 = 600.",
  ],
  [
    98,
    "If LIGHT is coded as MJHIU, how is POWER coded?",
    ["QPXFS", "OPVDQ", "QPXER", "QPWFS"],
    "A",
    "Coding-Decoding",
    "Each letter is shifted by +1: P→Q, O→P, W→X, E→F, R→S.",
  ],
  [
    99,
    "At 3:30, approximately what is the angle between the hour hand and minute hand?",
    ["60°", "75°", "90°", "105°"],
    "B",
    "Clock Reasoning",
    "At 3:30, minute hand is at 6 and hour hand is between 3 and 4. Angle = 75°.",
  ],
  [
    100,
    "A number when multiplied by 7 gives 119. What is the number?",
    ["15", "16", "17", "18"],
    "C",
    "Basic Arithmetic",
    "Number = 119 / 7 = 17.",
  ],
];
const aptitudeQuestionsByRound = {
  1: aptitudeRound1Raw.map(
    ([questionNo, questionText, options, correctKey, dimension, explanation]) =>
      makeAptitudeQuestion(
        1,
        questionNo,
        questionText,
        options,
        correctKey,
        dimension,
        explanation
      )
  ),
  2: aptitudeRound2Raw.map(
    ([questionNo, questionText, options, correctKey, dimension, explanation]) =>
      makeAptitudeQuestion(
        2,
        questionNo,
        questionText,
        options,
        correctKey,
        dimension,
        explanation
      )
  ),
  3: aptitudeRound3Raw.map(
    ([questionNo, questionText, options, correctKey, dimension, explanation]) =>
      makeAptitudeQuestion(
        3,
        questionNo,
        questionText,
        options,
        correctKey,
        dimension,
        explanation
      )
  ),
  4: aptitudeRound4Raw.map(
    ([questionNo, questionText, options, correctKey, dimension, explanation]) =>
      makeAptitudeQuestion(
        4,
        questionNo,
        questionText,
        options,
        correctKey,
        dimension,
        explanation
      )
  ),
  5: aptitudeRound5Raw.map(
    ([questionNo, questionText, options, correctKey, dimension, explanation]) =>
      makeAptitudeQuestion(
        5,
        questionNo,
        questionText,
        options,
        correctKey,
        dimension,
        explanation
      )
  ),
};
/* =========================================================
   PERSONALITY QUESTIONS
========================================================= */

const personalityRound1Raw = [
  [
    1,
    "I love trying out new hobbies and learning about subjects that are not in the syllabus.",
    "openness",
    false,
    "Measures curiosity and willingness to explore new ideas.",
  ],
  [
    2,
    "I always complete my homework and practical files before the deadline.",
    "conscientiousness",
    false,
    "Measures discipline, organization, and responsibility.",
  ],
  [
    3,
    "I feel energized when I participate in group discussions or debates in class.",
    "extraversion",
    false,
    "Measures sociability and energy drawn from interacting with others.",
  ],
  [
    4,
    "I prefer to help my classmates with their doubts rather than keeping my notes to myself.",
    "agreeableness",
    false,
    "Measures teamwork, empathy, and willingness to help others.",
  ],
  [
    5,
    "I stay calm and focused even when the teacher announces a surprise test.",
    "emotional-stability",
    false,
    "Measures ability to handle stress and remain composed.",
  ],
  [
    6,
    "I prefer to stick to a fixed daily routine and avoid trying new methods to study.",
    "openness",
    true,
    "Reverse-scored: Measures preference for routine over novelty.",
  ],
  [
    7,
    "I often misplace my stationery or forget to bring the right books to school.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures tendency towards disorganization.",
  ],
  [
    8,
    "I feel shy and hesitant when asked to read aloud in front of the whole class.",
    "extraversion",
    true,
    "Reverse-scored: Measures introversion and discomfort in the spotlight.",
  ],
  [
    9,
    "I sometimes argue with my project group members if they don't do things my way.",
    "agreeableness",
    true,
    "Reverse-scored: Measures stubbornness and difficulty in collaboration.",
  ],
  [
    10,
    "I get easily stressed and anxious when terminal exams are approaching.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures tendency to experience anxiety under pressure.",
  ],
  [
    11,
    "I enjoy school exhibitions and science fairs because I get to see creative ideas.",
    "openness",
    false,
    "Measures appreciation for creativity and innovation.",
  ],
  [
    12,
    "I create a study timetable for my exams and strictly follow it.",
    "conscientiousness",
    false,
    "Measures planning and goal-oriented behavior.",
  ],
  [
    13,
    "I am usually the first one to start a conversation with a new student in school.",
    "extraversion",
    false,
    "Measures outgoing nature and social confidence.",
  ],
  [
    14,
    "I am a good listener when my friends share their problems with me.",
    "agreeableness",
    false,
    "Measures compassion and emotional supportiveness.",
  ],
  [
    15,
    "I can quickly bounce back and focus on the next subject if I perform poorly in a unit test.",
    "emotional-stability",
    false,
    "Measures resilience and emotional recovery.",
  ],
  [
    16,
    "I find subjects that require a lot of imagination or creative writing quite boring.",
    "openness",
    true,
    "Reverse-scored: Measures lack of interest in creative tasks.",
  ],
  [
    17,
    "I tend to start preparing for my exams at the very last minute.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures tendency to procrastinate.",
  ],
  [
    18,
    "I prefer working alone on a project rather than being part of a large team.",
    "extraversion",
    true,
    "Reverse-scored: Measures preference for solitary work.",
  ],
  [
    19,
    "I find it hard to forgive classmates who make mistakes or accidentally trouble me.",
    "agreeableness",
    true,
    "Reverse-scored: Measures tendency to hold grudges.",
  ],
  [
    20,
    "My mood gets easily ruined if I get scolded by a teacher or parent.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures emotional sensitivity to criticism.",
  ],
];

const personalityRound2Raw = [
  [
    21,
    "I enjoy solving puzzles, riddles, or thinking about complex logical problems.",
    "openness",
    false,
    "Measures intellectual curiosity and problem-solving interest.",
  ],
  [
    22,
    "I make sure my notebooks are neat, well-maintained, and up-to-date.",
    "conscientiousness",
    false,
    "Measures diligence and attention to detail.",
  ],
  [
    23,
    "I actively participate in school events, annual days, or sports competitions.",
    "extraversion",
    false,
    "Measures enthusiasm and involvement in group activities.",
  ],
  [
    24,
    "I try to make sure everyone in my group gets a chance to speak during a presentation.",
    "agreeableness",
    false,
    "Measures fairness and inclusivity in teamwork.",
  ],
  [
    25,
    "I am able to think clearly and not panic when a difficult question appears in the exam.",
    "emotional-stability",
    false,
    "Measures mental clarity under unexpected pressure.",
  ],
  [
    26,
    "I dislike it when teachers use new teaching methods instead of the traditional textbook approach.",
    "openness",
    true,
    "Reverse-scored: Measures resistance to new experiences.",
  ],
  [
    27,
    "I often leave my study desk messy and disorganized.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures lack of orderliness.",
  ],
  [
    28,
    "I try to stay in the background and avoid getting noticed by the teacher.",
    "extraversion",
    true,
    "Reverse-scored: Measures desire to avoid attention.",
  ],
  [
    29,
    "I think it is more important to win a class competition than to play fair and be nice.",
    "agreeableness",
    true,
    "Reverse-scored: Measures high competitiveness over cooperation.",
  ],
  [
    30,
    "I worry a lot about what stream (Science, Commerce, Arts) my parents will force me into.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures anticipatory anxiety regarding the future.",
  ],
  [
    31,
    "I like asking 'what if' questions and exploring different possibilities in science or history.",
    "openness",
    false,
    "Measures imaginative thinking and inquisitiveness.",
  ],
  [
    32,
    "I pay close attention to details and check my answer sheet for silly mistakes before submitting.",
    "conscientiousness",
    false,
    "Measures carefulness and thoroughness.",
  ],
  [
    33,
    "I enjoy leading the team or being the group captain in school activities.",
    "extraversion",
    false,
    "Measures leadership tendencies and assertiveness.",
  ],
  [
    34,
    "I feel bad and try to comfort classmates who are feeling down or left out.",
    "agreeableness",
    false,
    "Measures sympathy and emotional awareness of others.",
  ],
  [
    35,
    "I do not let small setbacks, like a bad day at school, affect my overall happiness.",
    "emotional-stability",
    false,
    "Measures general mood stability.",
  ],
  [
    36,
    "I have little interest in exploring topics outside my syllabus, like art, music, or foreign cultures.",
    "openness",
    true,
    "Reverse-scored: Measures narrow interests.",
  ],
  [
    37,
    "I often promise to study but end up wasting time watching videos or playing games.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures impulsivity and lack of self-discipline.",
  ],
  [
    38,
    "I feel exhausted after spending a long day surrounded by loud classmates.",
    "extraversion",
    true,
    "Reverse-scored: Measures introverted energy drain.",
  ],
  [
    39,
    "I sometimes make fun of others or pass sarcastic comments if I am irritated.",
    "agreeableness",
    true,
    "Reverse-scored: Measures irritability and lack of tact.",
  ],
  [
    40,
    "I often feel overwhelmed by the pressure of scoring good marks in Class 10.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures susceptibility to academic pressure.",
  ],
];

const personalityRound3Raw = [
  [
    41,
    "I am fascinated by new technology and love understanding how apps or gadgets work.",
    "openness",
    false,
    "Measures intellectual curiosity regarding technology.",
  ],
  [
    42,
    "I set clear goals for my grades and work consistently hard to achieve them.",
    "conscientiousness",
    false,
    "Measures ambition and work ethic.",
  ],
  [
    43,
    "I love organizing farewells, class parties, or casual meetups with friends.",
    "extraversion",
    false,
    "Measures social engagement and event planning interest.",
  ],
  [
    44,
    "I readily share my pens, notes, or lunch with friends if they need it.",
    "agreeableness",
    false,
    "Measures generosity and helpfulness.",
  ],
  [
    45,
    "I take constructive feedback from teachers positively without feeling insulted.",
    "emotional-stability",
    false,
    "Measures secure self-esteem and acceptance of criticism.",
  ],
  [
    46,
    "I prefer subjects that have clear right or wrong answers over subjects that require my own opinions.",
    "openness",
    true,
    "Reverse-scored: Measures preference for black-and-white thinking.",
  ],
  [
    47,
    "I struggle to keep track of when my assignments and practical files are due.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures poor time management.",
  ],
  [
    48,
    "I would rather sit quietly and observe than actively participate in class debates.",
    "extraversion",
    true,
    "Reverse-scored: Measures passive social participation.",
  ],
  [
    49,
    "I hold grudges against friends if we have a disagreement.",
    "agreeableness",
    true,
    "Reverse-scored: Measures difficulty in forgiving.",
  ],
  [
    50,
    "I often feel like things are completely out of my control when the syllabus is huge.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures feelings of helplessness.",
  ],
  [
    51,
    "I like to read books, articles, or watch documentaries outside of my school syllabus.",
    "openness",
    false,
    "Measures broad intellectual interests.",
  ],
  [
    52,
    "I always cross-check my school bag to ensure I have packed all the necessary books for the next day.",
    "conscientiousness",
    false,
    "Measures preparedness and reliability.",
  ],
  [
    53,
    "I feel comfortable speaking to my school principal or senior teachers when needed.",
    "extraversion",
    false,
    "Measures confidence in interacting with authority figures.",
  ],
  [
    54,
    "I try to mediate and solve arguments calmly if my friends are fighting.",
    "agreeableness",
    false,
    "Measures peacemaking and conflict resolution skills.",
  ],
  [
    55,
    "I can handle the pressure of multiple assignments given in the same week without panicking.",
    "emotional-stability",
    false,
    "Measures capacity to handle workload stress.",
  ],
  [
    56,
    "I rarely daydream or think about unconventional, out-of-the-box career options.",
    "openness",
    true,
    "Reverse-scored: Measures practical, concrete thinking.",
  ],
  [
    57,
    "I tend to give up easily when a math problem or concept gets too difficult.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures lack of perseverance.",
  ],
  [
    58,
    "I hesitate to raise my hand to answer a question, even if I know the correct answer.",
    "extraversion",
    true,
    "Reverse-scored: Measures self-doubt in public settings.",
  ],
  [
    59,
    "I am highly competitive and sometimes feel jealous if a classmate scores more than me.",
    "agreeableness",
    true,
    "Reverse-scored: Measures rivalry and envy.",
  ],
  [
    60,
    "I frequently experience mood swings during my exam preparation period.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures emotional volatility.",
  ],
];

const personalityRound4Raw = [
  [
    61,
    "I enjoy activities that require me to be creative, like drawing, writing poems, or coding.",
    "openness",
    false,
    "Measures affinity for artistic and creative expression.",
  ],
  [
    62,
    "I am known among my friends as someone who is responsible and dependable.",
    "conscientiousness",
    false,
    "Measures reliability and trustworthiness.",
  ],
  [
    63,
    "I easily make friends with students from other sections or classes.",
    "extraversion",
    false,
    "Measures sociability and networking ability.",
  ],
  [
    64,
    "I treat school staff, like peons and bus drivers, with a lot of respect and politeness.",
    "agreeableness",
    false,
    "Measures humility and respect for others.",
  ],
  [
    65,
    "I can concentrate on my studies even if there is a little noise or distraction around me.",
    "emotional-stability",
    false,
    "Measures focus and resistance to external frustration.",
  ],
  [
    66,
    "I think spending time on co-curricular activities is a waste of time compared to studying.",
    "openness",
    true,
    "Reverse-scored: Measures narrow focus on academics over holistic growth.",
  ],
  [
    67,
    "I do my homework just to get it over with, rather than trying to learn from it.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures lack of engagement and superficial effort.",
  ],
  [
    68,
    "I prefer interacting with just one or two close friends instead of a large group.",
    "extraversion",
    true,
    "Reverse-scored: Measures preference for small social circles.",
  ],
  [
    69,
    "I am blunt and sometimes say things that hurt my classmates' feelings without meaning to.",
    "agreeableness",
    true,
    "Reverse-scored: Measures lack of emotional filter.",
  ],
  [
    70,
    "I get very frustrated and angry if the school internet goes down or things don't work out.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures low frustration tolerance.",
  ],
  [
    71,
    "I am open-minded about trying different study techniques, like flashcards or mind maps.",
    "openness",
    false,
    "Measures adaptability and willingness to experiment.",
  ],
  [
    72,
    "I review my notes or revise what was taught immediately after coming home from school.",
    "conscientiousness",
    false,
    "Measures proactive study habits.",
  ],
  [
    73,
    "I express my opinions boldly during class discussions and value being heard.",
    "extraversion",
    false,
    "Measures assertiveness and self-expression.",
  ],
  [
    74,
    "I compromise on my own preferences to make sure my group members are happy.",
    "agreeableness",
    false,
    "Measures cooperativeness and selflessness.",
  ],
  [
    75,
    "I feel confident about my future and do not panic about choosing the 'perfect' stream.",
    "emotional-stability",
    false,
    "Measures optimism and low career anxiety.",
  ],
  [
    76,
    "I feel uncomfortable when a teacher changes the seating arrangement in class.",
    "openness",
    true,
    "Reverse-scored: Measures rigidity and dislike for change.",
  ],
  [
    77,
    "I often submit my practical files incomplete or hastily done at the last minute.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures sloppy work habits.",
  ],
  [
    78,
    "I feel nervous when I am the center of attention, like on my birthday in class.",
    "extraversion",
    true,
    "Reverse-scored: Measures social anxiety and shyness.",
  ],
  [
    79,
    "I find it difficult to trust my project partners to do their part of the work properly.",
    "agreeableness",
    true,
    "Reverse-scored: Measures skepticism and lack of trust.",
  ],
  [
    80,
    "I lose sleep worrying about my pre-board examination results.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures severe test anxiety.",
  ],
];

const personalityRound5Raw = [
  [
    81,
    "I am eager to participate in workshops or career counseling sessions to explore new options.",
    "openness",
    false,
    "Measures proactiveness in exploring the future.",
  ],
  [
    82,
    "I prefer doing my work perfectly, even if it takes a little extra time.",
    "conscientiousness",
    false,
    "Measures perfectionism and dedication.",
  ],
  [
    83,
    "I enjoy convincing others and selling my ideas in a debate or elocution competition.",
    "extraversion",
    false,
    "Measures persuasiveness and public speaking interest.",
  ],
  [
    84,
    "I sincerely praise my classmates when they achieve something good, like winning a medal.",
    "agreeableness",
    false,
    "Measures supportive nature and lack of envy.",
  ],
  [
    85,
    "I am able to step back and take a deep breath when I feel overloaded with homework.",
    "emotional-stability",
    false,
    "Measures healthy coping mechanisms.",
  ],
  [
    86,
    "I avoid reading up on careers that sound unfamiliar or non-traditional.",
    "openness",
    true,
    "Reverse-scored: Measures reluctance to consider unconventional paths.",
  ],
  [
    87,
    "I frequently make careless calculation errors in exams because I rush through the paper.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures impulsivity in execution.",
  ],
  [
    88,
    "I avoid taking on roles that require me to coordinate with many different people.",
    "extraversion",
    true,
    "Reverse-scored: Measures avoidance of social leadership.",
  ],
  [
    89,
    "I believe that helping others with their studies will reduce my own rank in class.",
    "agreeableness",
    true,
    "Reverse-scored: Measures hyper-competitive, zero-sum thinking.",
  ],
  [
    90,
    "I get easily offended if a teacher corrects my answer in front of the whole class.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures defensiveness and insecurity.",
  ],
  [
    91,
    "I love debating philosophical ideas or discussing current affairs with my teachers and peers.",
    "openness",
    false,
    "Measures intellectual depth and engagement.",
  ],
  [
    92,
    "I consistently revise older chapters to ensure I don't forget them before the finals.",
    "conscientiousness",
    false,
    "Measures long-term planning and consistency.",
  ],
  [
    93,
    "I am often chosen as the class monitor or representative because I am vocal and outgoing.",
    "extraversion",
    false,
    "Measures social dominance and extroversion.",
  ],
  [
    94,
    "I try to be considerate and not make noise when others are trying to study.",
    "agreeableness",
    false,
    "Measures mindfulness of others' needs.",
  ],
  [
    95,
    "I handle conflicts with friends maturely without crying or getting excessively angry.",
    "emotional-stability",
    false,
    "Measures emotional regulation during interpersonal conflict.",
  ],
  [
    96,
    "I dislike tasks that have no clear instructions and require me to figure things out on my own.",
    "openness",
    true,
    "Reverse-scored: Measures discomfort with ambiguity.",
  ],
  [
    97,
    "I rely on my friends to remind me about important dates like fee submission or project deadlines.",
    "conscientiousness",
    true,
    "Reverse-scored: Measures lack of personal responsibility.",
  ],
  [
    98,
    "I would rather send a text message than call someone to ask for syllabus details.",
    "extraversion",
    true,
    "Reverse-scored: Measures communication avoidance.",
  ],
  [
    99,
    "I am suspicious of people's motives if they suddenly act very nice to me.",
    "agreeableness",
    true,
    "Reverse-scored: Measures cynicism and mistrust.",
  ],
  [
    100,
    "I feel like completely giving up when I fail to understand a complex topic after multiple tries.",
    "emotional-stability",
    true,
    "Reverse-scored: Measures tendency to easily lose hope.",
  ],
];

const personalityOptions = [
  { key: "A", text: "Strongly Agree" },
  { key: "B", text: "Agree" },
  { key: "C", text: "Neutral" },
  { key: "D", text: "Disagree" },
  { key: "E", text: "Strongly Disagree" },
];

function makePersonalityQuestion(
  round,
  questionNo,
  questionText,
  dimension,
  reverseScored,
  explanation = ""
) {
  const normalScores = { A: 5, B: 4, C: 3, D: 2, E: 1 };
  const reverseScores = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const scoreMap = reverseScored ? reverseScores : normalScores;

  return {
    id: `personality-r${round}-q${questionNo}`,
    _id: `personality-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "personality",
    testName: "Personality Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options: personalityOptions.map((option) => ({
      ...option,
      score: scoreMap[option.key],
    })),
    reverseScored,
    explanation,
    scoring: {
      type: "personality-likert",
      scale: "5-point",
      reverseScored,
      dimension,
    },
    isActive: true,
    active: true,
  };
}

const personalityQuestionsByRound = {
  1: personalityRound1Raw.map(
    ([questionNo, questionText, dimension, reverseScored, explanation]) =>
      makePersonalityQuestion(
        1,
        questionNo,
        questionText,
        dimension,
        reverseScored,
        explanation
      )
  ),
  2: personalityRound2Raw.map(
    ([questionNo, questionText, dimension, reverseScored, explanation]) =>
      makePersonalityQuestion(
        2,
        questionNo,
        questionText,
        dimension,
        reverseScored,
        explanation
      )
  ),
  3: personalityRound3Raw.map(
    ([questionNo, questionText, dimension, reverseScored, explanation]) =>
      makePersonalityQuestion(
        3,
        questionNo,
        questionText,
        dimension,
        reverseScored,
        explanation
      )
  ),
  4: personalityRound4Raw.map(
    ([questionNo, questionText, dimension, reverseScored, explanation]) =>
      makePersonalityQuestion(
        4,
        questionNo,
        questionText,
        dimension,
        reverseScored,
        explanation
      )
  ),
  5: personalityRound5Raw.map(
    ([questionNo, questionText, dimension, reverseScored, explanation]) =>
      makePersonalityQuestion(
        5,
        questionNo,
        questionText,
        dimension,
        reverseScored,
        explanation
      )
  ),
};




/* =========================================================
   ACADEMIC STYLE TEST QUESTIONS
========================================================= */
/* =========================================================
   ACADEMIC STYLE TEST QUESTIONS
   Temporary safe placeholder.
   Real academic-style questions will be added after backend runs.
========================================================= */

/* =========================================================
   ACADEMIC STYLE TEST QUESTIONS
========================================================= */

const academicStyleRound1Raw = [
  [
    1,
    "When learning a new Science concept, how do you usually approach it?",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to understand the logic and how it applies to real life.", score: 4 },
      { key: "B", text: "I read it multiple times to remember the main points.", score: 3 },
      { key: "C", text: "I just memorize the exact definition from the NCERT book.", score: 2 },
      { key: "D", text: "I skip it if it looks too complicated.", score: 1 },
    ],
    "Measures preference for deep understanding versus superficial memorization.",
  ],
  [
    2,
    "When a formula in Physics seems complicated, what do you do?",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to derive it or understand its individual parts before using it.", score: 4 },
      { key: "B", text: "I ask my teacher to explain it simply.", score: 3 },
      { key: "C", text: "I write it 10 times to memorize it for the exam.", score: 2 },
      { key: "D", text: "I just hope it doesn't come in the board exam.", score: 1 },
    ],
    "Measures whether the student seeks the 'why' behind formulas.",
  ],
  [
    3,
    "In History, when there are many dates and events, how do you study?",
    "conceptual-understanding",
    [
      { key: "A", text: "I create a timeline to understand the sequence and cause-and-effect.", score: 4 },
      { key: "B", text: "I read the chapter multiple times until I remember the flow.", score: 3 },
      { key: "C", text: "I only memorize the bold dates given in the guide book.", score: 2 },
      { key: "D", text: "I leave History dates because they are too boring.", score: 1 },
    ],
    "Measures ability to connect information conceptually.",
  ],
  [
    4,
    "When your teacher introduces a new Math theorem on the board:",
    "conceptual-understanding",
    [
      { key: "A", text: "I focus on why the theorem works and try the proof myself.", score: 4 },
      { key: "B", text: "I pay attention and note down the steps to solve questions.", score: 3 },
      { key: "C", text: "I just wait for the final formula to copy it down.", score: 2 },
      { key: "D", text: "I talk to my friends and ignore the proof part.", score: 1 },
    ],
    "Measures engagement with the logical derivation of concepts.",
  ],
  [
    5,
    "How do you usually revise for a class test?",
    "practice-retrieval",
    [
      { key: "A", text: "I test myself using practice questions without looking at the book.", score: 4 },
      { key: "B", text: "I read my notes and highlight the important parts again.", score: 3 },
      { key: "C", text: "I just read the textbook chapter once the night before.", score: 2 },
      { key: "D", text: "I read a friend's summary 10 minutes before the test.", score: 1 },
    ],
    "Measures use of active recall versus passive reading.",
  ],
  [
    6,
    "After finishing studying a chapter for the first time, what is your next step?",
    "practice-retrieval",
    [
      { key: "A", text: "I close the book and write down everything I can remember (brain dump).", score: 4 },
      { key: "B", text: "I solve the back exercises of the NCERT book looking at examples.", score: 3 },
      { key: "C", text: "I just move on to the next chapter to finish the syllabus.", score: 2 },
      { key: "D", text: "I take a long break and forget about the chapter.", score: 1 },
    ],
    "Measures immediate retrieval practice habits.",
  ],
  [
    7,
    "How do you use previous year board papers?",
    "practice-retrieval",
    [
      { key: "A", text: "I set a timer and solve them completely without checking answers.", score: 4 },
      { key: "B", text: "I read the questions and think about how I would answer them.", score: 3 },
      { key: "C", text: "I just read the questions and the solved answers from a guide.", score: 2 },
      { key: "D", text: "I don't use them; I only read my notes.", score: 1 },
    ],
    "Measures willingness to test oneself under exam conditions.",
  ],
  [
    8,
    "When you learn something new, when do you revise it?",
    "practice-retrieval",
    [
      { key: "A", text: "I revise it the next day, then a week later, then a month later.", score: 4 },
      { key: "B", text: "I revise it at the end of the week.", score: 3 },
      { key: "C", text: "I only revise it right before the exams.", score: 2 },
      { key: "D", text: "I rarely revise; I just hope I remember it.", score: 1 },
    ],
    "Measures use of spaced repetition.",
  ],
  [
    9,
    "How do you prepare for your pre-board exams?",
    "planning-consistency",
    [
      { key: "A", text: "I make a detailed daily study timetable weeks in advance and follow it.", score: 4 },
      { key: "B", text: "I decide loosely what to study each week and try my best.", score: 3 },
      { key: "C", text: "I wait for the date sheet and cram day and night before exams.", score: 2 },
      { key: "D", text: "I just study whatever subject I feel like on the day.", score: 1 },
    ],
    "Measures long-term planning and avoidance of cramming.",
  ],
  [
    10,
    "What does your daily study routine look like after school?",
    "planning-consistency",
    [
      { key: "A", text: "I have a fixed time every day for self-study and homework.", score: 4 },
      { key: "B", text: "I study most days, but the timing changes depending on my mood.", score: 3 },
      { key: "C", text: "I only study when there is homework or a test tomorrow.", score: 2 },
      { key: "D", text: "I don't have a routine; I rarely open books at home.", score: 1 },
    ],
    "Measures daily consistency and routine.",
  ],
  [
    11,
    "When you get a large project or practical file to complete in 2 weeks:",
    "planning-consistency",
    [
      { key: "A", text: "I divide the work into smaller parts and do a little bit every day.", score: 4 },
      { key: "B", text: "I plan to do it on the weekend when I have free time.", score: 3 },
      { key: "C", text: "I start it the night before the submission date.", score: 2 },
      { key: "D", text: "I copy it from a friend on the morning of submission.", score: 1 },
    ],
    "Measures task breakdown and procrastination avoidance.",
  ],
  [
    12,
    "How do you handle coaching/tuition homework along with school homework?",
    "planning-consistency",
    [
      { key: "A", text: "I schedule specific times for both so neither is ignored.", score: 4 },
      { key: "B", text: "I prioritize school work and do coaching work if I get time.", score: 3 },
      { key: "C", text: "I usually copy the homework just before the class starts.", score: 2 },
      { key: "D", text: "I skip homework and make excuses to the teachers.", score: 1 },
    ],
    "Measures time management across multiple commitments.",
  ],
  [
    13,
    "Where do you usually study at home?",
    "focus-environment",
    [
      { key: "A", text: "At a designated study desk with no distractions around.", score: 4 },
      { key: "B", text: "On my bed or sofa, but I try to keep it quiet.", score: 3 },
      { key: "C", text: "In the living room while the TV is on or people are talking.", score: 2 },
      { key: "D", text: "I constantly move around and can't sit in one place.", score: 1 },
    ],
    "Measures physical environment management for cognitive focus.",
  ],
  [
    14,
    "What do you do with your smartphone while studying?",
    "focus-environment",
    [
      { key: "A", text: "I keep it in another room or use an app blocker.", score: 4 },
      { key: "B", text: "I keep it on silent and face down on my desk.", score: 3 },
      { key: "C", text: "I check it every time it buzzes with a notification.", score: 2 },
      { key: "D", text: "I constantly scroll through social media while studying.", score: 1 },
    ],
    "Measures digital distraction management.",
  ],
  [
    15,
    "When you start feeling bored or tired while studying:",
    "focus-environment",
    [
      { key: "A", text: "I take a short 5-minute break, stretch, and get back to work.", score: 4 },
      { key: "B", text: "I switch to an easier subject for a while.", score: 3 },
      { key: "C", text: "I pick up my phone and end up wasting an hour.", score: 2 },
      { key: "D", text: "I close my books and stop studying completely.", score: 1 },
    ],
    "Measures self-regulation during low motivation.",
  ],
  [
    16,
    "How long can you study with full concentration before taking a break?",
    "focus-environment",
    [
      { key: "A", text: "I use techniques like Pomodoro (25 mins study, 5 mins break) to stay focused.", score: 4 },
      { key: "B", text: "I can focus for an hour before I need a long break.", score: 3 },
      { key: "C", text: "My mind wanders every 10 minutes.", score: 2 },
      { key: "D", text: "I can't focus at all unless someone is sitting next to me.", score: 1 },
    ],
    "Measures attention span and use of focus techniques.",
  ],
  [
    17,
    "When you get a low score in a unit test, what is your reaction?",
    "feedback-improvement",
    [
      { key: "A", text: "I analyze my mistakes, find the weak topics, and practice them.", score: 4 },
      { key: "B", text: "I feel bad but try to study harder next time.", score: 3 },
      { key: "C", text: "I hide the marks from my parents and ignore the paper.", score: 2 },
      { key: "D", text: "I blame the teacher for setting a tough paper.", score: 1 },
    ],
    "Measures growth mindset and mistake analysis.",
  ],
  [
    18,
    "How do you use the red-pen corrections given by your English teacher on an essay?",
    "feedback-improvement",
    [
      { key: "A", text: "I rewrite the essay incorporating the feedback to improve.", score: 4 },
      { key: "B", text: "I read the comments carefully to remember for next time.", score: 3 },
      { key: "C", text: "I just look at the final marks and ignore the comments.", score: 2 },
      { key: "D", text: "I argue with the teacher that my way was right.", score: 1 },
    ],
    "Measures utilization of constructive feedback.",
  ],
  [
    19,
    "When a friend points out a mistake in your logic while group studying:",
    "feedback-improvement",
    [
      { key: "A", text: "I thank them and correct my understanding immediately.", score: 4 },
      { key: "B", text: "I double-check the textbook to see who is right.", score: 3 },
      { key: "C", text: "I feel embarrassed and change the topic.", score: 2 },
      { key: "D", text: "I get defensive and refuse to admit I was wrong.", score: 1 },
    ],
    "Measures coachability and peer-feedback reception.",
  ],
  [
    20,
    "When you don't understand a topic taught in class, what do you do?",
    "feedback-improvement",
    [
      { key: "A", text: "I ask the teacher right away or clear the doubt after class.", score: 4 },
      { key: "B", text: "I ask my friends to explain it to me later.", score: 3 },
      { key: "C", text: "I wait and hope I will understand it by reading the guide book.", score: 2 },
      { key: "D", text: "I skip the topic and hope it doesn't come in the exam.", score: 1 },
    ],
    "Measures proactive help-seeking behavior.",
  ],
];

const academicStyleRound2Raw = [
  [
    21,
    "When learning Biology diagrams (like the human heart):",
    "conceptual-understanding",
    [
      { key: "A", text: "I understand the function of each part so I can draw it logically.", score: 4 },
      { key: "B", text: "I trace it a few times to get the shape right.", score: 3 },
      { key: "C", text: "I just memorize the labels without knowing what they do.", score: 2 },
      { key: "D", text: "I skip diagrams because they are too hard to draw.", score: 1 },
    ],
    "Measures functional understanding over rote drawing.",
  ],
  [
    22,
    "If a Math question in the exam is slightly twisted from the NCERT version:",
    "conceptual-understanding",
    [
      { key: "A", text: "I apply the core concepts to solve it step-by-step.", score: 4 },
      { key: "B", text: "I try to fit it into a formula I already know.", score: 3 },
      { key: "C", text: "I panic because it is 'out of syllabus'.", score: 2 },
      { key: "D", text: "I leave it blank immediately.", score: 1 },
    ],
    "Measures adaptability of knowledge.",
  ],
  [
    23,
    "When reading a Geography chapter about climate:",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to visualize the maps and connect factors like altitude and temperature.", score: 4 },
      { key: "B", text: "I read the text carefully to remember the main zones.", score: 3 },
      { key: "C", text: "I only memorize the questions given at the back of the chapter.", score: 2 },
      { key: "D", text: "I just guess the answers during the test.", score: 1 },
    ],
    "Measures spatial and relational understanding.",
  ],
  [
    24,
    "How do you learn English grammar rules?",
    "conceptual-understanding",
    [
      { key: "A", text: "I understand the rule and try making my own sentences.", score: 4 },
      { key: "B", text: "I practice multiple workbook exercises.", score: 3 },
      { key: "C", text: "I memorize the rules exactly as written in the book.", score: 2 },
      { key: "D", text: "I rely purely on what 'sounds right' without learning rules.", score: 1 },
    ],
    "Measures application of abstract rules.",
  ],
  [
    25,
    "When using flashcards to study vocabulary or formulas:",
    "practice-retrieval",
    [
      { key: "A", text: "I force myself to say the answer out loud before flipping the card.", score: 4 },
      { key: "B", text: "I flip it quickly if I feel like I 'kind of' know it.", score: 3 },
      { key: "C", text: "I just read both sides of the flashcard like a book.", score: 2 },
      { key: "D", text: "I don't use flashcards or test myself at all.", score: 1 },
    ],
    "Measures strictness of retrieval practice.",
  ],
  [
    26,
    "How often do you test your own knowledge without books open?",
    "practice-retrieval",
    [
      { key: "A", text: "Almost every day; I constantly check what I remember.", score: 4 },
      { key: "B", text: "Usually on weekends when I review the week's work.", score: 3 },
      { key: "C", text: "Only when the teacher announces a surprise test.", score: 2 },
      { key: "D", text: "Never, testing makes me too anxious.", score: 1 },
    ],
    "Measures frequency of self-testing.",
  ],
  [
    27,
    "While revising a lengthy Civics chapter:",
    "practice-retrieval",
    [
      { key: "A", text: "I try to teach the concepts to a friend or an imaginary class.", score: 4 },
      { key: "B", text: "I write down short summaries in my notebook.", score: 3 },
      { key: "C", text: "I just use a highlighter on the textbook pages.", score: 2 },
      { key: "D", text: "I skim the headings and hope I remember the details.", score: 1 },
    ],
    "Measures use of the Feynman technique (active recall).",
  ],
  [
    28,
    "If you forget a point while writing a practice answer:",
    "practice-retrieval",
    [
      { key: "A", text: "I rack my brain for a few minutes before finally checking the book.", score: 4 },
      { key: "B", text: "I immediately open the book to check the point.", score: 3 },
      { key: "C", text: "I just leave the answer incomplete.", score: 2 },
      { key: "D", text: "I cross out the whole answer and start a different question.", score: 1 },
    ],
    "Measures productive struggle during recall.",
  ],
  [
    29,
    "How do you manage your school notebooks?",
    "planning-consistency",
    [
      { key: "A", text: "I complete the work on the same day it is taught.", score: 4 },
      { key: "B", text: "I catch up on weekends so they are usually complete.", score: 3 },
      { key: "C", text: "I borrow a friend's notebook a day before submission to copy.", score: 2 },
      { key: "D", text: "My notebooks are always incomplete and messy.", score: 1 },
    ],
    "Measures daily academic discipline.",
  ],
  [
    30,
    "When you have two tests on the same day (e.g., Math and Science):",
    "planning-consistency",
    [
      { key: "A", text: "I plan my study days ahead so I can revise both comfortably.", score: 4 },
      { key: "B", text: "I study one the day before and the other early morning.", score: 3 },
      { key: "C", text: "I focus only on the harder one and ignore the other.", score: 2 },
      { key: "D", text: "I get overwhelmed and perform poorly in both.", score: 1 },
    ],
    "Measures forward planning for heavy workloads.",
  ],
  [
    31,
    "How do you set your study goals?",
    "planning-consistency",
    [
      { key: "A", text: "I set specific goals (e.g., 'Finish 20 Math problems by 6 PM').", score: 4 },
      { key: "B", text: "I set vague goals (e.g., 'I will study Math today').", score: 3 },
      { key: "C", text: "I don't set goals, I just study until I feel tired.", score: 2 },
      { key: "D", text: "I only study if my parents force me to sit down.", score: 1 },
    ],
    "Measures goal specificity.",
  ],
  [
    32,
    "What do you do during long school holidays (like winter break)?",
    "planning-consistency",
    [
      { key: "A", text: "I dedicate a small amount of time daily to revise and stay in touch.", score: 4 },
      { key: "B", text: "I finish all holiday homework quickly so I can relax the rest of the time.", score: 3 },
      { key: "C", text: "I do all my homework on the very last day of the break.", score: 2 },
      { key: "D", text: "I ignore studies completely and go to school unprepared.", score: 1 },
    ],
    "Measures consistency during unstructured time.",
  ],
  [
    33,
    "When you study on a laptop or tablet:",
    "focus-environment",
    [
      { key: "A", text: "I close all irrelevant tabs and only keep educational sites open.", score: 4 },
      { key: "B", text: "I keep YouTube open in the background for music.", score: 3 },
      { key: "C", text: "I frequently switch tabs to chat with friends.", score: 2 },
      { key: "D", text: "I end up playing games instead of studying.", score: 1 },
    ],
    "Measures digital environment control.",
  ],
  [
    34,
    "If your siblings or parents are watching TV loudly while you need to study:",
    "focus-environment",
    [
      { key: "A", text: "I move to a quieter room or use earplugs to block the noise.", score: 4 },
      { key: "B", text: "I ask them to lower the volume so I can manage.", score: 3 },
      { key: "C", text: "I try to study but keep getting distracted by the TV show.", score: 2 },
      { key: "D", text: "I leave my books and join them to watch TV.", score: 1 },
    ],
    "Measures agency in controlling physical environment.",
  ],
  [
    35,
    "How often do you listen to music while studying complex topics?",
    "focus-environment",
    [
      { key: "A", text: "Never, or only instrumental/lo-fi music without lyrics.", score: 4 },
      { key: "B", text: "Sometimes, but I turn it off if I need to concentrate hard.", score: 3 },
      { key: "C", text: "Always, I listen to my favorite pop songs with lyrics.", score: 2 },
      { key: "D", text: "I watch music videos on a screen while studying.", score: 1 },
    ],
    "Measures understanding of cognitive load.",
  ],
  [
    36,
    "When you sit down to study, do you have all your materials ready?",
    "focus-environment",
    [
      { key: "A", text: "Yes, I gather all pens, books, and water before sitting down.", score: 4 },
      { key: "B", text: "Mostly, but I might get up once to grab a calculator.", score: 3 },
      { key: "C", text: "No, I get up multiple times to find things I forgot.", score: 2 },
      { key: "D", text: "My study space is so messy I can never find my books.", score: 1 },
    ],
    "Measures workspace organization.",
  ],
  [
    37,
    "If a teacher scolds you for a poorly presented project:",
    "feedback-improvement",
    [
      { key: "A", text: "I ask them how I can format it better and fix it.", score: 4 },
      { key: "B", text: "I fix the obvious mistakes they pointed out.", score: 3 },
      { key: "C", text: "I feel insulted and throw the project away.", score: 2 },
      { key: "D", text: "I argue that they are being too strict about presentation.", score: 1 },
    ],
    "Measures reaction to negative feedback.",
  ],
  [
    38,
    "When comparing your answer sheet with the topper's answer sheet:",
    "feedback-improvement",
    [
      { key: "A", text: "I look at how they structure their answers to improve mine.", score: 4 },
      { key: "B", text: "I just check if the teacher marked my answers unfairly.", score: 3 },
      { key: "C", text: "I feel jealous and say they are just the teacher's favorite.", score: 2 },
      { key: "D", text: "I never look at others' papers; I don't care.", score: 1 },
    ],
    "Measures peer benchmarking for growth.",
  ],
  [
    39,
    "How often do you ask questions in class?",
    "feedback-improvement",
    [
      { key: "A", text: "Frequently; I always raise my hand if I am confused.", score: 4 },
      { key: "B", text: "Sometimes, usually if the teacher asks if anyone has doubts.", score: 3 },
      { key: "C", text: "Rarely, I feel shy that my question might be stupid.", score: 2 },
      { key: "D", text: "Never, I prefer to stay invisible in class.", score: 1 },
    ],
    "Measures active help-seeking in public.",
  ],
  [
    40,
    "After solving a mock paper at home, what is your next step?",
    "feedback-improvement",
    [
      { key: "A", text: "I check my answers with the marking scheme and note my weak areas.", score: 4 },
      { key: "B", text: "I calculate my total marks to see if I passed.", score: 3 },
      { key: "C", text: "I only check the multiple-choice questions because they are easy to grade.", score: 2 },
      { key: "D", text: "I don't check it; I just assume I did fine.", score: 1 },
    ],
    "Measures self-evaluation.",
  ],
];

const academicStyleRound3Raw = [
  [
    41,
    "When dealing with chemical equations in Chemistry:",
    "conceptual-understanding",
    [
      { key: "A", text: "I learn the valencies so I can balance any equation logically.", score: 4 },
      { key: "B", text: "I practice balancing a few common ones to get the hang of it.", score: 3 },
      { key: "C", text: "I memorize the numbers (coefficients) for the exam.", score: 2 },
      { key: "D", text: "I leave the balancing questions blank.", score: 1 },
    ],
    "Measures logic vs. memorization in abstract subjects.",
  ],
  [
    42,
    "If you read a news article related to a topic taught in Economics:",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to connect the news to the textbook concepts.", score: 4 },
      { key: "B", text: "I find it interesting but don't relate it to school.", score: 3 },
      { key: "C", text: "I skip it because it won't be tested in the board exam.", score: 2 },
      { key: "D", text: "I never read the news.", score: 1 },
    ],
    "Measures real-world application of concepts.",
  ],
  [
    43,
    "When studying a poem in English/Hindi literature:",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to understand the deeper metaphors and the poet's message.", score: 4 },
      { key: "B", text: "I read the summary provided by the teacher.", score: 3 },
      { key: "C", text: "I only memorize the answers to the back-exercise questions.", score: 2 },
      { key: "D", text: "I just memorize the poem without knowing its meaning.", score: 1 },
    ],
    "Measures depth of literary comprehension.",
  ],
  [
    44,
    "When learning a computer programming concept (like loops):",
    "conceptual-understanding",
    [
      { key: "A", text: "I trace the code step-by-step on paper to see how the logic flows.", score: 4 },
      { key: "B", text: "I run the code on a computer to see what happens.", score: 3 },
      { key: "C", text: "I memorize the syntax exactly so I don't get a syntax error.", score: 2 },
      { key: "D", text: "I copy the code from my friend's practical file.", score: 1 },
    ],
    "Measures logical trace-through in technical subjects.",
  ],
  [
    45,
    "Before reading a new chapter, do you ever look at the questions at the end first?",
    "practice-retrieval",
    [
      { key: "A", text: "Yes, to prime my brain on what important information to look for.", score: 4 },
      { key: "B", text: "Sometimes, if the teacher tells us to.", score: 3 },
      { key: "C", text: "No, I just start reading the chapter directly.", score: 2 },
      { key: "D", text: "I never look at the questions until the day before the exam.", score: 1 },
    ],
    "Measures pre-testing strategies.",
  ],
  [
    46,
    "How do you prepare for a map-pointing test in Social Science?",
    "practice-retrieval",
    [
      { key: "A", text: "I practice on blank outline maps multiple times from memory.", score: 4 },
      { key: "B", text: "I trace the locations onto a map while looking at the book.", score: 3 },
      { key: "C", text: "I just stare at the filled map in the textbook.", score: 2 },
      { key: "D", text: "I ignore the map section because it's only a few marks.", score: 1 },
    ],
    "Measures active spatial retrieval.",
  ],
  [
    47,
    "When memorizing a speech or a long essay:",
    "practice-retrieval",
    [
      { key: "A", text: "I practice delivering it out loud without looking at the paper.", score: 4 },
      { key: "B", text: "I read it aloud multiple times while holding the paper.", score: 3 },
      { key: "C", text: "I just read it silently in my head over and over.", score: 2 },
      { key: "D", text: "I give up and decide to read it directly from the paper.", score: 1 },
    ],
    "Measures recall format matching the performance format.",
  ],
  [
    48,
    "If you learn a shortcut trick for Math calculations:",
    "practice-retrieval",
    [
      { key: "A", text: "I immediately apply it to 10 different problems to cement it.", score: 4 },
      { key: "B", text: "I use it on one problem and assume I know it.", score: 3 },
      { key: "C", text: "I write the trick down but forget to use it.", score: 2 },
      { key: "D", text: "I ignore it and stick to my slow, old method.", score: 1 },
    ],
    "Measures immediate application practice.",
  ],
  [
    49,
    "How do you handle waking up early to study (if you are a morning person)?",
    "planning-consistency",
    [
      { key: "A", text: "I set an alarm and wake up consistently at the same time.", score: 4 },
      { key: "B", text: "I hit snooze a few times but eventually get up.", score: 3 },
      { key: "C", text: "I plan to wake up but usually turn off the alarm and sleep.", score: 2 },
      { key: "D", text: "I never plan my sleep schedule; it's random.", score: 1 },
    ],
    "Measures physical routine discipline.",
  ],
  [
    50,
    "When you have to miss a day of school due to illness:",
    "planning-consistency",
    [
      { key: "A", text: "I call a friend that evening to get the notes and homework.", score: 4 },
      { key: "B", text: "I ask for the notes when I return to school the next day.", score: 3 },
      { key: "C", text: "I wait for the teacher to realize my work is missing.", score: 2 },
      { key: "D", text: "I use it as an excuse to avoid studying that topic entirely.", score: 1 },
    ],
    "Measures proactive gap-filling.",
  ],
  [
    51,
    "Do you use a planner, diary, or calendar app?",
    "planning-consistency",
    [
      { key: "A", text: "Yes, I write down all exam dates, project deadlines, and test syllabus.", score: 4 },
      { key: "B", text: "I write down major exams but keep smaller homework in my head.", score: 3 },
      { key: "C", text: "I rely entirely on my friends to remind me about deadlines.", score: 2 },
      { key: "D", text: "I constantly forget deadlines and get penalized for late work.", score: 1 },
    ],
    "Measures use of organizational tools.",
  ],
  [
    52,
    "During the final month before Board Exams, what is your strategy?",
    "planning-consistency",
    [
      { key: "A", text: "I follow a strict revision timetable covering all subjects evenly.", score: 4 },
      { key: "B", text: "I focus mainly on my weak subjects and skim the strong ones.", score: 3 },
      { key: "C", text: "I panic and try to read everything at once without a plan.", score: 2 },
      { key: "D", text: "I give up because there is too much syllabus left.", score: 1 },
    ],
    "Measures high-pressure planning.",
  ],
  [
    53,
    "When participating in group study with friends:",
    "focus-environment",
    [
      { key: "A", text: "I ensure we stick to the topic and complete the planned syllabus.", score: 4 },
      { key: "B", text: "We study for a while, then spend a lot of time chatting.", score: 3 },
      { key: "C", text: "We mostly gossip and rarely open our books.", score: 2 },
      { key: "D", text: "I avoid group study because I know we will just waste time.", score: 1 },
    ],
    "Measures social focus regulation.",
  ],
  [
    54,
    "If you are reading a textbook and realize your mind wandered for the last two pages:",
    "focus-environment",
    [
      { key: "A", text: "I stop, go back, and re-read those pages with full attention.", score: 4 },
      { key: "B", text: "I skim back to see if I missed any bold keywords.", score: 3 },
      { key: "C", text: "I just keep reading forward and hope it wasn't important.", score: 2 },
      { key: "D", text: "I close the book because I'm clearly not in the mood.", score: 1 },
    ],
    "Measures metacognitive monitoring of attention.",
  ],
  [
    55,
    "How does the lighting in your room affect your study?",
    "focus-environment",
    [
      { key: "A", text: "I ensure my desk is brightly lit with a study lamp to prevent sleepiness.", score: 4 },
      { key: "B", text: "I just use the normal room tubelight.", score: 3 },
      { key: "C", text: "I study in dim light on my bed and often fall asleep.", score: 2 },
      { key: "D", text: "I study in the dark using only my laptop screen light.", score: 1 },
    ],
    "Measures physical ergonomics awareness.",
  ],
  [
    56,
    "What do you do if you feel extremely sleepy during afternoon self-study?",
    "focus-environment",
    [
      { key: "A", text: "I take a planned 20-minute power nap, then wake up fresh.", score: 4 },
      { key: "B", text: "I wash my face with cold water and drink coffee/tea.", score: 3 },
      { key: "C", text: "I try to read while fighting sleep, understanding nothing.", score: 2 },
      { key: "D", text: "I sleep for 3 hours and ruin my evening schedule.", score: 1 },
    ],
    "Measures physiological state management.",
  ],
  [
    57,
    "When a teacher asks a difficult question in class and you give the wrong answer:",
    "feedback-improvement",
    [
      { key: "A", text: "I listen carefully to the correct answer to fix my misconception.", score: 4 },
      { key: "B", text: "I feel embarrassed but try to remember the right answer.", score: 3 },
      { key: "C", text: "I argue with the teacher to prove I was partially right.", score: 2 },
      { key: "D", text: "I stop participating in class for the rest of the week.", score: 1 },
    ],
    "Measures ego vs. learning mindset.",
  ],
  [
    58,
    "If your parents point out that your grades have dropped:",
    "feedback-improvement",
    [
      { key: "A", text: "I sit with them and discuss honestly where I am struggling.", score: 4 },
      { key: "B", text: "I promise to study harder and try to fix it myself.", score: 3 },
      { key: "C", text: "I make excuses about the paper being too lengthy.", score: 2 },
      { key: "D", text: "I shout at them and lock myself in my room.", score: 1 },
    ],
    "Measures reception of parental feedback.",
  ],
  [
    59,
    "How often do you ask your teachers for extra questions or resources to practice?",
    "feedback-improvement",
    [
      { key: "A", text: "Often, especially for subjects I want to score perfectly in.", score: 4 },
      { key: "B", text: "Sometimes, before major exams.", score: 3 },
      { key: "C", text: "Rarely, the textbook is enough for me.", score: 2 },
      { key: "D", text: "Never, I avoid extra work at all costs.", score: 1 },
    ],
    "Measures proactive improvement seeking.",
  ],
  [
    60,
    "When you finish a major exam, what is your immediate thought?",
    "feedback-improvement",
    [
      { key: "A", text: "I reflect on which study strategies worked and which didn't.", score: 4 },
      { key: "B", text: "I discuss the question paper with friends to check my answers.", score: 3 },
      { key: "C", text: "I just feel relieved it's over and forget about it.", score: 2 },
      { key: "D", text: "I complain about how unfair the education system is.", score: 1 },
    ],
    "Measures post-performance metacognitive reflection.",
  ],
];

const academicStyleRound4Raw = [
  [
    61,
    "When learning about the functions of different government bodies (Civics):",
    "conceptual-understanding",
    [
      { key: "A", text: "I draw a flowchart to understand how they interact with each other.", score: 4 },
      { key: "B", text: "I read the textbook paragraphs carefully.", score: 3 },
      { key: "C", text: "I just memorize the key powers of each body from a guide.", score: 2 },
      { key: "D", text: "I skip the chapter because it is too dry.", score: 1 },
    ],
    "Measures structural understanding of systems.",
  ],
  [
    62,
    "If you encounter an unfamiliar word while reading an English passage:",
    "conceptual-understanding",
    [
      { key: "A", text: "I try to guess its meaning from the sentence context, then check a dictionary.", score: 4 },
      { key: "B", text: "I immediately ask a teacher or use Google.", score: 3 },
      { key: "C", text: "I ignore it and hope the rest of the sentence makes sense.", score: 2 },
      { key: "D", text: "I stop reading because it's too difficult.", score: 1 },
    ],
    "Measures independent conceptual deduction.",
  ],
  [
    63,
    "When studying light reflection and refraction in Physics:",
    "conceptual-understanding",
    [
      { key: "A", text: "I draw ray diagrams myself to understand the logic behind image formation.", score: 4 },
      { key: "B", text: "I look at the textbook diagrams and try to remember them.", score: 3 },
      { key: "C", text: "I memorize the table of object/image positions.", score: 2 },
      { key: "D", text: "I avoid this chapter entirely.", score: 1 },
    ],
    "Measures visual-logical conceptualization.",
  ],
  [
    64,
    "How do you approach long answer questions (5-markers) in Social Science?",
    "conceptual-understanding",
    [
      { key: "A", text: "I structure my answer with an introduction, key logical points, and conclusion.", score: 4 },
      { key: "B", text: "I write down 5 bullet points I memorized.", score: 3 },
      { key: "C", text: "I write everything I know about the topic in one big paragraph.", score: 2 },
      { key: "D", text: "I just write the same point in 5 different ways.", score: 1 },
    ],
    "Measures synthesis and conceptual structuring.",
  ],
  [
    65,
    "When you use a guide book (like RD Sharma or RS Aggarwal) for Math:",
    "practice-retrieval",
    [
      { key: "A", text: "I solve the unsolved exercises on my own without looking at hints.", score: 4 },
      { key: "B", text: "I study the solved examples and solve a few similar ones.", score: 3 },
      { key: "C", text: "I mostly just read the solved examples like a storybook.", score: 2 },
      { key: "D", text: "I copy the solutions into my homework notebook.", score: 1 },
    ],
    "Measures active practice vs passive reading in Math.",
  ],
  [
    66,
    "How do you prepare for an oral viva or practical exam?",
    "practice-retrieval",
    [
      { key: "A", text: "I ask my parents or friends to quiz me randomly.", score: 4 },
      { key: "B", text: "I prepare a list of expected questions and read them aloud.", score: 3 },
      { key: "C", text: "I just read my practical file right before entering the lab.", score: 2 },
      { key: "D", text: "I try to stand at the back so the examiner doesn't ask me anything.", score: 1 },
    ],
    "Measures use of interactive retrieval.",
  ],
  [
    67,
    "If you find you keep forgetting a specific formula:",
    "practice-retrieval",
    [
      { key: "A", text: "I write it on a sticky note and test myself every time I see it.", score: 4 },
      { key: "B", text: "I highlight it in neon colors in my book.", score: 3 },
      { key: "C", text: "I complain that my memory is bad.", score: 2 },
      { key: "D", text: "I accept that I will lose marks on that topic.", score: 1 },
    ],
    "Measures targeted retrieval for weak spots.",
  ],
  [
    68,
    "During the exam, if you go blank on a question:",
    "practice-retrieval",
    [
      { key: "A", text: "I leave space, solve other questions, and let my brain recall it later.", score: 4 },
      { key: "B", text: "I close my eyes and try very hard to picture the textbook page.", score: 3 },
      { key: "C", text: "I panic and start forgetting other answers too.", score: 2 },
      { key: "D", text: "I try to whisper and ask the person sitting ahead of me.", score: 1 },
    ],
    "Measures stress-management during memory retrieval.",
  ],
  [
    69,
    "When a long weekend (e.g., 3 days off) approaches:",
    "planning-consistency",
    [
      { key: "A", text: "I plan to finish heavy revision or tough chapters during the extra time.", score: 4 },
      { key: "B", text: "I plan to do my normal homework and rest.", score: 3 },
      { key: "C", text: "I leave all my books at school and take a complete break.", score: 2 },
      { key: "D", text: "I spend all 3 days gaming and sleeping.", score: 1 },
    ],
    "Measures strategic use of extra time.",
  ],
  [
    70,
    "How often do you 'pull an all-nighter' (stay awake all night) to study?",
    "planning-consistency",
    [
      { key: "A", text: "Never, I plan ahead so I can get 7-8 hours of sleep before exams.", score: 4 },
      { key: "B", text: "Rarely, only if an unexpected assignment comes up.", score: 3 },
      { key: "C", text: "Often, I always leave things to the last minute.", score: 2 },
      { key: "D", text: "I don't pull all-nighters, but I also don't study during the day.", score: 1 },
    ],
    "Measures avoidance of cramming.",
  ],
  [
    71,
    "How do you balance extracurricular activities (sports/dance) with Class 10 studies?",
    "planning-consistency",
    [
      { key: "A", text: "I use a strict schedule so I can excel at both without burnout.", score: 4 },
      { key: "B", text: "I temporarily stop activities a month before exams.", score: 3 },
      { key: "C", text: "I let my grades drop because I focus too much on my hobbies.", score: 2 },
      { key: "D", text: "I quit all hobbies completely in Class 10 due to stress.", score: 1 },
    ],
    "Measures work-life balance planning.",
  ],
  [
    72,
    "When a teacher assigns a chapter to be read before the next class:",
    "planning-consistency",
    [
      { key: "A", text: "I read it briefly so I am prepared for the discussion.", score: 4 },
      { key: "B", text: "I skim the headings just before the teacher walks in.", score: 3 },
      { key: "C", text: "I don't read it; I wait for the teacher to explain everything.", score: 2 },
      { key: "D", text: "I pretend I forgot the textbook at home.", score: 1 },
    ],
    "Measures consistent proactive preparation.",
  ],
  [
    73,
    "When studying on the internet (e.g., watching a YouTube educational video):",
    "focus-environment",
    [
      { key: "A", text: "I put the video in full screen and take notes with pen and paper.", score: 4 },
      { key: "B", text: "I watch the video normally without taking notes.", score: 3 },
      { key: "C", text: "I scroll through the comments while the teacher is speaking.", score: 2 },
      { key: "D", text: "I click on the recommended entertainment videos after 2 minutes.", score: 1 },
    ],
    "Measures focus in high-distraction environments.",
  ],
  [
    74,
    "How do you manage studying when guests or relatives visit your house?",
    "focus-environment",
    [
      { key: "A", text: "I politely greet them and then excuse myself to study in my room.", score: 4 },
      { key: "B", text: "I study when they are asleep or go out.", score: 3 },
      { key: "C", text: "I sit with them and chat, abandoning my study plan.", score: 2 },
      { key: "D", text: "I use the guests as an excuse to tell my parents I can't study.", score: 1 },
    ],
    "Measures boundary setting for study environment.",
  ],
  [
    75,
    "When writing a practice essay at home, how do you handle distractions?",
    "focus-environment",
    [
      { key: "A", text: "I simulate exam conditions: no phone, water bottle on desk, fixed time.", score: 4 },
      { key: "B", text: "I write it continuously but check my phone once or twice.", score: 3 },
      { key: "C", text: "I take multiple breaks to snack, chat, or watch TV.", score: 2 },
      { key: "D", text: "I copy it from an online essay generator to save time.", score: 1 },
    ],
    "Measures environmental simulation of testing.",
  ],
  [
    76,
    "What is your attitude toward keeping your study desk clean?",
    "focus-environment",
    [
      { key: "A", text: "I keep it highly organized because clutter distracts my mind.", score: 4 },
      { key: "B", text: "I clean it once a week when it gets too messy.", score: 3 },
      { key: "C", text: "I don't mind the mess; I just push things aside to make space.", score: 2 },
      { key: "D", text: "I study on my bed because my desk is unusable.", score: 1 },
    ],
    "Measures understanding of physical clutter on cognitive load.",
  ],
  [
    77,
    "When a tuition or coaching teacher gives you a different method than the school teacher:",
    "feedback-improvement",
    [
      { key: "A", text: "I analyze both and use the one that is logically clearer to me.", score: 4 },
      { key: "B", text: "I ask my school teacher which method is accepted in boards.", score: 3 },
      { key: "C", text: "I get totally confused and mix up both methods.", score: 2 },
      { key: "D", text: "I blindly follow the tuition teacher and argue with the school teacher.", score: 1 },
    ],
    "Measures critical evaluation of conflicting feedback.",
  ],
  [
    78,
    "If a subject (e.g., Hindi or regional language) consistently drags your percentage down:",
    "feedback-improvement",
    [
      { key: "A", text: "I actively seek extra help, change my study strategy, and allocate more time.", score: 4 },
      { key: "B", text: "I try to memorize harder before the next exam.", score: 3 },
      { key: "C", text: "I ignore it and hope my Science/Math marks will balance the total.", score: 2 },
      { key: "D", text: "I complain that the language teacher hates me.", score: 1 },
    ],
    "Measures strategic response to systemic weakness.",
  ],
  [
    79,
    "When you finally solve a Math problem you were stuck on for 30 minutes:",
    "feedback-improvement",
    [
      { key: "A", text: "I review the exact step where I went wrong so I don't repeat it.", score: 4 },
      { key: "B", text: "I feel proud and move on to the next question.", score: 3 },
      { key: "C", text: "I immediately forget how I did it because I was just guessing.", score: 2 },
      { key: "D", text: "I am just angry that it took so long.", score: 1 },
    ],
    "Measures metacognitive review of success.",
  ],
  [
    80,
    "How do you react when you see a senior who scored 95%+ in their boards?",
    "feedback-improvement",
    [
      { key: "A", text: "I ask them for specific advice on their revision schedule and book choices.", score: 4 },
      { key: "B", text: "I ask them for their old notes.", score: 3 },
      { key: "C", text: "I assume they are just naturally a genius and I can never do that.", score: 2 },
      { key: "D", text: "I avoid them because they make me feel inferior.", score: 1 },
    ],
    "Measures modeling and seeking expert advice.",
  ],
];

const academicStyleRound5Raw = [
  [
    81,
    "When studying organic chemistry or complex biology classifications:",
    "conceptual-understanding",
    [
      { key: "A", text: "I look for patterns and root words to make logical sense of the names.", score: 4 },
      { key: "B", text: "I make a mnemonic (like VIBGYOR) to memorize the list.", score: 3 },
      { key: "C", text: "I try to rote memorize the exact spelling and order.", score: 2 },
      { key: "D", text: "I think it's impossible and skip it.", score: 1 },
    ],
    "Measures pattern recognition vs rote memory.",
  ],
  [
    82,
    "If the teacher asks a 'HOTS' (High Order Thinking Skills) question in class:",
    "conceptual-understanding",
    [
      { key: "A", text: "I enjoy the challenge and try to connect different concepts to answer.", score: 4 },
      { key: "B", text: "I wait for the smart kids to answer and note it down.", score: 3 },
      { key: "C", text: "I complain that it is not directly from the NCERT textbook.", score: 2 },
      { key: "D", text: "I stop paying attention completely.", score: 1 },
    ],
    "Measures appetite for cognitive complexity.",
  ],
  [
    83,
    "When reviewing a physics numerical where your final answer is wrong:",
    "conceptual-understanding",
    [
      { key: "A", text: "I check the units, the formula used, and the calculation steps.", score: 4 },
      { key: "B", text: "I look at the solution manual and copy the right steps.", score: 3 },
      { key: "C", text: "I just change the final answer to match the book.", score: 2 },
      { key: "D", text: "I assume the book's answer is misprinted.", score: 1 },
    ],
    "Measures diagnostic logic.",
  ],
  [
    84,
    "How do you approach a difficult unseen passage in English comprehension?",
    "conceptual-understanding",
    [
      { key: "A", text: "I read for the central theme and tone before looking at questions.", score: 4 },
      { key: "B", text: "I read the questions first and try to scan for matching words.", score: 3 },
      { key: "C", text: "I blindly copy paragraphs from the text that look similar.", score: 2 },
      { key: "D", text: "I leave the unseen passage for the end and often miss it.", score: 1 },
    ],
    "Measures holistic comprehension strategies.",
  ],
  [
    85,
    "When doing a self-test at home, how strict are you with yourself?",
    "practice-retrieval",
    [
      { key: "A", text: "Very strict. I grade myself honestly and deduct marks for missing keywords.", score: 4 },
      { key: "B", text: "Moderately strict. I give myself half marks if I am close.", score: 3 },
      { key: "C", text: "Not strict. If I think 'I knew that', I mark it correct.", score: 2 },
      { key: "D", text: "I never self-test; I only read.", score: 1 },
    ],
    "Measures calibration of metacognition.",
  ],
  [
    86,
    "What is your strategy for learning complicated spellings or scientific terms?",
    "practice-retrieval",
    [
      { key: "A", text: "I write them down from memory multiple times until perfect.", score: 4 },
      { key: "B", text: "I spell them out loud multiple times.", score: 3 },
      { key: "C", text: "I just stare at the word and hope it sticks.", score: 2 },
      { key: "D", text: "I rely on spell-check on my computer.", score: 1 },
    ],
    "Measures active recall for specific data.",
  ],
  [
    87,
    "During the last 15 minutes of a revision session:",
    "practice-retrieval",
    [
      { key: "A", text: "I quickly summarize everything I just studied without looking.", score: 4 },
      { key: "B", text: "I pack my bag for the next day.", score: 3 },
      { key: "C", text: "I spend it looking at my phone because I am tired.", score: 2 },
      { key: "D", text: "I just stare at the clock waiting for the time to end.", score: 1 },
    ],
    "Measures use of the spacing and recency effect.",
  ],
  [
    88,
    "If a friend asks you to explain a concept you just learned:",
    "practice-retrieval",
    [
      { key: "A", text: "I explain it enthusiastically because teaching helps me remember it better.", score: 4 },
      { key: "B", text: "I try my best to explain it using my notes.", score: 3 },
      { key: "C", text: "I tell them to just read the book.", score: 2 },
      { key: "D", text: "I refuse to share because I want higher marks than them.", score: 1 },
    ],
    "Measures peer-teaching (elaborative interrogation).",
  ],
  [
    89,
    "How do you organize your study materials (notes, printouts, past papers)?",
    "planning-consistency",
    [
      { key: "A", text: "I use labelled folders and subject-wise files so I can find anything instantly.", score: 4 },
      { key: "B", text: "I keep everything in one drawer and search when needed.", score: 3 },
      { key: "C", text: "My papers are scattered all over my room and in old bags.", score: 2 },
      { key: "D", text: "I regularly lose important notes and assignments.", score: 1 },
    ],
    "Measures physical resource management.",
  ],
  [
    90,
    "When a subject has both a theoretical paper and a practical file:",
    "planning-consistency",
    [
      { key: "A", text: "I balance time for both, ensuring the practical file is done weeks ahead.", score: 4 },
      { key: "B", text: "I do the practical file in the last week before the deadline.", score: 3 },
      { key: "C", text: "I prioritize theory and do a terrible job on the practical.", score: 2 },
      { key: "D", text: "I fake the practical data on the day of the exam.", score: 1 },
    ],
    "Measures multi-component task management.",
  ],
  [
    91,
    "Do you track your syllabus completion?",
    "planning-consistency",
    [
      { key: "A", text: "Yes, I have a printed syllabus copy and I highlight completed chapters.", score: 4 },
      { key: "B", text: "I mentally keep track of what is done and what is left.", score: 3 },
      { key: "C", text: "I rely on the teacher to tell us what is left.", score: 2 },
      { key: "D", text: "I usually don't know the full syllabus until the exam date sheet arrives.", score: 1 },
    ],
    "Measures macro-level academic planning.",
  ],
  [
    92,
    "How do you handle 'easy' subjects (like IT or Physical Education)?",
    "planning-consistency",
    [
      { key: "A", text: "I schedule a small amount of time for them to secure easy 100/100 marks.", score: 4 },
      { key: "B", text: "I only study them the day before the exam.", score: 3 },
      { key: "C", text: "I completely ignore them and sometimes lose silly marks.", score: 2 },
      { key: "D", text: "I fail them because I never opened the book.", score: 1 },
    ],
    "Measures strategic holistic planning.",
  ],
  [
    93,
    "What role does your bed play in your study habits?",
    "focus-environment",
    [
      { key: "A", text: "I strictly avoid studying on my bed; it is only for sleeping.", score: 4 },
      { key: "B", text: "I study on my bed only for light reading, not heavy math.", score: 3 },
      { key: "C", text: "I always study lying down on my bed and usually feel sleepy.", score: 2 },
      { key: "D", text: "I fall asleep with books on my chest every night.", score: 1 },
    ],
    "Measures environmental psychology (sleep hygiene).",
  ],
  [
    94,
    "When you use the internet for research, how often do you get side-tracked?",
    "focus-environment",
    [
      { key: "A", text: "Rarely, I find what I need and close the browser immediately.", score: 4 },
      { key: "B", text: "Sometimes, I might watch one extra video.", score: 3 },
      { key: "C", text: "Often, I end up on Wikipedia reading about random unrelated things.", score: 2 },
      { key: "D", text: "Always, I completely forget what I originally opened the browser for.", score: 1 },
    ],
    "Measures digital impulse control.",
  ],
  [
    95,
    "If you feel a surge of anxiety while studying for a tough exam:",
    "focus-environment",
    [
      { key: "A", text: "I practice deep breathing, take a walk, and break the task down.", score: 4 },
      { key: "B", text: "I drink water, complain to a friend, and get back to it.", score: 3 },
      { key: "C", text: "I panic, cry, and waste hours worrying instead of studying.", score: 2 },
      { key: "D", text: "I avoid the anxiety by playing video games instead.", score: 1 },
    ],
    "Measures emotional environment regulation.",
  ],
  [
    96,
    "How do you manage noise during exams when the invigilator is talking loudly?",
    "focus-environment",
    [
      { key: "A", text: "I mentally block it out and focus intensely on my paper.", score: 4 },
      { key: "B", text: "I get slightly annoyed but push through.", score: 3 },
      { key: "C", text: "I lose my train of thought and stare at the wall.", score: 2 },
      { key: "D", text: "I complain out loud and use it as an excuse for poor performance.", score: 1 },
    ],
    "Measures external distraction resistance.",
  ],
  [
    97,
    "If you notice you are consistently making calculation errors in Physics:",
    "feedback-improvement",
    [
      { key: "A", text: "I actively start dedicating 10 extra minutes just to recheck calculations.", score: 4 },
      { key: "B", text: "I tell myself to 'be more careful' next time.", score: 3 },
      { key: "C", text: "I accept that I am just bad at math.", score: 2 },
      { key: "D", text: "I blame the calculator or the rough paper provided.", score: 1 },
    ],
    "Measures actionable behavior modification.",
  ],
  [
    98,
    "When you receive your final corrected Board Exam Pre-board paper:",
    "feedback-improvement",
    [
      { key: "A", text: "I resolve the entire paper again, fixing every single mistake.", score: 4 },
      { key: "B", text: "I read through the teacher's corrections to understand my errors.", score: 3 },
      { key: "C", text: "I just check if the totaling of marks is correct.", score: 2 },
      { key: "D", text: "I throw the paper in my bag and never look at it again.", score: 1 },
    ],
    "Measures deep post-mortem analysis.",
  ],
  [
    99,
    "If a new study method (like mind-mapping) isn't working for you after a week:",
    "feedback-improvement",
    [
      { key: "A", text: "I evaluate why it failed and switch back to a method that works for me.", score: 4 },
      { key: "B", text: "I ask a teacher if I am doing it wrong.", score: 3 },
      { key: "C", text: "I keep forcing myself to do it because a YouTuber said it was the best.", score: 2 },
      { key: "D", text: "I conclude that studying altogether is useless for me.", score: 1 },
    ],
    "Measures metacognitive strategy evaluation.",
  ],
  [
    100,
    "Ultimately, who do you believe is responsible for your Class 10 results?",
    "feedback-improvement",
    [
      { key: "A", text: "Me. My habits, my planning, and my hard work dictate the outcome.", score: 4 },
      { key: "B", text: "Mostly me, but good teachers help a lot.", score: 3 },
      { key: "C", text: "The board examiners, depending on whether the paper is easy or hard.", score: 2 },
      { key: "D", text: "Luck. Some people are born smart, and some aren't.", score: 1 },
    ],
    "Measures internal locus of control.",
  ],
];

function makeAcademicStyleQuestion(
  round,
  questionNo,
  questionText,
  dimension,
  options,
  explanation = ""
) {
  return {
    id: `academic-style-r${round}-q${questionNo}`,
    _id: `academic-style-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "academic-style",
    testName: "Academic Style Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options,
    explanation,
    scoring: {
      type: "academic-style-behavioural",
      scale: "4-point",
      dimension,
    },
    isActive: true,
    active: true,
  };
}

const academicStyleQuestionsByRound = {
  1: academicStyleRound1Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeAcademicStyleQuestion(
        1,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  2: academicStyleRound2Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeAcademicStyleQuestion(
        2,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  3: academicStyleRound3Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeAcademicStyleQuestion(
        3,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  4: academicStyleRound4Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeAcademicStyleQuestion(
        4,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  5: academicStyleRound5Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeAcademicStyleQuestion(
        5,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
};
/* =========================================================
   SITUATIONAL IQ TEST QUESTIONS
========================================================= */

const situationalIQRound1Raw = [
  [
    1,
    "You have a Maths tuition test and a school English project due on the same day. How do you handle it?",
    "decision-making",
    [
      { key: "A", text: "I plan my week to finish the English project early so I can study for Maths the night before.", score: 4 },
      { key: "B", text: "I divide my time equally the night before to do a decent job on both.", score: 3 },
      { key: "C", text: "I focus only on Maths because tuitions are expensive, and I ignore the project.", score: 2 },
      { key: "D", text: "I get stressed and end up doing badly on both.", score: 1 },
    ],
    "Measures ability to prioritize and plan ahead for conflicting deadlines.",
  ],
  [
    2,
    "You are offered the role of Class Monitor, but you are already struggling to complete your Board Exam syllabus. What do you do?",
    "decision-making",
    [
      { key: "A", text: "I politely decline, explaining that I need to focus on my academics right now.", score: 4 },
      { key: "B", text: "I accept but ask a friend to share the responsibilities with me.", score: 3 },
      { key: "C", text: "I accept it for the status but ignore the monitor duties.", score: 2 },
      { key: "D", text: "I accept it, get overwhelmed, and my grades drop further.", score: 1 },
    ],
    "Measures self-awareness and capacity management.",
  ],
  [
    3,
    "Your parents want you to take Science, but you are highly passionate and skilled in Commerce. What do you do?",
    "decision-making",
    [
      { key: "A", text: "I gather data on Commerce career options and have a calm, logical discussion with them.", score: 4 },
      { key: "B", text: "I ask my school counsellor to speak to my parents about my strengths.", score: 3 },
      { key: "C", text: "I agree to take Science just to avoid an argument.", score: 2 },
      { key: "D", text: "I shout at them, refuse to study, and lock myself in my room.", score: 1 },
    ],
    "Measures negotiation skills and mature decision-making regarding future goals.",
  ],
  [
    4,
    "You find out that a coaching institute is offering a 'guaranteed pass' crash course, but it costs a lot of money and clashes with school hours.",
    "decision-making",
    [
      { key: "A", text: "I reject the idea because regular self-study and attending school is more reliable.", score: 4 },
      { key: "B", text: "I ask my teachers if the coaching is actually necessary before asking my parents.", score: 3 },
      { key: "C", text: "I skip school secretly to attend the crash course.", score: 2 },
      { key: "D", text: "I throw a tantrum until my parents pay for it.", score: 1 },
    ],
    "Measures evaluation of risky options versus sensible long-term choices.",
  ],
  [
    5,
    "While doing a Science practical experiment, your apparatus breaks, and you have no time to start over before the bell rings.",
    "problem-solving",
    [
      { key: "A", text: "I honestly tell the teacher, note down whatever readings I got, and ask if I can finish later.", score: 4 },
      { key: "B", text: "I ask the group next to me to share their data so I can understand the final result.", score: 3 },
      { key: "C", text: "I quickly copy the final answer from a friend's file.", score: 2 },
      { key: "D", text: "I hide the broken glass and leave the lab quietly.", score: 1 },
    ],
    "Measures practical troubleshooting and transparency.",
  ],
  [
    6,
    "You lose your handwritten notes for a subject just one week before the pre-boards.",
    "problem-solving",
    [
      { key: "A", text: "I borrow a friend's notes, photocopy them, and highlight the key points to save time.", score: 4 },
      { key: "B", text: "I switch to studying directly from the NCERT textbook.", score: 3 },
      { key: "C", text: "I panic and spend 3 days searching the whole house instead of studying.", score: 2 },
      { key: "D", text: "I give up on that subject entirely.", score: 1 },
    ],
    "Measures resourcefulness in a crisis.",
  ],
  [
    7,
    "Your school bag is too heavy, causing you back pain every day.",
    "problem-solving",
    [
      { key: "A", text: "I pack strictly according to the timetable and share textbooks with my benchmate.", score: 4 },
      { key: "B", text: "I request the teacher to let us keep thick books in the classroom lockers.", score: 3 },
      { key: "C", text: "I just endure the pain and complain to my parents daily.", score: 2 },
      { key: "D", text: "I start randomly leaving important books at home and get scolded in class.", score: 1 },
    ],
    "Measures ability to find logical solutions to daily logistical issues.",
  ],
  [
    8,
    "You are organizing a farewell party for seniors, but the caterer cancels at the last minute.",
    "problem-solving",
    [
      { key: "A", text: "I immediately call backup local vendors or order bulk food from a reliable restaurant.", score: 4 },
      { key: "B", text: "I inform the teacher-in-charge and ask for their help to find a solution.", score: 3 },
      { key: "C", text: "I blame the caterer in front of everyone and tell them food is cancelled.", score: 2 },
      { key: "D", text: "I panic and stop answering my phone.", score: 1 },
    ],
    "Measures emergency response and alternative generation.",
  ],
  [
    9,
    "Your group project is due tomorrow, but one team member has not done their part. What do you do?",
    "social-judgement",
    [
      { key: "A", text: "I speak to them calmly, divide the remaining work, and help complete it without blaming.", score: 4 },
      { key: "B", text: "I inform the group and try to complete the missing part together.", score: 3 },
      { key: "C", text: "I complain about them but still wait for them to finish it.", score: 2 },
      { key: "D", text: "I remove their name and fight with them in front of everyone.", score: 1 },
    ],
    "Measures teamwork, communication, and conflict handling.",
  ],
  [
    10,
    "You notice a classmate sitting alone and crying after receiving their exam results.",
    "social-judgement",
    [
      { key: "A", text: "I go over, ask if they want to talk, and offer emotional support without judging their marks.", score: 4 },
      { key: "B", text: "I tell a teacher or counsellor that someone is upset and needs help.", score: 3 },
      { key: "C", text: "I tell them 'it's just an exam, don't overreact' and walk away.", score: 2 },
      { key: "D", text: "I ignore them completely because it's none of my business.", score: 1 },
    ],
    "Measures empathy and appropriate social response.",
  ],
  [
    11,
    "Your friends are making fun of a new student's accent. They look to you to join in.",
    "social-judgement",
    [
      { key: "A", text: "I tell them firmly that it's not funny and invite the new student to sit with me.", score: 4 },
      { key: "B", text: "I don't laugh, change the topic, and walk away.", score: 3 },
      { key: "C", text: "I stay quiet and pretend I didn't hear anything.", score: 2 },
      { key: "D", text: "I join in the joke so I don't look uncool to my friends.", score: 1 },
    ],
    "Measures peer pressure resistance and inclusivity.",
  ],
  [
    12,
    "During a group discussion, one student keeps interrupting and not letting anyone else speak.",
    "social-judgement",
    [
      { key: "A", text: "I politely say, 'Let's hear everyone's point of view, I'd love to hear what Rahul thinks next.'", score: 4 },
      { key: "B", text: "I wait for a pause and jump in to give my own opinion.", score: 3 },
      { key: "C", text: "I roll my eyes, stop participating, and let them talk.", score: 2 },
      { key: "D", text: "I shout at them to shut up because they are annoying.", score: 1 },
    ],
    "Measures tactful communication and group facilitation.",
  ],
  [
    13,
    "You accidentally break a piece of school equipment while no one is looking.",
    "responsibility-ethics",
    [
      { key: "A", text: "I immediately inform the teacher, apologize, and ask how I can compensate for it.", score: 4 },
      { key: "B", text: "I tell a friend and we both go to the teacher to report it.", score: 3 },
      { key: "C", text: "I leave a note saying it is broken but don't write my name.", score: 2 },
      { key: "D", text: "I walk away quickly and pretend I know nothing about it.", score: 1 },
    ],
    "Measures accountability and integrity.",
  ],
  [
    14,
    "During a class test, you see your best friend cheating from a chit.",
    "responsibility-ethics",
    [
      { key: "A", text: "I talk to them privately after the test, warning them about the consequences.", score: 4 },
      { key: "B", text: "I try to block the teacher's view so my friend doesn't get caught this time.", score: 3 },
      { key: "C", text: "I ignore it but feel bad about it.", score: 2 },
      { key: "D", text: "I ask them to show me the chit so I can copy too.", score: 1 },
    ],
    "Measures ethical boundaries when relationships are involved.",
  ],
  [
    15,
    "You promised your parents you would study for 3 hours, but they leave the house for a wedding.",
    "responsibility-ethics",
    [
      { key: "A", text: "I stick to my promise, study for 3 hours, and then relax.", score: 4 },
      { key: "B", text: "I study for 2 hours and watch TV for the rest of the time.", score: 3 },
      { key: "C", text: "I watch TV the whole time and lie that I studied.", score: 2 },
      { key: "D", text: "I invite friends over for a party without permission.", score: 1 },
    ],
    "Measures self-discipline and honesty without supervision.",
  ],
  [
    16,
    "You find a lost wallet containing Rs. 500 in the school playground.",
    "responsibility-ethics",
    [
      { key: "A", text: "I immediately hand it over to the school office or principal without opening it.", score: 4 },
      { key: "B", text: "I ask around my class to see if anyone lost a wallet.", score: 3 },
      { key: "C", text: "I take the Rs. 500 and leave the wallet where it was.", score: 2 },
      { key: "D", text: "I keep the wallet and the money for myself.", score: 1 },
    ],
    "Measures basic moral integrity.",
  ],
  [
    17,
    "On the day of your Board Exam, your school bus breaks down halfway.",
    "adaptability-pressure",
    [
      { key: "A", text: "I stay calm, group up with other students, and immediately call our parents or a cab.", score: 4 },
      { key: "B", text: "I wait for the bus driver to arrange an alternative transport.", score: 3 },
      { key: "C", text: "I panic, start crying, and think my exam is ruined.", score: 2 },
      { key: "D", text: "I give up and walk back home.", score: 1 },
    ],
    "Measures stress response and quick alternative action.",
  ],
  [
    18,
    "The format of the Maths question paper is suddenly changed by the Board this year.",
    "adaptability-pressure",
    [
      { key: "A", text: "I quickly review the new sample paper and adjust my preparation strategy.", score: 4 },
      { key: "B", text: "I ask my teacher to explain the new format so I can practice.", score: 3 },
      { key: "C", text: "I complain constantly about how unfair the Board is.", score: 2 },
      { key: "D", text: "I ignore the change and study using the old format.", score: 1 },
    ],
    "Measures resilience to systemic changes.",
  ],
  [
    19,
    "You are giving a presentation on stage and the projector stops working.",
    "adaptability-pressure",
    [
      { key: "A", text: "I continue my speech confidently using my notes while someone fixes it.", score: 4 },
      { key: "B", text: "I apologize to the audience and wait quietly for the technician.", score: 3 },
      { key: "C", text: "I get extremely nervous, stumble on my words, and stop talking.", score: 2 },
      { key: "D", text: "I walk off the stage out of embarrassment.", score: 1 },
    ],
    "Measures poise and public-facing adaptability.",
  ],
  [
    20,
    "You study very hard for an exam but score much lower than expected.",
    "adaptability-pressure",
    [
      { key: "A", text: "I analyze my mistakes, ask the teacher for feedback, and change my study method.", score: 4 },
      { key: "B", text: "I feel sad for a day, but then motivate myself for the next exam.", score: 3 },
      { key: "C", text: "I decide that I am just bad at this subject and stop trying.", score: 2 },
      { key: "D", text: "I accuse the teacher of checking my paper incorrectly.", score: 1 },
    ],
    "Measures emotional resilience after failure.",
  ],
];

const situationalIQRound2Raw = [
  [
    21,
    "You are given a choice between two optional subjects: one is easy to score in, the other is hard but useful for your dream career.",
    "decision-making",
    [
      { key: "A", text: "I choose the hard one because it aligns with my long-term career goals.", score: 4 },
      { key: "B", text: "I ask a career counsellor to help me weigh the pros and cons before deciding.", score: 3 },
      { key: "C", text: "I choose the easy one just to make my report card look better.", score: 2 },
      { key: "D", text: "I flip a coin because I don't want to think about it.", score: 1 },
    ],
    "Measures long-term vs short-term gratification in choices.",
  ],
  [
    22,
    "Your friends plan a movie on the weekend, but you have a backlog of assignments.",
    "decision-making",
    [
      { key: "A", text: "I decline the movie, finish my backlog, and suggest meeting next week.", score: 4 },
      { key: "B", text: "I finish half my backlog quickly and go for the movie.", score: 3 },
      { key: "C", text: "I go for the movie and try to copy the assignments on Monday morning.", score: 2 },
      { key: "D", text: "I lie to my parents that I am going to group study and watch the movie.", score: 1 },
    ],
    "Measures prioritization and boundary setting.",
  ],
  [
    23,
    "You are unsure if you want to pursue Engineering or Design after Class 10.",
    "decision-making",
    [
      { key: "A", text: "I research both fields, take an aptitude test, and talk to professionals in both areas.", score: 4 },
      { key: "B", text: "I ask my parents what they think is best and follow their advice.", score: 3 },
      { key: "C", text: "I choose Engineering because most of my friends are doing it.", score: 2 },
      { key: "D", text: "I wait until the very last day of admission to randomly pick one.", score: 1 },
    ],
    "Measures proactive information gathering.",
  ],
  [
    24,
    "You have saved pocket money for a video game, but the school asks for a contribution to a charity drive.",
    "decision-making",
    [
      { key: "A", text: "I donate a portion of my savings and delay buying the game for a few weeks.", score: 4 },
      { key: "B", text: "I ask my parents if they can help me make a small donation.", score: 3 },
      { key: "C", text: "I ignore the charity drive and buy the game.", score: 2 },
      { key: "D", text: "I pretend I forgot to bring the money for the charity.", score: 1 },
    ],
    "Measures balancing personal desires with social responsibility.",
  ],
  [
    25,
    "You spill water on your finalized Science diagram just hours before submission.",
    "problem-solving",
    [
      { key: "A", text: "I stay calm, dry the paper carefully, and quickly redraw the ruined parts on a fresh sheet.", score: 4 },
      { key: "B", text: "I submit it as is and explain the accident to the teacher honestly.", score: 3 },
      { key: "C", text: "I cry and ask my older sibling to draw a new one for me.", score: 2 },
      { key: "D", text: "I skip school to avoid submitting it.", score: 1 },
    ],
    "Measures pragmatic action when work is destroyed.",
  ],
  [
    26,
    "You cannot understand a specific grammar rule in Hindi, and the teacher is absent for a week.",
    "problem-solving",
    [
      { key: "A", text: "I search for educational videos on YouTube or use a reference book to learn it.", score: 4 },
      { key: "B", text: "I ask a classmate who is good at Hindi to explain it to me.", score: 3 },
      { key: "C", text: "I wait for the teacher to return and hope there isn't a test.", score: 2 },
      { key: "D", text: "I completely ignore the topic.", score: 1 },
    ],
    "Measures independent learning and resourcefulness.",
  ],
  [
    27,
    "During a school debate, your opponent makes a point you did not prepare for.",
    "problem-solving",
    [
      { key: "A", text: "I listen carefully, analyze the logic of their point, and counter it on the spot.", score: 4 },
      { key: "B", text: "I pivot the conversation back to the strong points I have prepared.", score: 3 },
      { key: "C", text: "I freeze and repeat my old arguments without addressing theirs.", score: 2 },
      { key: "D", text: "I get aggressive and attack them personally instead of the argument.", score: 1 },
    ],
    "Measures cognitive flexibility and logical framing.",
  ],
  [
    28,
    "Your study table lamp stops working the night before an exam.",
    "problem-solving",
    [
      { key: "A", text: "I relocate my study materials to the living room or another well-lit area.", score: 4 },
      { key: "B", text: "I study using my phone's flashlight for a short while.", score: 3 },
      { key: "C", text: "I use it as an excuse to stop studying and go to sleep.", score: 2 },
      { key: "D", text: "I throw a tantrum and complain to my parents.", score: 1 },
    ],
    "Measures overcoming minor environmental obstacles.",
  ],
  [
    29,
    "Your friend is spreading a false rumor about another classmate.",
    "social-judgement",
    [
      { key: "A", text: "I tell my friend privately that spreading rumors is wrong and ask them to stop.", score: 4 },
      { key: "B", text: "I refuse to participate in the gossip but stay quiet.", score: 3 },
      { key: "C", text: "I listen to the rumor and pass it on to one other person.", score: 2 },
      { key: "D", text: "I add more fake details to the rumor to make it interesting.", score: 1 },
    ],
    "Measures moral courage in social situations.",
  ],
  [
    30,
    "A teacher scolds you in front of the whole class for talking, but it was actually the person behind you.",
    "social-judgement",
    [
      { key: "A", text: "I stay quiet during class, then explain the misunderstanding respectfully to the teacher afterward.", score: 4 },
      { key: "B", text: "I politely say 'Sorry ma'am, I wasn't talking' immediately.", score: 3 },
      { key: "C", text: "I get angry and loudly argue with the teacher in front of everyone.", score: 2 },
      { key: "D", text: "I turn around and slap the student who was actually talking.", score: 1 },
    ],
    "Measures emotional regulation and conflict de-escalation.",
  ],
  [
    31,
    "Your project partner is very shy and hesitant to present their part in front of the class.",
    "social-judgement",
    [
      { key: "A", text: "I encourage them, practice with them beforehand, and stand by them during the presentation.", score: 4 },
      { key: "B", text: "I offer to do the speaking part while they handle the slides.", score: 3 },
      { key: "C", text: "I tell the teacher my partner is useless at presenting.", score: 2 },
      { key: "D", text: "I make fun of them for being scared.", score: 1 },
    ],
    "Measures supportive leadership and empathy.",
  ],
  [
    32,
    "You have a disagreement with your parents regarding your screen time.",
    "social-judgement",
    [
      { key: "A", text: "I negotiate a fair timetable where I complete my studies first to earn screen time.", score: 4 },
      { key: "B", text: "I listen to their concerns and agree to reduce my usage slightly.", score: 3 },
      { key: "C", text: "I argue with them and complain that they don't understand my generation.", score: 2 },
      { key: "D", text: "I secretly use my phone under the blanket at night.", score: 1 },
    ],
    "Measures maturity in domestic conflict resolution.",
  ],
  [
    33,
    "You realize you forgot to do your homework just as the teacher walks into class.",
    "responsibility-ethics",
    [
      { key: "A", text: "I walk up to the teacher, admit my mistake honestly, and ask to submit it tomorrow.", score: 4 },
      { key: "B", text: "I quietly sit down and hope the teacher doesn't check my book.", score: 3 },
      { key: "C", text: "I quickly try to copy it from my neighbor before the teacher reaches my desk.", score: 2 },
      { key: "D", text: "I lie that I left my notebook at home.", score: 1 },
    ],
    "Measures ownership of mistakes versus deceit.",
  ],
  [
    34,
    "You see a junior student being bullied by your classmates in the corridor.",
    "responsibility-ethics",
    [
      { key: "A", text: "I step in to stop it and immediately report the incident to a teacher or principal.", score: 4 },
      { key: "B", text: "I distract my classmates so the junior can get away.", score: 3 },
      { key: "C", text: "I feel bad but walk away because I don't want to get involved.", score: 2 },
      { key: "D", text: "I join the bullying to look cool.", score: 1 },
    ],
    "Measures ethical action and bystander intervention.",
  ],
  [
    35,
    "A senior offers to give you the leaked question paper for tomorrow's pre-board exam.",
    "responsibility-ethics",
    [
      { key: "A", text: "I refuse it and anonymously report the leak to the school administration.", score: 4 },
      { key: "B", text: "I refuse it and focus on my own genuine preparation.", score: 3 },
      { key: "C", text: "I look at the paper just to see the topics but don't memorize the answers.", score: 2 },
      { key: "D", text: "I take the paper, memorize the answers, and sell it to my friends.", score: 1 },
    ],
    "Measures academic integrity and resistance to corruption.",
  ],
  [
    36,
    "You are given extra change (money) by mistake at the school canteen.",
    "responsibility-ethics",
    [
      { key: "A", text: "I immediately point out the mistake and return the extra money.", score: 4 },
      { key: "B", text: "I tell my friend about it and then go back to return it.", score: 3 },
      { key: "C", text: "I keep the money and tell myself the canteen makes enough profit.", score: 2 },
      { key: "D", text: "I use the extra money to buy chocolates for myself.", score: 1 },
    ],
    "Measures honesty in unmonitored situations.",
  ],
  [
    37,
    "During an online class, your internet connection keeps dropping, causing you to miss key points.",
    "adaptability-pressure",
    [
      { key: "A", text: "I message the teacher, ask friends for notes later, and watch the recording if available.", score: 4 },
      { key: "B", text: "I try to rely on the textbook to fill the gaps.", score: 3 },
      { key: "C", text: "I get frustrated and just log off completely.", score: 2 },
      { key: "D", text: "I use the bad connection as an excuse to play video games.", score: 1 },
    ],
    "Measures adaptability to technical disruptions.",
  ],
  [
    38,
    "The school announces a surprise unit test for a difficult chapter in Physics.",
    "adaptability-pressure",
    [
      { key: "A", text: "I stay calm, quickly review the main formulas and concepts I know, and do my best.", score: 4 },
      { key: "B", text: "I ask the teacher for 5 minutes to revise my notes.", score: 3 },
      { key: "C", text: "I panic, freeze up, and guess all the answers.", score: 2 },
      { key: "D", text: "I pretend to be sick and ask to go to the medical room.", score: 1 },
    ],
    "Measures response to sudden, unexpected pressure.",
  ],
  [
    39,
    "You move to a new school in Class 10 and find the teaching style completely different.",
    "adaptability-pressure",
    [
      { key: "A", text: "I actively adapt by asking teachers for guidance and observing how top students study.", score: 4 },
      { key: "B", text: "I try my best to follow along and give myself time to adjust.", score: 3 },
      { key: "C", text: "I constantly complain that my old school was better.", score: 2 },
      { key: "D", text: "I rebel, refuse to do homework, and alienate myself.", score: 1 },
    ],
    "Measures flexibility in new environments.",
  ],
  [
    40,
    "You have a minor headache on the day of an important exam.",
    "adaptability-pressure",
    [
      { key: "A", text: "I take some water, rest my eyes for a minute, and push through the exam calmly.", score: 4 },
      { key: "B", text: "I inform the invigilator so they are aware, and try my best.", score: 3 },
      { key: "C", text: "I focus on the pain, write randomly, and submit the paper early.", score: 2 },
      { key: "D", text: "I refuse to give the exam and walk out.", score: 1 },
    ],
    "Measures physical resilience under pressure.",
  ],
];

const situationalIQRound3Raw = [
  [
    41,
    "You have an opportunity to participate in a national science fair, but it overlaps with your mid-term exams.",
    "decision-making",
    [
      { key: "A", text: "I evaluate if I can manage both, and if not, I discuss a balanced compromise with my teachers.", score: 4 },
      { key: "B", text: "I drop the science fair to focus entirely on the exams.", score: 3 },
      { key: "C", text: "I do both poorly because I couldn't decide which to prioritize.", score: 2 },
      { key: "D", text: "I go to the science fair and completely skip my exams without telling anyone.", score: 1 },
    ],
    "Measures trade-off analysis in academic priorities.",
  ],
  [
    42,
    "You need to choose a 6th additional subject. One is Computers (you like it) and the other is P.E. (easy marks).",
    "decision-making",
    [
      { key: "A", text: "I choose Computers because the skills will benefit my future career.", score: 4 },
      { key: "B", text: "I choose Computers but worry about managing the workload.", score: 3 },
      { key: "C", text: "I choose P.E. just to boost my percentage without any effort.", score: 2 },
      { key: "D", text: "I don't choose either and let the school assign me randomly.", score: 1 },
    ],
    "Measures skill-building versus easy shortcuts.",
  ],
  [
    43,
    "Your friend asks you to lie to their parents about where they were last evening.",
    "decision-making",
    [
      { key: "A", text: "I refuse to lie and advise my friend to be honest with their parents.", score: 4 },
      { key: "B", text: "I tell my friend I don't want to get involved and stay silent.", score: 3 },
      { key: "C", text: "I make up a small lie to cover for them.", score: 2 },
      { key: "D", text: "I lie confidently and then blackmail my friend later.", score: 1 },
    ],
    "Measures ethical decision-making under peer pressure.",
  ],
  [
    44,
    "You are offered a spot on the school sports team, but your parents are worried it will affect your boards.",
    "decision-making",
    [
      { key: "A", text: "I create a strict timetable showing them how I will balance both, and ask for a trial period.", score: 4 },
      { key: "B", text: "I promise to study harder if they let me play.", score: 3 },
      { key: "C", text: "I quit the team immediately to avoid arguing with them.", score: 2 },
      { key: "D", text: "I secretly join the team and lie about where I am after school.", score: 1 },
    ],
    "Measures proactive negotiation.",
  ],
  [
    45,
    "You forgot to bring your admit card on the day of the pre-board exam.",
    "problem-solving",
    [
      { key: "A", text: "I immediately rush to the school office to request a temporary duplicate pass.", score: 4 },
      { key: "B", text: "I call my parents and ask them to WhatsApp a photo of it to the teacher.", score: 3 },
      { key: "C", text: "I stand outside the hall and cry.", score: 2 },
      { key: "D", text: "I go back home and miss the exam.", score: 1 },
    ],
    "Measures crisis management and critical thinking.",
  ],
  [
    46,
    "You don't understand a complex topic, and YouTube videos are confusing you further.",
    "problem-solving",
    [
      { key: "A", text: "I write down my specific doubts and take them to my subject teacher the next day.", score: 4 },
      { key: "B", text: "I ask a senior or classmate to explain it to me in simple terms.", score: 3 },
      { key: "C", text: "I rote memorize the text without understanding it.", score: 2 },
      { key: "D", text: "I declare the topic impossible and skip it.", score: 1 },
    ],
    "Measures recognizing failure of a method and changing approach.",
  ],
  [
    47,
    "During a school trip, you realize you have lost the group and don't know the way back.",
    "problem-solving",
    [
      { key: "A", text: "I stay in a safe public spot, call the teacher's emergency number, and wait.", score: 4 },
      { key: "B", text: "I ask a security guard for help and try to call a friend.", score: 3 },
      { key: "C", text: "I wander around aimlessly looking for them.", score: 2 },
      { key: "D", text: "I panic, cry, and try to walk back to the hotel alone.", score: 1 },
    ],
    "Measures logical action during high stress.",
  ],
  [
    48,
    "Your pen runs out of ink in the middle of a board exam, and you don't have a spare.",
    "problem-solving",
    [
      { key: "A", text: "I raise my hand immediately and ask the invigilator for a spare pen.", score: 4 },
      { key: "B", text: "I whisper to the person next to me to borrow one.", score: 3 },
      { key: "C", text: "I wait 15 minutes hoping someone notices I stopped writing.", score: 2 },
      { key: "D", text: "I try to scratch the paper with the dry pen.", score: 1 },
    ],
    "Measures pragmatic action under strict constraints.",
  ],
  [
    49,
    "A classmate constantly takes credit for your ideas during group assignments.",
    "social-judgement",
    [
      { key: "A", text: "I assertively bring up my ideas directly to the teacher during the presentation.", score: 4 },
      { key: "B", text: "I tell my classmate privately to stop doing that.", score: 3 },
      { key: "C", text: "I stay quiet and let them take the credit to avoid conflict.", score: 2 },
      { key: "D", text: "I insult them in front of the whole class.", score: 1 },
    ],
    "Measures assertiveness and conflict management.",
  ],
  [
    50,
    "You are the team captain, and two of your best players are fighting and refuse to play together.",
    "social-judgement",
    [
      { key: "A", text: "I sit them down together, mediate the issue, and remind them of the team's goal.", score: 4 },
      { key: "B", text: "I tell them to put their differences aside just for the match.", score: 3 },
      { key: "C", text: "I pick one player's side and bench the other.", score: 2 },
      { key: "D", text: "I ignore the fight and hope it resolves itself.", score: 1 },
    ],
    "Measures leadership and mediation.",
  ],
  [
    51,
    "A friend is overly stressed about exams and says they feel like running away.",
    "social-judgement",
    [
      { key: "A", text: "I listen to them carefully, comfort them, and immediately inform a trusted teacher or their parents.", score: 4 },
      { key: "B", text: "I tell them to calm down and help them study.", score: 3 },
      { key: "C", text: "I promise to keep it a secret and do nothing.", score: 2 },
      { key: "D", text: "I tell them they are being dramatic.", score: 1 },
    ],
    "Measures crisis recognition and duty of care.",
  ],
  [
    52,
    "Your teacher mispronounces a word repeatedly, and the class is secretly laughing.",
    "social-judgement",
    [
      { key: "A", text: "I maintain respect, do not laugh, and focus on the lesson.", score: 4 },
      { key: "B", text: "I ignore the laughing but smile a little.", score: 3 },
      { key: "C", text: "I join the laughing because everyone else is doing it.", score: 2 },
      { key: "D", text: "I rudely correct the teacher in front of everyone.", score: 1 },
    ],
    "Measures respect and social maturity.",
  ],
  [
    53,
    "You realize you accidentally plagiarized (copied) a paragraph from the internet for your essay.",
    "responsibility-ethics",
    [
      { key: "A", text: "I rewrite the paragraph in my own words before submitting it.", score: 4 },
      { key: "B", text: "I add quotes and cite the website source.", score: 3 },
      { key: "C", text: "I submit it and hope the teacher doesn't use a plagiarism checker.", score: 2 },
      { key: "D", text: "I submit it confidently because everyone copies from the internet.", score: 1 },
    ],
    "Measures academic integrity.",
  ],
  [
    54,
    "You are the class monitor. A popular student breaks a window and asks you not to tell.",
    "responsibility-ethics",
    [
      { key: "A", text: "I inform the teacher because keeping it a secret is unfair to the class.", score: 4 },
      { key: "B", text: "I tell the student to confess, or else I will report them.", score: 3 },
      { key: "C", text: "I stay quiet because I want to stay popular.", score: 2 },
      { key: "D", text: "I take a bribe from the student to keep quiet.", score: 1 },
    ],
    "Measures adherence to duty over popularity.",
  ],
  [
    55,
    "You find the answer key to tomorrow's test on the teacher's desk.",
    "responsibility-ethics",
    [
      { key: "A", text: "I walk away immediately and do not look at the answers.", score: 4 },
      { key: "B", text: "I tell the teacher they left the key on the desk.", score: 3 },
      { key: "C", text: "I quickly look at one difficult answer.", score: 2 },
      { key: "D", text: "I take a photo of it and share it on the class WhatsApp group.", score: 1 },
    ],
    "Measures restraint and moral compass.",
  ],
  [
    56,
    "You borrowed a library book and accidentally spilled tea on it.",
    "responsibility-ethics",
    [
      { key: "A", text: "I tell the librarian immediately and pay the fine or replace the book.", score: 4 },
      { key: "B", text: "I try to clean it and return it, hoping they don't notice.", score: 3 },
      { key: "C", text: "I hide the book at home and pretend I lost it.", score: 2 },
      { key: "D", text: "I sneak it back onto the library shelf secretly.", score: 1 },
    ],
    "Measures accountability for property.",
  ],
  [
    57,
    "You prepared a speech for the morning assembly, but the principal cuts your time from 5 minutes to 1 minute.",
    "adaptability-pressure",
    [
      { key: "A", text: "I mentally select the most important points and deliver a strong 1-minute summary.", score: 4 },
      { key: "B", text: "I speak very fast to try and fit all 5 minutes of content in.", score: 3 },
      { key: "C", text: "I refuse to speak because my hard work was disrespected.", score: 2 },
      { key: "D", text: "I go on stage and freeze, unable to shorten it.", score: 1 },
    ],
    "Measures quick re-calibration under pressure.",
  ],
  [
    58,
    "Your internet goes down in the middle of an important online exam.",
    "adaptability-pressure",
    [
      { key: "A", text: "I quickly switch to a mobile hotspot or call the school to inform them.", score: 4 },
      { key: "B", text: "I wait 10 minutes to see if it comes back, then call.", score: 3 },
      { key: "C", text: "I panic and start crying.", score: 2 },
      { key: "D", text: "I use the opportunity to open my book and cheat.", score: 1 },
    ],
    "Measures emotional stability during technical failures.",
  ],
  [
    59,
    "You are shifted to a different section where you have no friends in Class 10.",
    "adaptability-pressure",
    [
      { key: "A", text: "I use this as an opportunity to focus on studies and make new friends gradually.", score: 4 },
      { key: "B", text: "I am polite but mostly keep to myself.", score: 3 },
      { key: "C", text: "I beg the principal daily to change my section back.", score: 2 },
      { key: "D", text: "I hate the new section and refuse to talk to anyone all year.", score: 1 },
    ],
    "Measures social adaptability.",
  ],
  [
    60,
    "Right before entering the exam hall, someone tells you a topic you didn't study is highly important.",
    "adaptability-pressure",
    [
      { key: "A", text: "I ignore them, trust my preparation, and stay calm.", score: 4 },
      { key: "B", text: "I quickly look at the summary of that topic in 2 minutes.", score: 3 },
      { key: "C", text: "I panic and forget everything else I studied.", score: 2 },
      { key: "D", text: "I get angry and shout at the person for stressing me out.", score: 1 },
    ],
    "Measures resistance to last-minute anxiety.",
  ],
];

const situationalIQRound4Raw = [
  [
    61,
    "You are deciding whether to join a tuition center that is 1 hour away but famous, or one that is 5 mins away but average.",
    "decision-making",
    [
      { key: "A", text: "I evaluate the travel time vs. teaching quality and decide if the 2 hours of daily travel is worth it.", score: 4 },
      { key: "B", text: "I join the nearby one and use the saved time for self-study.", score: 3 },
      { key: "C", text: "I join the famous one just because my friends go there.", score: 2 },
      { key: "D", text: "I refuse to go to any tuition.", score: 1 },
    ],
    "Measures analytical decision-making considering multiple variables.",
  ],
  [
    62,
    "You want to pursue Arts, but your relatives tell you it has no scope. What is your response?",
    "decision-making",
    [
      { key: "A", text: "I present facts about modern Arts careers (Design, Law, Media) and confidently stick to my choice.", score: 4 },
      { key: "B", text: "I ignore their comments and focus on my own plans.", score: 3 },
      { key: "C", text: "I start doubting myself and reconsider taking Science.", score: 2 },
      { key: "D", text: "I insult them for being old-fashioned.", score: 1 },
    ],
    "Measures independence of thought and evidence-based conviction.",
  ],
  [
    63,
    "You have to choose between a group where you do all the work and get an A, or a group where everyone works but you might get a B.",
    "decision-making",
    [
      { key: "A", text: "I choose the group where everyone works, as teamwork and shared effort are more important for learning.", score: 4 },
      { key: "B", text: "I choose the 'A' group because I care about the marks.", score: 3 },
      { key: "C", text: "I avoid joining any group and ask to work alone.", score: 2 },
      { key: "D", text: "I join a group where nobody works and we all fail.", score: 1 },
    ],
    "Measures understanding of collaborative value versus individual perfection.",
  ],
  [
    64,
    "Your school allows you to pick one club: Robotics or Creative Writing. You like both equally.",
    "decision-making",
    [
      { key: "A", text: "I assess which skill I want to develop more for my future career and choose that.", score: 4 },
      { key: "B", text: "I choose the one where the teacher is nicer.", score: 3 },
      { key: "C", text: "I toss a coin.", score: 2 },
      { key: "D", text: "I join neither because I can't decide.", score: 1 },
    ],
    "Measures framework-driven decision making.",
  ],
  [
    65,
    "You are given a very complex math problem that you have never seen before.",
    "problem-solving",
    [
      { key: "A", text: "I break it down into smaller parts and apply the basic principles I know.", score: 4 },
      { key: "B", text: "I look for a similar solved example in the textbook.", score: 3 },
      { key: "C", text: "I stare at it for a minute and then skip it.", score: 2 },
      { key: "D", text: "I guess the answer randomly.", score: 1 },
    ],
    "Measures analytical breakdown of novel problems.",
  ],
  [
    66,
    "Your school computer crashes right before you save your computer science project.",
    "problem-solving",
    [
      { key: "A", text: "I check if there is an autosave file, or calmly restart and re-code it.", score: 4 },
      { key: "B", text: "I call the IT teacher for help.", score: 3 },
      { key: "C", text: "I cry and say it's unfair.", score: 2 },
      { key: "D", text: "I break the keyboard in anger.", score: 1 },
    ],
    "Measures emotional control and logical troubleshooting.",
  ],
  [
    67,
    "You have to memorize a long list of historical dates, but rote memorization isn't working.",
    "problem-solving",
    [
      { key: "A", text: "I create a mnemonic story or visual timeline to connect the events logically.", score: 4 },
      { key: "B", text: "I make flashcards and test myself repeatedly.", score: 3 },
      { key: "C", text: "I just keep reading the list and hoping I remember.", score: 2 },
      { key: "D", text: "I tear the page out of frustration.", score: 1 },
    ],
    "Measures strategy adjustment in learning.",
  ],
  [
    68,
    "The chemistry lab ran out of the chemical you need for your required practical.",
    "problem-solving",
    [
      { key: "A", text: "I ask the teacher if there is a substitute chemical or a different experiment I can perform.", score: 4 },
      { key: "B", text: "I wait until the teacher notices and tells me what to do.", score: 3 },
      { key: "C", text: "I copy the observations from a friend who did it yesterday.", score: 2 },
      { key: "D", text: "I just sit in the lab doing nothing.", score: 1 },
    ],
    "Measures proactive resourcefulness.",
  ],
  [
    69,
    "Two of your friends are arguing and both expect you to take their side.",
    "social-judgement",
    [
      { key: "A", text: "I stay neutral, listen to both, and suggest they talk it out calmly.", score: 4 },
      { key: "B", text: "I tell them I don't want to get involved.", score: 3 },
      { key: "C", text: "I take the side of the friend I like more.", score: 2 },
      { key: "D", text: "I instigate them further to watch the drama.", score: 1 },
    ],
    "Measures neutrality and conflict resolution.",
  ],
  [
    70,
    "You accidentally overhear a teacher discussing confidential exam questions with another teacher.",
    "social-judgement",
    [
      { key: "A", text: "I walk away immediately and keep it completely to myself.", score: 4 },
      { key: "B", text: "I tell the teacher I accidentally heard them.", score: 3 },
      { key: "C", text: "I tell my best friend but ask them to swear secrecy.", score: 2 },
      { key: "D", text: "I announce it to the whole class to be a hero.", score: 1 },
    ],
    "Measures discretion and boundary recognition.",
  ],
  [
    71,
    "A classmate is consistently making passive-aggressive comments about your grades.",
    "social-judgement",
    [
      { key: "A", text: "I confront them politely and ask why they are making those comments.", score: 4 },
      { key: "B", text: "I ignore them and distance myself from them.", score: 3 },
      { key: "C", text: "I make passive-aggressive comments back at them.", score: 2 },
      { key: "D", text: "I start a physical fight with them.", score: 1 },
    ],
    "Measures mature confrontation vs escalation.",
  ],
  [
    72,
    "During group study, someone makes a highly offensive joke.",
    "social-judgement",
    [
      { key: "A", text: "I call it out respectfully, saying 'That's not cool/appropriate.'", score: 4 },
      { key: "B", text: "I don't laugh and change the subject.", score: 3 },
      { key: "C", text: "I laugh awkwardly to fit in.", score: 2 },
      { key: "D", text: "I add to the joke to be part of the group.", score: 1 },
    ],
    "Measures social courage and ethical boundaries.",
  ],
  [
    73,
    "You realize you gave the wrong answer during a class debate, but the teacher didn't notice.",
    "responsibility-ethics",
    [
      { key: "A", text: "I raise my hand and correct my own mistake openly.", score: 4 },
      { key: "B", text: "I tell my team quietly so we don't use that point again.", score: 3 },
      { key: "C", text: "I stay quiet and hope nobody realizes.", score: 2 },
      { key: "D", text: "I later blame my teammate for giving me the wrong info.", score: 1 },
    ],
    "Measures intellectual honesty.",
  ],
  [
    74,
    "You are given extra marks by mistake on your final term paper.",
    "responsibility-ethics",
    [
      { key: "A", text: "I take the paper to the teacher and ask them to correct the total.", score: 4 },
      { key: "B", text: "I consult my parents on what to do.", score: 3 },
      { key: "C", text: "I keep quiet and enjoy the higher grade.", score: 2 },
      { key: "D", text: "I brag to my friends about getting free marks.", score: 1 },
    ],
    "Measures integrity when personal benefit is at stake.",
  ],
  [
    75,
    "You accidentally scratch a teacher's car in the parking lot with your bicycle.",
    "responsibility-ethics",
    [
      { key: "A", text: "I wait for the teacher or leave a note with my name and apology.", score: 4 },
      { key: "B", text: "I tell the security guard what happened.", score: 3 },
      { key: "C", text: "I ride away quickly so nobody sees me.", score: 2 },
      { key: "D", text: "I blame another student if someone asks.", score: 1 },
    ],
    "Measures accountability for damages.",
  ],
  [
    76,
    "Your parents restrict your phone usage, but you know their password.",
    "responsibility-ethics",
    [
      { key: "A", text: "I respect their rule and don't unlock the phone secretly.", score: 4 },
      { key: "B", text: "I only unlock it if I urgently need to check something for school.", score: 3 },
      { key: "C", text: "I unlock it every night when they are asleep.", score: 2 },
      { key: "D", text: "I change their password so they can't lock it anymore.", score: 1 },
    ],
    "Measures trustworthiness and respect for rules.",
  ],
  [
    77,
    "You are assigned to a project group with people you don't like.",
    "adaptability-pressure",
    [
      { key: "A", text: "I put my personal feelings aside and focus on working professionally to get the job done.", score: 4 },
      { key: "B", text: "I do my part of the work silently and avoid talking to them.", score: 3 },
      { key: "C", text: "I ask the teacher to change my group immediately.", score: 2 },
      { key: "D", text: "I refuse to do any work and sabotage the project.", score: 1 },
    ],
    "Measures professional adaptability and emotional separation.",
  ],
  [
    78,
    "During a viva (oral exam), the examiner is very strict and intimidating.",
    "adaptability-pressure",
    [
      { key: "A", text: "I take a deep breath, maintain eye contact, and answer calmly to the best of my knowledge.", score: 4 },
      { key: "B", text: "I answer nervously but try my best to complete the exam.", score: 3 },
      { key: "C", text: "I start stammering, forget my answers, and start crying.", score: 2 },
      { key: "D", text: "I argue with the examiner for being mean.", score: 1 },
    ],
    "Measures composure under interpersonal stress.",
  ],
  [
    79,
    "You have to relocate to a new city right before your Class 10 boards.",
    "adaptability-pressure",
    [
      { key: "A", text: "I quickly set up a study space, maintain my routine, and stay in touch with old teachers online.", score: 4 },
      { key: "B", text: "I focus on self-study and hope for the best.", score: 3 },
      { key: "C", text: "I spend weeks complaining about the move instead of studying.", score: 2 },
      { key: "D", text: "I refuse to study and blame my parents for ruining my life.", score: 1 },
    ],
    "Measures adaptability to major life disruptions.",
  ],
  [
    80,
    "Your tuition teacher cancels the most important revision class at the last minute.",
    "adaptability-pressure",
    [
      { key: "A", text: "I use that time to revise the material on my own or solve a mock paper.", score: 4 },
      { key: "B", text: "I call a friend and try to discuss the topics over the phone.", score: 3 },
      { key: "C", text: "I consider it a holiday and go watch TV.", score: 2 },
      { key: "D", text: "I panic because I rely entirely on the tuition teacher to pass.", score: 1 },
    ],
    "Measures self-reliance when support systems fail.",
  ],
];

const situationalIQRound5Raw = [
  [
    81,
    "You realize you are addicted to social media and it's affecting your grades. What do you do?",
    "decision-making",
    [
      { key: "A", text: "I delete the apps, set screen time limits, and ask my parents to hold me accountable.", score: 4 },
      { key: "B", text: "I try to rely on willpower to use my phone less.", score: 3 },
      { key: "C", text: "I promise to stop tomorrow, but keep using it today.", score: 2 },
      { key: "D", text: "I accept my bad grades and continue scrolling.", score: 1 },
    ],
    "Measures proactive decision-making for self-improvement.",
  ],
  [
    82,
    "You have a choice between copying a senior's high-scoring project or making an original, average-scoring one.",
    "decision-making",
    [
      { key: "A", text: "I make the original one, as the learning experience is more valuable.", score: 4 },
      { key: "B", text: "I look at the senior's project for ideas but make my own.", score: 3 },
      { key: "C", text: "I copy half of it and change the handwriting.", score: 2 },
      { key: "D", text: "I copy it word-for-word to get the easy marks.", score: 1 },
    ],
    "Measures integrity versus shortcut mentalities.",
  ],
  [
    83,
    "Your friend offers to teach you a topic, but their method is very confusing.",
    "decision-making",
    [
      { key: "A", text: "I politely thank them but switch to studying from a textbook or video.", score: 4 },
      { key: "B", text: "I keep listening so they don't feel bad, but I learn nothing.", score: 3 },
      { key: "C", text: "I tell them they are a terrible teacher.", score: 2 },
      { key: "D", text: "I just pretend I understood and fail the test.", score: 1 },
    ],
    "Measures diplomatic prioritization of own goals.",
  ],
  [
    84,
    "You have 10 days to prepare for an exam, but you haven't started at all.",
    "decision-making",
    [
      { key: "A", text: "I prioritize high-weightage chapters, make a 10-day plan, and start immediately.", score: 4 },
      { key: "B", text: "I start reading from page 1 and hope I finish.", score: 3 },
      { key: "C", text: "I wait until the last 2 days out of fear.", score: 2 },
      { key: "D", text: "I decide it's too late and give up.", score: 1 },
    ],
    "Measures strategic triage decision-making.",
  ],
  [
    85,
    "You keep making silly calculation errors in Math, even though you know the formulas.",
    "problem-solving",
    [
      { key: "A", text: "I start writing my steps clearly and double-check every calculation line.", score: 4 },
      { key: "B", text: "I try to solve slower.", score: 3 },
      { key: "C", text: "I get frustrated and blame the calculator.", score: 2 },
      { key: "D", text: "I just accept that I am 'bad at Math'.", score: 1 },
    ],
    "Measures process-oriented problem solving.",
  ],
  [
    86,
    "Your school uniform tears right before you have to leave for an important assembly.",
    "problem-solving",
    [
      { key: "A", text: "I use a safety pin or quickly sew it to make it presentable.", score: 4 },
      { key: "B", text: "I wear a sweater or jacket over it to hide it.", score: 3 },
      { key: "C", text: "I cry and refuse to go to school.", score: 2 },
      { key: "D", text: "I go in casual clothes and get punished.", score: 1 },
    ],
    "Measures quick logistical troubleshooting.",
  ],
  [
    87,
    "A concept requires memorizing 20 complex terms, which you keep forgetting.",
    "problem-solving",
    [
      { key: "A", text: "I break them into groups of 5 and use memory techniques like acronyms.", score: 4 },
      { key: "B", text: "I write them down 20 times each.", score: 3 },
      { key: "C", text: "I stare at the book hoping my brain absorbs it.", score: 2 },
      { key: "D", text: "I rip the page out in anger.", score: 1 },
    ],
    "Measures cognitive strategy adjustment.",
  ],
  [
    88,
    "The library does not have the reference book your teacher told you to use.",
    "problem-solving",
    [
      { key: "A", text: "I find a reliable online PDF, a similar book, or ask a senior to lend theirs.", score: 4 },
      { key: "B", text: "I tell the teacher the book wasn't there.", score: 3 },
      { key: "C", text: "I use it as an excuse not to do the assignment.", score: 2 },
      { key: "D", text: "I complain that the school is useless.", score: 1 },
    ],
    "Measures proactive alternative sourcing.",
  ],
  [
    89,
    "Your friend starts avoiding you and sitting with a different group without explanation.",
    "social-judgement",
    [
      { key: "A", text: "I approach them privately, ask if I did something wrong, and respect their space.", score: 4 },
      { key: "B", text: "I give them space and wait for them to talk to me.", score: 3 },
      { key: "C", text: "I get angry and start ignoring them too.", score: 2 },
      { key: "D", text: "I spread rumors about them to the rest of the class.", score: 1 },
    ],
    "Measures mature interpersonal conflict handling.",
  ],
  [
    90,
    "A classmate is proudly showing off an expensive gadget, making others feel poor.",
    "social-judgement",
    [
      { key: "A", text: "I acknowledge the gadget politely but steer the conversation to neutral topics.", score: 4 },
      { key: "B", text: "I walk away from the conversation.", score: 3 },
      { key: "C", text: "I feel extremely jealous and demand my parents buy me one.", score: 2 },
      { key: "D", text: "I insult the classmate and try to break the gadget.", score: 1 },
    ],
    "Measures social poise and emotional regulation regarding status.",
  ],
  [
    91,
    "Your teacher unfairly praises another student for an idea that you originally suggested.",
    "social-judgement",
    [
      { key: "A", text: "I talk to the teacher privately after class to clarify gracefully.", score: 4 },
      { key: "B", text: "I let it go because it's just a small class discussion.", score: 3 },
      { key: "C", text: "I interrupt the teacher loudly and say 'That was my idea!'", score: 2 },
      { key: "D", text: "I hold a grudge against both the teacher and the student forever.", score: 1 },
    ],
    "Measures handling of professional/academic credit.",
  ],
  [
    92,
    "You are placed in a group where nobody speaks the same regional language as you.",
    "social-judgement",
    [
      { key: "A", text: "I communicate in English or Hindi patiently, using gestures and written notes if needed.", score: 4 },
      { key: "B", text: "I stick to basic English and do my part quietly.", score: 3 },
      { key: "C", text: "I sit silently and contribute nothing.", score: 2 },
      { key: "D", text: "I mock them for not understanding my language.", score: 1 },
    ],
    "Measures inclusivity and communication barriers.",
  ],
  [
    93,
    "You are given access to the school's computer lab, but the teacher leaves the room.",
    "responsibility-ethics",
    [
      { key: "A", text: "I continue my assigned project work and do not browse inappropriate sites.", score: 4 },
      { key: "B", text: "I play a quick game but finish my work.", score: 3 },
      { key: "C", text: "I watch movies for the whole period.", score: 2 },
      { key: "D", text: "I try to hack into the school's grading system.", score: 1 },
    ],
    "Measures integrity in unmonitored digital environments.",
  ],
  [
    94,
    "A shopkeeper forgets to charge you for an expensive notebook you picked up.",
    "responsibility-ethics",
    [
      { key: "A", text: "I remind the shopkeeper and pay for the notebook.", score: 4 },
      { key: "B", text: "I walk out, realize it later, and feel bad.", score: 3 },
      { key: "C", text: "I walk out and consider it my lucky day.", score: 2 },
      { key: "D", text: "I go back and try to steal a pen too.", score: 1 },
    ],
    "Measures honesty in financial transactions.",
  ],
  [
    95,
    "You realize you forged your parents' signature on a report card in panic.",
    "responsibility-ethics",
    [
      { key: "A", text: "I confess to my parents and the teacher, apologize, and face the consequences.", score: 4 },
      { key: "B", text: "I tell my parents but beg them not to tell the teacher.", score: 3 },
      { key: "C", text: "I keep quiet and hope nobody ever checks.", score: 2 },
      { key: "D", text: "I brag to my friends about how I tricked the school.", score: 1 },
    ],
    "Measures guilt, confession, and rectifying unethical acts.",
  ],
  [
    96,
    "You are asked to peer-grade your best friend's test paper, and they are failing by 1 mark.",
    "responsibility-ethics",
    [
      { key: "A", text: "I mark it honestly because giving fake marks is unethical.", score: 4 },
      { key: "B", text: "I ask the teacher to grade it instead.", score: 3 },
      { key: "C", text: "I secretly give them the 1 mark.", score: 2 },
      { key: "D", text: "I give them 10 extra marks so they top the class.", score: 1 },
    ],
    "Measures impartiality and conflict of interest.",
  ],
  [
    97,
    "The exam paper is much harder than anything taught in class or the NCERT book.",
    "adaptability-pressure",
    [
      { key: "A", text: "I stay calm, attempt what I know, and apply logical guesses to the rest.", score: 4 },
      { key: "B", text: "I answer the easy ones and leave the hard ones blank.", score: 3 },
      { key: "C", text: "I panic, cry in the exam hall, and forget what I studied.", score: 2 },
      { key: "D", text: "I walk out of the hall in protest.", score: 1 },
    ],
    "Measures resilience to unfair or extremely stressful surprises.",
  ],
  [
    98,
    "Your family faces a financial crisis, and the atmosphere at home is very tense during exams.",
    "adaptability-pressure",
    [
      { key: "A", text: "I focus on studying in the library or school, and try not to add to my parents' stress.", score: 4 },
      { key: "B", text: "I study as much as I can in my room.", score: 3 },
      { key: "C", text: "I use the stress as an excuse to completely stop studying.", score: 2 },
      { key: "D", text: "I fight with my parents for ruining my exam peace.", score: 1 },
    ],
    "Measures functioning during severe personal adversity.",
  ],
  [
    99,
    "You sprain your writing hand a week before the final exams.",
    "adaptability-pressure",
    [
      { key: "A", text: "I immediately request the school for a writer (scribe) and practice dictating my answers.", score: 4 },
      { key: "B", text: "I try to write slowly with the pain.", score: 3 },
      { key: "C", text: "I cry and assume I will fail the year.", score: 2 },
      { key: "D", text: "I skip the exams entirely.", score: 1 },
    ],
    "Measures adaptive action to physical disability.",
  ],
  [
    100,
    "You fail your Class 10 pre-boards completely.",
    "adaptability-pressure",
    [
      { key: "A", text: "I accept reality, create an aggressive 2-month recovery plan, and ask teachers for help.", score: 4 },
      { key: "B", text: "I feel ashamed but start studying a bit harder.", score: 3 },
      { key: "C", text: "I lie to my parents and hide the result.", score: 2 },
      { key: "D", text: "I give up on studies entirely and refuse to take the final boards.", score: 1 },
    ],
    "Measures ultimate resilience and bounce-back ability.",
  ],
];

function makeSituationalIQQuestion(
  round,
  questionNo,
  questionText,
  dimension,
  options,
  explanation = ""
) {
  return {
    id: `situational-iq-r${round}-q${questionNo}`,
    _id: `situational-iq-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "situational-iq",
    testName: "Situational IQ Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options,
    explanation,
    scoring: {
      type: "situational-iq-behavioural",
      scale: "4-point",
      dimension,
    },
    isActive: true,
    active: true,
  };
}

const situationalIQQuestionsByRound = {
  1: situationalIQRound1Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeSituationalIQQuestion(1, questionNo, questionText, dimension, options, explanation)
  ),
  2: situationalIQRound2Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeSituationalIQQuestion(2, questionNo, questionText, dimension, options, explanation)
  ),
  3: situationalIQRound3Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeSituationalIQQuestion(3, questionNo, questionText, dimension, options, explanation)
  ),
  4: situationalIQRound4Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeSituationalIQQuestion(4, questionNo, questionText, dimension, options, explanation)
  ),
  5: situationalIQRound5Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeSituationalIQQuestion(5, questionNo, questionText, dimension, options, explanation)
  ),
};
/* =========================================================
   VALUES TEST QUESTIONS
========================================================= */

const valuesOptionBank = [
  {
    valueTag: "achievement-excellence",
    text: "I would choose the path where I can improve, compete, perform strongly, and be recognized for excellence.",
  },
  {
    valueTag: "security-stability",
    text: "I would choose the path that gives me stability, safety, predictable income, and a secure future.",
  },
  {
    valueTag: "creativity-innovation",
    text: "I would choose the path where I can create original ideas, design new things, and think differently.",
  },
  {
    valueTag: "service-social-impact",
    text: "I would choose the path where I can help people, solve real problems, and make a positive difference.",
  },
  {
    valueTag: "independence-leadership",
    text: "I would choose the path where I can make decisions, lead people, work independently, and build something of my own.",
  },
];

const valuesQuestionTexts = [
  "When imagining your ideal future workplace, what matters most to you?",
  "If you were leading a school club, what would be your main goal?",
  "Which kind of Class 10 project would you enjoy the most?",
  "When picking a stream for Class 11, what would influence you most?",
  "What kind of adult life sounds most meaningful to you?",
  "How do you define a successful career?",
  "If your school gives you one free hour, what would you prefer doing?",
  "Which type of movie character do you relate to most?",
  "Which extracurricular activity sounds most attractive to you?",
  "What is your biggest fear about your future career?",
  "Which school award would make you happiest?",
  "In a team sport or game, what role do you naturally prefer?",
  "What do you admire most in a successful person?",
  "If you were offered a summer internship, which one would you choose?",
  "What motivates you to finish a difficult assignment?",
  "Which career title sounds most appealing to you?",
  "During a science fair project, what would be your main focus?",
  "What would make you lose interest in a job?",
  "If you wrote a book, what would it mostly be about?",
  "What kind of praise makes you happiest?",

  "If you started a YouTube channel, what would be its main purpose?",
  "Why do you enjoy your favorite subject?",
  "Which work environment would you dislike the most?",
  "If you could design your own school curriculum, what would you add?",
  "What kind of legacy would you like to leave behind?",
  "If you became a doctor, what kind of doctor would you want to be?",
  "In a group presentation, which part would you volunteer for?",
  "What does money mean to you?",
  "What kind of daily routine would you prefer in the future?",
  "Why do you think some people stay in the same job for many years?",
  "When applying to college, what would matter most to you?",
  "If you could solve one problem for your city, what would it be?",
  "Which kind of news headline attracts you most?",
  "If you were a software engineer, what would you prefer to build?",
  "Why do you study for exams?",
  "Which statement do you agree with most?",
  "If you were a journalist, what would you write about?",
  "When playing a strategy game, what is your main goal?",
  "What kind of teacher do you respect most?",
  "If you had to move to a new city for work, what would you check first?",

  "If you won a large amount of money, what would you do first?",
  "What makes a school day perfect for you?",
  "Which quote inspires you most?",
  "If you were a lawyer, what kind of law would you practice?",
  "What is your view on rules and regulations?",
  "If your school had to cut one program, which would you fight to save?",
  "When organizing your study desk, what matters most?",
  "Which biography would you prefer reading?",
  "In a company, which department would you prefer working in?",
  "What do you think is the hardest part of growing up?",
  "If you were a famous chef, what kind of restaurant would you run?",
  "When a teacher assigns a group project, what is your first thought?",
  "What kind of app would you use or build most often?",
  "If you were a scientist, what would be your dream?",
  "Why would you want to become a public leader?",
  "If your friend is upset, how would you prefer helping them?",
  "If you were an architect, what would you build?",
  "Which podcast topic would you listen to?",
  "If you had to pick a superpower, what would it be?",
  "What is your biggest motivation to study right now?",

  "If you were a writer, what would success mean to you?",
  "When picking a college major, what would be your priority?",
  "If you were trapped on an island, what role would you take?",
  "What kind of documentary would you watch?",
  "If you were offered a magical power, what would you choose?",
  "If you joined the military, why would you do it?",
  "When buying a car in the future, what would matter most?",
  "Which school subject do you respect most?",
  "If you could invent an AI robot, what would it do?",
  "Why do you think hobbies are important?",
  "If you were a teacher, what kind of teacher would you be?",
  "What kind of video game would you prefer?",
  "If you were a city planner, what would you focus on?",
  "If you worked in fashion, what role would you prefer?",
  "What is the most frustrating part of school for you?",
  "What kind of work culture would suit you best?",
  "When taking a vacation, what would you prefer?",
  "If you started a content channel, what would you never want?",
  "What kind of feedback hurts you the most?",
  "Which historical figure would you respect most?",

  "How would you use a free weekend?",
  "If you were a software developer, what would you hate doing?",
  "If you gave a TED-style talk, what would it be about?",
  "What kind of boss would you prefer?",
  "Why might you refuse a high-paying job?",
  "What kind of life partner would you admire in the future?",
  "If you were a pilot, what kind of flying would you prefer?",
  "If your school introduced a new club, which one would you join?",
  "What would you do after scoring very high marks?",
  "Which career problem would you want GroerX to solve for students?",
  "If you were given money to start something, what would you start?",
  "What kind of Class 11 subject combination would excite you most?",
  "If your parents asked why you chose a stream, what reason would feel most honest?",
  "Which type of college environment would make you happiest?",
  "If you joined a startup, what role would you prefer?",
  "If you joined a government organization, what would attract you most?",
  "If you worked in healthcare, what would motivate you?",
  "If you worked in business, what would motivate you?",
  "If you worked in design or media, what would motivate you?",
  "At the end of your life, what would make you feel proud?",
];

function buildValuesRawQuestion(questionText, index) {
  const questionNo = index + 1;
  const excludedOptionIndex = index % valuesOptionBank.length;

  const options = valuesOptionBank
    .filter((_, optionIndex) => optionIndex !== excludedOptionIndex)
    .map((option, optionIndex) => ({
      key: String.fromCharCode(65 + optionIndex),
      text: option.text,
      valueTag: option.valueTag,
      score: 1,
    }));

  return [
    questionNo,
    questionText,
    "career-values",
    options,
    "Identifies the student's dominant career value preference. Each selected option adds 1 count to its valueTag.",
  ];
}

const valuesRound1Raw = valuesQuestionTexts
  .slice(0, 20)
  .map((questionText, index) => buildValuesRawQuestion(questionText, index));

const valuesRound2Raw = valuesQuestionTexts
  .slice(20, 40)
  .map((questionText, index) => buildValuesRawQuestion(questionText, index + 20));

const valuesRound3Raw = valuesQuestionTexts
  .slice(40, 60)
  .map((questionText, index) => buildValuesRawQuestion(questionText, index + 40));

const valuesRound4Raw = valuesQuestionTexts
  .slice(60, 80)
  .map((questionText, index) => buildValuesRawQuestion(questionText, index + 60));

const valuesRound5Raw = valuesQuestionTexts
  .slice(80, 100)
  .map((questionText, index) => buildValuesRawQuestion(questionText, index + 80));

function makeValuesQuestion(
  round,
  questionNo,
  questionText,
  dimension,
  options,
  explanation = ""
) {
  return {
    id: `values-r${round}-q${questionNo}`,
    _id: `values-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "values",
    testName: "Values Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options,
    explanation,
    scoring: {
      type: "career-values-preference",
      scale: "preference-count",
      dimension,
      note: "Each selected option contributes 1 count to its valueTag. No option is morally better or worse.",
    },
    isActive: true,
    active: true,
  };
}

const valuesQuestionsByRound = {
  1: valuesRound1Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeValuesQuestion(
        1,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  2: valuesRound2Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeValuesQuestion(
        2,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  3: valuesRound3Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeValuesQuestion(
        3,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  4: valuesRound4Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeValuesQuestion(
        4,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
  5: valuesRound5Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeValuesQuestion(
        5,
        questionNo,
        questionText,
        dimension,
        options,
        explanation
      )
  ),
};
/* =========================================================
   CONFIDENCE TEST QUESTIONS
========================================================= */

const confidenceDimensionOptions = {
  "academic-confidence": [
    { key: "A", text: "I believe I can understand it if I use the right method, practice properly, and ask for help when needed.", score: 4 },
    { key: "B", text: "I feel slightly unsure, but I will try and slowly improve.", score: 3 },
    { key: "C", text: "I feel doubtful and may avoid it unless someone pushes me.", score: 2 },
    { key: "D", text: "I feel I cannot do it at all and usually give up.", score: 1 },
  ],
  "exam-performance-confidence": [
    { key: "A", text: "I stay calm, manage my time, and perform with confidence.", score: 4 },
    { key: "B", text: "I feel nervous, but I still try to complete the task.", score: 3 },
    { key: "C", text: "I become very anxious and struggle to perform properly.", score: 2 },
    { key: "D", text: "I panic, freeze, or avoid the performance completely.", score: 1 },
  ],
  "career-decision-confidence": [
    { key: "A", text: "I research carefully, compare options, and make a confident decision.", score: 4 },
    { key: "B", text: "I try to decide, but I still need reassurance from others.", score: 3 },
    { key: "C", text: "I feel confused and mostly depend on others to decide for me.", score: 2 },
    { key: "D", text: "I avoid the decision because thinking about my future scares me.", score: 1 },
  ],
  "communication-social-confidence": [
    { key: "A", text: "I express myself clearly and respectfully, even if the situation feels challenging.", score: 4 },
    { key: "B", text: "I feel nervous, but I still try to speak or participate.", score: 3 },
    { key: "C", text: "I hesitate a lot and usually let others speak for me.", score: 2 },
    { key: "D", text: "I stay silent or avoid the situation completely.", score: 1 },
  ],
  "resilience-self-belief": [
    { key: "A", text: "I learn from the setback, improve my strategy, and try again with belief.", score: 4 },
    { key: "B", text: "I feel bad for some time, but eventually I try again.", score: 3 },
    { key: "C", text: "I lose confidence and avoid similar situations later.", score: 2 },
    { key: "D", text: "I believe I cannot improve and give up completely.", score: 1 },
  ],
};

const confidenceQuestionBank = [
  [1, "You get low marks in a Maths test even after studying. What do you think?", "academic-confidence"],
  [2, "The teacher introduces a completely new, difficult Physics chapter today.", "academic-confidence"],
  [3, "You have to complete a massive syllabus in just two months before pre-boards.", "academic-confidence"],
  [4, "Your friend asks you to explain a History topic to them.", "academic-confidence"],
  [5, "You are sitting in the examination hall, and the invigilator says 'Start writing'.", "exam-performance-confidence"],
  [6, "The first two questions on your Board Exam paper are ones you do not know.", "exam-performance-confidence"],
  [7, "You are called for a sudden viva by a strict external examiner.", "exam-performance-confidence"],
  [8, "You have to give a 5-minute speech in the school morning assembly.", "exam-performance-confidence"],
  [9, "Your parents ask you what stream you want to choose after Class 10.", "career-decision-confidence"],
  [10, "You are exploring a completely new career option like AI or Design that your friends know nothing about.", "career-decision-confidence"],
  [11, "A career counsellor gives you a list of 5 different careers that suit you.", "career-decision-confidence"],
  [12, "Your relative tells you that the career you chose has no scope or money.", "career-decision-confidence"],
  [13, "You have a genuine doubt during a very strict teacher's class.", "communication-social-confidence"],
  [14, "You are placed in a group project with classmates you have never spoken to.", "communication-social-confidence"],
  [15, "During a class debate, someone strongly disagrees with your point.", "communication-social-confidence"],
  [16, "You have to participate in a mock interview for a school club selection.", "communication-social-confidence"],
  [17, "You completely fail to clear the first round of a competition you worked hard for.", "resilience-self-belief"],
  [18, "Your teacher gives you harsh critical feedback on an assignment in front of others.", "resilience-self-belief"],
  [19, "You see that your classmates are solving complex problems much faster than you.", "resilience-self-belief"],
  [20, "You have a dream to get into a top college, but the acceptance rate is very low.", "resilience-self-belief"],

  [21, "You are given a heavy textbook for a subject you usually find boring.", "academic-confidence"],
  [22, "Your class is learning a complex new software or diagram in the computer or science lab.", "academic-confidence"],
  [23, "You missed a week of school due to sickness and have a lot to catch up on.", "academic-confidence"],
  [24, "A teacher asks a difficult question in class, and you think you know the answer.", "academic-confidence"],
  [25, "The exam timer shows 10 minutes left and you still have a long answer to write.", "exam-performance-confidence"],
  [26, "You are waiting outside the principal's office to give an important interview.", "exam-performance-confidence"],
  [27, "During a practical exam, the examiner watches you closely while you perform the experiment.", "exam-performance-confidence"],
  [28, "You have to read your English poem aloud in front of 50 students.", "exam-performance-confidence"],
  [29, "You have to choose between two career paths you like equally.", "career-decision-confidence"],
  [30, "Your friend has their entire life planned till age 30, and you do not.", "career-decision-confidence"],
  [31, "You realize the stream you chose last month is not what you expected.", "career-decision-confidence"],
  [32, "You need to find out how to become an architect, but you know no one in that field.", "career-decision-confidence"],
  [33, "You are at a family gathering and relatives ask you about your career plans.", "communication-social-confidence"],
  [34, "You need to request the principal to allow a new sports club in school.", "communication-social-confidence"],
  [35, "During a group discussion, your point is opposite to the group's opinion.", "communication-social-confidence"],
  [36, "A new student joins your class midway through the year.", "communication-social-confidence"],
  [37, "You put in 100% effort into a project, but it is rejected by the judges.", "resilience-self-belief"],
  [38, "You make a silly mistake in a class presentation and everyone laughs.", "resilience-self-belief"],
  [39, "A senior tells you that the stream you want is too tough for someone like you.", "resilience-self-belief"],
  [40, "You have a bad week where you perform poorly in tests, sports, and friendship.", "resilience-self-belief"],

  [41, "You have to solve a math problem on the blackboard in front of the whole class.", "academic-confidence"],
  [42, "You score 90% in one subject and 50% in another.", "academic-confidence"],
  [43, "Your teacher assigns a 20-page research project with very few instructions.", "academic-confidence"],
  [44, "You need to memorize a long list of chemical formulas.", "academic-confidence"],
  [45, "You are waiting for the results of a highly competitive entrance exam.", "exam-performance-confidence"],
  [46, "You accidentally skip a question number on the OMR sheet and have to fix answers with 5 minutes left.", "exam-performance-confidence"],
  [47, "The exam paper feels completely different from what you expected.", "exam-performance-confidence"],
  [48, "You are acting in a school play and forget your main dialogue.", "exam-performance-confidence"],
  [49, "You realize the career you wanted requires many years of studying.", "career-decision-confidence"],
  [50, "Your parents want you to join the family business, but you want to do something else.", "career-decision-confidence"],
  [51, "You have to choose your optional subjects for Class 11 tomorrow.", "career-decision-confidence"],
  [52, "You read an article saying your dream career may be affected by AI in the future.", "career-decision-confidence"],
  [53, "You have to call an unknown local business to ask for school sponsorship.", "communication-social-confidence"],
  [54, "You notice a group of students sitting in your assigned seat.", "communication-social-confidence"],
  [55, "The teacher asks for a volunteer to show new students around the campus.", "communication-social-confidence"],
  [56, "You are buying something at a shop and the shopkeeper overcharges you.", "communication-social-confidence"],
  [57, "You study for hours but still fail an entrance exam while your friend passes.", "resilience-self-belief"],
  [58, "You get rejected from the school sports team after training hard.", "resilience-self-belief"],
  [59, "A teacher tells you that your writing skills are very poor.", "resilience-self-belief"],
  [60, "You start learning a new language, but after a week it feels very hard.", "resilience-self-belief"],

  [61, "You have to read a Shakespeare play or a very old Hindi poem in original text.", "academic-confidence"],
  [62, "Your school introduces a mandatory coding class, and you have no computer experience.", "academic-confidence"],
  [63, "You score 40% in your first Class 10 pre-board.", "academic-confidence"],
  [64, "The teacher asks you to peer-grade a classmate's essay.", "academic-confidence"],
  [65, "You are competing in a quiz and reach the final two.", "exam-performance-confidence"],
  [66, "Your pen leaks all over your answer sheet with 30 minutes left.", "exam-performance-confidence"],
  [67, "You have to run a 100-meter sprint in front of the whole school.", "exam-performance-confidence"],
  [68, "You prepared well for a test, but on exam morning you feel slightly sick.", "exam-performance-confidence"],
  [69, "You want to pursue Arts, but your school mostly promotes Science and Commerce.", "career-decision-confidence"],
  [70, "You read about a successful CEO whose path is opposite to what you planned.", "career-decision-confidence"],
  [71, "You have to choose between a guaranteed safe job and a risky startup idea you love.", "career-decision-confidence"],
  [72, "Someone asks you where you see yourself in 10 years.", "career-decision-confidence"],
  [73, "You have to mediate a fight between two of your best friends.", "communication-social-confidence"],
  [74, "You are at a party where you do not know the language everyone is speaking fluently.", "communication-social-confidence"],
  [75, "You accidentally spill juice on a stranger's bag in the bus.", "communication-social-confidence"],
  [76, "You want to join a group of seniors playing basketball.", "communication-social-confidence"],
  [77, "Someone makes a joke about your height, weight, glasses, or appearance.", "resilience-self-belief"],
  [78, "Your startup idea or science model fails during testing.", "resilience-self-belief"],
  [79, "You study effectively, but the school changes the syllabus at the last minute.", "resilience-self-belief"],
  [80, "You are trying to learn cycling or driving and keep falling or stalling.", "resilience-self-belief"],

  [81, "You have to write an essay on a topic you know nothing about.", "academic-confidence"],
  [82, "Your Maths teacher gives the class a challenge problem that is not for marks.", "academic-confidence"],
  [83, "You realize you have been studying a chapter wrong the whole week.", "academic-confidence"],
  [84, "The school topper challenges you to an academic competition.", "academic-confidence"],
  [85, "You are called for an unexpected surprise test by the strictest teacher.", "exam-performance-confidence"],
  [86, "During a practical exam, the examiner asks you a trick question to confuse you.", "exam-performance-confidence"],
  [87, "You have to perform a solo dance or music piece, and the music stops midway.", "exam-performance-confidence"],
  [88, "You have exactly one hour to write a long exam paper.", "exam-performance-confidence"],
  [89, "You find out that the career you want has a very high rejection rate.", "career-decision-confidence"],
  [90, "You are offered a scholarship, but it is for a subject you do not want to pursue.", "career-decision-confidence"],
  [91, "You realize midway through Class 11 that you dislike your stream.", "career-decision-confidence"],
  [92, "You have an idea for a business, but everyone says you are too young.", "career-decision-confidence"],
  [93, "You have to give a presentation, but your partner is absent today.", "communication-social-confidence"],
  [94, "You are in a room full of adults discussing a topic you know a lot about.", "communication-social-confidence"],
  [95, "You have to negotiate with a stubborn shopkeeper for a discount.", "communication-social-confidence"],
  [96, "Someone cuts in front of you in a long queue.", "communication-social-confidence"],
  [97, "You are working on a very difficult puzzle or coding problem for 3 hours with no success.", "resilience-self-belief"],
  [98, "A teacher you admire tells you that you lack natural talent in their subject.", "resilience-self-belief"],
  [99, "You make a major mistake that causes your sports team to lose the finals.", "resilience-self-belief"],
  [100, "Looking at your future, how much control do you feel you have?", "resilience-self-belief"],
];

function buildConfidenceRawQuestion([questionNo, questionText, dimension]) {
  return [
    questionNo,
    questionText,
    dimension,
    confidenceDimensionOptions[dimension],
    "Measures confidence level for this dimension through a practical Class 10 situation.",
  ];
}

const confidenceRound1Raw = confidenceQuestionBank
  .slice(0, 20)
  .map(buildConfidenceRawQuestion);

const confidenceRound2Raw = confidenceQuestionBank
  .slice(20, 40)
  .map(buildConfidenceRawQuestion);

const confidenceRound3Raw = confidenceQuestionBank
  .slice(40, 60)
  .map(buildConfidenceRawQuestion);

const confidenceRound4Raw = confidenceQuestionBank
  .slice(60, 80)
  .map(buildConfidenceRawQuestion);

const confidenceRound5Raw = confidenceQuestionBank
  .slice(80, 100)
  .map(buildConfidenceRawQuestion);

function makeConfidenceQuestion(
  round,
  questionNo,
  questionText,
  dimension,
  options,
  explanation = ""
) {
  return {
    id: `confidence-r${round}-q${questionNo}`,
    _id: `confidence-r${round}-q${questionNo}`,
    classLevel: "class10",
    testType: "confidence",
    testName: "Confidence Test",
    round,
    questionNo,
    questionText,
    question: questionText,
    dimension,
    questionType: "single-choice",
    options,
    explanation,
    scoring: {
      type: "confidence-behavioural",
      scale: "4-point",
      dimension,
    },
    isActive: true,
    active: true,
  };
}

const confidenceQuestionsByRound = {
  1: confidenceRound1Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeConfidenceQuestion(1, questionNo, questionText, dimension, options, explanation)
  ),
  2: confidenceRound2Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeConfidenceQuestion(2, questionNo, questionText, dimension, options, explanation)
  ),
  3: confidenceRound3Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeConfidenceQuestion(3, questionNo, questionText, dimension, options, explanation)
  ),
  4: confidenceRound4Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeConfidenceQuestion(4, questionNo, questionText, dimension, options, explanation)
  ),
  5: confidenceRound5Raw.map(
    ([questionNo, questionText, dimension, options, explanation]) =>
      makeConfidenceQuestion(5, questionNo, questionText, dimension, options, explanation)
  ),
};
const tests = [
  { key: "riasec", name: "RIASEC Interest Test" },
  { key: "aptitude", name: "Aptitude Test" },
  { key: "personality", name: "Personality Test" },
  { key: "academic-style", name: "Academic Style Test" },
  { key: "situational-iq", name: "Situational IQ Test" },
  { key: "values", name: "Values Test" },
  { key: "confidence", name: "Confidence Test" },
];

function getSubmissionKey(studentId, testType, round) {
  return `${studentId || STUDENT_ID}_${testType}_${round}`;
}

function getCompletedTests(studentId = STUDENT_ID) {
  const completed = [];

  for (const test of tests) {
    const roundsCompleted = [];

    for (let round = 1; round <= 5; round += 1) {
      if (submissions.has(getSubmissionKey(studentId, test.key, round))) {
        roundsCompleted.push(round);
      }
    }

    if (roundsCompleted.length > 0) {
      completed.push({
        testType: test.key,
        name: test.name,
        completedRounds: roundsCompleted,
        score: Math.min(100, roundsCompleted.length * 20),
      });
    }
  }

  return completed;
}

function recommendationPayload(studentId = STUDENT_ID) {
  return {
    studentId,
    completionPercentage: 100,
    completedTests: ["riasec", "aptitude"],
    topStream: {
      slug: "commerce",
      name: "Commerce",
      match: 96,
      reasons: [
        "Strong fit for business, finance, management, and entrepreneurship",
        "Matches enterprising and conventional thinking patterns",
        "Good for students interested in money, markets, and organization",
      ],
      suggestedSubjects: [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Mathematics",
      ],
      suggestedCareers: [
        "CA",
        "Investment Banker",
        "Entrepreneur",
        "Business Analyst",
      ],
    },
    streams: [
      { slug: "commerce", name: "Commerce", match: 96 },
      { slug: "science-pcm", name: "Science PCM", match: 78 },
      { slug: "arts-humanities", name: "Arts / Humanities", match: 72 },
      { slug: "vocational", name: "Vocational", match: 66 },
    ],
    profile: {
      hollandCode: "ECR",
      strengths: ["Business thinking", "Organization", "Decision-making"],
      improvementAreas: [
        "Numerical accuracy",
        "Financial concepts",
        "Presentation confidence",
      ],
      summary:
        "The student shows alignment with commerce, management, finance, and entrepreneurship.",
    },
    generatedAt: new Date(),
  };
}

/* =========================================================
   DASHBOARD ROUTE
========================================================= */

router.get("/dashboard", (req, res) => {
  const studentId = req.query.studentId || STUDENT_ID;
  const completedTests = getCompletedTests(studentId);

  const completedRounds = completedTests.reduce(
    (sum, test) => sum + test.completedRounds.length,
    0
  );

  const completionPercentage = Math.min(
    100,
    Math.round((completedRounds / 35) * 100)
  );

  res.json({
    success: true,
    data: {
      studentId,
      careerProgress: completionPercentage,
      completionPercentage,
      completedTests,
      completedCount: completedTests.length,
      totalTests: 7,
      recommendedStream: "Commerce",
      recommendation: recommendationPayload(studentId),
      nextAction: "Complete all assessment rounds",
      tests: tests.map((test) => {
        const completed = completedTests.find(
          (item) => item.testType === test.key
        );

        return {
          key: test.key,
          testType: test.key,
          name: test.name,
          completed: Boolean(completed),
          completedRounds: completed?.completedRounds || [],
          score: completed?.score || 0,
        };
      }),
    },
  });
});

/* =========================================================
   QUESTIONS ROUTE
========================================================= */

router.get("/questions/:testType", (req, res) => {
  try {
    const { testType } = req.params;
    const round = Number(req.query.round) || 1;

    const questionBank = {
      riasec: riasecQuestionsByRound,
      aptitude: aptitudeQuestionsByRound,
      personality: personalityQuestionsByRound,
      "academic-style": academicStyleQuestionsByRound,
      "situational-iq": situationalIQQuestionsByRound,
      values: valuesQuestionsByRound,
      confidence: confidenceQuestionsByRound,
    };

    if (!testType) {
      return res.status(400).json({
        success: false,
        message: "testType is required",
        count: 0,
        data: [],
        questions: [],
      });
    }

    if (!Number.isInteger(round) || round < 1 || round > 5) {
      return res.status(400).json({
        success: false,
        message: "Round must be between 1 and 5",
        testType,
        round,
        count: 0,
        data: [],
        questions: [],
      });
    }

    const selectedTestBank = questionBank[testType];

    if (!selectedTestBank) {
      return res.status(404).json({
        success: false,
        message: `Invalid test type: ${testType}`,
        allowedTests: Object.keys(questionBank),
        testType,
        round,
        count: 0,
        data: [],
        questions: [],
      });
    }

    const selectedRoundQuestions = selectedTestBank[round] || [];

    if (!Array.isArray(selectedRoundQuestions) || selectedRoundQuestions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions found for ${testType}, round ${round}`,
        testType,
        round,
        count: 0,
        data: [],
        questions: [],
      });
    }

    const limitedQuestions = selectedRoundQuestions.slice(0, 20);

    return res.status(200).json({
      success: true,
      source: `MEMORY_${String(testType)
        .toUpperCase()
        .replaceAll("-", "_")}_ROUND_${round}_ONLY_20`,
      testType,
      round,
      count: limitedQuestions.length,
      totalAvailableInRound: selectedRoundQuestions.length,
      data: limitedQuestions,
      questions: limitedQuestions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Class 10 questions",
      error: error.message,
      count: 0,
      data: [],
      questions: [],
    });
  }
});
/* =========================================================
   SUBMIT ROUTE
========================================================= */

router.post("/submit", (req, res) => {
  const {
    studentId = STUDENT_ID,
    testType,
    round = 1,
    answers = [],
  } = req.body;

  if (!testType) {
    return res.status(400).json({
      success: false,
      message: "testType is required",
    });
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "answers are required",
    });
  }

  submissions.set(getSubmissionKey(studentId, testType, round), {
    studentId,
    testType,
    round,
    answers,
    totalAnswers: answers.length,
    submittedAt: new Date(),
  });

  return res.status(200).json({
    success: true,
    message: "Assessment submitted successfully without MongoDB",
    source: "MEMORY_SUBMIT_NO_MONGODB",
    data: {
      studentId,
      testType,
      round,
      totalAnswers: answers.length,
      completed: true,
      percentage: 100,
      submittedAt: new Date(),
    },
  });
});

/* =========================================================
   PROGRESS ROUTE
========================================================= */

router.get("/progress/:studentId", (req, res) => {
  const studentId = req.params.studentId || STUDENT_ID;
  const completedTests = getCompletedTests(studentId);

  const completedRounds = completedTests.reduce(
    (sum, test) => sum + test.completedRounds.length,
    0
  );

  const completionPercentage = Math.min(
    100,
    Math.round((completedRounds / 35) * 100)
  );

  res.json({
    success: true,
    data: {
      studentId,
      totalTests: 7,
      completedCount: completedTests.length,
      completionPercentage,
      completedTests,
      pendingTests: tests.filter(
        (test) => !completedTests.some((item) => item.testType === test.key)
      ),
      results: completedTests,
    },
  });
});

/* =========================================================
   RECOMMENDATION ROUTES
========================================================= */

router.post("/generate-recommendation/:studentId", (req, res) => {
  res.json({
    success: true,
    message: "Recommendation generated temporarily without MongoDB",
    source: "MEMORY_RECOMMENDATION_NO_MONGODB",
    data: recommendationPayload(req.params.studentId || STUDENT_ID),
  });
});

router.get("/recommendation/:studentId", (req, res) => {
  res.json({
    success: true,
    data: recommendationPayload(req.params.studentId || STUDENT_ID),
  });
});

/* =========================================================
   FINAL REPORT ROUTE
========================================================= */

router.get("/final-report/:studentId", (req, res) => {
  const studentId = req.params.studentId || STUDENT_ID;
  const recommendation = recommendationPayload(studentId);

  res.json({
    success: true,
    data: {
      studentId,
      completionPercentage: 100,
      topStream: recommendation.topStream,
      profile: recommendation.profile,
      assessmentResults: getCompletedTests(studentId),
      parentGuidance: [
        "Do not force stream selection only based on marks.",
        "Discuss the recommendation with the child calmly.",
        "Compare interest, aptitude, and confidence before taking final decision.",
      ],
      next30DayRoadmap: [
        "Explore 5 careers connected to Commerce.",
        "Talk to seniors currently studying Commerce.",
        "Revise basic Economics and Mathematics concepts.",
      ],
      generatedAt: new Date(),
    },
  });
});

export default router;