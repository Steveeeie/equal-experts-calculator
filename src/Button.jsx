import styled, { css } from 'styled-components';

const variantColorMap = {
  action: '#333333',
  number: '#444444',
  equals: '#1795d4',
  operator: '#fc6c12',
};

const variants = ({ $variant }) => {
  return css`
    background-color: ${variantColorMap[$variant]};
    grid-column: ${$variant === 'equals' ? 'span 2' : null};
  `;
};

const Button = styled.button`
  display: inline-flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  outline: none;
  padding: 16px 0;

  ${variants};

  &:hover {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
  }

  &:focus-visible {
    box-shadow: inset 0 0 0 2px white;
  }
`;

const ButtonSpace = styled.span`
  display: inline-flex;
  width: 25%;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
`;

export { Button, ButtonSpace, ButtonGrid };
