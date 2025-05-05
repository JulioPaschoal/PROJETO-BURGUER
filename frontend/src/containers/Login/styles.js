import styled from 'styled-components';

import Background from '../../assets/backgraund-2.svg';
import BackgroundLogin from '../../assets/backgraund-login.svg';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const LeftContainer = styled.div`
  background: url('${BackgroundLogin}');
  background-size: cover;
  background-position: center;

  height: 100%;
  width: 100%;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
  }
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 50%;

  background: url('${Background}');
  background-size: cover;
  background-color: #1e1e1e;

  p {
    font-size: 18px;
    color: #fff;
    margin-top: 20px;

    a {
      color: #9758a8;
      text-decoration: underline;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

export const Title = styled.h2`
  font-family: 'Road Rage', sans-serif;
  color: #fff;
  text-align: center;
  font-family: 'Road Rage';
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;

  span {
    color: #9758a8;
    font-family: 'Road Rage', sans-serif;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  input {
    width: 100%;
    border: none;
    height: 52px;
    border-radius: 5px;
    padding: 0 10px;
  }

  label {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
`;
