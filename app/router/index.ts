import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import ItemRouter from './item';
import NewsRouter from './news';

export default class IndexRouter {
    static init(server: IServer) {
        server.app.use('/api/v1/items', new ItemRouter().router);
        server.app.use('/api/v1/news', new NewsRouter().router);
    }
}