package co.edu.patrones.comportamentales.state;

public class EstadoCreado implements EstadoPedido {
    @Override
    public String nombre() { return "CREADO"; }

    @Override
    public void pagar(PedidoTienda pedido) {
        pedido.cambiarEstado(new EstadoPagado());
    }

    @Override
    public void cancelar(PedidoTienda pedido) {
        // Regla: un pedido creado se cancela sin costo.
        pedido.registrarReembolso(0);
        pedido.cambiarEstado(new EstadoCancelado());
    }
}
