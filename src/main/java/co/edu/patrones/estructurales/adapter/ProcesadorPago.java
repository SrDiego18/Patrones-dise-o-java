package co.edu.patrones.estructurales.adapter;

/** Interfaz que espera nuestro sistema (Target). */
public interface ProcesadorPago {
    void pagar(double monto);
}
