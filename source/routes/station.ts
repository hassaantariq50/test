/**
 * Station routes
 */

import express from 'express';
import verifyToken from '../services/verifyToken';
import config from '../config/config';
import fetch from 'node-fetch';
import { createStation, getWeatherAndStationData, getWeatherAndStationDataByKioskId } from '../controllers/station';

const router = express.Router();

router.post('/indego-data-fetch-and-store-it-db', verifyToken, async (req, res) => {
    console.log("calling request...>>");
    try {
        fetch('https://www.rideindego.com/stations/json/')
            .then((res) => res.json())
            .catch(function (error) {
                return error;
            })
            .then(async function (response) {
                let data = await createStation(response);
                if (data) {
                    return res.status(200).json({
                        status: 200,
                        data: data,
                        error: null
                    });
                }
            });
    } catch (err) {
        console.log('err >>', err);
        return res.status(400).json({
            status: 400,
            data: null,
            error: err
        });
    }
});

router.get('/stations/:at', verifyToken, async (req, res) => {
    try {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=' + config.auth.API_KEY)
            .then((res) => res.json())
            .catch(function (error) {
                return res.status(400).json({
                    status: 400,
                    data: null,
                    error: error.message
                });
            })
            .then(async function (response) {
                let data = await getWeatherAndStationData(req.params.at);
                let obj = {
                    at: req.params.at,
                    weather: response,
                    station: data
                };
                if (data) {
                    return res.status(200).json({
                        status: 200,
                        data: obj,
                        error: null
                    });
                }
            });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            data: null,
            error: err
        });
    }
});

router.get('/stations/:at/:kioskId', verifyToken, async (req, res) => {
    try {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=' + config.auth.API_KEY)
            .then((res) => res.json())
            .catch(function (error) {
                return res.status(400).json({
                    status: 400,
                    data: null,
                    error: error.message
                });
            })
            .then(async function (response) {
                let data = await getWeatherAndStationDataByKioskId(req.params.at, req.params.kioskId);
                let obj = {
                    at: req.params.at,
                    weather: response,
                    station: data
                };
                if (data) {
                    return res.status(200).json({
                        status: 200,
                        data: obj,
                        error: null
                    });
                }
            });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            data: null,
            error: err
        });
    }
});

export = router;
