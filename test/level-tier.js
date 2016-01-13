var expect = require('expect.js');
var leveltier = require('..');

describe('level-tier', function() {
  it('should throw if not providing tiers as array', function() {
    var fn = function() {
      leveltier('first');
    }.bind(this);

    expect(fn).to.throwException(/Invalid tiers: first/);
  });

  it('should create key from single tier', function() {
    var tiers = ['first'];

    expect(leveltier(tiers)).to.be('first');
  });

  it('should create key from multiple tiers', function() {
    var tiers = ['first', 'second'];
    var key = leveltier(tiers);

    expect(key).to.be('first\x00second');
  });

  it('should create key from multiple tiers with custom delimiter', function() {
    var tiers = ['first', 'second'];
    var key = leveltier(tiers, {
      delimiter: '!'
    });

    expect(key).to.be('first!second')
  });

  describe('lte', function() {
    it('shouls expose tier.lte as a shortcut to tier', function() {
      expect(leveltier.lte).to.be(leveltier);
    });
  });

  describe('gte', function() {
    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(leveltier.gte(tiers)).to.be('first\x00\xff');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.gte(tiers);

      expect(key).to.be('first\x00second\x00\xff');
    });

    it('should create key from multiple tiers with custom delimiter and terminator', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.gte(tiers, {
        delimiter: '!',
        terminator: '~'
      });

      expect(key).to.be('first!second!~');
    })
  });
});
