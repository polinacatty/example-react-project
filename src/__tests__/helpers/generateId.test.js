import { generateId } from '../../helpers/generateId';

describe('generateId', () => {
    describe('instance', () => {
        test('should be defined as a function', () => {
            expect(generateId).toBeInstanceOf(Function);
        });
    });

    describe('validation', () => {
        test('should return number when it called', () => {
            const result = generateId();
            expect(typeof result).toBe('number');
        });

        test('should return positive number', () => {
            const result = generateId();
            expect(result).toBeGreaterThan(0);
        });

        test('should return integer', () => {
            const result = generateId();
            expect(Number.isInteger(result)).toBe(true);
        });
    });

    describe('main stream', () => {
        test('should return large numbers', () => {
            const id = generateId();
            expect(id).toBeGreaterThan(1000000000000);
        });

        test('should return all unique values in sequence with delays', () => {
            const ids = new Set();
            for (let i = 0; i < 1000; i++) {
                ids.add(generateId());
                if (i % 100 === 0) {
                    const start = Date.now();
                    while (Date.now() - start < 1) {}
                }
            }
            expect(ids.size).toBe(1000);
        });
    });
});
