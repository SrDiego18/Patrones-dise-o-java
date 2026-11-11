package co.edu.patrones.estructurales.facade;

/** Subsistema: valida los datos del estudiante. */
public class Validador {
    public boolean validar(String estudiante) {
        return estudiante != null && !estudiante.isBlank();
    }
}
