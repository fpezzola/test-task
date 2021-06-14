import React from 'react';
import { ClickAwayListener, Tooltip } from '@material-ui/core';
import styled from 'styled-components';

const Span = styled.span<any>`
  display: flex;
  text-transform: uppercase;
  font-size: ${(props: any) => props.large ? `2rem` : 'inherit'};
  font-weight: bold;

  .balance__value {
    max-width: 8ch;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
`;

interface PropTypes {
  value: number;
  large?: boolean;
}

const ETHDisplay = ({ value, large }: PropTypes) => {
  //just for mobile view
  const [forceOpen, setForceOpen] = React.useState(false);
  return (
    <ClickAwayListener onClickAway={() => setForceOpen(false)}>
      <Tooltip title={`${value.toString()} ETH`} open={forceOpen}>
        <Span large={large} onClick={() => setForceOpen(true)}>
          <span className="balance__value" title={value.toString()}>{value}</span>
          <span>&nbsp;ETH</span>
        </Span>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default ETHDisplay;
