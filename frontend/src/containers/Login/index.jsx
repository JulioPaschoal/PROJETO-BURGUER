import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Logo from '../../assets/logo-2.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  Form,
  InputContainer,
  Link,
} from './styles';

export default function Login() {
  const navigate = useNavigate();
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
  const onSubmit = async (data) => {
    const {
      data: { token },
    } = await toast.promise(
      api.post('/sessions', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Aguarde...',
        success: {
          render() {
            setTimeout(() => {
              navigate('/');
            }, 1000);
            return 'Login realizado com sucesso';
          },
        },
        error: 'Email ou senha inválidos',
      },
      {
        autoClose: 2000,
        position: 'top-right',
      },
    );

    localStorage.setItem('token', token);
  };
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
          Não tem uma conta? <Link to="/register">Clique aqui</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
