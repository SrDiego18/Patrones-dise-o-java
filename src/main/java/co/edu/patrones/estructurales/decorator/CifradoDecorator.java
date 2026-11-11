package co.edu.patrones.estructurales.decorator;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * Decorador concreto: transforma el mensaje antes de delegar.
 * NOTA DIDÁCTICA: Base64 es una codificación, no un cifrado seguro.
 * En producción se usaría AES/GCM con una clave administrada (javax.crypto).
 */
public class CifradoDecorator extends NotificadorDecorator {

    public CifradoDecorator(Notificador envuelto) {
        super(envuelto);
    }

    @Override
    public String enviar(String mensaje) {
        String cifrado = Base64.getEncoder()
                .encodeToString(mensaje.getBytes(StandardCharsets.UTF_8));
        return super.enviar(cifrado);
    }

    public static String descifrar(String cifrado) {
        return new String(Base64.getDecoder().decode(cifrado), StandardCharsets.UTF_8);
    }
}
