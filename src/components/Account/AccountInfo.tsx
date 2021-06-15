import React from 'react';
import { Avatar, ClickAwayListener, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import truncate from '../../utils/truncate';

const AccountInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  .avatar {
    margin-right: 20px;
  };
`;

const AccountIdentification = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-weight: bold;
  }
  .address {
    font-size: 13px;
    color: grey;
  }
`;

interface AccountInfoTypes {
  name: string;
  publicAddress: string;
}

interface PropTypes {
  account: AccountInfoTypes;
}

const AccountInfo = ({ account }: PropTypes) => {
  //Adding this code for the mobile interface
  //I wont use useMediaQuery because it is useful for the web view as well
  const [forceOpen, setForceOpen] = React.useState(false);
  return (
    <ClickAwayListener onClickAway={() => setForceOpen(false)}>
      <AccountInfoWrapper onClick={() => setForceOpen(true)}>
        <Avatar className="avatar" alt="account">A</Avatar>
        <AccountIdentification>
          <span className="name">{account.name}</span>
          <Tooltip title={account.publicAddress} open={forceOpen}>
            <span className="address">{truncate(account.publicAddress, 13)}</span>
          </Tooltip>
        </AccountIdentification>
      </AccountInfoWrapper>
    </ClickAwayListener>
  )
}

export default AccountInfo;
