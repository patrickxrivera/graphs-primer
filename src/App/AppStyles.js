import styled from 'styled-components';

export const OuterWrapper = styled.div`
  background-color: #e9ebee;
  width: 100vw;
  height: 100vh;
  color: rgb(66, 66, 65);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial,
    sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InnerWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export const TextWrapper = styled.div`
  border: 1px solid #dddfe2;
  padding-left: 2rem;
  padding-top: 2rem;
  border-radius: 4px;
  height: 610px;
  background-color: #fff;
  width: 35%;
`;

export const Title = styled.div`
  font-size: 3rem;
`;

export const Button = styled.button`
  height: 45px;
  width: 90%;
  border-radius: 4px;
  background-color: #1db954;
  margin: 4rem 0;
  border: 1px solid rgba(0, 184, 148, 0.3);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
  color: #fff;
  font-size: 20px;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
    transition: background-color 100ms ease-in;
  }
  &:focus {
    outline: 0;
  }
`;
