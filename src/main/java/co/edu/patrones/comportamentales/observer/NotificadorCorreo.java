package co.edu.patrones.comportamentales.observer;

import java.util.ArrayList;
import java.util.List;

public class NotificadorCorreo implements ObservadorPedido {
    private final List<String> recibidos = new ArrayList<>();

    @Override
    public void actualizar(String estado) {
        recibidos.add(estado);
        System.out.println("Correo: pedido " + estado);
    }

    public List<String> getRecibidos() {
        return recibidos;
    }
}
