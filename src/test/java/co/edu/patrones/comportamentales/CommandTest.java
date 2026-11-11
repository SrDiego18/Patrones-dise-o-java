package co.edu.patrones.comportamentales;

import co.edu.patrones.comportamentales.command.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Command - acciones sobre el carrito del pedido (trabajo autónomo)")
class CommandTest {

    @Test
    @DisplayName("Prueba 1: las acciones encoladas no se ejecutan hasta procesar la cola")
    void colaDiferida() {
        CarritoPedido carrito = new CarritoPedido();
        GestorComandos gestor = new GestorComandos();
        gestor.encolar(new AgregarProductoComando(carrito, "Cuaderno", 2));

        assertEquals(1, gestor.pendientes());
        assertEquals(0, carrito.cantidadDe("Cuaderno"));

        gestor.procesarCola();
        assertEquals(0, gestor.pendientes());
        assertEquals(2, carrito.cantidadDe("Cuaderno"));
    }

    @Test
    @DisplayName("Prueba 2: deshacer revierte en orden inverso (LIFO)")
    void deshacerEnOrdenInverso() {
        CarritoPedido carrito = new CarritoPedido();
        GestorComandos gestor = new GestorComandos();
        gestor.encolar(new AgregarProductoComando(carrito, "Lápiz", 5));
        gestor.encolar(new QuitarProductoComando(carrito, "Lápiz", 2));
        gestor.procesarCola();
        assertEquals(3, carrito.cantidadDe("Lápiz"));

        gestor.deshacer(); // revierte "quitar 2"
        assertEquals(5, carrito.cantidadDe("Lápiz"));
        gestor.deshacer(); // revierte "agregar 5"
        assertEquals(0, carrito.cantidadDe("Lápiz"));
    }

    @Test
    @DisplayName("Prueba 3: rehacer y casos límite (nada que deshacer)")
    void rehacerYCasosLimite() {
        CarritoPedido carrito = new CarritoPedido();
        GestorComandos gestor = new GestorComandos();
        assertThrows(IllegalStateException.class, gestor::deshacer);

        gestor.encolar(new AgregarProductoComando(carrito, "Borrador", 1));
        gestor.procesarCola();
        gestor.deshacer();
        gestor.rehacer();
        assertEquals(1, carrito.cantidadDe("Borrador"));
        assertEquals(3, gestor.getBitacora().size());
    }
}
