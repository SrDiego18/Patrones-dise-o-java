package co.edu.patrones.comportamentales.command;

public class AgregarProductoComando implements Comando {
    private final CarritoPedido carrito;
    private final String producto;
    private final int cantidad;

    public AgregarProductoComando(CarritoPedido carrito, String producto, int cantidad) {
        this.carrito = carrito;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    @Override public void ejecutar() { carrito.agregar(producto, cantidad); }
    @Override public void deshacer() { carrito.quitar(producto, cantidad); }   // operación inversa
    @Override public String descripcion() { return "Agregar " + cantidad + " x " + producto; }
}
