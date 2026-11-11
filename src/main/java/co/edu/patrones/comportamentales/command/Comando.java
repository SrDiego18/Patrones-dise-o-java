package co.edu.patrones.comportamentales.command;

/** Command: una solicitud convertida en objeto que se puede ejecutar y deshacer. */
public interface Comando {
    void ejecutar();
    void deshacer();
    String descripcion();
}
