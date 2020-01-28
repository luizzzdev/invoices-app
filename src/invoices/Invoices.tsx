import React, { useCallback, useEffect, useState } from 'react';

import Container from '../shared/base/Container';
import Select from '../shared/base/Select';
import Table from '../shared/base/Table';
import { Company } from '../shared/interface/company';
import CompaniesResource from '../shared/resource/companies';
import { Invoice } from './interface/invoice';
import InvoicesResource from './resource/invoices';
import PaymentMethodsResource from '../shared/resource/paymentMethods'
import { PaymentMethod } from '../shared/interface/paymentMethod';
import withFilterConsumer from '../shared/context/filter/withFilterConsumer';
import { Filter } from '../shared/context/filter/filter';
import Pagination from '../shared/base/Pagination';

const formatCompanyForSelect = (company: Company) : CompanySelect => ({
  text: company.name,
  value: JSON.stringify(company),
  key: company.id
})

const formatPaymentMethod = (paymentMethod: PaymentMethod) : PaymentMethodSelect => ({
  text: paymentMethod.name,
  value: JSON.stringify(paymentMethod),
  key: paymentMethod.id
})

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

interface InvoicesFilter {
  paymentMethod: PaymentMethod;
  company: Company;
}

interface InvoicesType extends Filter<InvoicesFilter> {}

const Invoices: React.FC<InvoicesType> = ({ filter, pagination, setFilter, setActivePage }) => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([])
  const [companies, setCompanies] = useState<Array<CompanySelect>>([])
  const [paymentMethods, setPaymentMethods] = useState<Array<PaymentMethodSelect>>([])

  const fetchInvoices = useCallback(async (companyId: number | null, paymentMethodId: number | null) => {
    const payload = await InvoicesResource.get(companyId, paymentMethodId, pagination.activePage)
    setInvoices(payload)
  }, [pagination.activePage])

  const fetchCompanies = useCallback(async () => {
    const payload = await CompaniesResource.get()
    const formattedCompanies = payload.map(formatCompanyForSelect)
    setCompanies(formattedCompanies)
  }, [])



  const fetchPaymentMethods = useCallback(async () => {
    const payload = await PaymentMethodsResource.get()
    const formattedPaymentMethods = payload.map(formatPaymentMethod)
    setPaymentMethods(formattedPaymentMethods)
  }, [])



  useEffect(() => {
    const companyId = filter && filter.company ? filter.company.id : null 
    const paymentMethodId = filter && filter.paymentMethod ? filter.paymentMethod.id : null
    fetchInvoices(companyId, paymentMethodId)
  }, [fetchInvoices, filter])

  useEffect(() => {
    fetchCompanies()
  }, [fetchCompanies, filter])

  useEffect(() => {
    fetchPaymentMethods()
  }, [fetchPaymentMethods])


  // @ts-ignore
  const onChangeHandler = callback => (_, data) => callback(data.value)

  const selectPaymentMethodHandler = (paymentMethod: string) => {
    setFilter('paymentMethod', JSON.parse(paymentMethod) as PaymentMethod)
  } 

  const selectCompanyHandler = (company: string) => {
    setFilter('company', JSON.parse(company) as Company)
  }

   // @ts-ignore
   const pageChangeHandler = (_ , data ) => setActivePage(data.activePage)

  const rows = (invoices || []).map(invoice => <Table.Row key={invoice.id}>
    <Table.Cell>{invoice.company.name}</Table.Cell>
    <Table.Cell>{invoice.paymentMethod.name}</Table.Cell>
    <Table.Cell>{invoice.value}</Table.Cell>
  </Table.Row>)

  return (
    <Container>
      <h1>Invoices</h1>
      
      <Container>
        <Select options={companies} onChange={onChangeHandler(selectCompanyHandler)} value={JSON.stringify(filter.company)} placeholder="Company"/>
        <Select options={paymentMethods} onChange={onChangeHandler(selectPaymentMethodHandler)} value={JSON.stringify(filter.paymentMethod)} placeholder="Payment method"/>
      </Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Payment Method</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {rows}
        </Table.Body>
      </Table>

      <Container textAlign="center">
        <Pagination defaultActivePage={1} totalPages={10} onPageChange={pageChangeHandler}/>
      </Container>
    </Container>
  )
}

export default withFilterConsumer(Invoices) 