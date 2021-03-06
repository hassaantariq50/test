"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const MONGO_OPTIONS = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     socketTimeoutMS: 30000,
//     keepAlive: true,
//     poolSize: 50,
//     autoIndex: false,
//     retryWrites: false
// };
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false
};
var SECRET_KEY = process.env.SECRET_KEY;
var AUTH = {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || "@zxcasdqwe@s123",
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || "aes-256-ctr",
    SECRET_KEY: process.env.SECRET_KEY || "@qweasd@zxc321$",
    STATIC_JWT: process.env.STATIC_JWT || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiOWVhZjU3YmRiNjAwMTA5NjEzNjYiLCJpYXQiOjE2MTQ4ODA0MTl9.D3EVqPxWoL3BN6sAqRmMGhbJj1oPDzpYHESUqpSeBHo",
    UNAUTHORIZE_JWT: process.env.UNAUTHORIZE_JWT || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWJiOWVhZjU3YmRiNjAwMTA5NjEzNjciLCJpYXQiOjE2MTQ4ODA3NDd9.xAHCJT-G5dmY4BObm-6kHdcxZq3xUjjMnkrW_iT0yFE",
    ID: process.env.ID || "5ebb9eaf57bdb60010961366",
    API_KEY: process.env.API_KEY || "1db98eda0fbacab7b868bc384634508e"
};
var MONGO_USERNAME = process.env.MONGO_USERNAME || 'localhost';
var DB_NAME = process.env.DB_NAME || "indego-db";

var MONGO = {
    // host: MONGO_HOST,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: "mongodb://" + MONGO_USERNAME + "/" + DB_NAME
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'https://hassaan-indego-test.herokuapp.com/';
// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.PORT || 4000;
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
