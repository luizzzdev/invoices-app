import { Invoice } from '../interface/invoice';
import Api from '../../shared/resource/api';

interface InvoiceParams {
  companyId?: number;
  paymentMethodId?: number;
  _expand: Array<string>;
  _page: number;
}

const InvoicesResource = {
  async get(companyId: number | null, paymentMethodId: number | null, page: number): Promise<Array<Invoice>> {
    const params: InvoiceParams = {
      _expand: ['company', 'paymentMethod'],
      _page: page,
    };

    if(companyId) params.companyId = companyId;
    if(paymentMethodId) params.paymentMethodId = paymentMethodId;
    return (await Api.get('/invoices', { params })).data;
  },
};

export default InvoicesResource;
