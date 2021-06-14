import MuiButton from '@material-ui/core/Button';
import styled from 'styled-components';

const BaseButton = styled(MuiButton)`
  text-transform: none !important;
  width: ${(props: any) => props.width ? props.width : 'default'};
`;

const Button = (props: any) => {
  return (
    <BaseButton
      {...props}
    />
  )
}

export default Button
