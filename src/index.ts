import server from "./Server";
import express from "express";
import Knexdata from './db/knexfile'; //Database
import usrController from "./controllers/user_cntrl"; // Controller

class Strtind{
	Prog: express.Application;
	ProgRouter: express.Router;
	port: string | number;

	listen() {
        this.Prog.listen(this.port, () => {
            console.log("listening on port: " + this.port);
        });
    }

	constructor(){
		this.Prog = express();
		this.port = server.PORT;
		this.ProgRouter = express.Router();
		this.Prog.listen();
		this.cont();
	}

	cont(){
		try{
			Knexdata.init();
		}catch(error){
			console.log("Error for database in index");
			process.exit(1);
		}

		this.Prog.use(express.json());
		this.Prog.use(express.urlencoded({ extended: true}));

		this.Routers();

	}

	Routers(){
		this.Prog.use('/user', usrController.router);
	}

	
}

const prgram = new Strtind();
export default prgram;