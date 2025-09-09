import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8ede3, #f2dac3);
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 50px 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  text-align: center;
  animation: fadeIn 0.6s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h2`
  color: #8B4513;
  font-size: 2rem;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: #555;
  margin-bottom: 35px;
  font-size: 1rem;
  line-height: 1.4;
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 25px 0;
  justify-content: flex-start;
  font-size: 0.9rem;

  input {
    margin-right: 8px;
    transform: scale(1.1);
  }
`;

const StyledLink = styled(Link)`
  color: #8B4513;
  text-decoration: none;
  margin-top: 12px;
  display: inline-block;
  font-size: 0.9rem;
  transition: color 0.3s;

  &:hover {
    color: #5a2d0c;
    text-decoration: underline;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #a0522d, #8b4513);
  color: white;
  border: none;
  font-weight: bold;
  padding: 12px 0;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(160, 82, 45, 0.4);
  }
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [isEmployee, setIsEmployee] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [companyCodeError, setCompanyCodeError] = useState('');

  const navigate = useNavigate();

  // Validações
  const validateEmail = (val) => {
    if (!val) return 'Email é obrigatório.';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Email inválido.';
    return '';
  };

  const validatePassword = (val) => {
    if (!val) return 'Senha é obrigatória.';
    if (val.length < 6) return 'A senha deve ter no mínimo 8 caracteres.';
    return '';
  };

  const validateCompanyCode = (val) => {
    if (isEmployee && !val) return 'Código da Empresa é obrigatório.';
    return '';
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    const codeErr = validateCompanyCode(companyCode);

    setEmailError(emailErr);
    setPasswordError(passErr);
    setCompanyCodeError(codeErr);

    if (!emailErr && !passErr && !codeErr) {
      console.log('Dados de login:', { email, password, companyCode, isEmployee });
      alert('Login efetuado com sucesso (simulado)! Redirecionando...');
      navigate('/dashboard');
    }
  };

  return (
    <PageContainer>
      <FormWrapper>
        <Title>Bem-vindo(a)!</Title>
        <Subtitle>
          BH Biscoitos - Sabor artesanal, gestão profissional!  
          Faça seu login!
        </Subtitle>

        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            error={emailError}
            placeholder="seu.email@exemplo.com"
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
            onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
            error={passwordError}
            placeholder="******"
          />

          <CheckboxGroup>
            <input
              type="checkbox"
              id="isEmployee"
              checked={isEmployee}
              onChange={() => setIsEmployee(!isEmployee)}
            />
            <label htmlFor="isEmployee">Sou funcionário da empresa</label>
          </CheckboxGroup>

          {isEmployee && (
            <InputField
              label="Código da Empresa"
              type="text"
              value={companyCode}
              onChange={(e) => { setCompanyCode(e.target.value); setCompanyCodeError(''); }}
              onBlur={(e) => setCompanyCodeError(validateCompanyCode(e.target.value))}
              error={companyCodeError}
              placeholder="ABC-123"
            />
          )}

          <CheckboxGroup>
            <input type="checkbox" id="notRobot" />
            <label htmlFor="notRobot">Não sou um robô</label>
          </CheckboxGroup>

          <StyledButton type="submit">
            Entrar
          </StyledButton>
        </form>

        <StyledLink to="/recuperar-senha">Esqueci minha senha </StyledLink>
        <br />
        <StyledLink to="/criar-conta">Criar minha conta</StyledLink>
      </FormWrapper>
    </PageContainer>
  );
}

export default LoginPage;
