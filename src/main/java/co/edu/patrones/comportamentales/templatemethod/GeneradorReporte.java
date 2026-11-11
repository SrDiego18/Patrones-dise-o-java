package co.edu.patrones.comportamentales.templatemethod;

import java.util.List;
import java.util.Objects;

/**
 * Template Method: generar() fija el esqueleto validar -> consultar -> transformar -> exportar.
 * Es final para que ninguna subclase altere el orden. Solo exportar() varía.
 */
public abstract class GeneradorReporte {

    public final String generar(List<Venta> ventas) {
        validar(ventas);
        List<Venta> datos = consultar(ventas);
        List<Venta> transformados = transformar(datos);
        return encabezado() + exportar(transformados);
    }

    /** Paso común: los datos deben existir. */
    private void validar(List<Venta> ventas) {
        Objects.requireNonNull(ventas, "ventas");
        if (ventas.isEmpty()) throw new IllegalArgumentException("No hay ventas para reportar");
    }

    /** Paso común: descarta ventas con monto no positivo. */
    private List<Venta> consultar(List<Venta> ventas) {
        return ventas.stream().filter(v -> v.monto() > 0).toList();
    }

    /** Paso común: ordena de mayor a menor monto. */
    private List<Venta> transformar(List<Venta> ventas) {
        return ventas.stream()
                .sorted((a, b) -> Double.compare(b.monto(), a.monto()))
                .toList();
    }

    /** Hook: opcional, por defecto vacío. */
    protected String encabezado() {
        return "";
    }

    /** Paso variable: cada formato lo implementa. */
    protected abstract String exportar(List<Venta> ventas);
}
