const streams = [
  {
    name: "Science PCM",
    slug: "science-pcm",
    icon: "atom",
    matchScore: 92,
    recommendationLevel: "Excellent",
    shortDescription: "Best for engineering, technology, AI, data science, architecture and research.",
    longDescription:
      "Science PCM is suitable for students who enjoy mathematics, physics, logic, systems, machines and problem solving.",
    whyRecommended: [
      "Strong logical reasoning",
      "High analytical thinking",
      "Good fit for technical careers",
      "Strong future career flexibility"
    ],
    strengths: ["Problem solving", "Mathematics", "Scientific thinking"],
    weaknesses: ["Requires consistency", "Can feel heavy without interest"],
    suitableStudents: [
      "Students who enjoy Maths and Physics",
      "Students interested in engineering or technology",
      "Students who like solving complex problems"
    ],
    subjectsClass11: [
      { name: "Physics", description: "Matter, motion, energy and forces." },
      { name: "Chemistry", description: "Substances, reactions and materials." },
      { name: "Mathematics", description: "Algebra, calculus, geometry and logic." },
      { name: "Computer Science", description: "Programming, logic and computational thinking." }
    ],
    subjectsClass12: [
      { name: "Physics", description: "Electricity, optics, modern physics and mechanics." },
      { name: "Chemistry", description: "Organic, inorganic and physical chemistry." },
      { name: "Mathematics", description: "Calculus, vectors, probability and advanced algebra." }
    ],
    careers: [
      { title: "Software Engineer", description: "Builds apps, systems and platforms.", averageSalary: "₹4 LPA - ₹40+ LPA", futureDemand: 95, icon: "code" },
      { title: "Data Scientist", description: "Uses data, statistics and AI to solve problems.", averageSalary: "₹6 LPA - ₹50+ LPA", futureDemand: 96, icon: "chart" },
      { title: "Mechanical Engineer", description: "Designs machines, systems and mechanical products.", averageSalary: "₹4 LPA - ₹25+ LPA", futureDemand: 82, icon: "gear" }
    ],
    requiredSkills: [
      { title: "Logical Reasoning", score: 92 },
      { title: "Problem Solving", score: 90 },
      { title: "Mathematics", score: 88 }
    ],
    higherStudies: ["B.Tech", "B.Sc", "BCA", "B.Arch"],
    entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "NATA", "CUET"],
    colleges: ["IITs", "NITs", "IIITs", "BITS", "State Engineering Colleges"],
    myths: [
      {
        myth: "PCM means only engineering.",
        reality: "PCM opens engineering, data science, architecture, defence, aviation, research and technology careers."
      }
    ],
    opportunitiesIndia: ["Engineering", "AI", "Data Science", "Research", "Architecture"],
    opportunitiesAbroad: ["STEM degrees", "Research programs", "Technology careers"],
    growthFields: ["Artificial Intelligence", "Robotics", "Cybersecurity", "Space Tech"],
    averagePreparationTime: "2-4 hours daily",
    recommendationReason: "Your analytical and problem-solving strengths match strongly with PCM-based careers.",
    active: true
  },

  {
    name: "Science PCB",
    slug: "science-pcb",
    icon: "leaf",
    matchScore: 88,
    recommendationLevel: "Excellent",
    shortDescription: "Best for medicine, biology, healthcare, life sciences and research.",
    longDescription:
      "Science PCB is suitable for students who are curious about life, human body, biology, medicine, environment and healthcare.",
    whyRecommended: [
      "Strong biological interest",
      "Good patience and observation skills",
      "Suitable for healthcare careers",
      "Good fit for research-oriented students"
    ],
    strengths: ["Biology", "Observation", "Patience", "Scientific curiosity"],
    weaknesses: ["Requires memorization", "Medical competition can be high"],
    suitableStudents: [
      "Students interested in doctors or medical careers",
      "Students who like biology and life science",
      "Students who enjoy helping people"
    ],
    subjectsClass11: [
      { name: "Physics", description: "Basic concepts of motion, force and energy." },
      { name: "Chemistry", description: "Chemical reactions and biological chemistry basics." },
      { name: "Biology", description: "Study of life, cells, plants, animals and human body." }
    ],
    subjectsClass12: [
      { name: "Physics", description: "Medical physics and applied concepts." },
      { name: "Chemistry", description: "Organic and biomolecular chemistry." },
      { name: "Biology", description: "Genetics, evolution, physiology and biotechnology." }
    ],
    careers: [
      { title: "Doctor", description: "Diagnoses and treats patients.", averageSalary: "₹6 LPA - ₹60+ LPA", futureDemand: 94, icon: "stethoscope" },
      { title: "Biotechnologist", description: "Works with biology and technology to develop solutions.", averageSalary: "₹4 LPA - ₹25+ LPA", futureDemand: 86, icon: "dna" },
      { title: "Pharmacist", description: "Works with medicines and healthcare products.", averageSalary: "₹3 LPA - ₹18+ LPA", futureDemand: 78, icon: "pill" }
    ],
    requiredSkills: [
      { title: "Biological Understanding", score: 90 },
      { title: "Memory", score: 84 },
      { title: "Observation", score: 86 }
    ],
    higherStudies: ["MBBS", "BDS", "B.Pharm", "B.Sc Nursing", "Biotechnology", "Physiotherapy"],
    entranceExams: ["NEET", "CUET", "AIIMS Nursing"],
    colleges: ["AIIMS", "CMC Vellore", "AFMC", "State Medical Colleges"],
    myths: [
      {
        myth: "PCB means only MBBS.",
        reality: "PCB opens healthcare, biotechnology, pharmacy, psychology, nursing, nutrition and research careers."
      }
    ],
    opportunitiesIndia: ["Medicine", "Healthcare", "Biotech", "Pharma", "Public Health"],
    opportunitiesAbroad: ["Medical research", "Life sciences", "Healthcare programs"],
    growthFields: ["Biotechnology", "Genetics", "Healthcare AI", "Pharmaceutical Research"],
    averagePreparationTime: "3-5 hours daily",
    recommendationReason: "Your biological curiosity and helping orientation align strongly with PCB.",
    active: true
  },

  {
    name: "Science PCMB",
    slug: "science-pcmb",
    icon: "flask",
    matchScore: 84,
    recommendationLevel: "Very Good",
    shortDescription: "Best for students who want both medical and engineering options open.",
    longDescription:
      "Science PCMB is suitable for students who are strong in both Mathematics and Biology and want maximum flexibility.",
    whyRecommended: [
      "Keeps both engineering and medical options open",
      "Good for multi-talented science students",
      "Strong flexibility for future decisions"
    ],
    strengths: ["Mathematics", "Biology", "Discipline", "High workload handling"],
    weaknesses: ["Very demanding", "Requires excellent time management"],
    suitableStudents: [
      "Students strong in both Maths and Biology",
      "Students unsure between medical and engineering",
      "Students who can handle heavy study load"
    ],
    subjectsClass11: [
      { name: "Physics", description: "Core science subject for both fields." },
      { name: "Chemistry", description: "Important for both engineering and medical." },
      { name: "Mathematics", description: "Required for engineering and quantitative careers." },
      { name: "Biology", description: "Required for medical and life science careers." }
    ],
    subjectsClass12: [
      { name: "Physics", description: "Advanced physics concepts." },
      { name: "Chemistry", description: "Advanced chemistry concepts." },
      { name: "Mathematics", description: "Advanced mathematics." },
      { name: "Biology", description: "Advanced biology." }
    ],
    careers: [
      { title: "Biomedical Engineer", description: "Combines engineering with healthcare.", averageSalary: "₹5 LPA - ₹35+ LPA", futureDemand: 90, icon: "medical" },
      { title: "Doctor", description: "Medical professional.", averageSalary: "₹6 LPA - ₹60+ LPA", futureDemand: 94, icon: "stethoscope" },
      { title: "AI Healthcare Specialist", description: "Applies AI in healthcare systems.", averageSalary: "₹8 LPA - ₹50+ LPA", futureDemand: 95, icon: "brain" }
    ],
    requiredSkills: [
      { title: "Time Management", score: 90 },
      { title: "Science Aptitude", score: 88 },
      { title: "Consistency", score: 92 }
    ],
    higherStudies: ["MBBS", "B.Tech", "Biotechnology", "Biomedical Engineering", "B.Sc"],
    entranceExams: ["JEE Main", "NEET", "CUET", "BITSAT"],
    colleges: ["IITs", "AIIMS", "NITs", "State Medical Colleges"],
    myths: [
      {
        myth: "PCMB is always the safest choice.",
        reality: "PCMB gives flexibility but only suits students who can manage a heavy academic load."
      }
    ],
    opportunitiesIndia: ["Medical", "Engineering", "Biotech", "Biomedical"],
    opportunitiesAbroad: ["Biomedical science", "Health-tech", "Research"],
    growthFields: ["Biomedical Engineering", "HealthTech", "Genomics", "AI in Medicine"],
    averagePreparationTime: "4-6 hours daily",
    recommendationReason: "PCMB suits students with strong science interest and high discipline.",
    active: true
  },

  {
    name: "Commerce with Maths",
    slug: "commerce-with-maths",
    icon: "bar-chart",
    matchScore: 78,
    recommendationLevel: "Very Good",
    shortDescription: "Best for finance, economics, business analytics, CA, investment banking and management.",
    longDescription:
      "Commerce with Maths is suitable for students who enjoy business, finance, numbers, markets and decision making.",
    whyRecommended: [
      "Good for finance and analytics careers",
      "Keeps economics and business options strong",
      "Useful for competitive business programs"
    ],
    strengths: ["Financial thinking", "Business understanding", "Numerical ability"],
    weaknesses: ["Requires comfort with numbers", "Needs practical market understanding"],
    suitableStudents: [
      "Students interested in business and finance",
      "Students who enjoy numbers and analysis",
      "Students interested in CA, economics or MBA paths"
    ],
    subjectsClass11: [
      { name: "Accountancy", description: "Financial records and accounting principles." },
      { name: "Business Studies", description: "Business operations and management." },
      { name: "Economics", description: "Markets, money and economy." },
      { name: "Mathematics", description: "Mathematics for finance, economics and analytics." }
    ],
    subjectsClass12: [
      { name: "Accountancy", description: "Company accounts and financial statements." },
      { name: "Business Studies", description: "Management and business environment." },
      { name: "Economics", description: "Macroeconomics and Indian economy." },
      { name: "Mathematics", description: "Advanced applied mathematics." }
    ],
    careers: [
      { title: "Chartered Accountant", description: "Works in taxation, audit and finance.", averageSalary: "₹6 LPA - ₹35+ LPA", futureDemand: 88, icon: "calculator" },
      { title: "Investment Banker", description: "Works in financial markets and investment deals.", averageSalary: "₹8 LPA - ₹70+ LPA", futureDemand: 90, icon: "bank" },
      { title: "Business Analyst", description: "Improves business decisions using data.", averageSalary: "₹5 LPA - ₹30+ LPA", futureDemand: 91, icon: "briefcase" }
    ],
    requiredSkills: [
      { title: "Numerical Ability", score: 84 },
      { title: "Decision Making", score: 82 },
      { title: "Business Thinking", score: 86 }
    ],
    higherStudies: ["B.Com", "BBA", "CA", "CS", "Economics", "Finance", "Business Analytics"],
    entranceExams: ["CUET", "CA Foundation", "IPMAT", "SET", "NPAT"],
    colleges: ["SRCC", "Delhi University", "Christ University", "NMIMS", "Symbiosis"],
    myths: [
      {
        myth: "Commerce is only for average students.",
        reality: "Commerce leads to high-value careers in finance, business, consulting and entrepreneurship."
      }
    ],
    opportunitiesIndia: ["Finance", "Banking", "Consulting", "Startups", "Analytics"],
    opportunitiesAbroad: ["Business degrees", "Finance careers", "Management programs"],
    growthFields: ["FinTech", "Investment Banking", "Business Analytics", "Startup Ecosystem"],
    averagePreparationTime: "2-3 hours daily",
    recommendationReason: "Your business thinking and numerical skills align well with Commerce with Maths.",
    active: true
  },

  {
    name: "Commerce without Maths",
    slug: "commerce-without-maths",
    icon: "briefcase",
    matchScore: 72,
    recommendationLevel: "Good",
    shortDescription: "Best for business, management, marketing, entrepreneurship, HR and commerce careers.",
    longDescription:
      "Commerce without Maths is suitable for students interested in business, management and finance but not advanced mathematics.",
    whyRecommended: [
      "Good for business and management careers",
      "Less math-heavy than Commerce with Maths",
      "Useful for entrepreneurship and marketing"
    ],
    strengths: ["Business awareness", "Communication", "Management thinking"],
    weaknesses: ["Some finance and analytics paths may need Maths", "Needs practical exposure"],
    suitableStudents: [
      "Students interested in business but not advanced Maths",
      "Students interested in marketing or management",
      "Students who like communication and entrepreneurship"
    ],
    subjectsClass11: [
      { name: "Accountancy", description: "Basics of financial accounting." },
      { name: "Business Studies", description: "How businesses work." },
      { name: "Economics", description: "Markets and economy." },
      { name: "Entrepreneurship", description: "Startup and business creation basics." }
    ],
    subjectsClass12: [
      { name: "Accountancy", description: "Company accounts." },
      { name: "Business Studies", description: "Management and business strategy." },
      { name: "Economics", description: "Indian economy and macroeconomics." }
    ],
    careers: [
      { title: "Entrepreneur", description: "Starts and grows businesses.", averageSalary: "Variable", futureDemand: 92, icon: "rocket" },
      { title: "Marketing Manager", description: "Builds brands and grows customer demand.", averageSalary: "₹4 LPA - ₹30+ LPA", futureDemand: 87, icon: "megaphone" },
      { title: "HR Manager", description: "Manages people, hiring and workplace culture.", averageSalary: "₹4 LPA - ₹25+ LPA", futureDemand: 80, icon: "users" }
    ],
    requiredSkills: [
      { title: "Communication", score: 84 },
      { title: "Business Understanding", score: 82 },
      { title: "Leadership", score: 78 }
    ],
    higherStudies: ["B.Com", "BBA", "BBM", "Hotel Management", "Marketing", "Entrepreneurship"],
    entranceExams: ["CUET", "IPMAT", "SET", "NPAT"],
    colleges: ["Delhi University", "Christ University", "NMIMS", "Symbiosis"],
    myths: [
      {
        myth: "Commerce without Maths has fewer careers.",
        reality: "It still opens management, marketing, entrepreneurship, HR, sales and business careers."
      }
    ],
    opportunitiesIndia: ["Marketing", "Management", "Business", "Sales", "Startups"],
    opportunitiesAbroad: ["Business programs", "Marketing degrees", "Management careers"],
    growthFields: ["Digital Marketing", "E-commerce", "Brand Strategy", "Entrepreneurship"],
    averagePreparationTime: "1.5-3 hours daily",
    recommendationReason: "Commerce without Maths suits students with business interest and communication strengths.",
    active: true
  },

  {
    name: "Humanities",
    slug: "humanities",
    icon: "book-open",
    matchScore: 68,
    recommendationLevel: "Good",
    shortDescription: "Best for law, psychology, civil services, journalism, policy, teaching and social sciences.",
    longDescription:
      "Humanities is suitable for students who enjoy people, society, history, politics, psychology, language and ideas.",
    whyRecommended: [
      "Strong fit for social understanding",
      "Good for communication-heavy careers",
      "Useful for law, UPSC and policy paths"
    ],
    strengths: ["Communication", "Social understanding", "Critical thinking"],
    weaknesses: ["Needs reading habit", "Requires clarity for career planning"],
    suitableStudents: [
      "Students interested in society and people",
      "Students who like reading and writing",
      "Students interested in law, psychology or civil services"
    ],
    subjectsClass11: [
      { name: "History", description: "Past events, societies and civilizations." },
      { name: "Political Science", description: "Government, politics and institutions." },
      { name: "Psychology", description: "Human mind and behaviour." },
      { name: "Sociology", description: "Society and social structures." },
      { name: "Geography", description: "Earth, environment and human geography." }
    ],
    subjectsClass12: [
      { name: "History", description: "Modern history and world events." },
      { name: "Political Science", description: "Indian and global politics." },
      { name: "Psychology", description: "Human behaviour and mental processes." }
    ],
    careers: [
      { title: "Lawyer", description: "Works in legal cases, rights and justice.", averageSalary: "₹4 LPA - ₹50+ LPA", futureDemand: 84, icon: "scale" },
      { title: "Psychologist", description: "Understands and supports mental health.", averageSalary: "₹3 LPA - ₹30+ LPA", futureDemand: 88, icon: "brain" },
      { title: "Civil Servant", description: "Works in government administration.", averageSalary: "₹8 LPA - ₹25+ LPA", futureDemand: 85, icon: "building" }
    ],
    requiredSkills: [
      { title: "Verbal Ability", score: 86 },
      { title: "Critical Thinking", score: 84 },
      { title: "Empathy", score: 82 }
    ],
    higherStudies: ["BA", "LLB", "Psychology", "Journalism", "Political Science", "Sociology"],
    entranceExams: ["CUET", "CLAT", "AILET", "NID DAT"],
    colleges: ["Delhi University", "Ashoka University", "TISS", "NLUs", "JNU"],
    myths: [
      {
        myth: "Humanities has no career scope.",
        reality: "Humanities leads to law, psychology, civil services, policy, media, teaching and research careers."
      }
    ],
    opportunitiesIndia: ["Law", "Civil Services", "Media", "Psychology", "Policy"],
    opportunitiesAbroad: ["Social sciences", "Law", "Public policy", "International relations"],
    growthFields: ["Mental Health", "Public Policy", "Content Strategy", "Legal Tech"],
    averagePreparationTime: "2-3 hours daily",
    recommendationReason: "Humanities suits students with communication, empathy and social understanding.",
    active: true
  },

  {
    name: "Arts and Design",
    slug: "arts-design",
    icon: "palette",
    matchScore: 64,
    recommendationLevel: "Good",
    shortDescription: "Best for design, animation, fine arts, film, media, fashion and creative careers.",
    longDescription:
      "Arts and Design is suitable for students who enjoy creativity, visual expression, storytelling, aesthetics and original ideas.",
    whyRecommended: [
      "Strong fit for creativity",
      "Good for visual and expressive careers",
      "Useful for design and media industries"
    ],
    strengths: ["Creativity", "Expression", "Visual thinking"],
    weaknesses: ["Requires portfolio building", "Career path needs guidance"],
    suitableStudents: [
      "Students who enjoy drawing or design",
      "Students interested in media and creativity",
      "Students who like creating original work"
    ],
    subjectsClass11: [
      { name: "Fine Arts", description: "Drawing, painting and visual expression." },
      { name: "Design", description: "Creative problem solving through visuals and products." },
      { name: "Media Studies", description: "Communication through media." }
    ],
    subjectsClass12: [
      { name: "Fine Arts", description: "Advanced visual art practices." },
      { name: "Design", description: "Advanced design thinking." },
      { name: "Media Studies", description: "Media production and communication." }
    ],
    careers: [
      { title: "Graphic Designer", description: "Creates visual designs for brands and products.", averageSalary: "₹3 LPA - ₹25+ LPA", futureDemand: 84, icon: "pen" },
      { title: "Animator", description: "Creates animation for films, games and media.", averageSalary: "₹3 LPA - ₹30+ LPA", futureDemand: 86, icon: "film" },
      { title: "UX Designer", description: "Designs user-friendly digital products.", averageSalary: "₹5 LPA - ₹45+ LPA", futureDemand: 92, icon: "layout" }
    ],
    requiredSkills: [
      { title: "Creativity", score: 90 },
      { title: "Visual Thinking", score: 86 },
      { title: "Portfolio Building", score: 82 }
    ],
    higherStudies: ["B.Des", "BFA", "Animation", "Fashion Design", "Film Making", "Mass Communication"],
    entranceExams: ["NID DAT", "UCEED", "NIFT", "CUET"],
    colleges: ["NID", "NIFT", "IDC IIT Bombay", "Srishti", "Pearl Academy"],
    myths: [
      {
        myth: "Arts has no money.",
        reality: "Design, UX, animation, content and media careers are growing rapidly."
      }
    ],
    opportunitiesIndia: ["Design", "Media", "Animation", "Fashion", "UX"],
    opportunitiesAbroad: ["Design schools", "Creative industries", "Film and media"],
    growthFields: ["UX Design", "Gaming", "Animation", "Creator Economy"],
    averagePreparationTime: "Portfolio practice daily",
    recommendationReason: "Arts and Design suits students with creative thinking and visual expression.",
    active: true
  },

  {
    name: "Vocational and Skill-Based",
    slug: "vocational-skill-based",
    icon: "tools",
    matchScore: 58,
    recommendationLevel: "Good",
    shortDescription: "Best for practical, hands-on, job-oriented and skill-based careers.",
    longDescription:
      "Vocational pathways suit students who prefer practical learning, real-world skills and early career readiness.",
    whyRecommended: [
      "Good for hands-on learners",
      "Suitable for skill-based careers",
      "Can lead to early employability"
    ],
    strengths: ["Practical skills", "Hands-on learning", "Execution"],
    weaknesses: ["May require strong specialization", "Needs continuous skill upgrades"],
    suitableStudents: [
      "Students who prefer practical learning",
      "Students interested in early job skills",
      "Students who enjoy working with tools, systems or services"
    ],
    subjectsClass11: [
      { name: "IT", description: "Computer and technology skills." },
      { name: "Retail", description: "Sales, customer service and business operations." },
      { name: "Healthcare", description: "Basic healthcare and support skills." },
      { name: "Automobile", description: "Vehicle systems and maintenance." }
    ],
    subjectsClass12: [
      { name: "Advanced IT", description: "Advanced practical computer skills." },
      { name: "Business Operations", description: "Practical business and service operations." }
    ],
    careers: [
      { title: "Web Developer", description: "Builds websites and web applications.", averageSalary: "₹3 LPA - ₹25+ LPA", futureDemand: 88, icon: "code" },
      { title: "Technician", description: "Works with technical systems and repairs.", averageSalary: "₹2 LPA - ₹15+ LPA", futureDemand: 76, icon: "wrench" },
      { title: "Digital Marketer", description: "Promotes businesses online.", averageSalary: "₹3 LPA - ₹25+ LPA", futureDemand: 86, icon: "megaphone" }
    ],
    requiredSkills: [
      { title: "Practical Learning", score: 88 },
      { title: "Execution", score: 84 },
      { title: "Adaptability", score: 80 }
    ],
    higherStudies: ["Skill Courses", "Diploma", "B.Voc", "Certification Programs"],
    entranceExams: ["Institute-specific tests", "Skill admission tests"],
    colleges: ["NSDC Partners", "Polytechnic Institutes", "Vocational Colleges"],
    myths: [
      {
        myth: "Vocational means low career growth.",
        reality: "With the right skill, vocational paths can lead to strong income and entrepreneurship."
      }
    ],
    opportunitiesIndia: ["IT services", "Retail", "Healthcare support", "Automobile", "Digital services"],
    opportunitiesAbroad: ["Skilled jobs", "Technical training", "Vocational programs"],
    growthFields: ["Digital Skills", "Electric Vehicles", "Healthcare Support", "Service Economy"],
    averagePreparationTime: "Daily practical practice",
    recommendationReason: "Vocational paths suit students who learn better by doing practical work.",
    active: true
  },

  {
    name: "Diploma Polytechnic",
    slug: "diploma-polytechnic",
    icon: "wrench",
    matchScore: 55,
    recommendationLevel: "Good",
    shortDescription: "Best for technical diploma, engineering trades and early technical career entry.",
    longDescription:
      "Diploma Polytechnic is suitable for students who want a technical career path after Class 10 through practical engineering education.",
    whyRecommended: [
      "Good for practical technical learners",
      "Early entry into engineering fields",
      "Can later move to B.Tech lateral entry"
    ],
    strengths: ["Technical hands-on learning", "Machines", "Practical execution"],
    weaknesses: ["Needs clear trade selection", "May need further degree for higher roles"],
    suitableStudents: [
      "Students interested in technical fields",
      "Students who like machines and systems",
      "Students who prefer applied learning"
    ],
    subjectsClass11: [
      { name: "Engineering Drawing", description: "Technical drawing and design basics." },
      { name: "Workshop Practice", description: "Practical workshop and tool usage." },
      { name: "Applied Science", description: "Science applied to engineering." }
    ],
    subjectsClass12: [
      { name: "Diploma Year 2 Subjects", description: "Trade-specific technical subjects." }
    ],
    careers: [
      { title: "Junior Engineer", description: "Works in technical operations and engineering support.", averageSalary: "₹2.5 LPA - ₹18+ LPA", futureDemand: 78, icon: "helmet" },
      { title: "CAD Technician", description: "Creates technical design drawings.", averageSalary: "₹2.5 LPA - ₹15+ LPA", futureDemand: 76, icon: "drafting" },
      { title: "Manufacturing Supervisor", description: "Supervises production and technical processes.", averageSalary: "₹3 LPA - ₹20+ LPA", futureDemand: 75, icon: "factory" }
    ],
    requiredSkills: [
      { title: "Technical Aptitude", score: 84 },
      { title: "Practical Thinking", score: 86 },
      { title: "Discipline", score: 78 }
    ],
    higherStudies: ["Diploma Engineering", "B.Tech Lateral Entry", "AMIE"],
    entranceExams: ["State Polytechnic Entrance Exams"],
    colleges: ["Government Polytechnic Colleges", "Private Polytechnic Institutes"],
    myths: [
      {
        myth: "Diploma closes degree options.",
        reality: "Diploma students can enter B.Tech through lateral entry in many cases."
      }
    ],
    opportunitiesIndia: ["Manufacturing", "Engineering services", "Construction", "Automation"],
    opportunitiesAbroad: ["Technical diploma jobs", "Skilled engineering roles"],
    growthFields: ["Automation", "EV Technology", "Manufacturing", "Construction Tech"],
    averagePreparationTime: "Practical study + technical practice",
    recommendationReason: "Diploma suits students with practical technical ability and early career focus.",
    active: true
  }
];

export default streams;