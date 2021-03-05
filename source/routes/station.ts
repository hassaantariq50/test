/**
 * Station routes
 */

import express from 'express';
import controller from '../controllers/station';
import verifyToken from '../services/verifyToken';
import config from '../config/config';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/indego-data-fetch-and-store-it-db', verifyToken, async (req, res) => {
    try{
        fetch('https://www.rideindego.com/stations/json/')
        .then((res) => res.json())
        .catch(function (error) {
            return error
        })
        .then(async function (response) {
            let data = await controller.createStation(response);
            if(data){
                return res.status(200).json({
                status: 200,
                data: data,
                error: null,
                });
            }
        });
    }
    catch(err){
        return res.status(400).json({
            status: 400,
            data: null,
            error: err,
            });
    }
});


router.get('/stations/:at', verifyToken, async (req, res) => {
    try{
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid='+ config.auth.API_KEY)
        .then((res) => res.json())
        .catch(function (error) {
            return res.status(400).json({
            status: 400,
            data: null,
            error: error.message,
            });
        })
        .then(async function (response) {
            let data = await controller.getWeatherAndStationData(req.params.at);
            let obj = {
                at: req.params.at,
                weather : response,
                station : data
            }
            if(data){
                return res.status(200).json({
                status: 200,
                data: obj,
                error: null,
                });
            }
        });
    }
    catch(err){
        return res.status(400).json({
            status: 400,
            data: null,
            error: err,
            });
    }
});


router.get('/stations/:at/:kioskId', verifyToken, async (req, res) => {
    try{
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid='+ config.auth.API_KEY)
        .then((res) => res.json())
        .catch(function (error) {
            return res.status(400).json({
            status: 400,
            data: null,
            error: error.message,
            });
        })
        .then(async function (response) {
            let data = await controller.getWeatherAndStationDataByKioskId(req.params.at, req.params.kioskId);
            let obj = {
                at: req.params.at,
                weather : response,
                station : data
            }
            if(data){
                return res.status(200).json({
                status: 200,
                data: obj,
                error: null,
                });
            }
        });
    }
    catch(err){
        return res.status(400).json({
            status: 400,
            data: null,
            error: err,
            });
        }
    });

export = router;
