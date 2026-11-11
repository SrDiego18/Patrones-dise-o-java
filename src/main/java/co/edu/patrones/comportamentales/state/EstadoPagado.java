package co.edu.patrones.comportamentales.state;

public class EstadoPagado implements EstadoPedido {
    @Override
    public String nombre() { return "PAGADO"; }

    @Override
    public void enviar(PedidoTienda pedido) {
        pedido.cambiarEstado(new EstadoEnviado());
    }

    @Override
    public void cancelar(PedidoTienda pedido) {
        // Regla: un pedido pagado se cancela con reembolso total.
        pedido.registrarReembolso(pedido.getTotal());
        pedido.cambiarEstado(new EstadoCancelado());
    }
}
