import { CircularProgress } from '@material-ui/core';
import AccountInfo from '../components/Account/AccountInfo';
import AccountSummary from '../components/Account/AccountSummary';
import Card from '../components/Card/Card';
import PageContainer from '../components/Layouts/PageContainer';
import TransactionList from '../components/Transactions/TransactionsList';
import useAccountData from '../hooks/useAccountData';
import { useAppTransactions } from '../hooks/useTransactions';
import Constants from '../utils/constants';

const HomePage = () => {
  const { isLoading, transactions } = useAppTransactions();
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
              <TransactionList
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
