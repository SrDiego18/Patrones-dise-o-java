package co.edu.patrones.comportamentales.strategy;

/**
 * Estrategia agregada para demostrar el principio abierto/cerrado:
 * se incorpora un proveedor nuevo SIN modificar CalculadoraEnvio.
 */
public class EnvioInternacional implements EstrategiaEnvio {
    private static final double TARIFA_FIJA = 15000;

    @Override
    public double calcular(double peso) {
        return TARIFA_FIJA + peso * 4000;
    }
}
