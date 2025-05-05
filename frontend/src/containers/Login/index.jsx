import Logo from '../../assets/logo.svg';
import { Container, LeftContainer } from './styles';

export default function Login() {
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-dev-burger" />
      </LeftContainer>
    </Container>
  );
}
