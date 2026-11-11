package co.edu.patrones.comportamentales;

import co.edu.patrones.comportamentales.templatemethod.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Template Method - reportes de ventas (extra)")
class TemplateMethodTest {

    private final List<Venta> ventas = List.of(
            new Venta("Cuaderno", 5000), new Venta("Anulada", 0), new Venta("Libro", 42000.5));

    @Test
    @DisplayName("CSV: encabezado, filtra montos inválidos y ordena de mayor a menor")
    void csv() {
        assertEquals("producto,monto\nLibro,42000.50\nCuaderno,5000.00", new ReporteCsv().generar(ventas));
    }

    @Test
    @DisplayName("JSON: mismos pasos comunes, solo cambia la exportación")
    void json() {
        assertEquals("[{\"producto\":\"Libro\",\"monto\":42000.50},{\"producto\":\"Cuaderno\",\"monto\":5000.00}]",
                new ReporteJson().generar(ventas));
    }

    @Test
    @DisplayName("La validación común aplica a todos los formatos")
    void validacionComun() {
        assertThrows(IllegalArgumentException.class, () -> new ReporteCsv().generar(List.of()));
        assertThrows(IllegalArgumentException.class, () -> new ReporteJson().generar(List.of()));
    }
}
