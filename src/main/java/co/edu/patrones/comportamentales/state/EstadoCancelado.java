package co.edu.patrones.comportamentales.state;

/** Estado final: ninguna operación es válida. */
public class EstadoCancelado implements EstadoPedido {
    @Override
    public String nombre() { return "CANCELADO"; }
}
