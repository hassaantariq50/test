import chai from 'chai';
import chaifs from 'chai-fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { createStation, getWeatherAndStationData, getWeatherAndStationDataByKioskId } from '../controllers/station';
import verifyToken from '../services/verifyToken';
import Station from '../models/station';

chai.use(require('chai-fs'));
chai.use(chaifs);

describe('station insertion unit test case', async () => {
    it('should return error from station save', function (done) {
            let error = true;
            let obj = {};
            const isSaveMethodCalled = sinon
            .stub(Station.prototype, "save")
            .yields(error, null);
            createStation(obj)
            .then((res) => {
                // never called
            })
            .catch((error) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
                expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            });
    });
    it('should return station object from station save', function (done) {
        let error = false;
            let newObj = {
                data : {
                    feature: [],
                    type: 'string'
                },
                createdAt : "2021-03-06 21:00:06.685Z",
                updatedAt : "2021-03-06 21:00:06.685Z"
            };
            const isSaveMethodCalled = sinon
            .stub(Station.prototype, "save")
            .yields(error, newObj);
            createStation(newObj)
            .then((res) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(newObj.createdAt).to.be.an("string");
                expect(newObj.data).to.be.equals(newObj.data)
                expect(newObj.updatedAt).to.be.an("string")
                expect(isSaveMethodCalled.calledOnce).to.be.equal(true);
                isSaveMethodCalled.restore();
                done();
            })
            .catch((error) => {
                // never called
            });
        });
});

describe('Issue jwt token by user id unit test case', async () => {
  it('should return success from verify jwt token check', async function (done) {
    let token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiOWVhZjU3YmRiNjAwMTA5NjEzNjYiLCJpYXQiOjE2MTQ4ODA0MTl9.D3EVqPxWoL3BN6sAqRmMGhbJj1oPDzpYHESUqpSeBHo';
    let result:any = verifyToken(token);
    if(result.status == 200){
        expect(result).to.be.not.equal(undefined);
        expect(result).to.be.not.equal(null);
        expect(result.data._id).to.be.an('string');
        done();
    }
    else{
        // never called
    }
  });

  it('should return unauthrorized from verify jwt token check failed unit', async function (done) {
    let token:string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiOWVhZjU3YmRiNjAwMTA5NjEzNjciLCJpYXQiOjE2MTQ4ODA3NDd9.xAHCJT-G5dmY4BObm-6kHdcxZq3xUjjMnkrW_iT0yFE';
    let result:any = verifyToken(token);
    if(result.status == 200){
        // never called
    }
    else{
        expect(result).to.be.not.equal(undefined);
        expect(result).to.be.not.equal(null);
        expect(result.data).to.be.equal(null);
        expect(result.status).to.be.equal(401);
        expect(result.error).to.be.equal("Unauthorized");
        done();
    }
  });

  it('should return bad request from verify jwt token check failed unit', async function (done) {
    let token:string = '';
    let result:any = verifyToken(token);
    if(result.status == 200){
        // never called
    }
    else{
        expect(result).to.be.not.equal(undefined);
        expect(result).to.be.not.equal(null);
        expect(result.data).to.be.equal(null);
        expect(result.status).to.be.equal(400);
        expect(result.error).to.be.equal("Bad Request");
        done();
    }
  });
});

describe('station get unit test case by date', async () => {
    it('should return error on getting station from database', async function (done) {
        let at = "2021-03-06 21:00:06.685Z";
        getWeatherAndStationData(at)
            .then((res: any) => {
                // never called
            })
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
            });
            done();
    });
    it('should return station object on getting station from database', async function (done) {
            let at = "2021-03-06 21:00:06.685Z";
            getWeatherAndStationData(at)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(res.Obj).to.be.an('object');
            })
            .catch((error: any) => {
                // never called
            });
            done();     
        });
});

describe('station get unit test case by date and Kiosk Id', async () => {
    it('should return error on getting station from database', function (done) {
        let at = "2021-03-06 21:00:06.685Z";
        let id = "6043ed5623dab91c48889090";
        getWeatherAndStationDataByKioskId(at, id)
            .then((res: any) => {
                // never called
            })
            .catch((error: any) => {
                expect(error).to.be.not.equal(undefined);
                expect(error).to.be.equal(true);
            });
            done();
    });
    it('should return station object on getting station from database', function (done) {
        let at = "2021-03-06 21:00:06.685Z";
        let id = "6043ed5623dab91c48889090";
        getWeatherAndStationDataByKioskId(at, id)
            .then((res: any) => {
                expect(res).to.be.not.equal(undefined);
                expect(res).to.be.not.equal(null);
                expect(res.Obj).to.be.an('object');
            })
            .catch((error: any) => {
                // never called
            });
            done();
        });
});
