import { describe, it, assert } from 'vitest';

describe('Math.sqrt() test', () => {
  it('SQRT4', () => {
    assert.equal(Math.sqrt(4), 2);
  });

  it('SQRT144', () => {
    assert.equal(Math.sqrt(144), 12);
  });

  it('SQRT2', () => {
    assert.equal(Math.sqrt(2), Math.SQRT2);
  });
});