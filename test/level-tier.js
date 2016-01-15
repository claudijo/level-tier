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

  describe('gte', function() {
    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(leveltier.gte(tiers)).to.be('first\x00');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.gte(tiers);

      expect(key).to.be('first\x00second\x00');
    });

    it('should create key from multiple tiers with custom delimiter', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.gte(tiers, {
        delimiter: '!'
      });

      expect(key).to.be('first!second!');
    })
  });

  describe('lte', function() {
    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(leveltier.lte(tiers)).to.be('first\x00\xff');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.lte(tiers);

      expect(key).to.be('first\x00second\x00\xff');
    });

    it('should create key from multiple tiers with custom delimiter and terminator', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.lte(tiers, {
        delimiter: '!',
        terminator: '~'
      });

      expect(key).to.be('first!second!~');
    });
  });

  describe('parse', function() {
    it('should parse key into tiers array', function() {
      var key = 'first\x00second';
      var tiers = ['first', 'second'];

      expect(leveltier.parse(key)).to.eql(tiers);
    });
  });

  describe('parse', function() {
    it('should parse key with custom delimiter into tiers array', function() {
      var key = 'first!second';
      var tiers = ['first', 'second'];

      expect(leveltier.parse(key, {
        delimiter: '!'
      })).to.eql(tiers);
    });
  });
});
