import { 
  Table as BaseTable, 
  TableProps,
  TableCell as BaseTableCell,
  TableCellProps,
  TableRow as BaseTableRow,
  TableRowProps,
  TableHeader as BaseTableHeader,
  TableHeaderProps,
  TableBody as BaseTableBody,
  TableBodyProps,
  TableHeaderCell as BaseTableHeaderCell,
  TableHeaderCellProps,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

const Table: FunctionComponent<TableProps> = styled(BaseTable)``;

export const TableCell: FunctionComponent<TableCellProps> = styled(BaseTableCell)``;

export const TableRow: FunctionComponent<TableRowProps> = styled(BaseTableRow)``;

export const TableHeader: FunctionComponent<TableHeaderProps> = styled(BaseTableHeader)``;

export const TableBody: FunctionComponent<TableBodyProps> = styled(BaseTableBody)``;

export const TableHeaderCell: FunctionComponent<TableHeaderCellProps> = styled(BaseTableHeaderCell)``;

export default Table;
