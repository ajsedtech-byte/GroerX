import fs from "fs";
const questions = JSON.parse(
  fs.readFileSync("./data/questions.json", "utf8")
);
const riasecMap = {
  R: "realistic",
  I: "investigative",
  A: "artistic",
  S: "social",
  E: "enterprising",
  C: "conventional"
};
const mappings = questions.map((q) => {
  const mapping = {};
  q.options.forEach((option) => {
    const field = riasecMap[option.riasecCode];
    mapping[option.key] = {
      riasec: {
        [field]: 5
      },
      traits: {},
      stream: {},
      score: 5,
      riasecCode: option.riasecCode,
      riasecDimension: option.riasecDimension || field
    };
  });
  return {
    questionCode: q.questionCode,
    assessmentCode: q.assessmentCode,
    mapping,
    scoringRule: "Selected option = +5 points to corresponding RIASEC category."
  };
});
const payload = {
  questions,
  mappings
};
fs.writeFileSync(
  "./data/bulk-upload-payload.json",
  JSON.stringify(payload, null, 2)
);
console.log("bulk-upload-payload.json created successfully");
console.log("Questions:", questions.length);
console.log("Mappings:", mappings.length);