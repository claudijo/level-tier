var LOWER_BOUND = '\x00';
var UPPER_BOUND = '\xff';

var joinTiers = function(tiers) {
  if (!Array.isArray(tiers)) {
    throw new Error('Invalid tiers: ' + tiers);
  }

  return tiers.join(LOWER_BOUND);
};

var leveltier = joinTiers;

leveltier.gte = function(tiers) {
  return joinTiers(tiers) + LOWER_BOUND;
};

leveltier.lte = function(tiers) {
  return joinTiers(tiers) + LOWER_BOUND + UPPER_BOUND;
};

leveltier.parse = function(key) {
  return key.split(LOWER_BOUND);
}

module.exports = leveltier;
