package co.edu.patrones.estructurales.proxy;

/** Sujeto: contrato común del libro real y de su proxy. */
public interface LibroDigital {
    String leer(Usuario usuario);
}
