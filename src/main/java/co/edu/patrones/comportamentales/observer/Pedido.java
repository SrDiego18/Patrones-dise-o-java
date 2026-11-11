package co.edu.patrones.comportamentales.observer;

import java.util.ArrayList;
import java.util.List;

/** Subject: mantiene la lista de suscriptores y los notifica cuando cambia su estado. */
public class Pedido {
    private final List<ObservadorPedido> observadores = new ArrayList<>();
    private String estado = "CREADO";

    public void suscribir(ObservadorPedido observador) {
        if (!observadores.contains(observador)) { // evita duplicados
            observadores.add(observador);
        }
    }

    public void desuscribir(ObservadorPedido observador) {
        observadores.remove(observador);
    }

    public void cambiarEstado(String nuevoEstado) {
        this.estado = nuevoEstado;
        for (ObservadorPedido o : observadores) {
            o.actualizar(estado);
        }
    }

    public String getEstado() {
        return estado;
    }
}
