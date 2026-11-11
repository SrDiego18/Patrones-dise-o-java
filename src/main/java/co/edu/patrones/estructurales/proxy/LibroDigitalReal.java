package co.edu.patrones.estructurales.proxy;

/**
 * Sujeto real: descargar el libro es costoso (simula descarga remota en el constructor).
 */
public class LibroDigitalReal implements LibroDigital {
    private static int descargasRealizadas = 0;
    private final String titulo;
    private final String contenido;

    public LibroDigitalReal(String titulo) {
        this.titulo = titulo;
        System.out.println("Descargando '" + titulo + "' del servidor remoto...");
        this.contenido = "Contenido completo de " + titulo;
        descargasRealizadas++;
    }

    @Override
    public String leer(Usuario usuario) {
        return contenido;
    }

    public String getTitulo() {
        return titulo;
    }

    public static int getDescargasRealizadas() {
        return descargasRealizadas;
    }

    public static void reiniciarContador() {
        descargasRealizadas = 0;
    }
}
