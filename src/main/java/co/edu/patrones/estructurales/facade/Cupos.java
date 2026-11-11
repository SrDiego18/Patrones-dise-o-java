package co.edu.patrones.estructurales.facade;

/** Subsistema: administra los cupos disponibles. */
public class Cupos {
    private int disponibles;

    public Cupos() {
        this(30);
    }

    public Cupos(int disponibles) {
        this.disponibles = disponibles;
    }

    public boolean reservar() {
        if (disponibles <= 0) {
            System.out.println("Sin cupos disponibles");
            return false;
        }
        disponibles--;
        System.out.println("Cupo reservado");
        return true;
    }

    public int getDisponibles() {
        return disponibles;
    }
}
