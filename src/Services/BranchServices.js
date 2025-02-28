import api from "./api"

export default class BranchServices{
    async getAll(){
        return api.get("/api/v1/branch/getAll");
    }
}