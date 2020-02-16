import React, { ReactChild } from 'react';
import Invoices from '../Invoices';
import { render, wait, fireEvent } from '@testing-library/react';
import InvoicesResource from '../resource/invoices';
import PaymentMethodsResource from '../../shared/resource/paymentMethods';
import CompaniesResource from '../../shared/resource/companies';
import FilterProvider from '../../shared/context/filter/FilterProvider';

jest.mock('../resource/invoices');
jest.mock('../../shared/resource/paymentMethods');
jest.mock('../../shared/resource/companies');

afterEach(() => {
  jest.resetAllMocks();
});

const renderWithProvider = (children: ReactChild) =>
  render(<FilterProvider initialState={{}}>{children}</FilterProvider>);

const mockInvoicesResource = () =>
  (InvoicesResource.get = jest.fn().mockImplementation((...params) => {
    return [
      {
        id: 1,
        companyId: 1,
        paymentMethodId: 1,
        value: 100,
        paid: false,
        company: {
          id: 1,
          name: 'Orange S.A.',
        },
        paymentMethod: {
          id: 1,
          name: 'Credit Card',
        },
      },
      {
        companyId: 2,
        id: '506f05a0-0afd-4a25-ac41-82fcb2dcf319',
        paymentMethodId: 1,
        value: 611,
        paid: false,
        company: {
          id: 2,
          name: 'Strawberry S.A.',
        },
        paymentMethod: {
          id: 1,
          name: 'Credit Card',
        },
      },
      {
        companyId: 2,
        id: 'cc24d8eb-84a7-465a-976a-75d5641b5b69',
        paymentMethodId: 1,
        value: 876,
        paid: true,
        company: {
          id: 2,
          name: 'Strawberry S.A.',
        },
        paymentMethod: {
          id: 1,
          name: 'Credit Card',
        },
      },
    ];
  }));

const mockCompaniesResource = () =>
  (CompaniesResource.get = jest.fn().mockReturnValue([
    {
      id: 1,
      name: 'Orange S.A.',
    },
    {
      id: 2,
      name: 'Strawberry S.A.',
    },
  ]));

const mockPaymentMethodsResource = () =>
  (PaymentMethodsResource.get = jest.fn().mockReturnValue([
    {
      id: 1,
      name: 'Credit Card',
    },
    {
      id: 2,
      name: 'Debit Card',
    },
    {
      id: 3,
      name: 'Bank Transfer',
    },
  ]));

describe('Invoices', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = null;
    jest.clearAllMocks();
  });

  it('filter incomes by company and payment method', async () => {
    mockInvoicesResource();
    mockPaymentMethodsResource();
    mockCompaniesResource();

    wrapper = renderWithProvider(<Invoices />);
    await wait();

    const { getByTestId, getAllByText, getAllByRole, container } = wrapper;

    expect(InvoicesResource.get).toHaveBeenCalledTimes(1);
    expect(InvoicesResource.get).toHaveBeenLastCalledWith(null, null, 1);
    expect(PaymentMethodsResource.get).toHaveBeenCalledTimes(1);
    expect(CompaniesResource.get).toHaveBeenCalledTimes(1);
    expect(container).toBeInTheDocument();

    const companySelect = getByTestId('company-select');
    fireEvent.click(companySelect);
    expect(companySelect).toHaveClass('active', 'visible');

    fireEvent.click(getAllByRole('option')[0]);

    await wait();

    expect(InvoicesResource.get).toHaveBeenCalledTimes(2);
    expect(InvoicesResource.get).toHaveBeenLastCalledWith(1, null, 1);

    await wait();

    const paymentMethodSelect = getByTestId('payment-method-select');
    fireEvent.click(paymentMethodSelect);
    expect(paymentMethodSelect).toHaveClass('active', 'visible');
    fireEvent.click(getAllByText(/debit card/i)[0]);

    await wait();

    expect(InvoicesResource.get).toHaveBeenCalledTimes(3);
    expect(InvoicesResource.get).toHaveBeenLastCalledWith(1, 2, 1);

    await wait();
  });
});
