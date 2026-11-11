package co.edu.patrones.estructurales;

import co.edu.patrones.estructurales.decorator.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Decorator - notificaciones de la biblioteca (trabajo autónomo)")
class DecoratorTest {

    @Test
    @DisplayName("Escenario 1: notificación base sin decorar")
    void notificacionBase() {
        Notificador n = new NotificacionPrestamo("ana");
        assertEquals("Para ana: Libro listo", n.enviar("Libro listo"));
    }

    @Test
    @DisplayName("Escenario 2: el registro guarda el mensaje y no altera el contenido")
    void registroAgregaBitacora() {
        RegistroDecorator conRegistro = new RegistroDecorator(new NotificacionPrestamo("ana"));
        String entregado = conRegistro.enviar("Libro listo");

        assertEquals("Para ana: Libro listo", entregado);
        assertEquals(1, conRegistro.getBitacora().size());
        assertEquals("[LOG] Libro listo", conRegistro.getBitacora().get(0));
    }

    @Test
    @DisplayName("Escenario 3: registro + cifrado combinados; el mensaje llega cifrado y es reversible")
    void combinacionDeDecoradores() {
        RegistroDecorator n = new RegistroDecorator(
                new CifradoDecorator(new NotificacionPrestamo("ana")));
        String entregado = n.enviar("Vence mañana");

        assertFalse(entregado.contains("Vence mañana"), "El texto plano no debe viajar");
        String cifrado = entregado.substring("Para ana: ".length());
        assertEquals("Vence mañana", CifradoDecorator.descifrar(cifrado));
        assertEquals("[LOG] Vence mañana", n.getBitacora().get(0)); // se registra antes de cifrar
    }
}
