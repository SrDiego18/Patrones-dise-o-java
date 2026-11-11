package co.edu.patrones.comportamentales.state;

/**
 * State: cada estado decide qué hacer ante cada operación.
 * Por defecto toda operación es inválida; cada estado concreto habilita solo sus transiciones.
 */
public interface EstadoPedido {
    String nombre();

    default void pagar(PedidoTienda pedido) {
        throw new IllegalStateException("No se puede pagar un pedido " + nombre());
    }

    default void enviar(PedidoTienda pedido) {
        throw new IllegalStateException("No se puede enviar un pedido " + nombre());
    }

    default void cancelar(PedidoTienda pedido) {
        throw new IllegalStateException("No se puede cancelar un pedido " + nombre());
    }
}
