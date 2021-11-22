import http from '@/core/http-common'
class FinancialEntityervice {
    endpoint = 'entidad_financiera/register';

    createNewFinancialEntity(createFinancialEntityDto){
        return http.post(this.endpoint, createFinancialEntityDto)
    }
}

export default new FinancialEntityervice();