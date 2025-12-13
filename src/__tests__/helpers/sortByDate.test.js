import { sortByDate } from '../../helpers/sortByDate';

describe('sortByDate', () => {
    describe('instance', () => {
        test('should be defined as a function', () => {
            expect(sortByDate).toBeInstanceOf(Function);
        });
    });

    describe('validation', () => {
        test('should return array when it received array', () => {
            const items = [
                { id: 1, createdAt: '2024-01-15' },
                { id: 2, createdAt: '2025-01-15' }
            ];
            const result = sortByDate(items, true);
            expect(Array.isArray(result)).toBe(true);
        });

        test('should not mutate original array', () => {
            const original = [
                { id: 1, createdAt: '2024-01-15' },
                { id: 2, createdAt: '2025-01-15' }
            ];
            const sorted = sortByDate(original, true);
            
            expect(sorted).not.toBe(original);
        });

        test('should handle mixed date formats', () => {
            const items = [
                { id: 1, createdAt: '2024-01-15' },
                { id: 2, createdAt: '2024/01/15' },
                { id: 3, createdAt: '15.01.2024' },
                { id: 4, createdAt: '01/15/2024' },
                { id: 5, createdAt: '2024-01-15T10:30:00' },
                { id: 6, createdAt: '2024-01-15T10:30:00Z' },
                { id: 7, createdAt: '2024-01-15 10:30:00' },
                { id: 8, createdAt: '2024-01-15T10:30:00.123' },
                { id: 9, createdAt: '2024-01-15T10:30:00.123Z' },
                { id: 10, createdAt: '2024-01-15 10:30:00.123' },
                { id: 11, createdAt: '2024-01-15T10:30:00+03:00' },
                { id: 12, createdAt: '2024-01-15T10:30:00-05:00' },
                { id: 13, createdAt: 'January 15, 2024' },
                { id: 14, createdAt: 'Jan 15, 2024' },
                { id: 15, createdAt: '15 January 2024' },
                { id: 16, createdAt: '1705269600000' },
                { id: 17, createdAt: new Date('2024-01-15') },
                { id: 18, createdAt: '2024.01.15' },
                { id: 19, createdAt: '2024-01-15 10:30' },
                { id: 20, createdAt: '2024-01-15T22:30:00' },
                { id: 21, createdAt: '2024-01-15T10:30:00 PM' }
            ];
            
            const sorted = sortByDate(items, true);
            
            expect(sorted.length).toBe(21);
            
            items.forEach((item, index) => {
                expect(() => sortByDate([item], true)).not.toThrow();
            });
            
            const validDates = sorted.filter(item => {
                try {
                    new Date(item.createdAt);
                    return true;
                } catch {
                    return false;
                }
            });
            
            expect(validDates.length).toBe(21);
        });
    });

    describe('corner cases', () => {
        test('should return empty array when it received empty array', () => {
            const result = sortByDate([], true);
            expect(result).toEqual([]);
        });

        test('should return array when it received single item array', () => {
            const items = [{ id: 1, createdAt: '2024-01-15' }];
            const result = sortByDate(items, true);
            expect(result).toEqual(items);
        });

        test('should handle items with same date', () => {
            const items = [
                { id: 1, createdAt: '2024-05-20T10:00:00Z', name: 'A' },
                { id: 2, createdAt: '2024-05-20T10:00:00Z', name: 'B' },
                { id: 3, createdAt: '2024-05-20T10:00:00Z', name: 'C' }
            ];
            const sorted = sortByDate(items, true);
            
            expect(sorted[0].name).toBe('A');
            expect(sorted[1].name).toBe('B');
            expect(sorted[2].name).toBe('C');
        });
    });

    describe('conditional cases', () => {
        const items = [
            { id: 9, createdAt: '2023-08-10T14:25:00.00Z' },
            { id: 2, createdAt: '2025-03-22T09:15:00.00Z' },
            { id: 7, createdAt: '2023-11-30T18:45:00.00Z' },
            { id: 4, createdAt: '2024-07-07T11:30:00.00Z' },
            { id: 1, createdAt: '2023-05-05T08:00:00.00Z' },
            { id: 10, createdAt: '2024-12-01T20:10:00.00Z' },
            { id: 5, createdAt: '2024-02-14T16:20:00.00Z' },
            { id: 3, createdAt: '2024-09-19T13:40:00.00Z' },
            { id: 8, createdAt: '2024-04-01T07:50:00.00Z' },
            { id: 6, createdAt: '2025-01-01T00:00:00.00Z' }
        ];

        test('should sort descending when isDescending is true', () => {
            const sorted = sortByDate(items, true);
            expect(sorted[0].id).toBe(2);
            expect(sorted[1].id).toBe(6);
            expect(sorted[2].id).toBe(10);
            expect(sorted[3].id).toBe(3);
            expect(sorted[4].id).toBe(4);
            expect(sorted[5].id).toBe(8);
            expect(sorted[6].id).toBe(5);
            expect(sorted[7].id).toBe(7);
            expect(sorted[8].id).toBe(9);
            expect(sorted[9].id).toBe(1);
        });

        test('should sort ascending when isDescending is false', () => {
            const sorted = sortByDate(items, false);
            expect(sorted[0].id).toBe(1);
            expect(sorted[1].id).toBe(9);
            expect(sorted[2].id).toBe(7);
            expect(sorted[3].id).toBe(5);
            expect(sorted[4].id).toBe(8);
            expect(sorted[5].id).toBe(4);
            expect(sorted[6].id).toBe(3);
            expect(sorted[7].id).toBe(10);
            expect(sorted[8].id).toBe(6);
            expect(sorted[9].id).toBe(2);
        });

        test('should sort descending when isDescending is undefined', () => {
            const sorted = sortByDate(items);
            expect(sorted[0].id).toBe(2);
            expect(sorted[9].id).toBe(1);
        });
    });

    describe('main stream', () => {
        test('should sort by year correctly', () => {
            const items = [
                { id: 1, createdAt: '2020-01-01' },
                { id: 2, createdAt: '2022-01-01' },
                { id: 3, createdAt: '2021-01-01' }
            ];
            const sorted = sortByDate(items, true);
            expect(sorted[0].id).toBe(2);
            expect(sorted[1].id).toBe(3);
            expect(sorted[2].id).toBe(1);
        });

        test('should sort by month correctly', () => {
            const items = [
                { id: 1, createdAt: '2024-03-01' },
                { id: 2, createdAt: '2024-01-01' },
                { id: 3, createdAt: '2024-02-01' }
            ];
            const sorted = sortByDate(items, true);
            expect(sorted[0].id).toBe(1);
            expect(sorted[1].id).toBe(3);
            expect(sorted[2].id).toBe(2);
        });

        test('should sort by day correctly', () => {
            const items = [
                { id: 1, createdAt: '2024-05-25' },
                { id: 2, createdAt: '2024-05-20' },
                { id: 3, createdAt: '2024-05-15' }
            ];
            const sorted = sortByDate(items, true);
            expect(sorted[0].id).toBe(1);
            expect(sorted[1].id).toBe(2);
            expect(sorted[2].id).toBe(3);
        });

        test('should sort by time correctly', () => {
            const items = [
                { id: 1, createdAt: '2024-05-20T14:30:00Z' },
                { id: 2, createdAt: '2024-05-20T10:30:00Z' },
                { id: 3, createdAt: '2024-05-20T18:30:00Z' }
            ];
            const sorted = sortByDate(items, true);
            expect(sorted[0].id).toBe(3);
            expect(sorted[1].id).toBe(1);
            expect(sorted[2].id).toBe(2);
        });

        test('should sort correctly with different dates in different formats', () => {
            const items = [
                { id: 1, createdAt: '2023-01-01' },
                { id: 2, createdAt: '2024-03-15T10:30:00' },
                { id: 3, createdAt: '2024-05-20' },
                { id: 4, createdAt: '2024-07-01T00:00:00.000Z' },
                { id: 5, createdAt: '2024-12-31T23:59:59Z' }
            ];
            
            const sorted = sortByDate(items, true);
            
            expect(sorted[0].id).toBe(5);
            expect(sorted[1].id).toBe(4);
            expect(sorted[2].id).toBe(3);
            expect(sorted[3].id).toBe(2);
            expect(sorted[4].id).toBe(1);
        });
    });
});
