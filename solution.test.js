const tickets = require('./solution');

describe('Solution tests', function () {
  it('Must be true', function () {
    expect(tickets([25])).toBe(true);
    expect(tickets([25, 25, 50])).toBe(true);
    expect(tickets([25, 25, 25, 50])).toBe(true);
    expect(tickets([25, 25, 25, 50, 100])).toBe(true);
    expect(tickets([25, 25, 25, 100])).toBe(true);
  });
  it('Must be false', function () {
    expect(tickets([10])).toBe(false);
    expect(tickets([50])).toBe(false);
    expect(tickets([25, 100])).toBe(false);
    expect(tickets([25, 25, 50, 50, 100])).toBe(false);
  });
});
