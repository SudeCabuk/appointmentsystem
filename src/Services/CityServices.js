import api from "./api"

export default class CityServices{
    async getAll(){
        return api.get("/api/v1/city/getAll");
    }
}