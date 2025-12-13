import { generateDate } from '../../helpers/generateDate';

describe('generateDate', () => {
    describe('instance', () => {
        test('should be defined as a function', () => {
            expect(generateDate).toBeInstanceOf(Function);
        });
    });

    describe('validation', () => {
        test('should return string when it called', () => {
            const result = generateDate();
            expect(typeof result).toBe('string');
        });

        test('should return ISO format string', () => {
            const result = generateDate();
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        });
    });

    describe('corner cases', () => {
        test('should return current date', () => {
            const before = new Date();
            const result = generateDate();
            const resultDate = new Date(result);
            const after = new Date();
            
            expect(resultDate.getTime()).toBeGreaterThanOrEqual(before.getTime() - 1000);
            expect(resultDate.getTime()).toBeLessThanOrEqual(after.getTime() + 1000);
        });

        test('should return valid date string when called multiple times', () => {
            const date1 = generateDate();
            const date2 = generateDate();
            const date3 = generateDate();
            
            expect(() => new Date(date1)).not.toThrow();
            expect(() => new Date(date2)).not.toThrow();
            expect(() => new Date(date3)).not.toThrow();
            
            expect(new Date(date1).toString()).not.toBe('Invalid Date');
            expect(new Date(date2).toString()).not.toBe('Invalid Date');
            expect(new Date(date3).toString()).not.toBe('Invalid Date');
        });
    });

        test('should return increasing timestamps when called in sequence', () => {
            const date1 = generateDate();
            const date2 = generateDate();
            const date3 = generateDate();
            
            const time1 = new Date(date1).getTime();
            const time2 = new Date(date2).getTime();
            const time3 = new Date(date3).getTime();
            
            expect(time2).toBeGreaterThanOrEqual(time1);
            expect(time3).toBeGreaterThanOrEqual(time2);
        });

    describe('main stream', () => {
        test('should have correct year component', () => {
            const result = generateDate();
            const year = new Date(result).getFullYear();
            const currentYear = new Date().getFullYear();
            expect(year).toBe(currentYear);
        });

        test('should have correct month component', () => {
            const result = generateDate();
            const month = new Date(result).getMonth();
            const currentMonth = new Date().getMonth();
            expect(month).toBe(currentMonth);
        });

        test('should have correct day component', () => {
            const result = generateDate();
            const day = new Date(result).getDate();
            const currentDay = new Date().getDate();
            expect(day).toBe(currentDay);
        });

        test('should have valid hour component', () => {
            const result = generateDate();
            const hour = new Date(result).getHours();
            expect(hour).toBeGreaterThanOrEqual(0);
            expect(hour).toBeLessThanOrEqual(23);
        });

        test('should have valid minute component', () => {
            const result = generateDate();
            const minute = new Date(result).getMinutes();
            expect(minute).toBeGreaterThanOrEqual(0);
            expect(minute).toBeLessThanOrEqual(59);
        });

        test('should have valid second component', () => {
            const result = generateDate();
            const second = new Date(result).getSeconds();
            expect(second).toBeGreaterThanOrEqual(0);
            expect(second).toBeLessThanOrEqual(59);
        });

        test('should have valid millisecond component', () => {
            const result = generateDate();
            const ms = new Date(result).getMilliseconds();
            expect(ms).toBeGreaterThanOrEqual(0);
            expect(ms).toBeLessThanOrEqual(999);
        });
    });

    describe('special cases with time mocking', () => {
        let dateNowSpy;

        afterEach(() => {
            if (dateNowSpy) {
                dateNowSpy.mockRestore();
            }
        });

        test('should return exact date when time is mocked', () => {
            const mockTime = new Date('2024-05-20T10:30:00.123Z').getTime();
            dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => mockTime);

            const result = generateDate();
            expect(result).toBe('2024-05-20T10:30:00.123Z');
        });

        test('should return increasing dates with mocked time increments', () => {
            let mockTime = new Date('2024-01-01T00:00:00.000Z').getTime();
            dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => {
                const current = mockTime;
                mockTime += 1000;
                return current;
            });

            const date1 = generateDate();
            const date2 = generateDate();
            const date3 = generateDate();

            expect(date1).toBe('2024-01-01T00:00:00.000Z');
            expect(date2).toBe('2024-01-01T00:00:01.000Z');
            expect(date3).toBe('2024-01-01T00:00:02.000Z');
        });
    });
});
