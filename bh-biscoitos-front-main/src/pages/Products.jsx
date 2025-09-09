import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";

const PageContainer = styled.div`
  padding: 20px;
  background-color: #f8f5f0;
  min-height: calc(100vh - 80px);
  margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "0")};
  transition: margin-left 0.3s ease-in-out;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 0 auto 30px auto;
`;

const Title = styled.h2`
  color: #A0522D;
  margin-bottom: 25px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  border: 1px solid #eee;
  padding: 10px;
  background-color: #f2f2f2;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
`;

function ProductsPage({ isSidebarOpen }) {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Biscoito de Queijo", preco: 350, categoria: "Biscoitos" },
    { id: 2, nome: "Bolo de Cenoura com Chocolate", preco: 280, categoria: "Bolos" },
    { id: 3, nome: "Pão Italiano", preco: 150, categoria: "Pães" },
    { id: 4, nome: "Broa de Fubá", preco: 95, categoria: "Bolos" },
    { id: 5, nome: "Biscoito de Nata", preco: 60, categoria: "Biscoitos" },
    // Adicionais sugeridos
    { id: 6, nome: "Bolo de Laranja", preco: 200, categoria: "Bolos" },
    { id: 7, nome: "Pão Integral", preco: 120, categoria: "Pães" },
    { id: 8, nome: "Rosquinha Caseira", preco: 75, categoria: "Biscoitos" },
  ]);

  const handleDeleteProduto = (id) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <h1>Produtos</h1>

      <FormWrapper>
        <Title>Produtos Disponíveis</Title>
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Nome</Th>
              <Th>Categoria</Th>
              <Th>Preço (R$)</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <tr key={produto.id}>
                  <Td>{produto.id}</Td>
                  <Td>{produto.nome}</Td>
                  <Td>{produto.categoria}</Td>
                  <Td>R$ {produto.preco.toFixed(2)}</Td>
                  <Td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteProduto(produto.id)}
                    >
                      Remover
                    </Button>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                  Nenhum produto cadastrado.
                </Td>
              </tr>
            )}
          </tbody>
        </Table>
      </FormWrapper>
    </PageContainer>
  );
}

export default ProductsPage;
