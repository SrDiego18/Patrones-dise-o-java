package co.edu.patrones.estructurales.adapter;

/**
 * Clase de una librería externa (Adaptee). No podemos modificar su firma:
 * cobra en centavos enteros y con otro nombre de método.
 */
public class PasarelaExterna {
    private int ultimoCobroEnCentavos = -1;

    public void realizarCobroEnCentavos(int centavos) {
        this.ultimoCobroEnCentavos = centavos;
        System.out.println("Cobro externo: " + centavos + " centavos");
    }

    /** Solo para verificar el comportamiento en las pruebas. */
    public int getUltimoCobroEnCentavos() {
        return ultimoCobroEnCentavos;
    }
}
