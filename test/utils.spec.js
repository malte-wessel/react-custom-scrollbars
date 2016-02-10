import returnFalse from '../src/utils/returnFalse';
describe('utils', () => {
    describe('returnFalse', () => {
        it('should return false', done => {
            expect(returnFalse()).toEqual(false);
            done();
        });
    });
});
