import styled from 'styled-components';
import logo from './logo.svg';

const Logo = styled.img`
  display: block;
  margin: 0 auto;
  width: 100px;
`;

Logo.defaultProps = {
  src: logo,
  alt: 'Equal Experts',
};

export { Logo };
