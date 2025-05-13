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
  Link,
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
    try {
      const { status } = await api.post(
        '/users',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
        },
      );
      if (status === 200 || status === 201) {
        toast.success('Cadastro realizado com sucesso!');
      } else if (status === 409) {
        toast.error('Email já cadastrado! Faça login para continuar.');
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Falha no Sistema! Tente novamente');
    }
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
          Já possui conta? <Link to="/login">Clique aqui</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
