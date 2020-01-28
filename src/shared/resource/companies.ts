import Api from './api'
import { Company } from '../interface/company'

const CompaniesResource = {
  async get(): Promise<Array<Company>>{
    return (await Api.get('/companies')).data
  }
}

export default CompaniesResource