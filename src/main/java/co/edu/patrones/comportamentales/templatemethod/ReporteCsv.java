package co.edu.patrones.comportamentales.templatemethod;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public class ReporteCsv extends GeneradorReporte {
    @Override
    protected String encabezado() {
        return "producto,monto\n";
    }

    @Override
    protected String exportar(List<Venta> ventas) {
        return ventas.stream()
                .map(v -> v.producto() + "," + String.format(Locale.US, "%.2f", v.monto()))
                .collect(Collectors.joining("\n"));
    }
}
