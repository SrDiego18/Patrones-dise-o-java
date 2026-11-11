package co.edu.patrones.estructurales;

import co.edu.patrones.estructurales.facade.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Facade - matrícula")
class FacadeTest {

    @Test
    @DisplayName("Matrícula válida: reserva cupo y envía confirmación")
    void matriculaExitosa() {
        Cupos cupos = new Cupos(2);
        Confirmaciones conf = new Confirmaciones();
        MatriculaFacade facade = new MatriculaFacade(new Validador(), cupos, conf);

        assertTrue(facade.matricular("Ana"));
        assertEquals(1, cupos.getDisponibles());
        assertEquals(1, conf.getEnviadas().size());
    }

    @Test
    @DisplayName("Estudiante vacío: lanza excepción y no consume cupo")
    void estudianteInvalido() {
        Cupos cupos = new Cupos(2);
        MatriculaFacade facade = new MatriculaFacade(new Validador(), cupos, new Confirmaciones());

        assertThrows(IllegalArgumentException.class, () -> facade.matricular("  "));
        assertEquals(2, cupos.getDisponibles());
    }

    @Test
    @DisplayName("Sin cupos: no se envía confirmación")
    void sinCupos() {
        Confirmaciones conf = new Confirmaciones();
        MatriculaFacade facade = new MatriculaFacade(new Validador(), new Cupos(0), conf);

        assertFalse(facade.matricular("Luis"));
        assertTrue(conf.getEnviadas().isEmpty());
    }
}
