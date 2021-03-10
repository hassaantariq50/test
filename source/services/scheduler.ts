/**
 * Helper function for scheduler
 */
import schedule from 'node-schedule';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Station from '../models/station';

//Hit every 1 hour
const scheduler = async () => {
    const rule = new schedule.RecurrenceRule();
    rule.minute = 1;
    schedule.scheduleJob(rule, function () {
        console.log('<<<....scheduling....>>>');
        fetch('https://www.rideindego.com/stations/json/')
            .then((res) => res.json())
            .catch(function (error) {
                console.log(error.message);
            })
            .then(function (response) {
                const station = new Station({
                    _id: new mongoose.Types.ObjectId(),
                    data: response
                });

                return station
                    .save()
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            });
    });
};

export default scheduler;
