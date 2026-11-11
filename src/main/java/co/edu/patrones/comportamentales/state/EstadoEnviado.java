package co.edu.patrones.comportamentales.state;

/** Un pedido enviado no admite pago, reenvío ni cancelación (hereda los métodos por defecto). */
public class EstadoEnviado implements EstadoPedido {
    @Override
    public String nombre() { return "ENVIADO"; }
}
