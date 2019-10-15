// Libraries
const { Client } = require("pg"); // https://www.npmjs.com/package/pg
                                  // additional node PostgreSQL docs - https://node-postgres.com/

class DB {

    constructor(config, log) { // input param should be config.db
        this.client = new Client(config);
        this.log = log;
    }

    async start() {
        this.client.connect();
        let res = await this.client.query("SELECT NOW()");
        this.log.out("Opened connection to the DB @ " + res.toString() + "[Success].");
    }

    async stop() { 
        let res = await this.client.query("SELECT NOW()");
        this.client.end();
        this.log.out("Closed connection to the DB @ " + res + "[Success].");
    }

    async query(str, params) { // string, [parameters[]]
        try {
            return this.client.query(str, params);
        } catch (err) {
            this.log.error(err);
            return err;
        }
    }

    async insert(table,colNames,values) { // string, array, array

    }

    async update() {}

    async upOrIn() {}

    async select() {}
}

module.exports = DB;