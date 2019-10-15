// Libraries
const log = require("log4js") // https://github.com/log4js-node/log4js-node

class Log {

    constructor() {
        log.configure({
            appenders: {
                out: { type: "stdout" },
                dump: { type: "file", filename: "./Logs/dump.log" },
            },
            categories: {
                default: { appenders: ["out","dump"], level: "trace" }
            }
        }); // log4js config
        this.logger = log.getLogger(); // category default (lvl TRACE)
        this.logger.trace("__ NEW LOG __"); // w- tstamp

    } // end constructor

    // Methods
    trace(msg) { // String only
        this.logger.trace(msg + "\n");
    }
    out(msg) { // String only
        this.logger.info(msg + "\n");
    }

    warn(msg) {
        if (typeof msg === "object" && msg != null) {
            try {
                this.logger.warn(`Code ${msg.code} -- ${msg.out}.\n`);
                if(msg.hasOwnProperty("callback"))
                    msg.callback();
            } catch (err) {
                console.log(err.toString());
                throw err;
            }
        } else {
            this.logger.warn(msg);
        }
    }

    error(msg) {
        if(typeof msg === "object" && msg != null) {
            try {
                this.logger.warn(`Code ${msg.code} -- ${msg.out}.\n`);
                if (msg.hasOwnProperty("callback")) 
                    msg.callback();
            } catch (err) {
                console.log(err.toString());
                throw err;
            }
        } else {
            this.logger.error(msg);
        }
    }

}

module.exports = Log;

/**
 * Custom error Object:
 * err {
 *      [str] out
 *      [int] code {1 = Caught User Err,}
 *      [Function] callback // MUST BE VOID
 * }
 */