export function countScore(wins, draws, losses) {
  const teamScoreSum = wins + draws + losses;
  return {
    winsPercentage: (wins / teamScoreSum) * 100,
    drawsPercentage: (draws / teamScoreSum) * 100,
    lossesPercentage: (losses / teamScoreSum) * 100,
    teamScoreSum,
  };
}
