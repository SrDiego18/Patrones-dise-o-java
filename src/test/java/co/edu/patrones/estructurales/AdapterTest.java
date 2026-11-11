package co.edu.patrones.estructurales;

import co.edu.patrones.estructurales.adapter.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Adapter - pasarela de pagos")
class AdapterTest {

    @Test
    @DisplayName("Convierte pesos a centavos (125.50 -> 12550)")
    void convierteMontoACentavos() {
        PasarelaExterna pasarela = new PasarelaExterna();
        ProcesadorPago procesador = new AdaptadorPasarela(pasarela);
        procesador.pagar(125.50);
        assertEquals(12550, pasarela.getUltimoCobroEnCentavos());
    }

    @Test
    @DisplayName("Redondea correctamente montos con decimales problemáticos")
    void redondeaCorrectamente() {
        PasarelaExterna pasarela = new PasarelaExterna();
        new AdaptadorPasarela(pasarela).pagar(0.29); // 0.29*100 = 28.999... en double
        assertEquals(29, pasarela.getUltimoCobroEnCentavos());
    }

    @Test
    @DisplayName("Rechaza montos no positivos sin llamar a la pasarela")
    void rechazaMontoInvalido() {
        PasarelaExterna pasarela = new PasarelaExterna();
        ProcesadorPago procesador = new AdaptadorPasarela(pasarela);
        assertThrows(IllegalArgumentException.class, () -> procesador.pagar(0));
        assertEquals(-1, pasarela.getUltimoCobroEnCentavos());
    }
}
