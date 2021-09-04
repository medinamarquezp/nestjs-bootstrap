import { trimAll } from './trim-all.helper';
import { parseFloatAll } from './parse-float.helper';
import { isEmpty } from './is-empty.helper';

describe('Testing helpers', () => {
    describe('trimAll() helper', () => {
        it('trimAll() nested object', () => {
            const payload1 = {
                test1: '   test1    ',
                test2: 'test2   ',
                test3: { test3: ' test3  ' },
                test4: { test4: { test4: '     test4' } },
            };
            expect(trimAll(payload1)).toEqual({
                test1: 'test1',
                test2: 'test2',
                test3: { test3: 'test3' },
                test4: { test4: { test4: 'test4' } },
            });
        });
        it('trimAll() array', () => {
            const payload = ['   test1  ', '   test2', 'test3   '];
            expect(trimAll(payload)).toEqual(['test1', 'test2', 'test3']);
        });
    });

    describe('parseFloatAll() helper', () => {
        const payload = {
            test1: '1',
            test2: '2.2',
            test3: '3.33',
            test4: { test4: '4.444' },
            test5: { test5: { test5: '5.5555' } },
        };
        expect(parseFloatAll(payload)).toEqual({
            test1: 1,
            test2: 2.2,
            test3: 3.33,
            test4: { test4: 4.444 },
            test5: { test5: { test5: 5.556 } },
        });
    });

    describe('isEmpty() helper', () => {
        it('isEmpty() empty object', () => {
            expect(isEmpty({})).toBe(true);
        });
        it('isEmpty() empty array', () => {
            expect(isEmpty([])).toBe(true);
        });
        it('isEmpty() empty string', () => {
            expect(isEmpty('')).toBe(true);
        });
        it('isEmpty() null', () => {
            expect(isEmpty(null)).toBe(true);
        });
        it('isEmpty() undefined var', () => {
            let payload;
            expect(isEmpty(payload)).toBe(true);
        });
        it('isEmpty() not empty string', () => {
            expect(isEmpty('test')).toBe(false);
        });
        it('isEmpty() not empty object', () => {
            expect(isEmpty({ test: 'test' })).toBe(false);
        });
        it('isEmpty() not empty array', () => {
            expect(isEmpty(['test'])).toBe(false);
        });
    });
});
