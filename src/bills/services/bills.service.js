import http from '@/core/http-common'
class BillsService {
    endpoint = 'letra';

    getAllClients(){
        return http.get('cliente/all')
    }

    getAllTasas(){
        return http.get('tasa/all')
    }

    getAllEntidadesFinancieras(){
        return http.get('entidad_financiera/entidades')
    }

    createNewBills(createLetterDto){
        return http.post(`${this.endpoint}/register`, createLetterDto)
    }
}

export default new BillsService();