import Parser from 'rss-parser';
import fs from 'fs';
import xml2js from 'xml2js';
import rp from 'request-promise';
import * as dotenv from 'dotenv';

dotenv.config();

export default class Main_service {
    static async getGold(params: any = null, option: any = null): Promise<any> {
        console.log("GetGold");
        let parserXml = new xml2js.Parser();

        let reqOptions = {
            method: "GET",
            uri: process.env.URL_PRICE_GOLD,
            json: true,
            "rejectUnauthorized": false
        }

        let xml = await rp(reqOptions);
        let data: any;
        parserXml.parseString(xml, function (err: any, result: any) {
            data = JSON.stringify(result);
        });

        return JSON.parse(data);
    }
    static async getCoin(params: any = null, option: any = null): Promise<any> {
        console.log("GetCoin");

    }
}