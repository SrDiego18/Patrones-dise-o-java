package co.edu.patrones.comportamentales.state;

/**
 * Contexto: delega cada operación en su estado actual.
 * No contiene ningún if/switch sobre el estado.
 */
public class PedidoTienda {
    private final String codigo;
    private final double total;
    private EstadoPedido estado = new EstadoCreado();
    private double reembolso = 0;

    public PedidoTienda(String codigo, double total) {
        if (total <= 0) throw new IllegalArgumentException("Total inválido");
        this.codigo = codigo;
        this.total = total;
    }

    public void pagar()    { estado.pagar(this); }
    public void enviar()   { estado.enviar(this); }
    public void cancelar() { estado.cancelar(this); }

    // Visibilidad de paquete: solo los estados cambian el estado.
    void cambiarEstado(EstadoPedido nuevo) {
        System.out.println("Pedido " + codigo + ": " + estado.nombre() + " -> " + nuevo.nombre());
        this.estado = nuevo;
    }

    void registrarReembolso(double monto) {
        this.reembolso = monto;
    }

    public String getEstado()    { return estado.nombre(); }
    public double getTotal()     { return total; }
    public double getReembolso() { return reembolso; }
    public String getCodigo()    { return codigo; }
}
