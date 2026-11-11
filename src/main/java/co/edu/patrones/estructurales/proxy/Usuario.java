package co.edu.patrones.estructurales.proxy;

/** Usuario de la biblioteca. Solo quien tiene préstamo activo puede leer. */
public record Usuario(String nombre, boolean tienePrestamoActivo) {
}
