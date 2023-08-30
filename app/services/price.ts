import Parser from 'rss-parser';
import fs from 'fs';
import xml2js from 'xml2js';
import rp from 'request-promise';
import * as dotenv from 'dotenv';
import axios from 'axios';

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
    static async getCoin(): Promise<any> {
        console.log("GetCoin");
        try {
            const response = await axios.get(process.env.URL_PRICE_COIN, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY,
                },
            });

            return response.data;
        } catch (ex) {
            console.error(ex);
            throw ex; // Re-throw the error to be caught by the caller
        }
    }
}