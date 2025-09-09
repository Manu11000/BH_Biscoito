import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Registrando os componentes da Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    ChartDataLabels,
    Legend
);

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

const ReportsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
`;

const ReportCard = styled.div`
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    text-align: center;
`;

const StatTitle = styled.h3`
    color: #A0522D;
    font-size: 1.2em;
    margin-bottom: 10px;
`;

const StatValue = styled.p`
    font-size: 2em;
    font-weight: bold;
    color: #5C4033;
    margin: 0;
`;

const ChartContainer = styled.div`
    background-color: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    margin-top: 20px;
    text-align: center;
`;

const ChartPlaceholder = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    background-color: #A0522D;
    color: white;
    padding: 10px 20px;
    margin: 10px 5px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s ease;

    &:hover {
        background-color: #7A4222;
    }
`;

function ReportsPage({ isSidebarOpen }) {
    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            datalabels: {
                color: '#fff',
                font: { weight: 'bold', size: 10 },
            }
        },
        scales: { y: { beginAtZero: true } }
    };

    const optionsPie = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            datalabels: {
                formatter: (value, ctx) => {
                    const datapoints = ctx.chart.data.datasets[0].data;
                    const total = datapoints.reduce((t, d) => t + d, 0);
                    return ((value / total) * 100).toFixed(1) + "%";
                },
                color: '#fff',
                font: { weight: 'bold', size: 8 }
            }
        },
    };

    const labels = [''];
    const data = {
        labels,
        datasets: [
            { label: 'Bolos', data: [1900], backgroundColor: '#FFB800' },
            { label: 'Pães', data: [2500], backgroundColor: '#884D2F' },
            { label: 'Biscoitos', data: [4050], backgroundColor: '#A0A0A0' },
        ],
    };

    const dataPie = {
        labels: ['Pix', 'Dinheiro', 'Cartão'],
        datasets: [{ data: [12.5, 62.5, 25], backgroundColor: ['#FFB800', '#884D2F', '#A0A0A0'] }]
    };

    // 🔹 Função para exportar PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Relatório de Vendas", 14, 20);

        doc.autoTable({
            head: [['Indicador', 'Valor']],
            body: [
                ['Pedidos no Mês', '#300'],
                ['Semana com mais Vendas', '08-15 de Maio'],
                ['Total Vendido', 'R$ 8.500,00'],
            ],
            startY: 30,
        });

        doc.save("relatorio.pdf");
    };

    // 🔹 Função para exportar CSV
    const exportCSV = () => {
        const rows = [
            ["Indicador", "Valor"],
            ["Pedidos no Mês", "#300"],
            ["Semana com mais Vendas", "08-15 de Maio"],
            ["Total Vendido", "R$ 8.500,00"],
        ];
        const csvContent =
            "data:text/csv;charset=utf-8," +
            rows.map((e) => e.join(",")).join("\n");

        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = "relatorio.csv";
        link.click();
    };

    return (
        <PageContainer isSidebarOpen={isSidebarOpen}>
            <h1>Relatórios</h1>

            <ReportsGrid>
                <ReportCard>
                    <StatTitle>Pedidos no Mês:</StatTitle>
                    <StatValue>#130</StatValue>
                </ReportCard>
                <ReportCard>
                    <StatTitle>Semana com mais Vendas:</StatTitle>
                    <StatValue>01-05 de Setembro</StatValue>
                </ReportCard>
                <ReportCard>
                    <StatTitle>Total Vendido:</StatTitle>
                    <StatValue>R$2.500,00</StatValue>
                </ReportCard>
            </ReportsGrid>

            {/* Botões de Exportação */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Button onClick={exportPDF}>📄 Baixar PDF</Button>
                <Button onClick={exportCSV}>📊 Exportar CSV</Button>
            </div>

            <ChartContainer>
                <StatTitle>Vendas por Categorias</StatTitle>
                <ChartPlaceholder>
                    <Bar options={options} data={data} />
                </ChartPlaceholder>
            </ChartContainer>

            <ChartContainer>
                <StatTitle>Formas de Pagamento</StatTitle>
                <ChartPlaceholder>
                    <Pie options={optionsPie} data={dataPie} />
                </ChartPlaceholder>
            </ChartContainer>
        </PageContainer>
    );
}

export default ReportsPage;
