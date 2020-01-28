import { Company } from '../../shared/interface/company';
import { PaymentMethod } from '../../shared/interface/paymentMethod';

export interface Invoice {
  id: number;
  companyId: number;
  paymentMethodId: number;
  value: number;
  paid: boolean;
  company: Company;
  paymentMethod: PaymentMethod;
}