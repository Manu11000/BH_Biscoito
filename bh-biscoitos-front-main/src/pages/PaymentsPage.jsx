import React, { useState, useMemo } from 'react';
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

const ContentBox = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    max-width: 800px;
    margin: 0 auto 30px auto;
`;

const Title = styled.h2`
    color: #A0522D;
    margin-bottom: 25px;
    text-align: center;
`;

const PaymentsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #A0522D;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const HighlightBox = styled.div`
    background-color: #FFF3E0;
    border: 1px solid #FFD180;
    padding: 15px;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: #A0522D;
`;

function PaymentsPage({ isSidebarOpen }) {
    const [cliente, setCliente] = useState('');
    const [valor, setValor] = useState('');
    const [metodo, setMetodo] = useState('');
    const [data, setData] = useState('');
    const [pagamentos, setPagamentos] = useState([]);

    const handleRegistrarPagamento = () => {
        if (!cliente || !valor || !metodo || !data) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoPagamento = { cliente, valor, metodo, data };
        setPagamentos([...pagamentos, novoPagamento]);

        // limpar form
        setCliente('');
        setValor('');
        setMetodo('');
        setData('');
    };

    // Calcular o método de pagamento mais frequente
    const metodoMaisFrequente = useMemo(() => {
        if (pagamentos.length === 0) return null;

        const contagem = pagamentos.reduce((acc, p) => {
            acc[p.metodo] = (acc[p.metodo] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(contagem).sort((a, b) => b[1] - a[1])[0][0];
    }, [pagamentos]);

    return (
        <PageContainer isSidebarOpen={isSidebarOpen}>
            <h1>Pagamentos</h1>

            {/* Formulário */}
            <ContentBox>
                <Title>Registrar Pagamento</Title>
                <InputField 
                    label="Cliente" 
                    placeholder="Nome do cliente" 
                    value={cliente} 
                    onChange={(e) => setCliente(e.target.value)} 
                />
                <InputField 
                    label="Valor" 
                    type="number" 
                    placeholder="0.00" 
                    value={valor} 
                    onChange={(e) => setValor(e.target.value)} 
                />
                <InputField 
                    label="Método de Pagamento" 
                    placeholder="Ex: Cartão, Pix, Dinheiro" 
                    value={metodo} 
                    onChange={(e) => setMetodo(e.target.value)} 
                />
                <InputField 
                    label="Data" 
                    type="date" 
                    value={data} 
                    onChange={(e) => setData(e.target.value)} 
                />
                <Button onClick={handleRegistrarPagamento} style={{ width: '100%', marginTop: '15px' }}>
                    Registrar
                </Button>
            </ContentBox>

            {/* Lista de pagamentos */}
            {pagamentos.length > 0 && (
                <ContentBox>
                    <Title>Pagamentos Registrados</Title>

                    {metodoMaisFrequente && (
                        <HighlightBox>
                            Forma de pagamento mais utilizada: <strong>{metodoMaisFrequente}</strong>
                        </HighlightBox>
                    )}

                    <PaymentsTable>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Valor</th>
                                <th>Método</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagamentos.map((p, index) => (
                                <tr key={index}>
                                    <td>{p.cliente}</td>
                                    <td>R$ {parseFloat(p.valor).toFixed(2)}</td>
                                    <td>{p.metodo}</td>
                                    <td>{p.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </PaymentsTable>
                </ContentBox>
            )}
        </PageContainer>
    );
}

export default PaymentsPage;
