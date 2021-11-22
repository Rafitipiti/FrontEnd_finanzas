import http from '@/core/http-common'
class TasaService {
    endpoint = 'tasa/register';

    createTasa(createTasaDto){
        return http.post(this.endpoint, createTasaDto)
    }
}

export default new TasaService();