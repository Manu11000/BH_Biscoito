import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class ApiServer {
    public static List<Produto> produtos = new ArrayList<>();
    public static List<Pedido> pedidos = new ArrayList<>();
    public static Gson gson = new Gson();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Endpoints
        server.createContext("/api/produtos", new ProdutoHandler());
        server.createContext("/api/pedidos", new PedidoHandler());
        server.createContext("/api/chatbot", new ChatbotHandler());

        server.setExecutor(null);
        System.out.println("🚀 Servidor rodando em http://localhost:8080/api");
        server.start();
    }

    // Classe Produto
    static class Produto {
        int id;
        String name;
        double price;
        int quantity;
        String validity;
    }

    // Classe Pedido
    static class Pedido {
        int id;
        String produto;
        int quantidade;
        double preco;
        String dataHora;
    }

    // ----------------- HANDLER PRODUTOS -----------------
    static class ProdutoHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            if (method.equalsIgnoreCase("OPTIONS")) {
                ApiServer.sendResponse(exchange, 200, "");
                return;
            }

            switch (method) {
                case "GET": handleGet(exchange); break;
                case "POST": handlePost(exchange); break;
                case "PUT": handlePut(exchange); break;
                case "DELETE": handleDelete(exchange); break;
                default: ApiServer.sendResponse(exchange, 405, "Método não permitido");
            }
        }

        private void handleGet(HttpExchange exchange) throws IOException {
            String response = gson.toJson(produtos);
            ApiServer.sendResponse(exchange, 200, response);
        }

        private void handlePost(HttpExchange exchange) throws IOException {
            String body = ApiServer.readRequestBody(exchange);
            Produto novo = gson.fromJson(body, Produto.class);

            novo.id = produtos.size() + 1;
            produtos.add(novo);

            ApiServer.sendResponse(exchange, 201, gson.toJson(novo));
        }

        private void handlePut(HttpExchange exchange) throws IOException {
            String body = ApiServer.readRequestBody(exchange);
            Produto atualizado = gson.fromJson(body, Produto.class);

            for (int i = 0; i < produtos.size(); i++) {
                if (produtos.get(i).id == atualizado.id) {
                    produtos.set(i, atualizado);
                    ApiServer.sendResponse(exchange, 200, gson.toJson(atualizado));
                    return;
                }
            }
            ApiServer.sendResponse(exchange, 404, "{\"error\":\"Produto não encontrado\"}");
        }

        private void handleDelete(HttpExchange exchange) throws IOException {
            String body = ApiServer.readRequestBody(exchange);
            JsonObject json = gson.fromJson(body, JsonObject.class);
            int id = json.get("id").getAsInt();

            boolean removed = produtos.removeIf(p -> p.id == id);

            if (removed) {
                ApiServer.sendResponse(exchange, 200, "{\"message\":\"Produto removido com sucesso\"}");
            } else {
                ApiServer.sendResponse(exchange, 404, "{\"error\":\"Produto não encontrado\"}");
            }
        }
    }

    // ----------------- HANDLER PEDIDOS -----------------
    static class PedidoHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();

            if (method.equalsIgnoreCase("OPTIONS")) {
                ApiServer.sendResponse(exchange, 200, "");
                return;
            }

            switch (method) {
                case "GET": handleGet(exchange); break;
                case "POST": handlePost(exchange); break;
                default: ApiServer.sendResponse(exchange, 405, "Método não permitido");
            }
        }

        private void handleGet(HttpExchange exchange) throws IOException {
            String response = gson.toJson(pedidos);
            ApiServer.sendResponse(exchange, 200, response);
        }

        private void handlePost(HttpExchange exchange) throws IOException {
            String body = ApiServer.readRequestBody(exchange);
            Pedido novo = gson.fromJson(body, Pedido.class);

            novo.id = pedidos.size() + 1;
            novo.dataHora = java.time.LocalDateTime.now().toString();

            pedidos.add(novo);

            ApiServer.sendResponse(exchange, 201, gson.toJson(novo));
        }
    }

    // ----------------- HANDLER CHATBOT -----------------
    static class ChatbotHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            JsonObject json = new JsonObject();
            json.addProperty("message", "Olá! Eu sou o Cookie, chatbot da BH Biscoitos 😊");

            String response = gson.toJson(json);
            ApiServer.sendResponse(exchange, 200, response);
        }
    }

    // ----------------- UTILS -----------------
    public static void sendResponse(HttpExchange exchange, int status, String response) throws IOException {
        // Configuração de CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        // Resposta
        exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
        exchange.sendResponseHeaders(status, response.getBytes(StandardCharsets.UTF_8).length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes(StandardCharsets.UTF_8));
        os.close();
    }

    public static String readRequestBody(HttpExchange exchange) throws IOException {
        InputStream input = exchange.getRequestBody();
        return new String(input.readAllBytes(), StandardCharsets.UTF_8);
    }
}
