import dotenv from 'dotenv';
dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    poolSize: 50,
    autoIndex: false
};

const AUTH = {
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || '',
    ENCRYPTION_ALGORITHM: process.env.ENCRYPTION_ALGORITHM || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    STATIC_JWT: process.env.STATIC_JWT || '',
    UNAUTHORIZE_JWT: process.env.UNAUTHORIZE_JWT || '',
    ID: process.env.ID || '',
    API_KEY: process.env.API_KEY || ''
};

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_URL = process.env.DB || '';

const MONGO = {
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    url: MONGO_URL
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || '';
// const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.PORT || '';

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mongo: MONGO,
    server: SERVER,
    auth: AUTH,
    dbtesturl: process.env.MONGO_ATLAS
};

export default config;
