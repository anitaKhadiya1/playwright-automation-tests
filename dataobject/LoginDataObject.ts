
export class Login {
   email: string
   password: string;

    constructor(option:{email:string; password: string}){
        this.email = option.email;
        this.password = option.password;
    }
}


