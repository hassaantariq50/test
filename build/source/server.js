"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var station_1 = __importDefault(require("./routes/station"));
var scheduler_1 = __importDefault(require("./services/scheduler"));
var mongoose_1 = __importDefault(require("mongoose"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swaggerDocument = __importStar(require("../swagger.json"));
var cors_1 = __importDefault(require("cors"));
// let cors = require('cors');
// import dotenv from 'dotenv';
// dotenv.config();
scheduler_1.default();
var NAMESPACE = 'Server';
var router = express_1.default();

var MONGO_ATLAS = "mongodb+srv://dbHassaan:dbHassaan@hassaan-indego-db.fcdob.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
/** Connect to Mongo */
mongoose_1.default
    .connect(MONGO_ATLAS, config_1.default.mongo.options)
    .then(function (result) {
    logging_1.default.info(NAMESPACE, 'Mongo Connected');
})
    .catch(function (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/** Parse the body of the request */
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(bodyParser.json());
router.use(body_parser_1.default.json({ limit: '900mb' }));
router.use(body_parser_1.default.urlencoded({ extended: true }));
/* FOR CORS */
router.use(cors_1.default());
/** Log the request */
router.use(function (req, res, next) {
    /** Log the req */
    logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        /** Log the res */
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
    });
    next();
});
router.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
/** Rules of our API */
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use('/api/v1/', station_1.default);
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error('Not found');
    res.status(404).json({
        message: error.message
    });
});
router.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server is running " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
