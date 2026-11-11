package co.edu.patrones.estructurales.decorator;

import java.util.ArrayList;
import java.util.List;

/** Decorador concreto: registra (auditoría) cada mensaje antes de delegar. */
public class RegistroDecorator extends NotificadorDecorator {
    private final List<String> bitacora = new ArrayList<>();

    public RegistroDecorator(Notificador envuelto) {
        super(envuelto);
    }

    @Override
    public String enviar(String mensaje) {
        bitacora.add("[LOG] " + mensaje);
        return super.enviar(mensaje);
    }

    public List<String> getBitacora() {
        return bitacora;
    }
}
