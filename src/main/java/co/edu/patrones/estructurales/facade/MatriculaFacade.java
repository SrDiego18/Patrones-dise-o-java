package co.edu.patrones.estructurales.facade;

/**
 * Facade: ofrece un único punto de entrada (matricular) y oculta al cliente
 * la secuencia validar -> reservar cupo -> confirmar.
 */
public class MatriculaFacade {
    private final Validador validador;
    private final Cupos cupos;
    private final Confirmaciones confirmaciones;

    public MatriculaFacade() {
        this(new Validador(), new Cupos(), new Confirmaciones());
    }

    /** Constructor con inyección de dependencias para facilitar las pruebas. */
    public MatriculaFacade(Validador validador, Cupos cupos, Confirmaciones confirmaciones) {
        this.validador = validador;
        this.cupos = cupos;
        this.confirmaciones = confirmaciones;
    }

    /** @return true si la matrícula quedó confirmada. */
    public boolean matricular(String estudiante) {
        if (!validador.validar(estudiante)) {
            throw new IllegalArgumentException("Estudiante inválido");
        }
        if (cupos.reservar()) {
            confirmaciones.enviar(estudiante);
            return true;
        }
        return false;
    }
}
