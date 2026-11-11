package co.edu.patrones.estructurales.decorator;

/** Componente: contrato común de cualquier notificación de la biblioteca. */
public interface Notificador {
    /** Envía el mensaje y devuelve el contenido final que se entregó. */
    String enviar(String mensaje);
}
