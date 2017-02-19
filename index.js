var LOWER_BOUND = '\x00';
var UPPER_BOUND = '\uffff';
var boundMatch = new RegExp(LOWER_BOUND + '|' + UPPER_BOUND, 'g');

var joinTiers = function(tiers) {
  if (!Array.isArray(tiers)) {
    throw new Error('Invalid tiers: ' + tiers);
  }

  tiers = tiers.map(function(tier) {
    if (typeof tier === 'number') {
      console.warn('Avoid using numbers as namespaced keys for consistent ' +
        'sorting order');
    }
    return tier.toString().replace(boundMatch, '');
  });

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
