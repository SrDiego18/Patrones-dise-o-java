package co.edu.patrones.estructurales.composite;

/** Componente: abstracción común para hojas (Archivo) y contenedores (Carpeta). */
public interface ElementoArchivo {
    String getNombre();

    /** Tamaño en KB. En una carpeta es la suma recursiva de sus hijos. */
    long tamano();

    /** Representación en árbol con sangría según la profundidad. */
    String mostrar(int nivel);
}
