import http from '@/core/http-common'

class PagoLetraService {
    endpoint = 'pago_de_letra'
    getAllLetras(){
        return http.get('letra/all');
    }

    getAllEntidadesFinancieras(){
        return http.get('entidad_financiera/entidades')
    }

    createNewPagoLetra(pagoLetraDto){
        return http.post(`${this.endpoint}/register`, pagoLetraDto)
    }
}

export default new PagoLetraService();