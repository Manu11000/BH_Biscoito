import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { getProdutos, deleteProduto, addProduto, updateProduto } from '../services/apiService';

// Estilos com styled-components
const PageContainer = styled.div`
    padding: 20px;
    background-color: #f8f5f0;
    min-height: calc(100vh - 80px);
    margin-left: ${props => props.isSidebarOpen ? '200px' : '0'};
    transition: margin-left 0.3s ease-in-out;
    @media (max-width: 768px) { margin-left: 0; }
`;

const FormWrapper = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    max-width: 600px;
    margin: 0 auto;
`;

const ProductItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 15px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const QuantityControl = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    flex: 1;
`;

const QuantityButton = styled.button`
    background-color: #A0522D;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 1.2em;
    cursor: pointer;
    &:hover { opacity: 0.9; }
`;

const QuantityDisplay = styled.span`
    min-width: 30px;
    text-align: center;
    font-weight: bold;
`;

const RemoveButton = styled(Button)`
    background-color: #e96572ff;
    &:hover { background-color: #c82333; }
`;

const AddProductButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;

// Componente principal
function ProductRegistrationPage({ isSidebarOpen }) {
    const [products, setProducts] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductValidity, setNewProductValidity] = useState('');

    // Carregar produtos da API
    useEffect(() => {
        carregarProdutos();
    }, []);

    async function carregarProdutos() {
        try {
            const data = await getProdutos();
            setProducts(data);
        } catch (err) {
            console.error('Erro ao carregar produtos:', err);
        }
    }

    // Alterar quantidade
    async function handleQuantityChange(id, delta) {
        const produto = products.find(p => p.id === id);
        if (!produto) return;

        const novaQuantidade = Math.max(0, produto.quantity + delta);
        try {
            await updateProduto({ ...produto, quantity: novaQuantidade });
            carregarProdutos();
        } catch (err) {
            console.error('Erro ao atualizar quantidade:', err);
        }
    }

    // Remover produto
    async function handleRemoveProduct(id) {
        try {
            await deleteProduto(id);
            carregarProdutos();
        } catch (err) {
            console.error('Erro ao remover produto:', err);
        }
    }

    // Adicionar novo produto
    async function handleAddNewProduct() {
        if (newProductName && newProductPrice && newProductValidity) {
            const novoProduto = {
                name: newProductName,
                quantity: 0,
                price: parseFloat(newProductPrice),
                validity: newProductValidity
            };
            try {
                await addProduto(novoProduto);
                setNewProductName('');
                setNewProductPrice('');
                setNewProductValidity('');
                carregarProdutos();
            } catch (err) {
                console.error('Erro ao adicionar produto:', err);
            }
        } else {
            alert('Por favor, preencha todos os campos do novo produto.');
        }
    }

return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
        <h1>Cadastro de Produtos</h1>
        <FormWrapper>
            {products.map((product, index) => (
                <ProductItem key={product.id || index}>
                    <div style={{ flex: '2 1 auto' }}>
                        <p><strong>Nome do Produto:</strong> {product.name || "Sem nome"}</p>
                        <p><strong>R${Number(product.price || 0).toFixed(2)}</strong></p>
                    </div>

                    <QuantityControl>
                        <p>Quantidade: </p>
                        <QuantityButton onClick={() => handleQuantityChange(product.id, -1)}>-</QuantityButton>
                        <QuantityDisplay>{product.quantity ?? 0}</QuantityDisplay>
                        <QuantityButton onClick={() => handleQuantityChange(product.id, 1)}>+</QuantityButton>
                    </QuantityControl>

                    <div style={{ flex: '1 1 auto', textAlign: 'right' }}>
                        <p>Validade: {product.validity || "Sem validade"}</p>
                        <RemoveButton onClick={() => handleRemoveProduct(product.id)}>remover</RemoveButton>
                    </div>
                </ProductItem>
            ))}

            <h3>Adicionar novo Cadastro</h3>
            <InputField
                label="Nome do Novo Produto"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Ex: Bolo de Chocolate"
            />
            <InputField
                label="Preço (R$)"
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                placeholder="Ex: 25.50"
                step="0.01"
            />
            <InputField
                label="Validade (MM/AAAA)"
                value={newProductValidity}
                onChange={(e) => setNewProductValidity(e.target.value)}
                placeholder="MM/AAAA"
            />
            <AddProductButton onClick={handleAddNewProduct}>
                Cadastrar
            </AddProductButton>
        </FormWrapper>
    </PageContainer>
)}

export default ProductRegistrationPage;

