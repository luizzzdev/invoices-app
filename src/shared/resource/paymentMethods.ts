import Api from "./api"
import { PaymentMethod } from "../interface/paymentMethod"

const PaymentMethodsResource = {
  async get() : Promise<Array<PaymentMethod>>{
    return (await Api.get('/paymentMethods')).data
  }
}

export default PaymentMethodsResource