import Card from "../components/Card/Card";
import PageContainer from "../components/Layouts/PageContainer";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import { Typography, Link } from "@material-ui/core";
import { useAppState } from "../context/background/AppState";
import InputIcon from '@material-ui/icons/Input';
import Button from '../components/Button/Button';
import { useHistory } from "react-router-dom";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: gray;
    margin: 10px 0px;
  }
  h4 {
    font-weight: bold;
  }

  .succ {
    color: green;
    font-size: 70px;
    margin-bottom: 10px;
  }

  .view {
    align-items: center;
    display: flex;
    svg {
      margin-right: 10px;
    }
  }
`;

export const BorderedButton = styled(Button)`
  box-shadow:inset 0px 0px 0px 2px black !important;
  color: black !important;
  text-transform: none;
`;

const FeedbackPage = () => {
  const history = useHistory();
  const appState = useAppState();
  const ethScan = `https://etherscan.io/search?f=0&q=${appState.state.accountData.publicAddress}`
  return (
    <PageContainer>
      <Card>
        <Main>
          <CheckCircleIcon className="succ" fontSize="large" />
          <Typography variant="h4">Success.</Typography>
          <Typography variant="body2" > You've successfully sent your funds.</Typography>
          <Link className="view" href={ethScan} variant="body2" target="_blank">
            <InputIcon></InputIcon>View it in EthScan
          </Link>
        </Main>
        <Card.Footer>
          <BorderedButton type="button" width="100%" onClick={() => history.push('/')}>
            Done
          </BorderedButton>
        </Card.Footer>
      </Card>
    </PageContainer>
  )
};

export default FeedbackPage;
