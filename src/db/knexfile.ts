import Knex from 'knex';

class KnexDb {
    db!: Knex;
    private initialized!:boolean;
    private knexConfig: Knex.Config;

    constructor(){ 
      this.knexConfig = {};
    }

    init(): Promise<boolean>{
        return new Promise((resolve, reject) => {
            
            this.knexConfig = {
              client: "pg",
              connection: process.env.POSTGRES_URL,
              pool:{
                min:1,
                max:3
              }
            };
            this.db = Knex(this.knexConfig);
            const resultx = this.db.raw("select 1=1");

            this.initialized = true;
            resolve(true);
        }
        )
    }
  };

  const knx = new KnexDb;
  export default knx;
  