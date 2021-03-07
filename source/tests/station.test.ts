import chai from 'chai';
import chaifs from 'chai-fs';
import { expect } from 'chai';
import sinon from 'sinon';
import { createStation, getWeatherAndStationData, getWeatherAndStationDataByKioskId } from '../controllers/station';
import mongoose from 'mongoose';
import Station from '../models/station';
import { resolveModuleName } from 'typescript';

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

