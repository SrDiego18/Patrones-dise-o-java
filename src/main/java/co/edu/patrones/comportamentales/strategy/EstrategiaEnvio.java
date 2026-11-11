package co.edu.patrones.comportamentales.strategy;

/** Strategy: contrato común de las fórmulas de envío. */
public interface EstrategiaEnvio {
    double calcular(double peso);
}
