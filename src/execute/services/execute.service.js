import http from '@/core/http-common'

class ExecuteService {
    endpoint = 'letra';

    getAll(){
        return http.get(`${this.endpoint}/all`);
    }

    executeId(id){
        http.get(`${this.endpoint}/execute/${id}`)
    }
}

export default new ExecuteService();