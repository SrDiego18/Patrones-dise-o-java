package co.edu.patrones.comportamentales.command;

public class QuitarProductoComando implements Comando {
    private final CarritoPedido carrito;
    private final String producto;
    private final int cantidad;

    public QuitarProductoComando(CarritoPedido carrito, String producto, int cantidad) {
        this.carrito = carrito;
        this.producto = producto;
        this.cantidad = cantidad;
    }

    @Override public void ejecutar() { carrito.quitar(producto, cantidad); }
    @Override public void deshacer() { carrito.agregar(producto, cantidad); }  // operación inversa
    @Override public String descripcion() { return "Quitar " + cantidad + " x " + producto; }
}
