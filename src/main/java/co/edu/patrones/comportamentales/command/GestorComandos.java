package co.edu.patrones.comportamentales.command;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;
import java.util.ArrayList;

/**
 * Invocador: encola acciones del usuario para ejecutarlas después,
 * mantiene un historial y permite deshacer/rehacer.
 * No sabe QUÉ hace cada comando; solo llama a ejecutar()/deshacer().
 */
public class GestorComandos {
    private final Deque<Comando> cola = new ArrayDeque<>();
    private final Deque<Comando> historial = new ArrayDeque<>();
    private final Deque<Comando> rehacer = new ArrayDeque<>();
    private final List<String> bitacora = new ArrayList<>();

    public void encolar(Comando c) {
        cola.addLast(c);
    }

    /** Ejecuta todos los comandos pendientes en orden FIFO. */
    public void procesarCola() {
        while (!cola.isEmpty()) {
            Comando c = cola.pollFirst();
            c.ejecutar();
            historial.push(c);
            rehacer.clear();
            bitacora.add("EJECUTADO: " + c.descripcion());
        }
    }

    public void deshacer() {
        if (historial.isEmpty()) throw new IllegalStateException("No hay acciones para deshacer");
        Comando c = historial.pop();
        c.deshacer();
        rehacer.push(c);
        bitacora.add("DESHECHO: " + c.descripcion());
    }

    public void rehacer() {
        if (rehacer.isEmpty()) throw new IllegalStateException("No hay acciones para rehacer");
        Comando c = rehacer.pop();
        c.ejecutar();
        historial.push(c);
        bitacora.add("REHECHO: " + c.descripcion());
    }

    public int pendientes() { return cola.size(); }
    public List<String> getBitacora() { return bitacora; }
}
