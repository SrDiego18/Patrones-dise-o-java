package co.edu.patrones.comportamentales.strategy;

public class EnvioExpress implements EstrategiaEnvio {
    @Override
    public double calcular(double peso) {
        return peso * 1800;
    }
}
