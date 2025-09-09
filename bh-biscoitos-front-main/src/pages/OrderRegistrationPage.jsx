import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../components/InputField';
import Button from '../components/Button';

const PageContainer = styled.div`
    padding: 20px;
    background-color: #f8f5f0;
    min-height: calc(100vh - 80px);
    margin-left: ${props => props.isSidebarOpen ? '200px' : '0'};
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
    margin: 0 auto;
`;

const Title = styled.h2`
    color: #A0522D;
    margin-bottom: 25px;
    text-align: center;
`;

const ItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
`;

const ListItem = styled.li`
    padding: 8px 0;
    border-bottom: 1px dashed #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:last-child {
        border-bottom: none;
    }
`;

const StatusBadge = styled.span`
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: bold;
    color: white;
    background-color: ${props =>
        props.status === 'Concluído' ? '#4CAF50' :
        props.status === 'Em andamento' ? '#FFA500' : '#888'};
`;

function OrderRegistrationPage({ isSidebarOpen }) {
    const [clientName, setClientName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [newItem, setNewItem] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            setSelectedItems([...selectedItems, { name: newItem, price: 10 }]); // valor fictício
            setTotalValue(totalValue + 10);
            setNewItem('');
        }
    };

    const handleRemoveItem = (index) => {
        const itemRemoved = selectedItems[index];
        setSelectedItems(selectedItems.filter((_, i) => i !== index));
        setTotalValue(totalValue - itemRemoved.price);
    };

    const handleFinalizeOrder = () => {
        if (!clientName || selectedItems.length === 0 || !paymentMethod) {
            setFeedback('Preencha todos os campos e adicione pelo menos 1 item.');
            return;
        }
        setFeedback(`Pedido de ${clientName} finalizado com sucesso!`);
        setClientName('');
        setOrderDate('');
        setSelectedItems([]);
        setTotalValue(0);
        setPaymentMethod('');
    };

    return (
        <PageContainer isSidebarOpen={isSidebarOpen}>
            <h1>Cadastro de Pedido:</h1>
            <FormWrapper>
                <InputField label="Nome do Cliente" placeholder="Nome do cliente"
                    value={clientName} onChange={(e) => setClientName(e.target.value)} />
                <InputField label="Data" type="date"
                    value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />

                <InputField label="Adicionar Item" placeholder="Ex: Bolo de Laranja"
                    value={newItem} onChange={(e) => setNewItem(e.target.value)} />
                <Button variant="secondary" onClick={handleAddItem} style={{ marginTop: '10px' }}>Adicionar Item</Button>

                {selectedItems.length > 0 && (
                    <>
                        <p style={{ marginTop: '20px' }}>Itens Selecionados:</p>
                        <ItemList>
                            {selectedItems.map((item, index) => (
                                <ListItem key={index}>
                                    {index + 1}. {item.name} - R${item.price.toFixed(2)}
                                    <Button size="sm" variant="danger" onClick={() => handleRemoveItem(index)}>Remover</Button>
                                </ListItem>
                            ))}
                        </ItemList>
                    </>
                )}

                <p style={{ marginTop: '15px', fontWeight: 'bold' }}>Valor Total: R$ {totalValue.toFixed(2)}</p>

                <label style={{ display: 'block', marginTop: '15px', color: '#555' }}>Forma de Pagamento</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}>
                    <option value="">Selecione...</option>
                    <option value="Cartão">Cartão</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">Pix</option>
                </select>

                <Button onClick={handleFinalizeOrder} style={{ width: '100%', marginTop: '20px' }}>Finalizar Pedido</Button>

                {feedback && <p style={{ marginTop: '15px', color: feedback.includes('sucesso') ? 'green' : 'red' }}>{feedback}</p>}

                <Title style={{ marginTop: '40px' }}>Pedidos em Andamento</Title>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #eee', padding: '8px', backgroundColor: '#f2f2f2' }}>Cliente</th>
                            <th style={{ border: '1px solid #eee', padding: '8px', backgroundColor: '#f2f2f2' }}>Pedido</th>
                            <th style={{ border: '1px solid #eee', padding: '8px', backgroundColor: '#f2f2f2' }}>Valor</th>
                            <th style={{ border: '1px solid #eee', padding: '8px', backgroundColor: '#f2f2f2' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>Ana Maria</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>#101</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>R$100,00</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}><StatusBadge status="Concluído">Concluído</StatusBadge></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>Augusto</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>#102</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>R$55,90</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}><StatusBadge status="Em andamento">Em andamento</StatusBadge></td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>Helena</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>#103</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}>R$15,00</td>
                            <td style={{ border: '1px solid #eee', padding: '8px' }}><StatusBadge status="Pendente">Pendente</StatusBadge></td>
                        </tr>
                    </tbody>
                </table>
            </FormWrapper>
        </PageContainer>
    );
}

export default OrderRegistrationPage;
