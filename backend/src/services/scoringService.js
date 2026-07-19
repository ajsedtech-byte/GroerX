function addObjectScores(target = {}, increment = {}) {
  for (const [key, value] of Object.entries(increment || {})) {
    target[key] = (target[key] || 0) + Number(value || 0);
  }

  return target;
}

export function applyMapping(scoreDoc, selectedMapping) {
  scoreDoc.riasec = addObjectScores(
    scoreDoc.riasec,
    selectedMapping.riasec
  );

  scoreDoc.traits = addObjectScores(
    scoreDoc.traits,
    selectedMapping.traits
  );

  scoreDoc.stream = addObjectScores(
    scoreDoc.stream,
    selectedMapping.stream
  );

  return scoreDoc;
}