import { useForm } from 'react-hook-form';
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
} from './styles';

export default function Register() {
  const schema = yup
    .object({
      name: yup.string().required('Campo nome é obrigatório'),
      email: yup
        .string()
        .email('Email ou senha inválidos')
        .required('Campo e-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve conter no mínimo 6 dígitos')
        .required('Campo password é obrigatório'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas não conferem')
        .required('Campo confirmar senha é obrigatório'),
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
    await toast.promise(
      api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Aguarde...',
        success: 'Cadastro realizado com sucesso!',
        error: 'Ops, algo deu errado! Tente novamente.',
      },
      {
        autoClose: 2000,
        position: 'top-right',
      },
    );
  };
  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-dev-burger" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar conta</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input
              type="name"
              {...register('name')}
              placeholder="Digite seu nome"
            />
            <p>{errors.name?.message}</p>
          </InputContainer>
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
          <InputContainer>
            <label>Confirmar senha</label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirmar sua senha"
            />
            <p>{errors.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit"> CONFIRMAR CADASTRO </Button>
        </Form>
        <p>
          Já possui conta? <a>Clique aqui</a>
        </p>
      </RightContainer>
    </Container>
  );
}
