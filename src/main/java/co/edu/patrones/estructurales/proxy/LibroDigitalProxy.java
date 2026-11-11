package co.edu.patrones.estructurales.proxy;

/**
 * Proxy de protección + virtual:
 *  1) verifica que el usuario tenga préstamo activo (autorización);
 *  2) crea/descarga el libro real solo la primera vez que alguien autorizado lo abre (carga diferida);
 *  3) reutiliza la instancia descargada en lecturas siguientes (caché).
 */
public class LibroDigitalProxy implements LibroDigital {
    private final String titulo;
    private LibroDigitalReal libroReal; // null hasta que se necesite

    public LibroDigitalProxy(String titulo) {
        this.titulo = titulo;
    }

    @Override
    public String leer(Usuario usuario) {
        if (usuario == null || !usuario.tienePrestamoActivo()) {
            throw new SecurityException("Acceso denegado: el usuario no tiene préstamo activo");
        }
        if (libroReal == null) {
            libroReal = new LibroDigitalReal(titulo);
        }
        return libroReal.leer(usuario);
    }

    public boolean estaCargado() {
        return libroReal != null;
    }
}
