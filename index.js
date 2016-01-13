var DEFAULT_DELIMITER = '\x00';
var DEFAULT_TERMINATOR = '\xff';

var joinTiers = function(tiers, options) {
  var delimiter;

  options = options || {};
  delimiter = options.delimiter || DEFAULT_DELIMITER;

  if (!Array.isArray(tiers)) {
    throw new Error('Invalid tiers: ' + tiers);
  }

  return tiers.join(delimiter);
};

var leveltier = joinTiers;

leveltier.lte = joinTiers;

leveltier.gte = function(tiers, options) {
  var delimiter, terminator;

  options = options || {};

  delimiter = options.delimiter || DEFAULT_DELIMITER;
  terminator = options.terminator || DEFAULT_TERMINATOR;

  return joinTiers(tiers, options) + delimiter + terminator;
};

leveltier.parse = function(key, options) {
  var delimiter;

  options = options || {};

  delimiter = options.delimiter || DEFAULT_DELIMITER;

  return key.split(delimiter);
}

module.exports = leveltier;
