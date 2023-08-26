import express from 'express';
import Middleware from './app/configs/middleware';
import MongoDb from './app/configs/database';

const mongodb = new MongoDb();
(async () => {
    await mongodb.connect();
})();

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        Middleware.init(this);
    }
}

export default new App().app;