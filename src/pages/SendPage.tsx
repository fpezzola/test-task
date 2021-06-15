import React from 'react';
import Card from "../components/Card/Card";
import InputNumber from "../components/Input/InputNumber";
import InputText from "../components/Input/InputText";
import PageContainer from "../components/Layouts/PageContainer";
import Button from '../components/Button/Button';
import styled from 'styled-components';
import { Backdrop, CircularProgress, FormControl, IconButton, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import { useSendTransacation } from '../hooks/useTransactions';
import Cancel from '@material-ui/icons/Cancel';
import { useAppState } from '../context/background/AppState';

const CustomBackdrop = styled(Backdrop)`
  z-index: 10000 !important;
  color: '#fff' !important;
`

const Main = styled.main`
  min-height: 15rem;
`;

const ErrorSnackbar = styled(Snackbar)`
  div {
    background-color: red !important;
    color: white;
  };
`;

const BorderedButton = styled(Button)`
  box-shadow:inset 0px 0px 0px 2px black !important;
  color: black !important;
  text-transform: none;
`;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button + button {
    margin-left: 10px;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SendPage = () => {
  const appState = useAppState();
  const { sendTransaction, isLoading, isDone, isErrored, error } = useSendTransacation();
  const [amount, setAmount] = React.useState(0);
  const [recipent, setRecipent] = React.useState('');
  const [snackbar, setSnackbar] = React.useState<any>({ open: false })
  const history = useHistory();
  const cancel = () => {
    history.push('/')
  }
  const submit = async () => {
    let message = ''
    if (!recipent) {
      message = 'You must specify a recipent.';
    } else if (recipent === appState.state.accountData.publicAddress) {
      message = 'You can\'t transfer to yourself'
    }

    if (!amount) {
      message = 'The amount must be bigger than 0.';
    } else if (amount > appState.state.accountData.accountBalance) {
      message = `You only have ${appState.state.accountData.accountBalance} ETH to transfer`;
    }

    if (message) {
      return setSnackbar({ open: true, message })
    }

    sendTransaction({
      to: recipent,
      value: amount
    });

  }

  React.useEffect(() => {
    if (isErrored && error) {
      setSnackbar({ open: true, message: error })
    }
  }, [isErrored, error]);


  React.useEffect(() => {
    if (isDone) {
      history.push('/send/done')
    }
  }, [isDone, history]);

  return (
    <PageContainer>
      <>
        <CustomBackdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </CustomBackdrop>
        <Card>
          <Card.Header>
            <HeaderWrapper>
              <Typography variant="h5">Send Ether</Typography>
              <IconButton onClick={cancel}><Cancel /></IconButton>
            </HeaderWrapper>
          </Card.Header>
          <Main>
            <FormControl fullWidth margin="dense">
              <InputText id="recipent" label="Add recipent" value={recipent} onChange={setRecipent} placeholder="Enter Public Address" />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputNumber id="amount" label="Amount" onChange={setAmount} value={amount} />
            </FormControl>
          </Main>
          <Card.Footer>
            <FooterWrapper>
              <BorderedButton onClick={cancel} width="80%" color="primary" size="large">Cancel</BorderedButton>
              <Button width="80%" type="button" onClick={submit} variant="contained" size="large" color="primary">Next</Button>
            </FooterWrapper>
            <ErrorSnackbar
              open={snackbar.open}
              onClose={() => setSnackbar({ open: false })}
              message={snackbar.message}
            />
          </Card.Footer>
        </Card>
      </>
    </PageContainer >
  )
}

export default SendPage;
