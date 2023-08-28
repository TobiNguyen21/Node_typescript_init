import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import ItemRouter from './item';

export default class IndexRouter {
    static init(server: IServer) {
        //const router: express.Router = express.Router();

        server.app.use('/api/v1/items', new ItemRouter().router);
    }
}