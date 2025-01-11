function calculateStandardDeviation(data) {
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
    return Math.sqrt(variance);
  }
  
  module.exports = { calculateStandardDeviation };
  