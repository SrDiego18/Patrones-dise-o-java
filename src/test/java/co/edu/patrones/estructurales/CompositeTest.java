package co.edu.patrones.estructurales;

import co.edu.patrones.estructurales.composite.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Composite - archivos y carpetas (extra)")
class CompositeTest {

    @Test
    @DisplayName("Un archivo devuelve su propio tamaño y una carpeta vacía pesa 0")
    void hojaYCarpetaVacia() {
        assertEquals(120, new Archivo("a.txt", 120).tamano());
        assertEquals(0, new Carpeta("vacia").tamano());
    }

    @Test
    @DisplayName("Carpetas anidadas suman recursivamente el tamaño de sus hijos")
    void sumaRecursiva() {
        Carpeta raiz = new Carpeta("biblioteca")
                .agregar(new Archivo("catalogo.pdf", 300))
                .agregar(new Carpeta("libros")
                        .agregar(new Archivo("java.epub", 500))
                        .agregar(new Carpeta("patrones").agregar(new Archivo("gof.pdf", 200))));
        assertEquals(1000, raiz.tamano());
    }

    @Test
    @DisplayName("Reglas de integridad: no tamaños negativos ni carpeta dentro de sí misma")
    void integridad() {
        Carpeta c = new Carpeta("c");
        assertThrows(IllegalArgumentException.class, () -> new Archivo("x", -1));
        assertThrows(IllegalArgumentException.class, () -> c.agregar(c));
    }
}
