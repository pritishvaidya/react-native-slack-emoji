import { charFromUtf16, deepMerge } from '../src/utils';

describe('Testing Utility functions', () => {
  describe('index utility method', () => {
    describe('charFromUtf16 returns the emoji', () => {
      it('should convert from unicode to emoji', () => {
        const unicode = '1F600';
        expect(
          charFromUtf16(unicode),
        ).toBe('😀');
      });
    });

    describe('charFromUtf16 returns the emoji', () => {
      it('should convert from unicode to emoji', () => {
        const unicode = '1F600';
        expect(
          charFromUtf16(unicode),
        ).toBe('😀');
      });
    });

    describe('deepMerge the object', () => {
      const object1 = { test: { object1: 'Object Test 1' } };
      const object2 = { test: { object2: 'Object Test 2' } };

      const object3 = { test: 'Object Test 3' };
      const object4 = { test: 'Object Test 4' };

      const mergedObject = { test: { object1: 'Object Test 1' } };
      const mergedObject2 = { test: 'Object Test 4' };
      it('should be able to deep merge objects', () => {
        expect(
          deepMerge(object1, object2),
        ).toMatchObject(mergedObject);
      });

      it('should be able to shallow merge objects', () => {
        expect(
          deepMerge(object3, object4),
        ).toMatchObject(mergedObject2);
      });
    });
  });
});
