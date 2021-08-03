import { XUser } from "../interfaces/usr";
import usrRepository from "../repository/usr_repository";
import { CreatinUser } from "../interfaces/cretionousr";


class UserService{
    public async creation(Usr:CreatinUser): Promise<number>{
        return new Promise<number>(async (resolve, reject)=>{
            await usrRepository.create_user(Usr)
            .then((fin:number)=>{
                resolve(fin);
            })
            .catch((e:Error)=>{
                console.log("error spotted in User service creation: " + e);
                reject(e);
            })
        })
    }

    public async deletion(id: number): Promise<number>{
        return new Promise<number>(async (resolve, reject)=>{
            await usrRepository.delete_user(id)
            .then((fin:number)=>{
                resolve(fin);
            })
            .catch((e:Error)=>{
                console.log("error spotted in User service deletion: " + e);
                reject(e);
            })
        })
    }

    public async update(Usr:XUser):Promise<number>{
        return new Promise<number>(async (resolve, reject)=>{
            await usrRepository.update_user(Usr)
            .then ((fin:number)=>{
                resolve(fin);
            })
            .catch((e:Error)=>{
                console.log("error spotted in User service update: " + e);
                reject(e);
            })
        })
    }

    public async get_Everyusr(): Promise<XUser[]>{
        
        return new Promise<XUser[]>( async (resolve, reject)=>{
            await usrRepository.get_evryUser()
            .then((Usr:XUser[])=>{
                resolve(Usr);
            })
            .catch((e:Error)=>{
                console.log("error spotted in User service Every User: " + e);
                reject(e);
            })
        })
    }

    public async get_OneUsr(email: string): Promise<XUser>{
        return new Promise<XUser>(async (resolve, reject)=>{
            await usrRepository.get_oneUser(email)
            .then((user:XUser)=>{
                resolve(user);
            })
            .catch((e:Error)=>{
                console.log("error spotted in User Service one user: " + e);
                reject(e);
            })
        })
    }

}

const usrService = new UserService();
export default usrService;