package co.edu.patrones.comportamentales.strategy;

/**
 * Paso 1 (código inicial, ANTES del patrón). Se conserva solo para comparar:
 * cada proveedor nuevo obliga a modificar esta clase (viola abierto/cerrado).
 */
public class CalculadoraEnvioInicial {
    public double calcular(String tipo, double peso) {
        if (tipo.equals("ECONOMICO")) return peso * 1000;
        if (tipo.equals("EXPRESS")) return peso * 1800;
        throw new IllegalArgumentException("Tipo no soportado");
    }
}
