// // export {};
import chai from 'chai';
import chaifs from 'chai-fs';
import { expect } from 'chai';
const verifyToken = require('../services/verifyToken.ts');
const controller = require('../controllers/station.ts');
// const { createStation } = require('../controllers/station.ts');
// // import sinon from 'sinon';
// console.log("here");
describe('station insertion unit test case', async () => {
    it('should insert object from station controller', function (done) {
        let Obj = {
            data: 'abcd'
        };
        // done();
        controller
            .createStation(Obj)
            .then((res: any) => {
                console.log('hello', res);
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.equal(Obj);
                expect(res).to.be.an('object');
                done();
            })
            .catch((error: any) => {
                // never called
            });
    });
    it('should return error from station controller for createStation', function (done) {
        let Obj = null;
        done();
        controller
            .createStation(Obj)
            .then((res: any) => {
                // never called
            })
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
                done();
            });
    });
    it('should return data from station controller for a specific time', function (done) {
        let at = '2021-03-05 10:11:39.776Z';
        done();
        controller
            .getWeatherAndStationData(at)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                // expect(res).to.be.equal(Obj);
                expect(res).to.be.an('object');
            })
            .catch((error: any) => {
                // never called
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
                done();
            });
    });
});
