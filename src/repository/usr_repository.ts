import knexdb from '../db/knexfile';
import { XUser } from '../interfaces/usr';
import { CreatinUser } from '../interfaces/cretionousr'

class userRepository{
    knx: typeof knexdb;
    constructor(){
        this.knx = knexdb;
    }

    async create_user(user:CreatinUser):Promise<number>{
        return new Promise<number>(async(resolve, reject) =>{
            await this.knx.db("response_db")
            .insert(user)
            .select("id")
            .then((result:number[])=>{
                if(result){
                    resolve(result[0]);
                }
                else{
                    reject(new Error());
                }
            })
        .catch((e:Error)=>{
            console.log("Error spotted in user creation: " + e);
            reject(e);
        });
    });
    }

    async delete_user(id:number):Promise<number>{
        return new Promise<number>(async(resolve, reject) => {
            await this.knx.db("response_db")
            .where("id", id)
            .del()
            .select("id")
            .then((per:number)=>{
                if(per){
                    resolve(per);
                }
                else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("Error spotted in user deletion: " + e);
                reject(e);
            }
            )
        })
    }

    async update_user(Usr:XUser):Promise<number>{
        return new Promise<number>(async(resolve, reject)=> {
            await this.knx.db("response_db")
            .where("id", Usr.id)
            .update(Usr)
            .select("id")
            .then((per:number)=>{
                if(per){
                    resolve(per);
                }
                else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("Error spotted in user update: " + e);
                reject(e);
            })
        })
    }

    async get_evryUser(): Promise<XUser[]>{
        return new Promise<XUser[]>(async (resolve, reject)=>{
            await this.knx.db("response_db")
            .select("*")
            .then((Usrs:XUser[])=>{
                if(Usrs){
                    resolve(Usrs);
                }
                else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error spotted in get every user: " + e);
                reject(e);
            })
        })
    }

    async get_oneUser(emialUsr:string):Promise<XUser>{
        return new Promise<XUser>(async (resolve, reject)=>{
            await this.knx.db("response_db")
            .select("*")
            .where("email", emialUsr)
            .first()
            .then((user:XUser)=>{
                if(user){
                    resolve(user);
                }
                else{
                    reject(new Error());
                }
            })
            .catch((e:Error)=>{
                console.log("error spotted in get one user: " + e);
                reject(e);
            })
        })
    }

}

const usrRepository = new userRepository();
export default usrRepository;
