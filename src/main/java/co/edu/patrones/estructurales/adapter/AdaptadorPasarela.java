package co.edu.patrones.estructurales.adapter;

/**
 * Adapter: implementa la interfaz interna y traduce la llamada a la pasarela externa,
 * convirtiendo unidades (pesos -> centavos).
 */
public class AdaptadorPasarela implements ProcesadorPago {
    private final PasarelaExterna pasarela;

    public AdaptadorPasarela(PasarelaExterna pasarela) {
        this.pasarela = pasarela;
    }

    @Override
    public void pagar(double monto) {
        if (monto <= 0) {
            throw new IllegalArgumentException("El monto debe ser positivo");
        }
        int centavos = (int) Math.round(monto * 100);
        pasarela.realizarCobroEnCentavos(centavos);
    }
}
