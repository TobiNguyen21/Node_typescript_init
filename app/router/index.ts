import * as express from 'express';
import { IServer } from '../interfaces/serverInterface';
import CategoryRouter from './category';
import NewsRouter from './news';
import PriceRouter from './price';

export default class IndexRouter {
    static init(server: IServer) {
        // Category
        server.app.use('/api/v1/category', new CategoryRouter().router);

        // news
        server.app.use('/api/v1/news', new NewsRouter().router);

        // price gold and coin
        server.app.use('/api/v1/price', new PriceRouter().router);
    }
}