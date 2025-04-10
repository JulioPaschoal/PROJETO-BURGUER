import { Container } from './styles';
import Logo from '../../assets/Logo.svg';

export function Login() {
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} />
      </LeftContainer>
      <RightContainer>
        <title>
          Olá, seja bem vindo ao <span>Dev Burguer!</span>
          Acesse com seu <span>Login e senha.</span>
        </title>
        <Form></Form>
        <span>
          Não possui conta? <a href="#">Cadastre-se</a>
        </span>
      </RightContainer>
    </Container>
  );
}
