/**
 * station controllers
 */

import mongoose from 'mongoose';
import Station from '../models/station';

/**
 * createStation - insert station in database.
 * @param object - object that needs to be saved
 * @returns {Promise<void>}
 */
const createStation = async (object: any) => {
    return new Promise((resolve, reject) => {
        let temp = new Station({
            _id: new mongoose.Types.ObjectId(),
            data: object
        });
        temp.save((err, station) => {
            if (err) {
                reject(err);
            } else {
                resolve(station);
            }
        });
    });
};

/**
 * getWeatherAndStationData - Get weather and station data from API.
 * @param at - string that needs to be compared
 * @returns {Promise}
 */
const getWeatherAndStationData = async (at: String) => {
    try {
        let station = await Station.findOne({ $or: [{ createdAt: at }, { createdAt: { $gt: at } }] });
        return station;
    } catch (error) {
        return error;
    }
};

/**
 * getWeatherAndStationDataByKioskId - Get weather and station data by its kioski id.
 * @param at - string that needs to be compared
 * @returns {Promise}
 */
const getWeatherAndStationDataByKioskId = async (id: any, at: String) => {
    try {
        let stations = await Station.findOne({ $or: [{ createdAt: at }, { createdAt: { $gt: at } }] });
        let check: Number = 0;
        let specficStation: object = {};
        for (let i = 0; i < stations?.data.features.length; i++) {
            if (stations?.data.features[i].properties.kioskId == id) {
                specficStation = stations?.data.features[i];
                check = 1;
                break;
            }
        }
        if (check === 1) {
            return specficStation;
        } else {
            return {
                error: 'Cannot find station at this time',
                status: 404
            };
        }
    } catch (err) {
        return err;
    }
};

export { createStation, getWeatherAndStationData, getWeatherAndStationDataByKioskId };
