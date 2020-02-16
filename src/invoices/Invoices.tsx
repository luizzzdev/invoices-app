import React, {
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
  useContext,
} from 'react';

import Container from '../shared/base/Container';
import Select from '../shared/base/Select';
import Table, {
  TableCell,
  TableRow,
  TableHeader,
  TableBody,
  TableHeaderCell,
} from '../shared/base/Table';
import { Company } from '../shared/interface/company';
import CompaniesResource from '../shared/resource/companies';
import { Invoice } from './interface/invoice';
import InvoicesResource from './resource/invoices';
import PaymentMethodsResource from '../shared/resource/paymentMethods';
import { PaymentMethod } from '../shared/interface/paymentMethod';
import Pagination from '../shared/base/Pagination';
import FilterContext from '../shared/context/filter/context';
import { Filter } from '../shared/context/filter/filter';

const formatCompanyForSelect = (company: Company): CompanySelect => ({
  text: company.name,
  value: JSON.stringify(company),
  key: company.id,
});

const formatPaymentMethod = (
  paymentMethod: PaymentMethod
): PaymentMethodSelect => ({
  text: paymentMethod.name,
  value: JSON.stringify(paymentMethod),
  key: paymentMethod.id,
});

interface CompanySelect {
  text: string;
  value: string;
  key: number;
}

interface PaymentMethodSelect {
  text: string;
  value: string;
  key: number;
}

type InvoicesFilter = Filter<{
  paymentMethod: PaymentMethod;
  company: Company;
}>;

const Invoices: FunctionComponent = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [companies, setCompanies] = useState<Array<CompanySelect>>([]);
  const [paymentMethods, setPaymentMethods] = useState<
    Array<PaymentMethodSelect>
  >([]);

  const { filter, pagination, setFilter, setActivePage } = useContext<
    InvoicesFilter
  >(FilterContext);

  const fetchInvoices = useCallback(
    async (companyId: number | null, paymentMethodId: number | null) => {
      const payload = await InvoicesResource.get(
        companyId,
        paymentMethodId,
        pagination.activePage
      );
      setInvoices(payload);
    },
    [pagination.activePage]
  );

  const fetchCompanies = useCallback(async () => {
    const payload = await CompaniesResource.get();
    const formattedCompanies = payload.map(formatCompanyForSelect);
    setCompanies(formattedCompanies);
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    const payload = await PaymentMethodsResource.get();
    const formattedPaymentMethods = payload.map(formatPaymentMethod);
    setPaymentMethods(formattedPaymentMethods);
  }, []);

  useEffect(() => {
    const companyId = filter && filter.company ? filter.company.id : null;
    const paymentMethodId =
      filter && filter.paymentMethod ? filter.paymentMethod.id : null;
    fetchInvoices(companyId, paymentMethodId);
  }, [fetchInvoices, filter]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, filter]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const onChangeHandler = (callback: Function) => (_: any, data: any) =>
    callback(data.value);

  const selectPaymentMethodHandler = (paymentMethod: string): void => {
    setFilter('paymentMethod', JSON.parse(paymentMethod) as PaymentMethod);
  };

  const selectCompanyHandler = (company: string): void => {
    setFilter('company', JSON.parse(company) as Company);
  };

  const pageChangeHandler = (_: any, data: any): void =>
    setActivePage(data.activePage);

  const rows = (invoices || []).map(invoice => (
    <TableRow key={invoice.id}>
      <TableCell>{invoice.company.name}</TableCell>
      <TableCell>{invoice.paymentMethod.name}</TableCell>
      <TableCell>{invoice.value}</TableCell>
    </TableRow>
  ));

  return (
    <Container>
      <h1>Invoices</h1>

      <Container>
        <Select
          options={companies}
          onChange={onChangeHandler(selectCompanyHandler)}
          value={JSON.stringify(filter.company)}
          placeholder="Company"
          data-testid="company-select"
        />
        <Select
          options={paymentMethods}
          onChange={onChangeHandler(selectPaymentMethodHandler)}
          value={JSON.stringify(filter.paymentMethod)}
          placeholder="Payment method"
          data-testid="payment-method-select"
        />
      </Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Company Name</TableHeaderCell>
            <TableHeaderCell>Payment Method</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>{rows}</TableBody>
      </Table>

      <Container textAlign="center">
        <Pagination
          defaultActivePage={1}
          totalPages={10}
          onPageChange={pageChangeHandler}
        />
      </Container>
    </Container>
  );
};

export default Invoices;
