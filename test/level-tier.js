var expect = require('expect.js');
var leveltier = require('..');

describe('level-tier', function() {
  it('should return underlying when adding self', function() {
    var db = {};
    expect(leveltier(db)).to.be(db);
  });

  describe('tier', function() {
    beforeEach(function() {
      this.db = {};
      leveltier(this.db);
    });

    afterEach(function() {
      this.db = null;
    });

    it('should not add itself twice', function() {
      var originalTier = this.db.tier;
      leveltier(this.db);

      expect(this.db.tier).to.be(originalTier);
    });

    it('should return underlaying db when trying to add itself twice', function() {
      expect(leveltier(this.db)).to.be(this.db);
    });

    it('should throw if not providing tiers as array', function() {
      var fn = function() {
        this.db.tier('first');
      }.bind(this);

      expect(fn).to.throwException(/Invalid tiers: first/);
    });

    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(this.db.tier(tiers)).to.be('first');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = this.db.tier(tiers);

      expect(key).to.be('first\x00second');
    });

    it('should create key from multiple tiers with custom delimiter', function() {
      var tiers = ['first', 'second'];
      var key = this.db.tier(tiers, {
        delimiter: '!'
      });

      expect(key).to.be('first!second')
    });

    describe('lte', function() {
      it('shouls expose tier.lte as a shortcut to tier', function() {
        expect(this.db.tier.lte).to.be(this.db.tier);
      });
    });

    describe('gte', function() {
      it('should create key from single tier', function() {
        var tiers = ['first'];

        expect(this.db.tier.gte(tiers)).to.be('first\x00\xff');
      });

      it('should create key from multiple tiers', function() {
        var tiers = ['first', 'second'];
        var key = this.db.tier.gte(tiers);

        expect(key).to.be('first\x00second\x00\xff');
      });

      it('should create key from multiple tiers with custom delimiter and terminator', function() {
        var tiers = ['first', 'second'];
        var key = this.db.tier.gte(tiers, {
          delimiter: '!',
          terminator: '~'
        });

        expect(key).to.be('first!second!~');
      })
    });
  });
});
