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
const createStation = async (object: object) => {
    try {
        const station = new Station({
            _id: new mongoose.Types.ObjectId(),
            data: object
        });
        await station.save();
        return station;
    } catch (error) {
        return error;
    }
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
    // fetch(link + config.auth.API_KEY)
    //     .then((res) => res.json())
    //     .catch(function (error) {
    //         return error;
    //     })
    //     .then(function (response) {
    //         Station.findOne({ $or: [{ createdAt: at }, { createdAt: { $gt: at } }] })
    //             .exec()
    //             .then((stations) => {
    //                 let obj = {
    //                     at: at,
    //                     stations: stations,
    //                     weather: response
    //                 };
    //                 return obj ;
    //             })
    //             .catch((error) => {
    //                 return error;
    //             });
    //     });
};

/**
 * getWeatherAndStationDataByKioskId - Get weather and station data by its kioski id.
 * @param at - string that needs to be compared
 * @returns {Promise}
 */
const getWeatherAndStationDataByKioskId = async (at: String, id: any) => {
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
            return { error: 'Cannot find data' };
        }
        // fetch('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=' + config.auth.API_KEY)
        //     .then((res) => res.json())
        //     .catch(function (error) {
        //         return res.status(400).json({
        //             status: 400,
        //             data: null,
        //             error: error.message
        //         });
        //     })
        //     .then(function (response) {
        //         Station.findOne({ $or: [{ createdAt: req.params.at }, { createdAt: { $gt: req.params.at } }] })
        //             .exec()
        //             .then((stations) => {
        //                 let obj = {};
        // let check = 0;
        // for (let i = 0; i < stations?.data.features.length; i++) {
        //     if (stations?.data.features[i].properties.kioskId == req.params.kioskId) {
        //         obj = {
        //             at: req.params.at,
        //             station: stations?.data.features[i],
        //             weather: response
        //         };
        //         check = 1;
        //         break;
        //     }
        // }
        // if (check == 1) {
        //     return res.status(200).json({
        //         obj: obj
        //     });
        // } else {
        //     return res.status(404).json({
        //         message: null,
        //         error: 'Cannot find data'
        //     });
        // }
        //             })
        //             .catch((error) => {
        //                 return res.status(500).json({
        //                     message: null,
        //                     error: error.message
        //                 });
        //             });
        //     })
        //     .catch((error) => {
        //         return res.status(500).json({
        //             message: null,
        //             error: error.message
        //         });
        //     });
    } catch (err) {
        return err;
    }
};

export { createStation, getWeatherAndStationData, getWeatherAndStationDataByKioskId };
