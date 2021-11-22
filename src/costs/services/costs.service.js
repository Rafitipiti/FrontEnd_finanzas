import http from '@/core/http-common'
class CostsService {
    endpoint = 'costes';

    getAllLetras(){
        return http.get('letra/all');
    }

    createNewCosts(createCostDto){
        return http.post(`${this.endpoint}/register`, createCostDto)
    }
}

export default new CostsService();