package co.edu.patrones.comportamentales.observer;

/** Observer: contrato de quien quiere enterarse de los cambios del pedido. */
public interface ObservadorPedido {
    void actualizar(String nuevoEstado);
}
