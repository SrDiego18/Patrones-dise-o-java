package co.edu.patrones.estructurales.composite;

import java.util.Objects;

/** Hoja: no tiene hijos; su tamaño es propio. */
public class Archivo implements ElementoArchivo {
    private final String nombre;
    private final long tamanoKb;

    public Archivo(String nombre, long tamanoKb) {
        if (tamanoKb < 0) throw new IllegalArgumentException("El tamaño no puede ser negativo");
        this.nombre = Objects.requireNonNull(nombre, "nombre");
        this.tamanoKb = tamanoKb;
    }

    @Override public String getNombre() { return nombre; }
    @Override public long tamano() { return tamanoKb; }

    @Override
    public String mostrar(int nivel) {
        return "  ".repeat(nivel) + "- " + nombre + " (" + tamanoKb + " KB)\n";
    }
}
