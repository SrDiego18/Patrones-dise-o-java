package co.edu.patrones.comportamentales;

import co.edu.patrones.comportamentales.observer.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Observer - pedidos")
class ObserverTest {

    @Test
    @DisplayName("Todos los suscriptores reciben el nuevo estado")
    void notificaATodos() {
        Pedido pedido = new Pedido();
        NotificadorCorreo correo = new NotificadorCorreo();
        Tablero tablero = new Tablero();
        pedido.suscribir(correo);
        pedido.suscribir(tablero);

        pedido.cambiarEstado("PAGADO");

        assertEquals("PAGADO", correo.getRecibidos().get(0));
        assertEquals("PAGADO", tablero.getUltimoEstado());
    }

    @Test
    @DisplayName("Se agrega un observador nuevo (SMS) sin modificar Pedido; no hay duplicados")
    void nuevoObservadorSinDuplicados() {
        Pedido pedido = new Pedido();
        NotificadorSms sms = new NotificadorSms();
        pedido.suscribir(sms);
        pedido.suscribir(sms); // duplicado ignorado

        pedido.cambiarEstado("ENVIADO");
        assertEquals(1, sms.getMensajesEnviados());
    }

    @Test
    @DisplayName("Un observador desuscrito deja de recibir notificaciones")
    void desuscribir() {
        Pedido pedido = new Pedido();
        NotificadorCorreo correo = new NotificadorCorreo();
        pedido.suscribir(correo);
        pedido.cambiarEstado("PAGADO");
        pedido.desuscribir(correo);
        pedido.cambiarEstado("ENVIADO");

        assertEquals(1, correo.getRecibidos().size());
    }
}
