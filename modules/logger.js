import chalk from 'chalk';
import moment from 'moment';
import fs from 'fs';
import path from 'path';

class Logger {

    constructor() {
        this.TYPE = {
            Log: 0,
            Info: 1,
            Success: 2,
            Error: 3
        }
    }

    $(content, type) {
        const timestamp = moment().format("YYYY/MM/DD HH:mm:ss");
        switch(type) {
            case this.TYPE.Log:
                console.log(`<${timestamp}> || ${chalk.bgBlue.black(` ${content} `)}`)
                break;
            case this.TYPE.Info:
                console.log(`<${timestamp}> || ${chalk.bgYellow.black(` ${content} `)}`)
                break;
            case this.TYPE.Success:
                console.log(`<${timestamp}> || ${chalk.bgGreen.black(` ${content} `)}`)
                break;
            case this.TYPE.Error:
                console.log(`<${timestamp}> || ${chalk.bgRed.black(` ${content} `)}`)
                break;
        }
        fs.appendFile(path.join(__dirname, `../logs/${timestamp.replace(/\//g, "-").slice(0, 13)}.log`), `<${timestamp}> || ${content} \n`, err => {
            if(err) throw err;
        });
    }

    log(content) {
        this.$(content, this.TYPE.Log);
    }

    info(content) {
        this.$(content, this.TYPE.Info);
    }

    success(content) {
        this.$(content, this.TYPE.Sucess);
    }

    error(content) {
        this.$(content, this.TYPE.Error);
    }

}

export default Logger;