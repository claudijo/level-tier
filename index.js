var DEFAULT_DELIMITER = '\x00';
var DEFAULT_TERMINATOR = '\xff';

module.exports = function(db) {
  if ('tier' in db) {
    return db;
  }

  db.tier = function(tiers, options) {
    var delimiter;

    options = options || {};
    delimiter = options.delimiter || DEFAULT_DELIMITER;

    if (!Array.isArray(tiers)) {
      throw new Error('Invalid tiers: ' + tiers);
    }

    return tiers.join(delimiter);
  };

  db.tier.lte = db.tier;

  db.tier.gte = function(tiers, options) {
    var delimiter, terminator;

    options = options || {};
    var delimiter = options.delimiter || DEFAULT_DELIMITER;
    var terminator = options.terminator || DEFAULT_TERMINATOR;

    return db.tier(tiers, options) + delimiter + terminator;
  };

  return db;
};
