package co.edu.patrones;

import co.edu.patrones.comportamentales.command.*;
import co.edu.patrones.comportamentales.observer.*;
import co.edu.patrones.comportamentales.state.PedidoTienda;
import co.edu.patrones.comportamentales.strategy.*;
import co.edu.patrones.comportamentales.templatemethod.*;
import co.edu.patrones.estructurales.adapter.*;
import co.edu.patrones.estructurales.composite.*;

import java.util.List;
import co.edu.patrones.estructurales.decorator.*;
import co.edu.patrones.estructurales.facade.MatriculaFacade;
import co.edu.patrones.estructurales.proxy.*;

/** Demostración ejecutable de los 10 patrones del repositorio. */
public class Main {
    public static void main(String[] args) {
        titulo("PATRONES ESTRUCTURALES");

        seccion("Adapter (laboratorio)");
        ProcesadorPago procesador = new AdaptadorPasarela(new PasarelaExterna());
        procesador.pagar(125.50);                       // Cobro externo: 12550 centavos

        seccion("Facade (laboratorio)");
        new MatriculaFacade().matricular("Ana Pérez");

        seccion("Decorator (trabajo autónomo - biblioteca)");
        Notificador notificador =
                new RegistroDecorator(new CifradoDecorator(new NotificacionPrestamo("ana@biblioteca.edu")));
        notificador.enviar("Tu préstamo vence mañana");

        seccion("Proxy (trabajo autónomo - biblioteca)");
        LibroDigital libro = new LibroDigitalProxy("Design Patterns");
        try {
            libro.leer(new Usuario("Invitado", false));
        } catch (SecurityException e) {
            System.out.println(e.getMessage());
        }
        Usuario lector = new Usuario("Ana", true);
        System.out.println(libro.leer(lector));         // descarga aquí
        System.out.println(libro.leer(lector));         // usa la caché

        seccion("Composite (extra - archivos y carpetas)");
        Carpeta raiz = new Carpeta("biblioteca")
                .agregar(new Archivo("catalogo.pdf", 300))
                .agregar(new Carpeta("libros")
                        .agregar(new Archivo("java.epub", 500))
                        .agregar(new Archivo("gof.pdf", 200)));
        System.out.print(raiz.mostrar(0));

        titulo("PATRONES COMPORTAMENTALES");

        seccion("Strategy (laboratorio)");
        CalculadoraEnvio calculadora = new CalculadoraEnvio(new EnvioEconomico());
        System.out.println(calculadora.calcular(2.0));  // 2000.0
        calculadora.cambiarEstrategia(new EnvioExpress());
        System.out.println(calculadora.calcular(2.0));  // 3600.0

        seccion("Observer (laboratorio)");
        Pedido pedido = new Pedido();
        pedido.suscribir(new NotificadorCorreo());
        pedido.suscribir(new Tablero());
        pedido.cambiarEstado("PAGADO");

        seccion("State (trabajo autónomo - pedidos)");
        PedidoTienda p = new PedidoTienda("P-001", 85000);
        p.pagar();
        p.enviar();
        try {
            p.cancelar();
        } catch (IllegalStateException e) {
            System.out.println("Regla de negocio: " + e.getMessage());
        }

        seccion("Command (trabajo autónomo - pedidos)");
        CarritoPedido carrito = new CarritoPedido();
        GestorComandos gestor = new GestorComandos();
        gestor.encolar(new AgregarProductoComando(carrito, "Cuaderno", 3));
        gestor.encolar(new AgregarProductoComando(carrito, "Lápiz", 5));
        System.out.println("Pendientes en cola: " + gestor.pendientes() + " | carrito: " + carrito.getItems());
        gestor.procesarCola();
        System.out.println("Tras procesar: " + carrito.getItems());
        gestor.deshacer();
        System.out.println("Tras deshacer: " + carrito.getItems());
        gestor.getBitacora().forEach(System.out::println);

        seccion("Template Method (extra - reportes)");
        List<Venta> ventas = List.of(new Venta("Cuaderno", 5000), new Venta("Libro", 42000.5));
        System.out.println(new ReporteCsv().generar(ventas));
        System.out.println(new ReporteJson().generar(ventas));
    }

    private static void titulo(String t) {
        System.out.println("\n==================== " + t + " ====================");
    }

    private static void seccion(String s) {
        System.out.println("\n--- " + s + " ---");
    }
}
