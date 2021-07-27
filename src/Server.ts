import dotenv from 'dotenv';

const check = dotenv.config();
if(check.error){
	throw check.error;
}

class ServerC{
	//Server port
	public PORT = 	process.env.PORT || 5432;

	public POSTGRES_URL = process.env.POSTGRES_URL || "";
  	public POOL_MIN = process.env.POSTGRES_POOL_MIN || 2;
  	public POOL_MAX = process.env.POSTGRES_POOL_MIN || 10;
}

const server = new ServerC();
export default server;
