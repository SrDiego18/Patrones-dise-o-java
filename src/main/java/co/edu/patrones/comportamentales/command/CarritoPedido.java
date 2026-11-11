package co.edu.patrones.comportamentales.command;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Collections;

/** Receptor: sabe cómo agregar y quitar productos del pedido. */
public class CarritoPedido {
    private final Map<String, Integer> items = new LinkedHashMap<>();

    public void agregar(String producto, int cantidad) {
        if (cantidad <= 0) throw new IllegalArgumentException("Cantidad inválida");
        items.merge(producto, cantidad, Integer::sum);
    }

    public void quitar(String producto, int cantidad) {
        int actual = items.getOrDefault(producto, 0);
        if (cantidad > actual) throw new IllegalArgumentException("No hay suficientes unidades de " + producto);
        if (actual == cantidad) items.remove(producto);
        else items.put(producto, actual - cantidad);
    }

    public int cantidadDe(String producto) {
        return items.getOrDefault(producto, 0);
    }

    public Map<String, Integer> getItems() {
        return Collections.unmodifiableMap(new LinkedHashMap<>(items));
    }
}
