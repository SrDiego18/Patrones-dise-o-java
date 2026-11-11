// Archivo generado automáticamente a partir de src/ — no editar a mano.
window.CODIGO = {
 "adapter": {
  "grupo": "estructurales",
  "archivos": [
   {
    "nombre": "AdaptadorPasarela.java",
    "src": "package co.edu.patrones.estructurales.adapter;\n\n/**\n * Adapter: implementa la interfaz interna y traduce la llamada a la pasarela externa,\n * convirtiendo unidades (pesos -> centavos).\n */\npublic class AdaptadorPasarela implements ProcesadorPago {\n    private final PasarelaExterna pasarela;\n\n    public AdaptadorPasarela(PasarelaExterna pasarela) {\n        this.pasarela = pasarela;\n    }\n\n    @Override\n    public void pagar(double monto) {\n        if (monto <= 0) {\n            throw new IllegalArgumentException(\"El monto debe ser positivo\");\n        }\n        int centavos = (int) Math.round(monto * 100);\n        pasarela.realizarCobroEnCentavos(centavos);\n    }\n}"
   },
   {
    "nombre": "PasarelaExterna.java",
    "src": "package co.edu.patrones.estructurales.adapter;\n\n/**\n * Clase de una librería externa (Adaptee). No podemos modificar su firma:\n * cobra en centavos enteros y con otro nombre de método.\n */\npublic class PasarelaExterna {\n    private int ultimoCobroEnCentavos = -1;\n\n    public void realizarCobroEnCentavos(int centavos) {\n        this.ultimoCobroEnCentavos = centavos;\n        System.out.println(\"Cobro externo: \" + centavos + \" centavos\");\n    }\n\n    /** Solo para verificar el comportamiento en las pruebas. */\n    public int getUltimoCobroEnCentavos() {\n        return ultimoCobroEnCentavos;\n    }\n}"
   },
   {
    "nombre": "ProcesadorPago.java",
    "src": "package co.edu.patrones.estructurales.adapter;\n\n/** Interfaz que espera nuestro sistema (Target). */\npublic interface ProcesadorPago {\n    void pagar(double monto);\n}"
   },
   {
    "nombre": "AdapterTest.java",
    "src": "package co.edu.patrones.estructurales;\n\nimport co.edu.patrones.estructurales.adapter.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Adapter - pasarela de pagos\")\nclass AdapterTest {\n\n    @Test\n    @DisplayName(\"Convierte pesos a centavos (125.50 -> 12550)\")\n    void convierteMontoACentavos() {\n        PasarelaExterna pasarela = new PasarelaExterna();\n        ProcesadorPago procesador = new AdaptadorPasarela(pasarela);\n        procesador.pagar(125.50);\n        assertEquals(12550, pasarela.getUltimoCobroEnCentavos());\n    }\n\n    @Test\n    @DisplayName(\"Redondea correctamente montos con decimales problemáticos\")\n    void redondeaCorrectamente() {\n        PasarelaExterna pasarela = new PasarelaExterna();\n        new AdaptadorPasarela(pasarela).pagar(0.29); // 0.29*100 = 28.999... en double\n        assertEquals(29, pasarela.getUltimoCobroEnCentavos());\n    }\n\n    @Test\n    @DisplayName(\"Rechaza montos no positivos sin llamar a la pasarela\")\n    void rechazaMontoInvalido() {\n        PasarelaExterna pasarela = new PasarelaExterna();\n        ProcesadorPago procesador = new AdaptadorPasarela(pasarela);\n        assertThrows(IllegalArgumentException.class, () -> procesador.pagar(0));\n        assertEquals(-1, pasarela.getUltimoCobroEnCentavos());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    direction LR\n    class ProcesadorPago {\n        <<interface>>\n        +pagar(double monto)\n    }\n    class AdaptadorPasarela {\n        -PasarelaExterna pasarela\n        +pagar(double monto)\n    }\n    class PasarelaExterna {\n        +realizarCobroEnCentavos(int centavos)\n    }\n    Main --> ProcesadorPago : usa\n    ProcesadorPago <|.. AdaptadorPasarela\n    AdaptadorPasarela --> PasarelaExterna : delega y convierte"
  ]
 },
 "facade": {
  "grupo": "estructurales",
  "archivos": [
   {
    "nombre": "Confirmaciones.java",
    "src": "package co.edu.patrones.estructurales.facade;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\n/** Subsistema: envía la confirmación de matrícula. */\npublic class Confirmaciones {\n    private final List<String> enviadas = new ArrayList<>();\n\n    public void enviar(String estudiante) {\n        enviadas.add(estudiante);\n        System.out.println(\"Confirmación enviada a \" + estudiante);\n    }\n\n    public List<String> getEnviadas() {\n        return enviadas;\n    }\n}"
   },
   {
    "nombre": "Cupos.java",
    "src": "package co.edu.patrones.estructurales.facade;\n\n/** Subsistema: administra los cupos disponibles. */\npublic class Cupos {\n    private int disponibles;\n\n    public Cupos() {\n        this(30);\n    }\n\n    public Cupos(int disponibles) {\n        this.disponibles = disponibles;\n    }\n\n    public boolean reservar() {\n        if (disponibles <= 0) {\n            System.out.println(\"Sin cupos disponibles\");\n            return false;\n        }\n        disponibles--;\n        System.out.println(\"Cupo reservado\");\n        return true;\n    }\n\n    public int getDisponibles() {\n        return disponibles;\n    }\n}"
   },
   {
    "nombre": "MatriculaFacade.java",
    "src": "package co.edu.patrones.estructurales.facade;\n\n/**\n * Facade: ofrece un único punto de entrada (matricular) y oculta al cliente\n * la secuencia validar -> reservar cupo -> confirmar.\n */\npublic class MatriculaFacade {\n    private final Validador validador;\n    private final Cupos cupos;\n    private final Confirmaciones confirmaciones;\n\n    public MatriculaFacade() {\n        this(new Validador(), new Cupos(), new Confirmaciones());\n    }\n\n    /** Constructor con inyección de dependencias para facilitar las pruebas. */\n    public MatriculaFacade(Validador validador, Cupos cupos, Confirmaciones confirmaciones) {\n        this.validador = validador;\n        this.cupos = cupos;\n        this.confirmaciones = confirmaciones;\n    }\n\n    /** @return true si la matrícula quedó confirmada. */\n    public boolean matricular(String estudiante) {\n        if (!validador.validar(estudiante)) {\n            throw new IllegalArgumentException(\"Estudiante inválido\");\n        }\n        if (cupos.reservar()) {\n            confirmaciones.enviar(estudiante);\n            return true;\n        }\n        return false;\n    }\n}"
   },
   {
    "nombre": "Validador.java",
    "src": "package co.edu.patrones.estructurales.facade;\n\n/** Subsistema: valida los datos del estudiante. */\npublic class Validador {\n    public boolean validar(String estudiante) {\n        return estudiante != null && !estudiante.isBlank();\n    }\n}"
   },
   {
    "nombre": "FacadeTest.java",
    "src": "package co.edu.patrones.estructurales;\n\nimport co.edu.patrones.estructurales.facade.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Facade - matrícula\")\nclass FacadeTest {\n\n    @Test\n    @DisplayName(\"Matrícula válida: reserva cupo y envía confirmación\")\n    void matriculaExitosa() {\n        Cupos cupos = new Cupos(2);\n        Confirmaciones conf = new Confirmaciones();\n        MatriculaFacade facade = new MatriculaFacade(new Validador(), cupos, conf);\n\n        assertTrue(facade.matricular(\"Ana\"));\n        assertEquals(1, cupos.getDisponibles());\n        assertEquals(1, conf.getEnviadas().size());\n    }\n\n    @Test\n    @DisplayName(\"Estudiante vacío: lanza excepción y no consume cupo\")\n    void estudianteInvalido() {\n        Cupos cupos = new Cupos(2);\n        MatriculaFacade facade = new MatriculaFacade(new Validador(), cupos, new Confirmaciones());\n\n        assertThrows(IllegalArgumentException.class, () -> facade.matricular(\"  \"));\n        assertEquals(2, cupos.getDisponibles());\n    }\n\n    @Test\n    @DisplayName(\"Sin cupos: no se envía confirmación\")\n    void sinCupos() {\n        Confirmaciones conf = new Confirmaciones();\n        MatriculaFacade facade = new MatriculaFacade(new Validador(), new Cupos(0), conf);\n\n        assertFalse(facade.matricular(\"Luis\"));\n        assertTrue(conf.getEnviadas().isEmpty());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    direction LR\n    class MatriculaFacade {\n        +matricular(String estudiante) boolean\n    }\n    class Validador { +validar(String) boolean }\n    class Cupos { +reservar() boolean }\n    class Confirmaciones { +enviar(String) }\n    Cliente --> MatriculaFacade : una sola llamada\n    MatriculaFacade --> Validador\n    MatriculaFacade --> Cupos\n    MatriculaFacade --> Confirmaciones"
  ]
 },
 "decorator": {
  "grupo": "estructurales",
  "archivos": [
   {
    "nombre": "CifradoDecorator.java",
    "src": "package co.edu.patrones.estructurales.decorator;\n\nimport java.nio.charset.StandardCharsets;\nimport java.util.Base64;\n\n/**\n * Decorador concreto: transforma el mensaje antes de delegar.\n * NOTA DIDÁCTICA: Base64 es una codificación, no un cifrado seguro.\n * En producción se usaría AES/GCM con una clave administrada (javax.crypto).\n */\npublic class CifradoDecorator extends NotificadorDecorator {\n\n    public CifradoDecorator(Notificador envuelto) {\n        super(envuelto);\n    }\n\n    @Override\n    public String enviar(String mensaje) {\n        String cifrado = Base64.getEncoder()\n                .encodeToString(mensaje.getBytes(StandardCharsets.UTF_8));\n        return super.enviar(cifrado);\n    }\n\n    public static String descifrar(String cifrado) {\n        return new String(Base64.getDecoder().decode(cifrado), StandardCharsets.UTF_8);\n    }\n}"
   },
   {
    "nombre": "NotificacionPrestamo.java",
    "src": "package co.edu.patrones.estructurales.decorator;\n\n/** Componente concreto: notificación básica de préstamo para un usuario. */\npublic class NotificacionPrestamo implements Notificador {\n    private final String destinatario;\n\n    public NotificacionPrestamo(String destinatario) {\n        this.destinatario = destinatario;\n    }\n\n    @Override\n    public String enviar(String mensaje) {\n        String entregado = \"Para \" + destinatario + \": \" + mensaje;\n        System.out.println(entregado);\n        return entregado;\n    }\n}"
   },
   {
    "nombre": "Notificador.java",
    "src": "package co.edu.patrones.estructurales.decorator;\n\n/** Componente: contrato común de cualquier notificación de la biblioteca. */\npublic interface Notificador {\n    /** Envía el mensaje y devuelve el contenido final que se entregó. */\n    String enviar(String mensaje);\n}"
   },
   {
    "nombre": "NotificadorDecorator.java",
    "src": "package co.edu.patrones.estructurales.decorator;\n\n/**\n * Decorador base: implementa la misma interfaz y guarda una referencia al objeto envuelto.\n * Por defecto solo delega; las subclases añaden comportamiento antes o después.\n */\npublic abstract class NotificadorDecorator implements Notificador {\n    protected final Notificador envuelto;\n\n    protected NotificadorDecorator(Notificador envuelto) {\n        this.envuelto = envuelto;\n    }\n\n    @Override\n    public String enviar(String mensaje) {\n        return envuelto.enviar(mensaje);\n    }\n}"
   },
   {
    "nombre": "RegistroDecorator.java",
    "src": "package co.edu.patrones.estructurales.decorator;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\n/** Decorador concreto: registra (auditoría) cada mensaje antes de delegar. */\npublic class RegistroDecorator extends NotificadorDecorator {\n    private final List<String> bitacora = new ArrayList<>();\n\n    public RegistroDecorator(Notificador envuelto) {\n        super(envuelto);\n    }\n\n    @Override\n    public String enviar(String mensaje) {\n        bitacora.add(\"[LOG] \" + mensaje);\n        return super.enviar(mensaje);\n    }\n\n    public List<String> getBitacora() {\n        return bitacora;\n    }\n}"
   },
   {
    "nombre": "DecoratorTest.java",
    "src": "package co.edu.patrones.estructurales;\n\nimport co.edu.patrones.estructurales.decorator.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Decorator - notificaciones de la biblioteca (trabajo autónomo)\")\nclass DecoratorTest {\n\n    @Test\n    @DisplayName(\"Escenario 1: notificación base sin decorar\")\n    void notificacionBase() {\n        Notificador n = new NotificacionPrestamo(\"ana\");\n        assertEquals(\"Para ana: Libro listo\", n.enviar(\"Libro listo\"));\n    }\n\n    @Test\n    @DisplayName(\"Escenario 2: el registro guarda el mensaje y no altera el contenido\")\n    void registroAgregaBitacora() {\n        RegistroDecorator conRegistro = new RegistroDecorator(new NotificacionPrestamo(\"ana\"));\n        String entregado = conRegistro.enviar(\"Libro listo\");\n\n        assertEquals(\"Para ana: Libro listo\", entregado);\n        assertEquals(1, conRegistro.getBitacora().size());\n        assertEquals(\"[LOG] Libro listo\", conRegistro.getBitacora().get(0));\n    }\n\n    @Test\n    @DisplayName(\"Escenario 3: registro + cifrado combinados; el mensaje llega cifrado y es reversible\")\n    void combinacionDeDecoradores() {\n        RegistroDecorator n = new RegistroDecorator(\n                new CifradoDecorator(new NotificacionPrestamo(\"ana\")));\n        String entregado = n.enviar(\"Vence mañana\");\n\n        assertFalse(entregado.contains(\"Vence mañana\"), \"El texto plano no debe viajar\");\n        String cifrado = entregado.substring(\"Para ana: \".length());\n        assertEquals(\"Vence mañana\", CifradoDecorator.descifrar(cifrado));\n        assertEquals(\"[LOG] Vence mañana\", n.getBitacora().get(0)); // se registra antes de cifrar\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    class Notificador {\n        <<interface>>\n        +enviar(String mensaje) String\n    }\n    class NotificacionPrestamo {\n        -String destinatario\n        +enviar(String) String\n    }\n    class NotificadorDecorator {\n        <<abstract>>\n        #Notificador envuelto\n        +enviar(String) String\n    }\n    class RegistroDecorator {\n        -List~String~ bitacora\n        +enviar(String) String\n    }\n    class CifradoDecorator {\n        +enviar(String) String\n        +descifrar(String)$ String\n    }\n    Notificador <|.. NotificacionPrestamo\n    Notificador <|.. NotificadorDecorator\n    NotificadorDecorator o--> Notificador : envuelve\n    NotificadorDecorator <|-- RegistroDecorator\n    NotificadorDecorator <|-- CifradoDecorator"
  ]
 },
 "proxy": {
  "grupo": "estructurales",
  "archivos": [
   {
    "nombre": "LibroDigital.java",
    "src": "package co.edu.patrones.estructurales.proxy;\n\n/** Sujeto: contrato común del libro real y de su proxy. */\npublic interface LibroDigital {\n    String leer(Usuario usuario);\n}"
   },
   {
    "nombre": "LibroDigitalProxy.java",
    "src": "package co.edu.patrones.estructurales.proxy;\n\n/**\n * Proxy de protección + virtual:\n *  1) verifica que el usuario tenga préstamo activo (autorización);\n *  2) crea/descarga el libro real solo la primera vez que alguien autorizado lo abre (carga diferida);\n *  3) reutiliza la instancia descargada en lecturas siguientes (caché).\n */\npublic class LibroDigitalProxy implements LibroDigital {\n    private final String titulo;\n    private LibroDigitalReal libroReal; // null hasta que se necesite\n\n    public LibroDigitalProxy(String titulo) {\n        this.titulo = titulo;\n    }\n\n    @Override\n    public String leer(Usuario usuario) {\n        if (usuario == null || !usuario.tienePrestamoActivo()) {\n            throw new SecurityException(\"Acceso denegado: el usuario no tiene préstamo activo\");\n        }\n        if (libroReal == null) {\n            libroReal = new LibroDigitalReal(titulo);\n        }\n        return libroReal.leer(usuario);\n    }\n\n    public boolean estaCargado() {\n        return libroReal != null;\n    }\n}"
   },
   {
    "nombre": "LibroDigitalReal.java",
    "src": "package co.edu.patrones.estructurales.proxy;\n\n/**\n * Sujeto real: descargar el libro es costoso (simula descarga remota en el constructor).\n */\npublic class LibroDigitalReal implements LibroDigital {\n    private static int descargasRealizadas = 0;\n    private final String titulo;\n    private final String contenido;\n\n    public LibroDigitalReal(String titulo) {\n        this.titulo = titulo;\n        System.out.println(\"Descargando '\" + titulo + \"' del servidor remoto...\");\n        this.contenido = \"Contenido completo de \" + titulo;\n        descargasRealizadas++;\n    }\n\n    @Override\n    public String leer(Usuario usuario) {\n        return contenido;\n    }\n\n    public String getTitulo() {\n        return titulo;\n    }\n\n    public static int getDescargasRealizadas() {\n        return descargasRealizadas;\n    }\n\n    public static void reiniciarContador() {\n        descargasRealizadas = 0;\n    }\n}"
   },
   {
    "nombre": "Usuario.java",
    "src": "package co.edu.patrones.estructurales.proxy;\n\n/** Usuario de la biblioteca. Solo quien tiene préstamo activo puede leer. */\npublic record Usuario(String nombre, boolean tienePrestamoActivo) {\n}"
   },
   {
    "nombre": "ProxyTest.java",
    "src": "package co.edu.patrones.estructurales;\n\nimport co.edu.patrones.estructurales.proxy.*;\nimport org.junit.jupiter.api.BeforeEach;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Proxy - libro digital de la biblioteca (trabajo autónomo)\")\nclass ProxyTest {\n\n    @BeforeEach\n    void reiniciar() {\n        LibroDigitalReal.reiniciarContador();\n    }\n\n    @Test\n    @DisplayName(\"Escenario 1: usuario sin préstamo es rechazado y el libro NO se descarga\")\n    void accesoDenegado() {\n        LibroDigitalProxy proxy = new LibroDigitalProxy(\"Clean Code\");\n        assertThrows(SecurityException.class, () -> proxy.leer(new Usuario(\"Invitado\", false)));\n        assertFalse(proxy.estaCargado());\n        assertEquals(0, LibroDigitalReal.getDescargasRealizadas());\n    }\n\n    @Test\n    @DisplayName(\"Escenario 2: carga diferida, solo descarga al abrir\")\n    void cargaDiferida() {\n        LibroDigitalProxy proxy = new LibroDigitalProxy(\"Clean Code\");\n        assertFalse(proxy.estaCargado(), \"Crear el proxy no debe descargar el libro\");\n\n        String contenido = proxy.leer(new Usuario(\"Ana\", true));\n        assertTrue(proxy.estaCargado());\n        assertEquals(\"Contenido completo de Clean Code\", contenido);\n    }\n\n    @Test\n    @DisplayName(\"Escenario 3: lecturas repetidas reutilizan la descarga (caché)\")\n    void cache() {\n        LibroDigitalProxy proxy = new LibroDigitalProxy(\"Clean Code\");\n        Usuario ana = new Usuario(\"Ana\", true);\n        proxy.leer(ana);\n        proxy.leer(ana);\n        proxy.leer(ana);\n        assertEquals(1, LibroDigitalReal.getDescargasRealizadas());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    class LibroDigital {\n        <<interface>>\n        +leer(Usuario) String\n    }\n    class LibroDigitalReal {\n        -String contenido\n        +leer(Usuario) String\n    }\n    class LibroDigitalProxy {\n        -String titulo\n        -LibroDigitalReal libroReal\n        +leer(Usuario) String\n        +estaCargado() boolean\n    }\n    class Usuario {\n        <<record>>\n        nombre\n        tienePrestamoActivo\n    }\n    LibroDigital <|.. LibroDigitalReal\n    LibroDigital <|.. LibroDigitalProxy\n    LibroDigitalProxy --> LibroDigitalReal : crea al primer acceso autorizado\n    LibroDigitalProxy ..> Usuario : verifica"
  ]
 },
 "composite": {
  "grupo": "estructurales",
  "archivos": [
   {
    "nombre": "Archivo.java",
    "src": "package co.edu.patrones.estructurales.composite;\n\nimport java.util.Objects;\n\n/** Hoja: no tiene hijos; su tamaño es propio. */\npublic class Archivo implements ElementoArchivo {\n    private final String nombre;\n    private final long tamanoKb;\n\n    public Archivo(String nombre, long tamanoKb) {\n        if (tamanoKb < 0) throw new IllegalArgumentException(\"El tamaño no puede ser negativo\");\n        this.nombre = Objects.requireNonNull(nombre, \"nombre\");\n        this.tamanoKb = tamanoKb;\n    }\n\n    @Override public String getNombre() { return nombre; }\n    @Override public long tamano() { return tamanoKb; }\n\n    @Override\n    public String mostrar(int nivel) {\n        return \"  \".repeat(nivel) + \"- \" + nombre + \" (\" + tamanoKb + \" KB)\\n\";\n    }\n}"
   },
   {
    "nombre": "Carpeta.java",
    "src": "package co.edu.patrones.estructurales.composite;\n\nimport java.util.ArrayList;\nimport java.util.Collections;\nimport java.util.List;\nimport java.util.Objects;\n\n/** Compuesto: contiene elementos (archivos o carpetas) y delega en ellos. */\npublic class Carpeta implements ElementoArchivo {\n    private final String nombre;\n    private final List<ElementoArchivo> hijos = new ArrayList<>();\n\n    public Carpeta(String nombre) {\n        this.nombre = Objects.requireNonNull(nombre, \"nombre\");\n    }\n\n    public Carpeta agregar(ElementoArchivo elemento) {\n        Objects.requireNonNull(elemento, \"elemento\");\n        if (elemento == this) throw new IllegalArgumentException(\"Una carpeta no puede contenerse a sí misma\");\n        hijos.add(elemento);\n        return this; // interfaz fluida\n    }\n\n    public void eliminar(ElementoArchivo elemento) {\n        hijos.remove(elemento);\n    }\n\n    public List<ElementoArchivo> getHijos() {\n        return Collections.unmodifiableList(hijos);\n    }\n\n    @Override public String getNombre() { return nombre; }\n\n    @Override\n    public long tamano() {\n        // Recursión polimórfica: no importa si el hijo es Archivo o Carpeta.\n        return hijos.stream().mapToLong(ElementoArchivo::tamano).sum();\n    }\n\n    @Override\n    public String mostrar(int nivel) {\n        StringBuilder sb = new StringBuilder(\"  \".repeat(nivel))\n                .append(\"+ \").append(nombre).append(\"/ (\").append(tamano()).append(\" KB)\\n\");\n        hijos.forEach(h -> sb.append(h.mostrar(nivel + 1)));\n        return sb.toString();\n    }\n}"
   },
   {
    "nombre": "ElementoArchivo.java",
    "src": "package co.edu.patrones.estructurales.composite;\n\n/** Componente: abstracción común para hojas (Archivo) y contenedores (Carpeta). */\npublic interface ElementoArchivo {\n    String getNombre();\n\n    /** Tamaño en KB. En una carpeta es la suma recursiva de sus hijos. */\n    long tamano();\n\n    /** Representación en árbol con sangría según la profundidad. */\n    String mostrar(int nivel);\n}"
   },
   {
    "nombre": "CompositeTest.java",
    "src": "package co.edu.patrones.estructurales;\n\nimport co.edu.patrones.estructurales.composite.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Composite - archivos y carpetas (extra)\")\nclass CompositeTest {\n\n    @Test\n    @DisplayName(\"Un archivo devuelve su propio tamaño y una carpeta vacía pesa 0\")\n    void hojaYCarpetaVacia() {\n        assertEquals(120, new Archivo(\"a.txt\", 120).tamano());\n        assertEquals(0, new Carpeta(\"vacia\").tamano());\n    }\n\n    @Test\n    @DisplayName(\"Carpetas anidadas suman recursivamente el tamaño de sus hijos\")\n    void sumaRecursiva() {\n        Carpeta raiz = new Carpeta(\"biblioteca\")\n                .agregar(new Archivo(\"catalogo.pdf\", 300))\n                .agregar(new Carpeta(\"libros\")\n                        .agregar(new Archivo(\"java.epub\", 500))\n                        .agregar(new Carpeta(\"patrones\").agregar(new Archivo(\"gof.pdf\", 200))));\n        assertEquals(1000, raiz.tamano());\n    }\n\n    @Test\n    @DisplayName(\"Reglas de integridad: no tamaños negativos ni carpeta dentro de sí misma\")\n    void integridad() {\n        Carpeta c = new Carpeta(\"c\");\n        assertThrows(IllegalArgumentException.class, () -> new Archivo(\"x\", -1));\n        assertThrows(IllegalArgumentException.class, () -> c.agregar(c));\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    class ElementoArchivo {\n        <<interface>>\n        +getNombre() String\n        +tamano() long\n        +mostrar(int nivel) String\n    }\n    class Archivo {\n        -long tamanoKb\n        +tamano() long\n    }\n    class Carpeta {\n        -List~ElementoArchivo~ hijos\n        +agregar(ElementoArchivo) Carpeta\n        +eliminar(ElementoArchivo)\n        +tamano() long\n    }\n    ElementoArchivo <|.. Archivo\n    ElementoArchivo <|.. Carpeta\n    Carpeta o--> \"*\" ElementoArchivo : hijos"
  ]
 },
 "strategy": {
  "grupo": "comportamentales",
  "archivos": [
   {
    "nombre": "CalculadoraEnvio.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\n/** Contexto: conoce la interfaz, no la fórmula concreta, y delega el cálculo. */\npublic class CalculadoraEnvio {\n    private EstrategiaEnvio estrategia;\n\n    public CalculadoraEnvio(EstrategiaEnvio estrategia) {\n        this.estrategia = estrategia;\n    }\n\n    public double calcular(double peso) {\n        if (peso <= 0) throw new IllegalArgumentException(\"Peso inválido\");\n        return estrategia.calcular(peso);\n    }\n\n    public void cambiarEstrategia(EstrategiaEnvio estrategia) {\n        this.estrategia = estrategia;\n    }\n}"
   },
   {
    "nombre": "CalculadoraEnvioInicial.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\n/**\n * Paso 1 (código inicial, ANTES del patrón). Se conserva solo para comparar:\n * cada proveedor nuevo obliga a modificar esta clase (viola abierto/cerrado).\n */\npublic class CalculadoraEnvioInicial {\n    public double calcular(String tipo, double peso) {\n        if (tipo.equals(\"ECONOMICO\")) return peso * 1000;\n        if (tipo.equals(\"EXPRESS\")) return peso * 1800;\n        throw new IllegalArgumentException(\"Tipo no soportado\");\n    }\n}"
   },
   {
    "nombre": "EnvioEconomico.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\npublic class EnvioEconomico implements EstrategiaEnvio {\n    @Override\n    public double calcular(double peso) {\n        return peso * 1000;\n    }\n}"
   },
   {
    "nombre": "EnvioExpress.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\npublic class EnvioExpress implements EstrategiaEnvio {\n    @Override\n    public double calcular(double peso) {\n        return peso * 1800;\n    }\n}"
   },
   {
    "nombre": "EnvioInternacional.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\n/**\n * Estrategia agregada para demostrar el principio abierto/cerrado:\n * se incorpora un proveedor nuevo SIN modificar CalculadoraEnvio.\n */\npublic class EnvioInternacional implements EstrategiaEnvio {\n    private static final double TARIFA_FIJA = 15000;\n\n    @Override\n    public double calcular(double peso) {\n        return TARIFA_FIJA + peso * 4000;\n    }\n}"
   },
   {
    "nombre": "EstrategiaEnvio.java",
    "src": "package co.edu.patrones.comportamentales.strategy;\n\n/** Strategy: contrato común de las fórmulas de envío. */\npublic interface EstrategiaEnvio {\n    double calcular(double peso);\n}"
   },
   {
    "nombre": "StrategyTest.java",
    "src": "package co.edu.patrones.comportamentales;\n\nimport co.edu.patrones.comportamentales.strategy.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Strategy - cálculo de envíos\")\nclass StrategyTest {\n\n    @Test\n    @DisplayName(\"Económico: 2 kg = 2000\")\n    void economico() {\n        assertEquals(2000.0, new CalculadoraEnvio(new EnvioEconomico()).calcular(2.0), 0.001);\n    }\n\n    @Test\n    @DisplayName(\"Cambio de estrategia en tiempo de ejecución: Express 2 kg = 3600\")\n    void cambioDeEstrategia() {\n        CalculadoraEnvio c = new CalculadoraEnvio(new EnvioEconomico());\n        c.cambiarEstrategia(new EnvioExpress());\n        assertEquals(3600.0, c.calcular(2.0), 0.001);\n    }\n\n    @Test\n    @DisplayName(\"Nueva estrategia sin modificar el contexto: Internacional 2 kg = 23000\")\n    void estrategiaNuevaSinModificarContexto() {\n        assertEquals(23000.0, new CalculadoraEnvio(new EnvioInternacional()).calcular(2.0), 0.001);\n    }\n\n    @Test\n    @DisplayName(\"Peso inválido es rechazado por el contexto\")\n    void pesoInvalido() {\n        CalculadoraEnvio c = new CalculadoraEnvio(new EnvioExpress());\n        assertThrows(IllegalArgumentException.class, () -> c.calcular(0));\n    }\n\n    @Test\n    @DisplayName(\"El código inicial y la versión con Strategy dan el mismo resultado\")\n    void equivalenciaConCodigoInicial() {\n        CalculadoraEnvioInicial antes = new CalculadoraEnvioInicial();\n        assertEquals(antes.calcular(\"EXPRESS\", 3), new CalculadoraEnvio(new EnvioExpress()).calcular(3), 0.001);\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    direction LR\n    class EstrategiaEnvio {\n        <<interface>>\n        +calcular(double peso) double\n    }\n    class CalculadoraEnvio {\n        -EstrategiaEnvio estrategia\n        +calcular(double peso) double\n        +cambiarEstrategia(EstrategiaEnvio)\n    }\n    CalculadoraEnvio o--> EstrategiaEnvio : delega\n    EstrategiaEnvio <|.. EnvioEconomico\n    EstrategiaEnvio <|.. EnvioExpress\n    EstrategiaEnvio <|.. EnvioInternacional"
  ]
 },
 "observer": {
  "grupo": "comportamentales",
  "archivos": [
   {
    "nombre": "NotificadorCorreo.java",
    "src": "package co.edu.patrones.comportamentales.observer;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\npublic class NotificadorCorreo implements ObservadorPedido {\n    private final List<String> recibidos = new ArrayList<>();\n\n    @Override\n    public void actualizar(String estado) {\n        recibidos.add(estado);\n        System.out.println(\"Correo: pedido \" + estado);\n    }\n\n    public List<String> getRecibidos() {\n        return recibidos;\n    }\n}"
   },
   {
    "nombre": "NotificadorSms.java",
    "src": "package co.edu.patrones.comportamentales.observer;\n\n/** Paso 5: observador nuevo agregado SIN modificar la clase Pedido. */\npublic class NotificadorSms implements ObservadorPedido {\n    private int mensajesEnviados = 0;\n\n    @Override\n    public void actualizar(String estado) {\n        mensajesEnviados++;\n        System.out.println(\"SMS: tu pedido está \" + estado);\n    }\n\n    public int getMensajesEnviados() {\n        return mensajesEnviados;\n    }\n}"
   },
   {
    "nombre": "ObservadorPedido.java",
    "src": "package co.edu.patrones.comportamentales.observer;\n\n/** Observer: contrato de quien quiere enterarse de los cambios del pedido. */\npublic interface ObservadorPedido {\n    void actualizar(String nuevoEstado);\n}"
   },
   {
    "nombre": "Pedido.java",
    "src": "package co.edu.patrones.comportamentales.observer;\n\nimport java.util.ArrayList;\nimport java.util.List;\n\n/** Subject: mantiene la lista de suscriptores y los notifica cuando cambia su estado. */\npublic class Pedido {\n    private final List<ObservadorPedido> observadores = new ArrayList<>();\n    private String estado = \"CREADO\";\n\n    public void suscribir(ObservadorPedido observador) {\n        if (!observadores.contains(observador)) { // evita duplicados\n            observadores.add(observador);\n        }\n    }\n\n    public void desuscribir(ObservadorPedido observador) {\n        observadores.remove(observador);\n    }\n\n    public void cambiarEstado(String nuevoEstado) {\n        this.estado = nuevoEstado;\n        for (ObservadorPedido o : observadores) {\n            o.actualizar(estado);\n        }\n    }\n\n    public String getEstado() {\n        return estado;\n    }\n}"
   },
   {
    "nombre": "Tablero.java",
    "src": "package co.edu.patrones.comportamentales.observer;\n\npublic class Tablero implements ObservadorPedido {\n    private String ultimoEstado;\n\n    @Override\n    public void actualizar(String estado) {\n        ultimoEstado = estado;\n        System.out.println(\"Tablero actualizado: \" + estado);\n    }\n\n    public String getUltimoEstado() {\n        return ultimoEstado;\n    }\n}"
   },
   {
    "nombre": "ObserverTest.java",
    "src": "package co.edu.patrones.comportamentales;\n\nimport co.edu.patrones.comportamentales.observer.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Observer - pedidos\")\nclass ObserverTest {\n\n    @Test\n    @DisplayName(\"Todos los suscriptores reciben el nuevo estado\")\n    void notificaATodos() {\n        Pedido pedido = new Pedido();\n        NotificadorCorreo correo = new NotificadorCorreo();\n        Tablero tablero = new Tablero();\n        pedido.suscribir(correo);\n        pedido.suscribir(tablero);\n\n        pedido.cambiarEstado(\"PAGADO\");\n\n        assertEquals(\"PAGADO\", correo.getRecibidos().get(0));\n        assertEquals(\"PAGADO\", tablero.getUltimoEstado());\n    }\n\n    @Test\n    @DisplayName(\"Se agrega un observador nuevo (SMS) sin modificar Pedido; no hay duplicados\")\n    void nuevoObservadorSinDuplicados() {\n        Pedido pedido = new Pedido();\n        NotificadorSms sms = new NotificadorSms();\n        pedido.suscribir(sms);\n        pedido.suscribir(sms); // duplicado ignorado\n\n        pedido.cambiarEstado(\"ENVIADO\");\n        assertEquals(1, sms.getMensajesEnviados());\n    }\n\n    @Test\n    @DisplayName(\"Un observador desuscrito deja de recibir notificaciones\")\n    void desuscribir() {\n        Pedido pedido = new Pedido();\n        NotificadorCorreo correo = new NotificadorCorreo();\n        pedido.suscribir(correo);\n        pedido.cambiarEstado(\"PAGADO\");\n        pedido.desuscribir(correo);\n        pedido.cambiarEstado(\"ENVIADO\");\n\n        assertEquals(1, correo.getRecibidos().size());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    direction LR\n    class Pedido {\n        -List~ObservadorPedido~ observadores\n        -String estado\n        +suscribir(ObservadorPedido)\n        +desuscribir(ObservadorPedido)\n        +cambiarEstado(String)\n    }\n    class ObservadorPedido {\n        <<interface>>\n        +actualizar(String nuevoEstado)\n    }\n    Pedido o--> \"*\" ObservadorPedido : notifica\n    ObservadorPedido <|.. NotificadorCorreo\n    ObservadorPedido <|.. Tablero\n    ObservadorPedido <|.. NotificadorSms"
  ]
 },
 "state": {
  "grupo": "comportamentales",
  "archivos": [
   {
    "nombre": "EstadoCancelado.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\n/** Estado final: ninguna operación es válida. */\npublic class EstadoCancelado implements EstadoPedido {\n    @Override\n    public String nombre() { return \"CANCELADO\"; }\n}"
   },
   {
    "nombre": "EstadoCreado.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\npublic class EstadoCreado implements EstadoPedido {\n    @Override\n    public String nombre() { return \"CREADO\"; }\n\n    @Override\n    public void pagar(PedidoTienda pedido) {\n        pedido.cambiarEstado(new EstadoPagado());\n    }\n\n    @Override\n    public void cancelar(PedidoTienda pedido) {\n        // Regla: un pedido creado se cancela sin costo.\n        pedido.registrarReembolso(0);\n        pedido.cambiarEstado(new EstadoCancelado());\n    }\n}"
   },
   {
    "nombre": "EstadoEnviado.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\n/** Un pedido enviado no admite pago, reenvío ni cancelación (hereda los métodos por defecto). */\npublic class EstadoEnviado implements EstadoPedido {\n    @Override\n    public String nombre() { return \"ENVIADO\"; }\n}"
   },
   {
    "nombre": "EstadoPagado.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\npublic class EstadoPagado implements EstadoPedido {\n    @Override\n    public String nombre() { return \"PAGADO\"; }\n\n    @Override\n    public void enviar(PedidoTienda pedido) {\n        pedido.cambiarEstado(new EstadoEnviado());\n    }\n\n    @Override\n    public void cancelar(PedidoTienda pedido) {\n        // Regla: un pedido pagado se cancela con reembolso total.\n        pedido.registrarReembolso(pedido.getTotal());\n        pedido.cambiarEstado(new EstadoCancelado());\n    }\n}"
   },
   {
    "nombre": "EstadoPedido.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\n/**\n * State: cada estado decide qué hacer ante cada operación.\n * Por defecto toda operación es inválida; cada estado concreto habilita solo sus transiciones.\n */\npublic interface EstadoPedido {\n    String nombre();\n\n    default void pagar(PedidoTienda pedido) {\n        throw new IllegalStateException(\"No se puede pagar un pedido \" + nombre());\n    }\n\n    default void enviar(PedidoTienda pedido) {\n        throw new IllegalStateException(\"No se puede enviar un pedido \" + nombre());\n    }\n\n    default void cancelar(PedidoTienda pedido) {\n        throw new IllegalStateException(\"No se puede cancelar un pedido \" + nombre());\n    }\n}"
   },
   {
    "nombre": "PedidoTienda.java",
    "src": "package co.edu.patrones.comportamentales.state;\n\n/**\n * Contexto: delega cada operación en su estado actual.\n * No contiene ningún if/switch sobre el estado.\n */\npublic class PedidoTienda {\n    private final String codigo;\n    private final double total;\n    private EstadoPedido estado = new EstadoCreado();\n    private double reembolso = 0;\n\n    public PedidoTienda(String codigo, double total) {\n        if (total <= 0) throw new IllegalArgumentException(\"Total inválido\");\n        this.codigo = codigo;\n        this.total = total;\n    }\n\n    public void pagar()    { estado.pagar(this); }\n    public void enviar()   { estado.enviar(this); }\n    public void cancelar() { estado.cancelar(this); }\n\n    // Visibilidad de paquete: solo los estados cambian el estado.\n    void cambiarEstado(EstadoPedido nuevo) {\n        System.out.println(\"Pedido \" + codigo + \": \" + estado.nombre() + \" -> \" + nuevo.nombre());\n        this.estado = nuevo;\n    }\n\n    void registrarReembolso(double monto) {\n        this.reembolso = monto;\n    }\n\n    public String getEstado()    { return estado.nombre(); }\n    public double getTotal()     { return total; }\n    public double getReembolso() { return reembolso; }\n    public String getCodigo()    { return codigo; }\n}"
   },
   {
    "nombre": "StateTest.java",
    "src": "package co.edu.patrones.comportamentales;\n\nimport co.edu.patrones.comportamentales.state.PedidoTienda;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"State - ciclo de vida del pedido (trabajo autónomo)\")\nclass StateTest {\n\n    @Test\n    @DisplayName(\"Prueba 1: flujo feliz CREADO -> PAGADO -> ENVIADO\")\n    void flujoFeliz() {\n        PedidoTienda p = new PedidoTienda(\"P-1\", 50000);\n        assertEquals(\"CREADO\", p.getEstado());\n        p.pagar();\n        assertEquals(\"PAGADO\", p.getEstado());\n        p.enviar();\n        assertEquals(\"ENVIADO\", p.getEstado());\n    }\n\n    @Test\n    @DisplayName(\"Prueba 2: la cancelación tiene reglas distintas según el estado\")\n    void cancelacionSegunEstado() {\n        PedidoTienda creado = new PedidoTienda(\"P-2\", 50000);\n        creado.cancelar();\n        assertEquals(\"CANCELADO\", creado.getEstado());\n        assertEquals(0, creado.getReembolso(), 0.001);\n\n        PedidoTienda pagado = new PedidoTienda(\"P-3\", 50000);\n        pagado.pagar();\n        pagado.cancelar();\n        assertEquals(\"CANCELADO\", pagado.getEstado());\n        assertEquals(50000, pagado.getReembolso(), 0.001);\n    }\n\n    @Test\n    @DisplayName(\"Prueba 3: transiciones inválidas son rechazadas\")\n    void transicionesInvalidas() {\n        PedidoTienda p = new PedidoTienda(\"P-4\", 50000);\n        assertThrows(IllegalStateException.class, p::enviar);   // no se envía sin pagar\n        p.pagar();\n        p.enviar();\n        assertThrows(IllegalStateException.class, p::cancelar); // enviado no se cancela\n        assertEquals(\"ENVIADO\", p.getEstado());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "stateDiagram-v2\n    [*] --> CREADO\n    CREADO --> PAGADO : pagar()\n    CREADO --> CANCELADO : cancelar() / reembolso 0\n    PAGADO --> ENVIADO : enviar()\n    PAGADO --> CANCELADO : cancelar() / reembolso total\n    ENVIADO --> [*]\n    CANCELADO --> [*]\n    note right of ENVIADO : cancelar() o pagar() → IllegalStateException",
   "classDiagram\n    class PedidoTienda {\n        -EstadoPedido estado\n        -double total\n        -double reembolso\n        +pagar()\n        +enviar()\n        +cancelar()\n        ~cambiarEstado(EstadoPedido)\n    }\n    class EstadoPedido {\n        <<interface>>\n        +nombre() String\n        +pagar(PedidoTienda)\n        +enviar(PedidoTienda)\n        +cancelar(PedidoTienda)\n    }\n    PedidoTienda o--> EstadoPedido : delega\n    EstadoPedido <|.. EstadoCreado\n    EstadoPedido <|.. EstadoPagado\n    EstadoPedido <|.. EstadoEnviado\n    EstadoPedido <|.. EstadoCancelado"
  ]
 },
 "command": {
  "grupo": "comportamentales",
  "archivos": [
   {
    "nombre": "AgregarProductoComando.java",
    "src": "package co.edu.patrones.comportamentales.command;\n\npublic class AgregarProductoComando implements Comando {\n    private final CarritoPedido carrito;\n    private final String producto;\n    private final int cantidad;\n\n    public AgregarProductoComando(CarritoPedido carrito, String producto, int cantidad) {\n        this.carrito = carrito;\n        this.producto = producto;\n        this.cantidad = cantidad;\n    }\n\n    @Override public void ejecutar() { carrito.agregar(producto, cantidad); }\n    @Override public void deshacer() { carrito.quitar(producto, cantidad); }   // operación inversa\n    @Override public String descripcion() { return \"Agregar \" + cantidad + \" x \" + producto; }\n}"
   },
   {
    "nombre": "CarritoPedido.java",
    "src": "package co.edu.patrones.comportamentales.command;\n\nimport java.util.LinkedHashMap;\nimport java.util.Map;\nimport java.util.Collections;\n\n/** Receptor: sabe cómo agregar y quitar productos del pedido. */\npublic class CarritoPedido {\n    private final Map<String, Integer> items = new LinkedHashMap<>();\n\n    public void agregar(String producto, int cantidad) {\n        if (cantidad <= 0) throw new IllegalArgumentException(\"Cantidad inválida\");\n        items.merge(producto, cantidad, Integer::sum);\n    }\n\n    public void quitar(String producto, int cantidad) {\n        int actual = items.getOrDefault(producto, 0);\n        if (cantidad > actual) throw new IllegalArgumentException(\"No hay suficientes unidades de \" + producto);\n        if (actual == cantidad) items.remove(producto);\n        else items.put(producto, actual - cantidad);\n    }\n\n    public int cantidadDe(String producto) {\n        return items.getOrDefault(producto, 0);\n    }\n\n    public Map<String, Integer> getItems() {\n        return Collections.unmodifiableMap(new LinkedHashMap<>(items));\n    }\n}"
   },
   {
    "nombre": "Comando.java",
    "src": "package co.edu.patrones.comportamentales.command;\n\n/** Command: una solicitud convertida en objeto que se puede ejecutar y deshacer. */\npublic interface Comando {\n    void ejecutar();\n    void deshacer();\n    String descripcion();\n}"
   },
   {
    "nombre": "GestorComandos.java",
    "src": "package co.edu.patrones.comportamentales.command;\n\nimport java.util.ArrayDeque;\nimport java.util.Deque;\nimport java.util.List;\nimport java.util.ArrayList;\n\n/**\n * Invocador: encola acciones del usuario para ejecutarlas después,\n * mantiene un historial y permite deshacer/rehacer.\n * No sabe QUÉ hace cada comando; solo llama a ejecutar()/deshacer().\n */\npublic class GestorComandos {\n    private final Deque<Comando> cola = new ArrayDeque<>();\n    private final Deque<Comando> historial = new ArrayDeque<>();\n    private final Deque<Comando> rehacer = new ArrayDeque<>();\n    private final List<String> bitacora = new ArrayList<>();\n\n    public void encolar(Comando c) {\n        cola.addLast(c);\n    }\n\n    /** Ejecuta todos los comandos pendientes en orden FIFO. */\n    public void procesarCola() {\n        while (!cola.isEmpty()) {\n            Comando c = cola.pollFirst();\n            c.ejecutar();\n            historial.push(c);\n            rehacer.clear();\n            bitacora.add(\"EJECUTADO: \" + c.descripcion());\n        }\n    }\n\n    public void deshacer() {\n        if (historial.isEmpty()) throw new IllegalStateException(\"No hay acciones para deshacer\");\n        Comando c = historial.pop();\n        c.deshacer();\n        rehacer.push(c);\n        bitacora.add(\"DESHECHO: \" + c.descripcion());\n    }\n\n    public void rehacer() {\n        if (rehacer.isEmpty()) throw new IllegalStateException(\"No hay acciones para rehacer\");\n        Comando c = rehacer.pop();\n        c.ejecutar();\n        historial.push(c);\n        bitacora.add(\"REHECHO: \" + c.descripcion());\n    }\n\n    public int pendientes() { return cola.size(); }\n    public List<String> getBitacora() { return bitacora; }\n}"
   },
   {
    "nombre": "QuitarProductoComando.java",
    "src": "package co.edu.patrones.comportamentales.command;\n\npublic class QuitarProductoComando implements Comando {\n    private final CarritoPedido carrito;\n    private final String producto;\n    private final int cantidad;\n\n    public QuitarProductoComando(CarritoPedido carrito, String producto, int cantidad) {\n        this.carrito = carrito;\n        this.producto = producto;\n        this.cantidad = cantidad;\n    }\n\n    @Override public void ejecutar() { carrito.quitar(producto, cantidad); }\n    @Override public void deshacer() { carrito.agregar(producto, cantidad); }  // operación inversa\n    @Override public String descripcion() { return \"Quitar \" + cantidad + \" x \" + producto; }\n}"
   },
   {
    "nombre": "CommandTest.java",
    "src": "package co.edu.patrones.comportamentales;\n\nimport co.edu.patrones.comportamentales.command.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Command - acciones sobre el carrito del pedido (trabajo autónomo)\")\nclass CommandTest {\n\n    @Test\n    @DisplayName(\"Prueba 1: las acciones encoladas no se ejecutan hasta procesar la cola\")\n    void colaDiferida() {\n        CarritoPedido carrito = new CarritoPedido();\n        GestorComandos gestor = new GestorComandos();\n        gestor.encolar(new AgregarProductoComando(carrito, \"Cuaderno\", 2));\n\n        assertEquals(1, gestor.pendientes());\n        assertEquals(0, carrito.cantidadDe(\"Cuaderno\"));\n\n        gestor.procesarCola();\n        assertEquals(0, gestor.pendientes());\n        assertEquals(2, carrito.cantidadDe(\"Cuaderno\"));\n    }\n\n    @Test\n    @DisplayName(\"Prueba 2: deshacer revierte en orden inverso (LIFO)\")\n    void deshacerEnOrdenInverso() {\n        CarritoPedido carrito = new CarritoPedido();\n        GestorComandos gestor = new GestorComandos();\n        gestor.encolar(new AgregarProductoComando(carrito, \"Lápiz\", 5));\n        gestor.encolar(new QuitarProductoComando(carrito, \"Lápiz\", 2));\n        gestor.procesarCola();\n        assertEquals(3, carrito.cantidadDe(\"Lápiz\"));\n\n        gestor.deshacer(); // revierte \"quitar 2\"\n        assertEquals(5, carrito.cantidadDe(\"Lápiz\"));\n        gestor.deshacer(); // revierte \"agregar 5\"\n        assertEquals(0, carrito.cantidadDe(\"Lápiz\"));\n    }\n\n    @Test\n    @DisplayName(\"Prueba 3: rehacer y casos límite (nada que deshacer)\")\n    void rehacerYCasosLimite() {\n        CarritoPedido carrito = new CarritoPedido();\n        GestorComandos gestor = new GestorComandos();\n        assertThrows(IllegalStateException.class, gestor::deshacer);\n\n        gestor.encolar(new AgregarProductoComando(carrito, \"Borrador\", 1));\n        gestor.procesarCola();\n        gestor.deshacer();\n        gestor.rehacer();\n        assertEquals(1, carrito.cantidadDe(\"Borrador\"));\n        assertEquals(3, gestor.getBitacora().size());\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    class Comando {\n        <<interface>>\n        +ejecutar()\n        +deshacer()\n        +descripcion() String\n    }\n    class GestorComandos {\n        -Deque~Comando~ cola\n        -Deque~Comando~ historial\n        -Deque~Comando~ rehacer\n        +encolar(Comando)\n        +procesarCola()\n        +deshacer()\n        +rehacer()\n    }\n    class CarritoPedido {\n        +agregar(String, int)\n        +quitar(String, int)\n    }\n    GestorComandos o--> Comando : invoca\n    Comando <|.. AgregarProductoComando\n    Comando <|.. QuitarProductoComando\n    AgregarProductoComando --> CarritoPedido : receptor\n    QuitarProductoComando --> CarritoPedido : receptor"
  ]
 },
 "templatemethod": {
  "grupo": "comportamentales",
  "archivos": [
   {
    "nombre": "GeneradorReporte.java",
    "src": "package co.edu.patrones.comportamentales.templatemethod;\n\nimport java.util.List;\nimport java.util.Objects;\n\n/**\n * Template Method: generar() fija el esqueleto validar -> consultar -> transformar -> exportar.\n * Es final para que ninguna subclase altere el orden. Solo exportar() varía.\n */\npublic abstract class GeneradorReporte {\n\n    public final String generar(List<Venta> ventas) {\n        validar(ventas);\n        List<Venta> datos = consultar(ventas);\n        List<Venta> transformados = transformar(datos);\n        return encabezado() + exportar(transformados);\n    }\n\n    /** Paso común: los datos deben existir. */\n    private void validar(List<Venta> ventas) {\n        Objects.requireNonNull(ventas, \"ventas\");\n        if (ventas.isEmpty()) throw new IllegalArgumentException(\"No hay ventas para reportar\");\n    }\n\n    /** Paso común: descarta ventas con monto no positivo. */\n    private List<Venta> consultar(List<Venta> ventas) {\n        return ventas.stream().filter(v -> v.monto() > 0).toList();\n    }\n\n    /** Paso común: ordena de mayor a menor monto. */\n    private List<Venta> transformar(List<Venta> ventas) {\n        return ventas.stream()\n                .sorted((a, b) -> Double.compare(b.monto(), a.monto()))\n                .toList();\n    }\n\n    /** Hook: opcional, por defecto vacío. */\n    protected String encabezado() {\n        return \"\";\n    }\n\n    /** Paso variable: cada formato lo implementa. */\n    protected abstract String exportar(List<Venta> ventas);\n}"
   },
   {
    "nombre": "ReporteCsv.java",
    "src": "package co.edu.patrones.comportamentales.templatemethod;\n\nimport java.util.List;\nimport java.util.Locale;\nimport java.util.stream.Collectors;\n\npublic class ReporteCsv extends GeneradorReporte {\n    @Override\n    protected String encabezado() {\n        return \"producto,monto\\n\";\n    }\n\n    @Override\n    protected String exportar(List<Venta> ventas) {\n        return ventas.stream()\n                .map(v -> v.producto() + \",\" + String.format(Locale.US, \"%.2f\", v.monto()))\n                .collect(Collectors.joining(\"\\n\"));\n    }\n}"
   },
   {
    "nombre": "ReporteJson.java",
    "src": "package co.edu.patrones.comportamentales.templatemethod;\n\nimport java.util.List;\nimport java.util.Locale;\nimport java.util.stream.Collectors;\n\npublic class ReporteJson extends GeneradorReporte {\n    @Override\n    protected String exportar(List<Venta> ventas) {\n        return ventas.stream()\n                .map(v -> String.format(Locale.US, \"{\\\"producto\\\":\\\"%s\\\",\\\"monto\\\":%.2f}\", v.producto(), v.monto()))\n                .collect(Collectors.joining(\",\", \"[\", \"]\"));\n    }\n}"
   },
   {
    "nombre": "Venta.java",
    "src": "package co.edu.patrones.comportamentales.templatemethod;\n\n/** Dato de entrada del reporte. */\npublic record Venta(String producto, double monto) {\n}"
   },
   {
    "nombre": "TemplateMethodTest.java",
    "src": "package co.edu.patrones.comportamentales;\n\nimport co.edu.patrones.comportamentales.templatemethod.*;\nimport org.junit.jupiter.api.DisplayName;\nimport org.junit.jupiter.api.Test;\n\nimport java.util.List;\n\nimport static org.junit.jupiter.api.Assertions.*;\n\n@DisplayName(\"Template Method - reportes de ventas (extra)\")\nclass TemplateMethodTest {\n\n    private final List<Venta> ventas = List.of(\n            new Venta(\"Cuaderno\", 5000), new Venta(\"Anulada\", 0), new Venta(\"Libro\", 42000.5));\n\n    @Test\n    @DisplayName(\"CSV: encabezado, filtra montos inválidos y ordena de mayor a menor\")\n    void csv() {\n        assertEquals(\"producto,monto\\nLibro,42000.50\\nCuaderno,5000.00\", new ReporteCsv().generar(ventas));\n    }\n\n    @Test\n    @DisplayName(\"JSON: mismos pasos comunes, solo cambia la exportación\")\n    void json() {\n        assertEquals(\"[{\\\"producto\\\":\\\"Libro\\\",\\\"monto\\\":42000.50},{\\\"producto\\\":\\\"Cuaderno\\\",\\\"monto\\\":5000.00}]\",\n                new ReporteJson().generar(ventas));\n    }\n\n    @Test\n    @DisplayName(\"La validación común aplica a todos los formatos\")\n    void validacionComun() {\n        assertThrows(IllegalArgumentException.class, () -> new ReporteCsv().generar(List.of()));\n        assertThrows(IllegalArgumentException.class, () -> new ReporteJson().generar(List.of()));\n    }\n}",
    "prueba": true
   }
  ],
  "diagramas": [
   "classDiagram\n    class GeneradorReporte {\n        <<abstract>>\n        +generar(List~Venta~) String «final»\n        -validar(List~Venta~)\n        -consultar(List~Venta~) List~Venta~\n        -transformar(List~Venta~) List~Venta~\n        #encabezado() String «hook»\n        #exportar(List~Venta~)* String\n    }\n    GeneradorReporte <|-- ReporteCsv\n    GeneradorReporte <|-- ReporteJson"
  ]
 },
 "_main": "package co.edu.patrones;\n\nimport co.edu.patrones.comportamentales.command.*;\nimport co.edu.patrones.comportamentales.observer.*;\nimport co.edu.patrones.comportamentales.state.PedidoTienda;\nimport co.edu.patrones.comportamentales.strategy.*;\nimport co.edu.patrones.comportamentales.templatemethod.*;\nimport co.edu.patrones.estructurales.adapter.*;\nimport co.edu.patrones.estructurales.composite.*;\n\nimport java.util.List;\nimport co.edu.patrones.estructurales.decorator.*;\nimport co.edu.patrones.estructurales.facade.MatriculaFacade;\nimport co.edu.patrones.estructurales.proxy.*;\n\n/** Demostración ejecutable de los 10 patrones del repositorio. */\npublic class Main {\n    public static void main(String[] args) {\n        titulo(\"PATRONES ESTRUCTURALES\");\n\n        seccion(\"Adapter (laboratorio)\");\n        ProcesadorPago procesador = new AdaptadorPasarela(new PasarelaExterna());\n        procesador.pagar(125.50);                       // Cobro externo: 12550 centavos\n\n        seccion(\"Facade (laboratorio)\");\n        new MatriculaFacade().matricular(\"Ana Pérez\");\n\n        seccion(\"Decorator (trabajo autónomo - biblioteca)\");\n        Notificador notificador =\n                new RegistroDecorator(new CifradoDecorator(new NotificacionPrestamo(\"ana@biblioteca.edu\")));\n        notificador.enviar(\"Tu préstamo vence mañana\");\n\n        seccion(\"Proxy (trabajo autónomo - biblioteca)\");\n        LibroDigital libro = new LibroDigitalProxy(\"Design Patterns\");\n        try {\n            libro.leer(new Usuario(\"Invitado\", false));\n        } catch (SecurityException e) {\n            System.out.println(e.getMessage());\n        }\n        Usuario lector = new Usuario(\"Ana\", true);\n        System.out.println(libro.leer(lector));         // descarga aquí\n        System.out.println(libro.leer(lector));         // usa la caché\n\n        seccion(\"Composite (extra - archivos y carpetas)\");\n        Carpeta raiz = new Carpeta(\"biblioteca\")\n                .agregar(new Archivo(\"catalogo.pdf\", 300))\n                .agregar(new Carpeta(\"libros\")\n                        .agregar(new Archivo(\"java.epub\", 500))\n                        .agregar(new Archivo(\"gof.pdf\", 200)));\n        System.out.print(raiz.mostrar(0));\n\n        titulo(\"PATRONES COMPORTAMENTALES\");\n\n        seccion(\"Strategy (laboratorio)\");\n        CalculadoraEnvio calculadora = new CalculadoraEnvio(new EnvioEconomico());\n        System.out.println(calculadora.calcular(2.0));  // 2000.0\n        calculadora.cambiarEstrategia(new EnvioExpress());\n        System.out.println(calculadora.calcular(2.0));  // 3600.0\n\n        seccion(\"Observer (laboratorio)\");\n        Pedido pedido = new Pedido();\n        pedido.suscribir(new NotificadorCorreo());\n        pedido.suscribir(new Tablero());\n        pedido.cambiarEstado(\"PAGADO\");\n\n        seccion(\"State (trabajo autónomo - pedidos)\");\n        PedidoTienda p = new PedidoTienda(\"P-001\", 85000);\n        p.pagar();\n        p.enviar();\n        try {\n            p.cancelar();\n        } catch (IllegalStateException e) {\n            System.out.println(\"Regla de negocio: \" + e.getMessage());\n        }\n\n        seccion(\"Command (trabajo autónomo - pedidos)\");\n        CarritoPedido carrito = new CarritoPedido();\n        GestorComandos gestor = new GestorComandos();\n        gestor.encolar(new AgregarProductoComando(carrito, \"Cuaderno\", 3));\n        gestor.encolar(new AgregarProductoComando(carrito, \"Lápiz\", 5));\n        System.out.println(\"Pendientes en cola: \" + gestor.pendientes() + \" | carrito: \" + carrito.getItems());\n        gestor.procesarCola();\n        System.out.println(\"Tras procesar: \" + carrito.getItems());\n        gestor.deshacer();\n        System.out.println(\"Tras deshacer: \" + carrito.getItems());\n        gestor.getBitacora().forEach(System.out::println);\n\n        seccion(\"Template Method (extra - reportes)\");\n        List<Venta> ventas = List.of(new Venta(\"Cuaderno\", 5000), new Venta(\"Libro\", 42000.5));\n        System.out.println(new ReporteCsv().generar(ventas));\n        System.out.println(new ReporteJson().generar(ventas));\n    }\n\n    private static void titulo(String t) {\n        System.out.println(\"\\n==================== \" + t + \" ====================\");\n    }\n\n    private static void seccion(String s) {\n        System.out.println(\"\\n--- \" + s + \" ---\");\n    }\n}"
};
