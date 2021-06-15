import { CircularProgress } from '@material-ui/core';
import AccountInfo from '../components/Account/AccountInfo';
import AccountSummary from '../components/Account/AccountSummary';
import Card from '../components/Card/Card';
import PageContainer from '../components/Layouts/PageContainer';
import TransactionList from '../components/Transactions/TransactionsList';
import useAccountData from '../hooks/useAccountData';
import { useAppTransactions } from '../hooks/useTransactions';
import Constants from '../utils/constants';
import styled from 'styled-components';
import Button from '../components/Button/Button';

const TransactionsErrorFetchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  .error__message {
    margin: auto;
    color: red;
    margin-bottom: 10px;
  }
`;
const HomePage = () => {
  const { isLoading, transactions, isErrored, refetch } = useAppTransactions();
  const accountData = useAccountData();

  return (
    <PageContainer>
      <Card>
        <header>
          <AccountInfo account={accountData} />
        </header>
        <nav>
          <AccountSummary
            accountBalance={accountData.accountBalance}
            ethPrice={Constants.ethPrice}
          />
        </nav>
        <main>
          {
            isLoading ?
              <CircularProgress style={{ margin: 'auto', display: 'block' }} />
              :
              isErrored ?
                <TransactionsErrorFetchingWrapper>
                  <span className="error__message">Error fetching the transactions.</span>
                  <Button variant="outlined" width="50%" onClick={refetch}>Retry</Button>
                </TransactionsErrorFetchingWrapper>
                : <TransactionList
                  transactions={transactions}
                  ethPrice={Constants.ethPrice}
                  publicAddress={accountData.publicAddress}
                />
          }

        </main>
      </Card>
    </PageContainer>
  )
}

export default HomePage;
