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

        const list_price_gold: any[] = JSON.parse(data).root.ratelist[0].city[0].item;

        const custom_list: any[] = list_price_gold.map((item: any) => { return item.$ });

        return custom_list;
    }
    static async getCoin(): Promise<any> {
        console.log("GetCoin");
        try {
            const response = await axios.get(process.env.URL_PRICE_COIN, {
                headers: {
                    'X-CMC_PRO_API_KEY': process.env.X_CMC_PRO_API_KEY,
                }
            });
            const list_price_coin: any[] = response.data.data;

            const custom_list: any[] = list_price_coin.map((item: any) => {
                return {
                    name: item.name,
                    percent_change_24h: item.quote.USD.percent_change_24h,
                    price: item.quote.USD.price
                }
            });

            return custom_list;
        } catch (ex) {
            console.error(ex);
            throw ex; // Re-throw the error to be caught by the caller
        }
    }
}