import { Paper } from "@material-ui/core";
import styled from "styled-components";
import IconButton from '@material-ui/core/IconButton';
import ArrowIcon from '@material-ui/icons/ArrowUpward';
import { Link } from "react-router-dom";
import formatters from '../../utils/formatters';
import ETHDisplay from "./EthDisplay";

const HighlightedPaper = styled(Paper)`
  background-color: rgba(11, 160, 241, 0.1) !important;
  padding: 10px 0px 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .usd-balance {
    margin: 10px 0px;
    color: gray;
  }
`;

const SendButton = styled(IconButton)`
  margin-top: 1rem;
  background-color: #0288d1 !important;
  svg {
    color: white !important;
  };
  :hover {
    background-color: #81d4fa !important;
  }
`;

const SendAction = styled(Link)`
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  .send {
    margin-top: 10px;
  }
`

interface PropTypes {
  ethPrice: number;
  accountBalance: number;
}

const AccountSummary = ({ ethPrice, accountBalance }: PropTypes) => {
  return (
    <HighlightedPaper elevation={0}>
      <ETHDisplay large value={accountBalance} />
      <span className="usd-balance">{(formatters.toCurrency(accountBalance * ethPrice))} USD</span>
      <SendAction to="send/start" >
        <SendButton>
          <ArrowIcon />
        </SendButton>
        <span className="send">Send</span>
      </SendAction>
    </HighlightedPaper>
  )
}

export default AccountSummary;
