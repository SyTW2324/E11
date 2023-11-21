import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const appendFile = promisify(fs.appendFile);
const exists = promisify(fs.exists);

const logEvents = async (message: string, logName: string) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!await exists(path.join(__dirname, '..', 'logs'))) {
            await mkdir(path.join(__dirname, '..', 'logs'));
        }

        await appendFile(path.join(__dirname, '..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req: any, res: any, next: any) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export { logger, logEvents };