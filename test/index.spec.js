import expect from 'expect';
import { add } from '../src';

describe('add', () => {
  it('should add 2 and 2', () => {
    expect(add(2, 2)).toBe(4);
  });
});
