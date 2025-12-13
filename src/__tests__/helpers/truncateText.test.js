import { truncateText } from '../../helpers/truncateText';

describe('truncateText', () => {
    describe('instance', () => {
        test('should be defined as a function', () => {
            expect(truncateText).toBeInstanceOf(Function);
        });
    });

    describe('validation', () => {
        test('should return string when it received string', () => {
            const result = truncateText('Hello world');
            expect(typeof result).toBe('string');
        });
    });

    describe('corner cases', () => {
        test('should return empty string when it received empty string', () => {
            const result = truncateText('', 10);
            expect(result).toBe('');
        });

        test('should handle text exactly at maxLength', () => {
            const text = '12345';
            const result = truncateText(text, 5);
            expect(result).toBe('12345');
        });

        test('should handle maxLength of 0', () => {
            const result = truncateText('Hello', 0);
            expect(result).toBe('...');
        });

        test('should handle maxLength of 1', () => {
            const result = truncateText('Hello', 1);
            expect(result).toBe('H...');
        });
    });

    describe('main stream', () => {
        test('should handle different maxLength values', () => {
            const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            
            expect(truncateText(text, 2)).toBe('AB...');
            expect(truncateText(text, 7)).toBe('ABCDEFG...');
            expect(truncateText(text, 11)).toBe('ABCDEFGHIJK...');
            expect(truncateText(text, 16)).toBe('ABCDEFGHIJKLMNOP...');
            expect(truncateText(text, 25)).toBe('ABCDEFGHIJKLMNOPQRSTUVWXY...');
            expect(truncateText(text, 26)).toBe(text);
            expect(truncateText(text, 30)).toBe(text);
        });

        test('should handle text with special characters', () => {
            const text = 'Hello! @#$%^&*() World?';
            const result = truncateText(text, 8);
            expect(result).toBe('Hello! @...');
        });

        test('should handle unicode characters', () => {
            const text = 'HELLO WORLD! 🌍 Hello world!';
            const result = truncateText(text, 15);
            expect(result).toBe('HELLO WORLD! 🌍...');
        });

        test('should handle emoji correctly', () => {
            const text = 'Hello 😀 World!!!';
            const result = truncateText(text, 14);
            expect(result).toBe('Hello 😀 World...');
        });

        test('should handle very long text', () => {
            const text = 'A'.repeat(1000);
            const result = truncateText(text, 100);
            expect(result).toBe('A'.repeat(100) + '...');
        });

        test('should handle text with newlines', () => {
            const text = 'Line 1\nLine 2\nLine 3';
            const result = truncateText(text, 8);
            expect(result).toBe('Line 1\nL...');
        });

        test('should handle text with tabs', () => {
            const text = 'Column1\tColumn2\tColumn3';
            const result = truncateText(text, 14);
            expect(result).toBe('Column1\tColumn...');
        });
    });
});
