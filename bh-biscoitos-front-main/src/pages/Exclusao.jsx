import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaTrashAlt, FaCheckCircle, FaTimesCircle, FaUserShield } from "react-icons/fa";

// -----------------------------
// Animações sutis
// -----------------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
`;

// -----------------------------
// Estrutura principal
// -----------------------------
const PageContainer = styled.div`
  padding: 40px 20px;
  background: linear-gradient(135deg, #f6e7d8 0%, #fffaf4 100%);
  min-height: calc(100vh - 80px);
  margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "0")};
  transition: margin-left 0.3s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px 15px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.6s ease;

  h1 {
    color: #4b2e12;
    font-size: 2rem;
    font-weight: 800;
    margin-top: 10px;
  }

  p {
    color: #6b4226;
    font-size: 1.1rem;
    margin-top: 10px;
  }

  svg {
    color: #a0522d;
    font-size: 2.5rem;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  max-width: 900px;
  width: 100%;
  margin-bottom: 25px;
  animation: ${fadeIn} 0.5s ease;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;

  h3 {
    color: #4b2e12;
    font-size: 1.1rem;
  }

  span {
    color: #8b4513;
    font-size: 0.95rem;
    font-weight: 500;
  }
`;

// -----------------------------
// 🔘 Botões estilizados
// -----------------------------
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.variant === "success" &&
    `
    background: linear-gradient(135deg, #3cb371, #2e8b57);
    &:hover {
      background: linear-gradient(135deg, #4ac98b, #34a26a);
      transform: scale(1.05);
      box-shadow: 0 6px 18px rgba(46, 139, 87, 0.4);
    }
  `}

  ${(props) =>
    props.variant === "danger" &&
    `
    background: linear-gradient(135deg, #d9534f, #b52b27);
    &:hover {
      background: linear-gradient(135deg, #ff6b61, #c9302c);
      transform: scale(1.05);
      box-shadow: 0 6px 18px rgba(217, 83, 79, 0.4);
    }
  `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const MessageBox = styled.div`
  background: ${(props) => (props.success ? "rgba(173, 255, 181, 0.3)" : "#ffe6e6")};
  border-left: 6px solid ${(props) => (props.success ? "#2e7d32" : "#b71c1c")};
  padding: 15px 20px;
  border-radius: 10px;
  color: ${(props) => (props.success ? "#1b5e20" : "#721c24")};
  font-weight: 600;
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${fadeIn} 0.4s ease;
`;

function Exclusion({ isSidebarOpen }) {
  const [solicitacoes, setSolicitacoes] = useState([
    { id: 1, nome: "João Silva", email: "joao.silva@email.com", status: "pendente" },
    { id: 2, nome: "Maria Oliveira", email: "maria.oliveira@email.com", status: "pendente" },
    { id: 3, nome: "Carlos Souza", email: "carlos.souza@email.com", status: "pendente" },
  ]);

  const [mensagem, setMensagem] = useState("");

  const handleConfirmar = (id) => {
    setSolicitacoes((prev) => prev.filter((item) => item.id !== id));
    setMensagem("✅ Solicitação confirmada e dados do cliente removidos com sucesso!");
  };

  const handleNegar = (id) => {
    setSolicitacoes((prev) => prev.filter((item) => item.id !== id));
    setMensagem("❌ Solicitação negada. Nenhum dado foi removido.");
  };

  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <Header>
        <FaUserShield />
        <h1>Painel Administrativo – Solicitações de Exclusão</h1>
        <p>Gerencie as solicitações enviadas pelos clientes</p>
      </Header>

      {solicitacoes.length === 0 && (
        <MessageBox success={true}>
          <FaCheckCircle /> Nenhuma solicitação pendente no momento.
        </MessageBox>
      )}

      {solicitacoes.map((user) => (
        <Card key={user.id}>
          <UserInfo>
            <div>
              <h3>{user.nome}</h3>
              <span>{user.email}</span>
            </div>
            <span>Status: <strong>{user.status}</strong></span>
          </UserInfo>

          <Actions>
            <Button variant="success" onClick={() => handleConfirmar(user.id)}>
              <FaCheckCircle /> Confirmar Exclusão
            </Button>
            <Button variant="danger" onClick={() => handleNegar(user.id)}>
              <FaTimesCircle /> Negar Solicitação
            </Button>
          </Actions>
        </Card>
      ))}

      {mensagem && (
        <MessageBox success={mensagem.includes("✅")}>
          {mensagem.includes("✅") ? <FaCheckCircle /> : <FaTimesCircle />}
          {mensagem}
        </MessageBox>
      )}
    </PageContainer>
  );
}

export default Exclusion;
