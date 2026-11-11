package co.edu.patrones.estructurales.decorator;

/**
 * Decorador base: implementa la misma interfaz y guarda una referencia al objeto envuelto.
 * Por defecto solo delega; las subclases añaden comportamiento antes o después.
 */
public abstract class NotificadorDecorator implements Notificador {
    protected final Notificador envuelto;

    protected NotificadorDecorator(Notificador envuelto) {
        this.envuelto = envuelto;
    }

    @Override
    public String enviar(String mensaje) {
        return envuelto.enviar(mensaje);
    }
}
