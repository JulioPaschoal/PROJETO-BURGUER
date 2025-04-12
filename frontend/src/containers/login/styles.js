import styled from 'styled-components';
import BackgroundLogin from '../../assets/background-login.svg';
import Background from '../../assets/backgroun2.svg';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const LeftContainer = styled.div`
  background: url('${BackgroundLogin}');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  max-width: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80%;
  }
`;

export const RightContainer = styled.div`
  background: url('${Background}');
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 50%;

  p {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    a {
      text-decoration: underline;
      color: #fff;
    }
  }
`;

export const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: 'Road Rage';
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  span {
    color: #9758a6;
    font-family: 'Road Rage';
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
    padding: 0 16px;
    border-radius: 5px;
    border: none;
    height: 52px;
  }

  label {
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
`;
