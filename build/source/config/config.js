"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false
};
var AUTH = {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    STATIC_JWT: process.env.STATIC_JWT || '',
    UNAUTHORIZE_JWT: process.env.UNAUTHORIZE_JWT || '',
    ID: process.env.ID || '',
    API_KEY: process.env.API_KEY || ''
};
var MONGO_USERNAME = process.env.MONGO_USERNAME;
var MONGO_URL = process.env.DB || '';
var MONGO = {
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: MONGO_URL
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';
// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.PORT || '';
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    mongo: MONGO,
    server: SERVER,
    auth: AUTH,
    dbtesturl: process.env.MONGO_ATLAS
};
exports.default = config;
