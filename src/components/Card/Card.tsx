import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const CardLayout = styled(Paper)`
  display: grid;
  grid-template-rows: minmax(50px, auto) minmax(0px, auto) minmax(100px, auto) minmax(50px, auto);
  grid-row-gap: 10px;
  
  grid-template-areas: "header" 
                        "nav" 
                        "main" 
                        "footer";
  header {
    grid-area: header;
    padding: 1.5rem;
  } 
  nav {
    grid-area: nav;
    padding: 0 1.5rem;
  }
  main {
    grid-area: main;
    padding: 0 1.5rem;
  }

  footer {
    grid-area: footer;
    padding: 1rem 1.5rem;
  }

  
   
`;


const FooterWrapper = styled.footer`
  border-top: 1px solid lightgray;
`;

const HeaderWrapper = styled.header`
  border-bottom: 1px solid lightgray;
`

interface PropTypes {
  children: React.ReactNode;
}

const Card = ({ children }: PropTypes) => {
  return (
    <CardLayout elevation={3}>
      {children}
    </CardLayout>
  )
}

const Footer = ({ children }: PropTypes) => {
  return (
    <FooterWrapper>
      {children}
    </FooterWrapper>
  )
}

const Header = ({ children }: PropTypes) => {
  return (
    <HeaderWrapper>
      {children}
    </HeaderWrapper>
  )
}
Card.Footer = Footer;
Card.Header = Header;

export default Card;
