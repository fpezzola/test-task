import React from 'react';
import { Transaction } from "../../services/TransactionsService";
import TransactionItem from "./TransactionItem";
import styled from 'styled-components';
import formatters from '../../utils/formatters';

const TransactionGrid = styled.div`
  display: grid;
  grid-template-rows: auto;

  .item {
    margin-top: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid lightgray;
  }
`;

interface PropTypes {
  transactions: Array<Transaction>;
  ethPrice: number;
  publicAddress: string;
}

const useTransactionsDisplay = (transactions: Array<Transaction>, publicAddress: string, ethPrice: number) => {
  return React.useMemo(() => {
    return transactions.map((transaction: Transaction) => {
      let titlePrefix = 'Sent';
      if (transaction.to === publicAddress) {
        titlePrefix = 'Received'
      }
      return {
        id: transaction.id,
        title: `${titlePrefix} Ether`,
        when: formatters.toLocaleDateTimeString(transaction.when),
        valueInUSD: formatters.toCurrency(transaction.value * ethPrice),
        value: transaction.value
      }
    })
  }, [transactions, publicAddress, ethPrice])
}

const TransactionList: Function = ({ transactions, publicAddress, ethPrice }: PropTypes): JSX.Element => {
  const transactionsDisplay = useTransactionsDisplay(transactions, publicAddress, ethPrice);
  return (
    <TransactionGrid>
      {
        (transactionsDisplay || []).map((transaction) => (
          <div className="item" key={transaction.id}>
            <TransactionItem
              ethAmount={transaction.value}
              title={transaction.title}
              when={transaction.when}
              usdAmount={transaction.valueInUSD}
            />
          </div>
        ))}
    </TransactionGrid>
  )
}


export default TransactionList;
