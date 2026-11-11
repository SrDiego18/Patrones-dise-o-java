package co.edu.patrones.comportamentales.strategy;

/** Contexto: conoce la interfaz, no la fórmula concreta, y delega el cálculo. */
public class CalculadoraEnvio {
    private EstrategiaEnvio estrategia;

    public CalculadoraEnvio(EstrategiaEnvio estrategia) {
        this.estrategia = estrategia;
    }

    public double calcular(double peso) {
        if (peso <= 0) throw new IllegalArgumentException("Peso inválido");
        return estrategia.calcular(peso);
    }

    public void cambiarEstrategia(EstrategiaEnvio estrategia) {
        this.estrategia = estrategia;
    }
}
