// src/pages/ChatBot.jsx
import React, { useState } from "react";
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Messages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background: ${(props) => (props.isUser ? "#A0522D" : "#eee")};
  color: ${(props) => (props.isUser ? "white" : "black")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
`;

const InputContainer = styled.form`
  display: flex;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 0 0 0 12px;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 15px 20px;
  background: #A0522D;
  color: white;
  border: none;
  border-radius: 0 0 12px 0;
  cursor: pointer;

  &:hover {
    background: #7A4222;
  }
`;

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Olá! Sou o assistente da BH Biscoitos. Como posso te ajudar?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const respostasBot = (msg) => {
    const lower = msg.toLowerCase();

    if (lower.includes("produto") || lower.includes("estoque")) {
      return "Atualmente temos Biscoito de Polvilho, Bolo de Laranja e Pão de Grãos no estoque!";
    }
    if (lower.includes("pedido")) {
      return "Você pode acompanhar ou cadastrar novos pedidos na aba 'Pedidos'.";
    }
    if (lower.includes("pagamento")) {
      return "Aceitamos cartão de crédito, débito e PIX.";
    }
    if (lower.includes("funcionário")) {
      return "Funcionários podem acessar relatórios e controle de estoque no Dashboard.";
    }
    return "Desculpe, não entendi. Pode reformular sua pergunta?";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = { text: respostasBot(input), isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);

    setInput("");
  };

  return (
    <ChatContainer>
      <Messages>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </Messages>
      <InputContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit">Enviar</Button>
      </InputContainer>
    </ChatContainer>
  );
}

export default ChatBot;
