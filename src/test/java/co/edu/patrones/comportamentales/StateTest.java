package co.edu.patrones.comportamentales;

import co.edu.patrones.comportamentales.state.PedidoTienda;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("State - ciclo de vida del pedido (trabajo autónomo)")
class StateTest {

    @Test
    @DisplayName("Prueba 1: flujo feliz CREADO -> PAGADO -> ENVIADO")
    void flujoFeliz() {
        PedidoTienda p = new PedidoTienda("P-1", 50000);
        assertEquals("CREADO", p.getEstado());
        p.pagar();
        assertEquals("PAGADO", p.getEstado());
        p.enviar();
        assertEquals("ENVIADO", p.getEstado());
    }

    @Test
    @DisplayName("Prueba 2: la cancelación tiene reglas distintas según el estado")
    void cancelacionSegunEstado() {
        PedidoTienda creado = new PedidoTienda("P-2", 50000);
        creado.cancelar();
        assertEquals("CANCELADO", creado.getEstado());
        assertEquals(0, creado.getReembolso(), 0.001);

        PedidoTienda pagado = new PedidoTienda("P-3", 50000);
        pagado.pagar();
        pagado.cancelar();
        assertEquals("CANCELADO", pagado.getEstado());
        assertEquals(50000, pagado.getReembolso(), 0.001);
    }

    @Test
    @DisplayName("Prueba 3: transiciones inválidas son rechazadas")
    void transicionesInvalidas() {
        PedidoTienda p = new PedidoTienda("P-4", 50000);
        assertThrows(IllegalStateException.class, p::enviar);   // no se envía sin pagar
        p.pagar();
        p.enviar();
        assertThrows(IllegalStateException.class, p::cancelar); // enviado no se cancela
        assertEquals("ENVIADO", p.getEstado());
    }
}
