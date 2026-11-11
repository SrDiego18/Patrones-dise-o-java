package co.edu.patrones.estructurales.composite;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/** Compuesto: contiene elementos (archivos o carpetas) y delega en ellos. */
public class Carpeta implements ElementoArchivo {
    private final String nombre;
    private final List<ElementoArchivo> hijos = new ArrayList<>();

    public Carpeta(String nombre) {
        this.nombre = Objects.requireNonNull(nombre, "nombre");
    }

    public Carpeta agregar(ElementoArchivo elemento) {
        Objects.requireNonNull(elemento, "elemento");
        if (elemento == this) throw new IllegalArgumentException("Una carpeta no puede contenerse a sí misma");
        hijos.add(elemento);
        return this; // interfaz fluida
    }

    public void eliminar(ElementoArchivo elemento) {
        hijos.remove(elemento);
    }

    public List<ElementoArchivo> getHijos() {
        return Collections.unmodifiableList(hijos);
    }

    @Override public String getNombre() { return nombre; }

    @Override
    public long tamano() {
        // Recursión polimórfica: no importa si el hijo es Archivo o Carpeta.
        return hijos.stream().mapToLong(ElementoArchivo::tamano).sum();
    }

    @Override
    public String mostrar(int nivel) {
        StringBuilder sb = new StringBuilder("  ".repeat(nivel))
                .append("+ ").append(nombre).append("/ (").append(tamano()).append(" KB)\n");
        hijos.forEach(h -> sb.append(h.mostrar(nivel + 1)));
        return sb.toString();
    }
}
