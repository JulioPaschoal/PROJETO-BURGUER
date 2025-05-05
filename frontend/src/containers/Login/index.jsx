import Logo from '../../assets/logo-2.svg';
import { Button } from '../../components/Button';
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  Form,
  InputContainer,
} from './styles';

export default function Login() {
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-dev-burger" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Dev Burger</span>
          <br />
          Acesse com seu <span>Login e senha</span>
        </Title>
        <Form>
          <InputContainer>
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" />
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" />
          </InputContainer>

          <Button> Entrar </Button>
        </Form>

        <p>
          Não tem uma conta? <a>Clique aqui</a>
        </p>
      </RightContainer>
    </Container>
  );
}
