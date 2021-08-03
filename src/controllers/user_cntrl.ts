import express from 'express';
import usrService from '../services/usr_service';
import UserSchema from '../validation/user_validation';
import Joi, { string, ValidationError } from 'joi';
import { XUser } from '../interfaces/usr';
import { CreatinUser } from '../interfaces/cretionousr';

class UserController {

    public router: express.Router;

    constructor(){
        this.router = express.Router();
        this.Routersbased();
    }

    getAll_Users(req: express.Request, res: express.Response, next: express.NextFunction){
        usrService.get_Everyusr().then(result=>{
            console.log("GEU/Succesfull!");
            result.forEach(element => {
                console.log("name: " + element.name + " /// email: " + element.email + " /// id: " + element.id);
            });
            res.status(200).send(result);      
        }).catch((err)=>{
            console.log("Error in Get Every User: " + err);
            next(err);
        })
    }

    GetSingle_User(req: express.Request, res: express.Response, next: express.NextFunction){
        const email = req.body;

        UserSchema.getOne.validateAsync(email).then((result:string)=>{
            usrService.get_OneUsr(result).then(result=>{
                res.status(200).send(result);
            }).catch((err)=>{
                next(err);
            })
        }).catch((err:Joi.ValidationError)=>{
            console.log("Error in Get Single User: " + err);
            next(err);
        })
    }

    Create_User(req: express.Request, res: express.Response, next: express.NextFunction){
        const { user } = req.body;

        UserSchema.create.validateAsync(user).then((result:CreatinUser)=>{
            usrService.creation(result).then((result)=>{
                console.log("Creating User: " + user.toString());
                res.status(201).send(result.toString());
            })
            .catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("Error in User Creation: " + err);
            next(err);
        })
    }

    Update_User(req: express.Request, res: express.Response, next: express.NextFunction){
        const { Nwuser } = req.body;

        UserSchema.update.validateAsync(Nwuser).then((result:XUser)=>{
            usrService.update(result).then((result)=>{
                console.log("Updating User: " + Nwuser.toString());
                res.status(200).send(result.toString());
            }).catch((err)=>{
                next(err);
            })
        }).catch((err: Joi.ValidationError)=>{
            console.log("Error in User Update: " + err);
            next(err);
        })
    }

    Delete_User(req: express.Request, res: express.Response, next: express.NextFunction){
        const Usrid = req.body;

        if(isNaN(Usrid)){
            return res.status(400).send("Invalid Parameter");
        }

        UserSchema.delete.validateAsync(Usrid).then((result:number)=>{
            usrService.deletion(Number(Usrid)).then((result)=>{
                console.log("Deleting user: " + Usrid.toString());
                res.status(200).send("User " + Usrid.toString() + " has been deleted");
            }).catch((err)=>{
                next(err);
            })
        }).catch((err:ValidationError)=>{
            console.log("Error in user deletion: " + err);
            next(err);
        })
    }

    private Routersbased() {
    this.router.get('/all', this.getAll_Users.bind(this));
    this.router.post('/add', this.Create_User.bind(this));
    this.router.put('/update', this.Update_User.bind(this));
    this.router.delete('/delete/:id', this.Delete_User.bind(this));
    this.router.get('/one', this.GetSingle_User.bind(this));
    }
}

const usrController = new UserController();
export default usrController;