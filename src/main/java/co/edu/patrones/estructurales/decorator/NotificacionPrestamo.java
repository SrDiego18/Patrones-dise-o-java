package co.edu.patrones.estructurales.decorator;

/** Componente concreto: notificación básica de préstamo para un usuario. */
public class NotificacionPrestamo implements Notificador {
    private final String destinatario;

    public NotificacionPrestamo(String destinatario) {
        this.destinatario = destinatario;
    }

    @Override
    public String enviar(String mensaje) {
        String entregado = "Para " + destinatario + ": " + mensaje;
        System.out.println(entregado);
        return entregado;
    }
}
