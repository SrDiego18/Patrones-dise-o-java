package co.edu.patrones.estructurales.facade;

import java.util.ArrayList;
import java.util.List;

/** Subsistema: envía la confirmación de matrícula. */
public class Confirmaciones {
    private final List<String> enviadas = new ArrayList<>();

    public void enviar(String estudiante) {
        enviadas.add(estudiante);
        System.out.println("Confirmación enviada a " + estudiante);
    }

    public List<String> getEnviadas() {
        return enviadas;
    }
}
