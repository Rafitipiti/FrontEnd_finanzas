import http from '@/core/http-common'
class SignupService {
    endpoint = 'usuario';

    CreateUserEmail(user){
        return http.post(`${this.endpoint}/register`, user)
    }
}

export default new SignupService();