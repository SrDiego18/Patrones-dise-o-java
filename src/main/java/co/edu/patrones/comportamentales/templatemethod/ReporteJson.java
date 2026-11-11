package co.edu.patrones.comportamentales.templatemethod;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class ReporteJson extends GeneradorReporte {
    @Override
    protected String exportar(List<Venta> ventas) {
        return ventas.stream()
                .map(v -> String.format(Locale.US, "{\"producto\":\"%s\",\"monto\":%.2f}", v.producto(), v.monto()))
                .collect(Collectors.joining(",", "[", "]"));
    }
}
