const { default: api } = require("./api")

export default class AuthServices{
    async register(data){
        return api.post("/api/v1/auth/register",data);
    }
    async login(data){
        return api.post("/api/v1/auth/login",data);
    }
}