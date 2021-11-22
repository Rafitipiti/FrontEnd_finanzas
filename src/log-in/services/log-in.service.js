import http from '@/core/http-common'
class LoginService {
    endpoint = 'usuario';

    FindByEmail(email){
        return http.get(`${this.endpoint}/${email}`)
    }
}

export default new LoginService();