import Container from '@material-ui/core/Container'
import styled from 'styled-components';

const CustomContainer = styled(Container)`
  margin-top: 30px;
`;

interface PropTypes {
  children: React.ReactElement;
}

const PageContainer = ({ children }: PropTypes) => {
  return (
    <CustomContainer style={{ maxWidth: 500 }}>
      {children}
    </CustomContainer>
  )
}
export default PageContainer
