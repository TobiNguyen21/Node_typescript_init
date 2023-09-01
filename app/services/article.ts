import fs from 'fs';
import { VnExpressRss } from '../utils/vnEpressRss';
import * as dotenv from 'dotenv';
dotenv.config();

export default class Main_service {
    static async listItems(params: any, option: any = {}): Promise<any> {
        let id: string = params.id;
        let slug_rss: string = id.split('_')[0] + '.rss';

        let linkToFile: string = `app/__data/${slug_rss}.json`

        try {
            let data: Buffer = fs.readFileSync(linkToFile);
            data = await VnExpressRss.init(JSON.parse(data.toString()), undefined);
            let result = data.find((item: any) => item.id == id);
            return result;
        } catch (error) {
            return false;
        }
    }
}