package co.edu.patrones.comportamentales.observer;

/** Paso 5: observador nuevo agregado SIN modificar la clase Pedido. */
public class NotificadorSms implements ObservadorPedido {
    private int mensajesEnviados = 0;

    @Override
    public void actualizar(String estado) {
        mensajesEnviados++;
        System.out.println("SMS: tu pedido está " + estado);
    }

    public int getMensajesEnviados() {
        return mensajesEnviados;
    }
}
