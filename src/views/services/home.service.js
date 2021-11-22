import http from '@/core/http-common'
class HomeService {
    endpoint = 'letra/execute';

    getAll(){
        return http.get(this.endpoint);
    }

    getById(id){
        return http.get(`${this.endpoint}/${id}`)
    }
}

export default new HomeService();