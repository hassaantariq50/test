import chai from 'chai';
import controller from '../controllers/station';
chai.use(require('chai-fs'));
const expect = require('chai').expect;

describe('station insertion unit test case', async () => {
    it('should return error from user station', function (done) {
        let obj = {};
        controller
            .createStation(obj)
            .then((res: any) => {})
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
                done();
            });
    });
    it('should return user from station save', function (done) {
        let obj = {};
        controller
            .createStation(obj)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(res.obj).to.be.an(obj);
                done();
            })
            .catch((error: any) => {});
    });
});
