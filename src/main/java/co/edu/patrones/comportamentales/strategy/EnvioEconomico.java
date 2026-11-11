package co.edu.patrones.comportamentales.strategy;

public class EnvioEconomico implements EstrategiaEnvio {
    @Override
    public double calcular(double peso) {
        return peso * 1000;
    }
}
