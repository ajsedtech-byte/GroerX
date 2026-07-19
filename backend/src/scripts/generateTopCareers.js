import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "src/data/careers");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const pcm = ["science-pcm", "science-pcmb"];
const pcb = ["science-pcb", "science-pcmb"];
const commerce = ["commerce-with-maths", "commerce-without-maths"];
const humanities = ["humanities"];
const arts = ["arts-design"];

const makeCareer = (title, category, streamSlugs) => ({
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  category,
  streamSlugs,
  shortDescription: `${title} is a high-value career path in ${category}.`,
  longDescription: `${title} involves specialized skills, structured education, practical training and continuous learning.`,
  averageSalary: "₹3 LPA - ₹40+ LPA",
  futureDemand: 85,
  matchScore: 85,
  difficultyLevel: "Medium to High",
  studyYears: "3-5 years",
  workLifeBalance: "Moderate",
  requiredSkills: ["Problem Solving", "Communication", "Discipline", "Analytical Thinking"],
  subjectsNeeded: ["English", "Mathematics", "Relevant Stream Subjects"],
  entranceExams: ["CUET", "Institute Entrance", "Relevant Professional Exams"],
  degrees: ["Bachelor Degree", "Professional Certification", "Specialization"],
  pros: ["Good growth", "Multiple opportunities", "Strong long-term scope"],
  cons: ["Competition", "Needs consistency", "Requires continuous learning"],
  roadmap: [
    "Choose suitable Class 11 stream",
    "Build strong basics",
    "Prepare for entrance/professional exams",
    "Complete degree or certification",
    "Do internship/projects",
    `Start career as ${title}`
  ],
  active: true
});

const data = {
  "technology.json": [
    "Software Engineer","AI Engineer","Machine Learning Engineer","Data Scientist",
    "Cyber Security Analyst","Cloud Engineer","DevOps Engineer","Full Stack Developer",
    "Backend Developer","Frontend Developer","Mobile App Developer","Game Developer",
    "Blockchain Developer","Robotics Engineer","IoT Engineer"
  ].map(t => makeCareer(t, "Technology", pcm)),

  "engineering.json": [
    "Mechanical Engineer","Civil Engineer","Electrical Engineer","Electronics Engineer",
    "Chemical Engineer","Aerospace Engineer","Automobile Engineer","Petroleum Engineer",
    "Mechatronics Engineer","Biomedical Engineer","Industrial Engineer","Production Engineer",
    "Mining Engineer","Marine Engineer","Environmental Engineer","Architect","Interior Designer",
    "Instrumentation Engineer","Food Technologist","Textile Engineer"
  ].map(t => makeCareer(t, "Engineering", pcm)),

  "medical.json": [
    "MBBS Doctor","Surgeon","Cardiologist","Neurologist","Pediatrician","Psychiatrist",
    "Dentist","Veterinary Doctor","Pharmacist","Physiotherapist","Nurse","Radiologist",
    "Pathologist","Nutritionist","Clinical Psychologist","Occupational Therapist",
    "Optometrist","Medical Lab Scientist","Biotechnologist","Public Health Officer"
  ].map(t => makeCareer(t, "Healthcare", pcb)),

  "commerce.json": [
    "Chartered Accountant","Company Secretary","Cost Accountant","Investment Banker",
    "Financial Analyst","Business Analyst","Accountant","Auditor","Tax Consultant",
    "Stock Market Analyst","Financial Planner","Economist","Actuary","Marketing Manager",
    "Sales Manager","Human Resource Manager","Operations Manager","Entrepreneur",
    "E-Commerce Manager","Supply Chain Manager"
  ].map(t => makeCareer(t, "Commerce & Business", commerce)),

  "science.json": [
    "Data Analyst","Physicist","Chemist","Biologist","Microbiologist","Biochemist",
    "Environmental Scientist","Astrophysicist","Forensic Scientist","Research Scientist"
  ].map(t => makeCareer(t, "Science & Research", [...pcm, ...pcb])),

  "government.json": [
    "IAS Officer","IPS Officer","IFS Officer","IRS Officer","Judge","Lawyer",
    "Army Officer","Air Force Officer","Navy Officer","Intelligence Officer"
  ].map(t => makeCareer(t, "Government Law Defence", [...humanities, ...pcm, ...pcb, ...commerce])),

  "creative.json": [
    "Graphic Designer","Fashion Designer","Animator","Film Director","Photographer",
    "Journalist","Digital Content Creator","Video Editor","Music Producer","Industrial Designer"
  ].map(t => makeCareer(t, "Creative Media Design", [...arts, ...humanities]))
};

Object.entries(data).forEach(([fileName, careers]) => {
  fs.writeFileSync(
    path.join(dir, fileName),
    JSON.stringify(careers, null, 2),
    "utf-8"
  );
});

console.log("✅ Top 100 careers JSON files generated successfully");