import { bemClass } from '../bem';

describe('bemClass()', () => {
  it('should return the block if no modifiers defined', () => {
    const res = bemClass('List__item');
    expect(res).toBe('List__item');
  });

  it('should return the className with all modifier classes', () => {
    const res = bemClass('List__item', { active: true, selected: false, awesome: true });
    expect(res).toBe('List__item List__item--active List__item--awesome');
  });

  it('should allow adding extra classes after modifiers', () => {
    const res = bemClass('List__item', { awesome: true }, 'extra-class', 'other-classe');
    expect(res).toBe('List__item List__item--awesome extra-class other-classe');
  });
});
