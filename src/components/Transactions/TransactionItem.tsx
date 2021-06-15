import { Avatar } from '@material-ui/core';
import styled, { css } from 'styled-components';
import ETHDisplay from '../Account/EthDisplay';

const DataDisplay = css`
  span {
    font-weight: bold;
  };
  small {
    font-size: 10px;
    color: gray;
  };
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.5fr;
  grid-column-gap: 10px;
`;

const TransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
  ${DataDisplay};
`;

interface PropTypes {
  title: string;
  when: string;
  ethAmount: number;
  usdAmount: string;
}


const TransactionItem = ({ title, when, ethAmount, usdAmount }: PropTypes) => {
  return (
    <Item>
      <Avatar src="/static/ethereum.svg" />
      <TransactionDetail>
        <span>{title}</span>
        <small>{when}</small>
      </TransactionDetail>
      <TransactionDetail>
        <ETHDisplay value={ethAmount} />
        <small>{usdAmount} USD</small>
      </TransactionDetail>
    </Item>
  )
}

export default TransactionItem;
