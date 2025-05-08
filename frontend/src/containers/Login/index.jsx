import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email ou senha inválidos')
        .required('Campo e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve conter no mínimo 6 dígitos')
        .required('Campo password é obrigatório'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Digite seu email"
            />
            <p>{errors.email?.message}</p>
          </InputContainer>
          <InputContainer>
            <label>Senha</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Digite sua senha"
            />
            <p>{errors.password?.message}</p>
          </InputContainer>
          <Button type="submit"> Entrar </Button>
        </Form>
        <p>
          Não tem uma conta? <a>Clique aqui</a>
        </p>
      </RightContainer>
    </Container>
  );
}
