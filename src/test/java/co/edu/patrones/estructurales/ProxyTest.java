package co.edu.patrones.estructurales;

import co.edu.patrones.estructurales.proxy.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Proxy - libro digital de la biblioteca (trabajo autónomo)")
class ProxyTest {

    @BeforeEach
    void reiniciar() {
        LibroDigitalReal.reiniciarContador();
    }

    @Test
    @DisplayName("Escenario 1: usuario sin préstamo es rechazado y el libro NO se descarga")
    void accesoDenegado() {
        LibroDigitalProxy proxy = new LibroDigitalProxy("Clean Code");
        assertThrows(SecurityException.class, () -> proxy.leer(new Usuario("Invitado", false)));
        assertFalse(proxy.estaCargado());
        assertEquals(0, LibroDigitalReal.getDescargasRealizadas());
    }

    @Test
    @DisplayName("Escenario 2: carga diferida, solo descarga al abrir")
    void cargaDiferida() {
        LibroDigitalProxy proxy = new LibroDigitalProxy("Clean Code");
        assertFalse(proxy.estaCargado(), "Crear el proxy no debe descargar el libro");

        String contenido = proxy.leer(new Usuario("Ana", true));
        assertTrue(proxy.estaCargado());
        assertEquals("Contenido completo de Clean Code", contenido);
    }

    @Test
    @DisplayName("Escenario 3: lecturas repetidas reutilizan la descarga (caché)")
    void cache() {
        LibroDigitalProxy proxy = new LibroDigitalProxy("Clean Code");
        Usuario ana = new Usuario("Ana", true);
        proxy.leer(ana);
        proxy.leer(ana);
        proxy.leer(ana);
        assertEquals(1, LibroDigitalReal.getDescargasRealizadas());
    }
}
