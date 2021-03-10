"use strict";
/**
 * Station routes
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var verifyToken_1 = __importDefault(require("../services/verifyToken"));
var config_1 = __importDefault(require("../config/config"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var station_1 = require("../controllers/station");
var router = express_1.default.Router();
router.post('/indego-data-fetch-and-store-it-db', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verified;
    return __generator(this, function (_a) {
        console.log('calling request...>>');
        try {
            verified = verifyToken_1.default(req.headers.authorization);
            if (verified.status == 200) {
                node_fetch_1.default('https://www.rideindego.com/stations/json/')
                    .then(function (res) { return res.json(); })
                    .catch(function (error) {
                    return error;
                })
                    .then(function (response) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, station_1.createStation(response)];
                                case 1:
                                    data = _a.sent();
                                    if (data) {
                                        return [2 /*return*/, res.status(200).json({
                                                status: 200,
                                                data: data,
                                                error: null
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(500).json({
                                                status: 500,
                                                data: null,
                                                error: 'Something went wrong'
                                            })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                return [2 /*return*/, res.status(verified.status).json(verified)];
            }
        }
        catch (err) {
            console.log('err >>', err);
            return [2 /*return*/, res.status(400).json({
                    status: 400,
                    data: null,
                    error: err
                })];
        }
        return [2 /*return*/];
    });
}); });
router.get('/stations/:at', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verified;
    return __generator(this, function (_a) {
        try {
            verified = verifyToken_1.default(req.headers.authorization);
            if (verified.status == 200) {
                node_fetch_1.default('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=' + config_1.default.auth.API_KEY)
                    .then(function (res) { return res.json(); })
                    .catch(function (error) {
                    return res.status(400).json({
                        status: 400,
                        data: null,
                        error: error.message
                    });
                })
                    .then(function (response) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data, obj;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, station_1.getWeatherAndStationData(req.params.at)];
                                case 1:
                                    data = _a.sent();
                                    obj = {
                                        at: req.params.at,
                                        weather: response,
                                        station: data
                                    };
                                    if (data) {
                                        return [2 /*return*/, res.status(200).json({
                                                status: 200,
                                                data: obj,
                                                error: null
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(404).json({
                                                status: 404,
                                                data: null,
                                                error: 'Could not find any station at the given time'
                                            })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                return [2 /*return*/, res.status(verified.status).json(verified)];
            }
        }
        catch (err) {
            return [2 /*return*/, res.status(400).json({
                    status: 400,
                    data: null,
                    error: err
                })];
        }
        return [2 /*return*/];
    });
}); });
router.get('/stations/:kioskId/:at/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verified;
    return __generator(this, function (_a) {
        try {
            verified = verifyToken_1.default(req.headers.authorization);
            if (verified.status == 200) {
                node_fetch_1.default('https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=' + config_1.default.auth.API_KEY)
                    .then(function (res) { return res.json(); })
                    .catch(function (error) {
                    return res.status(400).json({
                        status: 400,
                        data: null,
                        error: error.message
                    });
                })
                    .then(function (response) {
                    return __awaiter(this, void 0, void 0, function () {
                        var data, obj;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, station_1.getWeatherAndStationDataByKioskId(req.params.kioskId, req.params.at)];
                                case 1:
                                    data = _a.sent();
                                    obj = {
                                        at: req.params.at,
                                        weather: response,
                                        station: data
                                    };
                                    if (data) {
                                        return [2 /*return*/, res.status(200).json({
                                                status: 200,
                                                data: obj,
                                                error: null
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(404).json({
                                                status: 404,
                                                data: null,
                                                error: 'Could not find any station at the give time with the given KioskId'
                                            })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            else {
                return [2 /*return*/, res.status(verified.status).json(verified)];
            }
        }
        catch (err) {
            return [2 /*return*/, res.status(400).json({
                    status: 400,
                    data: null,
                    error: err
                })];
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
