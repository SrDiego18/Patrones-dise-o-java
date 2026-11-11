package co.edu.patrones.comportamentales.observer;

public class Tablero implements ObservadorPedido {
    private String ultimoEstado;

    @Override
    public void actualizar(String estado) {
        ultimoEstado = estado;
        System.out.println("Tablero actualizado: " + estado);
    }

    public String getUltimoEstado() {
        return ultimoEstado;
    }
}
