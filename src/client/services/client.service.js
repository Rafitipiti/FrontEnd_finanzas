import http from '@/core/http-common'
class ClientService {
    endpoint = 'cliente/register';

    createClient(createClientDto){
        return http.post(this.endpoint, createClientDto)
    }
}

export default new ClientService();