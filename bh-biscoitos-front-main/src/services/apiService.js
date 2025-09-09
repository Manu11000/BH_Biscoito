const API_URL_PRODUTOS = "http://localhost:8080/api/produtos";
const API_URL_PEDIDOS = "http://localhost:8080/api/pedidos";

// ----------------- PRODUTOS -----------------
export async function getProdutos() {
  try {
    const response = await fetch(API_URL_PRODUTOS);
    if (!response.ok) throw new Error("Erro ao buscar produtos");
    return await response.json();
  } catch (error) {
    console.error("Erro no getProdutos:", error);
    return [];
  }
}

export async function addProduto(produto) {
  try {
    const response = await fetch(API_URL_PRODUTOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
    if (!response.ok) throw new Error("Erro ao adicionar produto");
    return await response.json();
  } catch (error) {
    console.error("Erro no addProduto:", error);
    return null;
  }
}

export async function updateProduto(produto) {
  try {
    const response = await fetch(API_URL_PRODUTOS, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto),
    });
    if (!response.ok) throw new Error("Erro ao atualizar produto");
    return await response.json();
  } catch (error) {
    console.error("Erro no updateProduto:", error);
    return null;
  }
}

export async function deleteProduto(id) {
  try {
    const response = await fetch(API_URL_PRODUTOS, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error("Erro ao deletar produto");
    return await response.json();
  } catch (error) {
    console.error("Erro no deleteProduto:", error);
    return null;
  }
}

// ----------------- PEDIDOS -----------------
export async function getPedidos() {
  try {
    const response = await fetch(API_URL_PEDIDOS);
    if (!response.ok) throw new Error("Erro ao buscar pedidos");

    const data = await response.json();

    return {
      success: true,
      data: {
        pedidosDoDia: data.length,
        maisVendido: data.length > 0 ? data[0].produto : "Nenhum",
        historicoPedidos: data,
      },
    };
  } catch (error) {
    console.error("Erro no getPedidos:", error);
    return { success: false, data: { pedidosDoDia: 0, maisVendido: "Nenhum", historicoPedidos: [] } };
  }
}
