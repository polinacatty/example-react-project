import { formatDate } from '../../helpers/formatDate';

describe('formatDate', () => {
    describe('instance', () => {
        test('should be a function', () => {
            expect(formatDate).toBeInstanceOf(Function)
        });

        test('should be defined', () => {
            expect(formatDate).toBeDefined();
        });
    });

    describe('validation', () => {
        test('should return string for valid date', () => {
            const result = formatDate('2024-01-15');
            expect(typeof result).toBe('string');
        });

        test('should handle Date object', () => {
            const date = new Date('2024-01-15');
            const result = formatDate(date);
            expect(typeof result).toBe('string');
        });

        test('should handle timestamp', () => {
            const timestamp = 1705269600000;
            const result = formatDate(timestamp);
            expect(typeof result).toBe('string');
        });
    });

    describe('corner cases', () => {
        test('should handle leap year date', () => {
            const result = formatDate('2024-02-29');
            expect(result).toBe('29.02.2024');
        });

        test('should handle non-leap year date', () => {
            const result = formatDate('2023-02-28');
            expect(result).toBe('28.02.2023');
        });

        test('should handle first day of year', () => {
            const result = formatDate('2024-01-01');
            expect(result).toBe('01.01.2024');
        });

        test('should handle last day of year', () => {
            const result = formatDate('2024-12-31');
            expect(result).toBe('31.12.2024');
        });
    });

    describe('different date formats', () => {
        test('should handle YYYY-MM-DD format', () => {
            const result = formatDate('2024-05-20');
            expect(result).toBe('20.05.2024');
        });

        test('should handle YYYY-MM-DDTHH:MM:SS format', () => {
            const result = formatDate('2024-05-20T14:30:00');
            expect(result).toBe('20.05.2024');
        });

        test('should handle YYYY-MM-DDTHH:MM:SSZ format', () => {
            const result = formatDate('2024-05-20T14:30:00Z');
            expect(result).toBe('20.05.2024');
        });

        test('should handle YYYY-MM-DDTHH:MM:SS.sssZ format', () => {
            const result = formatDate('2024-05-20T14:30:00.123Z');
            expect(result).toBe('20.05.2024');
        });

        test('should handle YYYY-MM-DDTHH:MM:SS+HH:MM format', () => {
            const result = formatDate('2024-05-20T14:30:00+03:00');
            expect(result).toBe('20.05.2024');
        });

        test('should handle date with slash separator', () => {
            const result = formatDate('2024/05/20');
            expect(result).toBe('20.05.2024');
        });

        test('should handle month name format', () => {
            const result = formatDate('May 20, 2024');
            expect(result).toBe('20.05.2024');
        });

        test('should handle abbreviated month format', () => {
            const result = formatDate('20 May 2024');
            expect(result).toBe('20.05.2024');
        });
    });

    describe('main stream', () => {
        test('should format date correctly for January', () => {
            const result = formatDate('2024-01-15');
            expect(result).toBe('15.01.2024');
        });

        test('should format date correctly for February', () => {
            const result = formatDate('2024-02-15');
            expect(result).toBe('15.02.2024');
        });

        test('should format date correctly for March', () => {
            const result = formatDate('2024-03-15');
            expect(result).toBe('15.03.2024');
        });

        test('should format date correctly for April', () => {
            const result = formatDate('2024-04-15');
            expect(result).toBe('15.04.2024');
        });

        test('should format date correctly for May', () => {
            const result = formatDate('2024-05-15');
            expect(result).toBe('15.05.2024');
        });

        test('should format date correctly for June', () => {
            const result = formatDate('2024-06-15');
            expect(result).toBe('15.06.2024');
        });

        test('should format date correctly for July', () => {
            const result = formatDate('2024-07-15');
            expect(result).toBe('15.07.2024');
        });

        test('should format date correctly for August', () => {
            const result = formatDate('2024-08-15');
            expect(result).toBe('15.08.2024');
        });

        test('should format date correctly for September', () => {
            const result = formatDate('2024-09-15');
            expect(result).toBe('15.09.2024');
        });

        test('should format date correctly for October', () => {
            const result = formatDate('2024-10-15');
            expect(result).toBe('15.10.2024');
        });

        test('should format date correctly for November', () => {
            const result = formatDate('2024-11-15');
            expect(result).toBe('15.11.2024');
        });

        test('should format date correctly for December', () => {
            const result = formatDate('2024-12-15');
            expect(result).toBe('15.12.2024');
        });

        test('should format single digit day correctly', () => {
            const result = formatDate('2024-05-01');
            expect(result).toBe('01.05.2024');
        });

        test('should format single digit month correctly', () => {
            const result = formatDate('2024-01-15');
            expect(result).toBe('15.01.2024');
        });

        test('should format two digit day correctly', () => {
            const result = formatDate('2024-05-25');
            expect(result).toBe('25.05.2024');
        });

        test('should format two digit month correctly', () => {
            const result = formatDate('2024-10-15');
            expect(result).toBe('15.10.2024');
        });

        test('should format different years correctly', () => {
            expect(formatDate('2020-05-20')).toBe('20.05.2020');
            expect(formatDate('2021-05-20')).toBe('20.05.2021');
            expect(formatDate('2022-05-20')).toBe('20.05.2022');
            expect(formatDate('2023-05-20')).toBe('20.05.2023');
            expect(formatDate('2024-05-20')).toBe('20.05.2024');
            expect(formatDate('2025-05-20')).toBe('20.05.2025');
        });
    });

    describe('special cases', () => {
        test('should handle same date with different times', () => {
            const date1 = formatDate('2024-05-20T00:00:00');
            const date2 = formatDate('2024-05-20T12:00:00');
            const date3 = formatDate('2024-05-20T23:59:59');
            expect(date1).toBe('20.05.2024');
            expect(date2).toBe('20.05.2024');
            expect(date3).toBe('20.05.2024');
        });

        test('should handle dates from different centuries', () => {
            expect(formatDate('1999-12-31')).toBe('31.12.1999');
            expect(formatDate('2000-01-01')).toBe('01.01.2000');
            expect(formatDate('2100-01-01')).toBe('01.01.2100');
        });

        test('should handle dates with timezone conversions', () => {
            expect(formatDate('2024-05-20T00:00:00+00:00')).toBe('20.05.2024');
            expect(formatDate('2024-05-20T05:00:00+05:00')).toBe('20.05.2024');
            expect(formatDate('2024-05-19T19:00:00-05:00')).toBe('20.05.2024');
        });
    });
});
