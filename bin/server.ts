import * as http from 'http';
import * as serverHandle from './serverHandle';
import app from '../app';
import logger from '../app/lib/logger';
import * as dotenv from "dotenv";

dotenv.config();

const port: string | number | boolean = serverHandle.normalizePort(process.env.PORT || 3000);

app.set('port', port);

logger.http(`Server listening on port ${port}`);

const server: http.Server = http.createServer(app);

server.listen(port);

server.on('error', (error) => serverHandle.onError(error, port))
server.on('listening', serverHandle.onListening.bind(server));
