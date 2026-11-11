package co.edu.patrones.comportamentales;

import co.edu.patrones.comportamentales.strategy.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Strategy - cálculo de envíos")
class StrategyTest {

    @Test
    @DisplayName("Económico: 2 kg = 2000")
    void economico() {
        assertEquals(2000.0, new CalculadoraEnvio(new EnvioEconomico()).calcular(2.0), 0.001);
    }

    @Test
    @DisplayName("Cambio de estrategia en tiempo de ejecución: Express 2 kg = 3600")
    void cambioDeEstrategia() {
        CalculadoraEnvio c = new CalculadoraEnvio(new EnvioEconomico());
        c.cambiarEstrategia(new EnvioExpress());
        assertEquals(3600.0, c.calcular(2.0), 0.001);
    }

    @Test
    @DisplayName("Nueva estrategia sin modificar el contexto: Internacional 2 kg = 23000")
    void estrategiaNuevaSinModificarContexto() {
        assertEquals(23000.0, new CalculadoraEnvio(new EnvioInternacional()).calcular(2.0), 0.001);
    }

    @Test
    @DisplayName("Peso inválido es rechazado por el contexto")
    void pesoInvalido() {
        CalculadoraEnvio c = new CalculadoraEnvio(new EnvioExpress());
        assertThrows(IllegalArgumentException.class, () -> c.calcular(0));
    }

    @Test
    @DisplayName("El código inicial y la versión con Strategy dan el mismo resultado")
    void equivalenciaConCodigoInicial() {
        CalculadoraEnvioInicial antes = new CalculadoraEnvioInicial();
        assertEquals(antes.calcular("EXPRESS", 3), new CalculadoraEnvio(new EnvioExpress()).calcular(3), 0.001);
    }
}
