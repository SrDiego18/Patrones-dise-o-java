# Patrones de diseño en Java — Estructurales y Comportamentales

![Java](https://img.shields.io/badge/Java-17%2B-orange) ![JUnit](https://img.shields.io/badge/JUnit-5-green) ![Pruebas](https://img.shields.io/badge/pruebas-26%20OK-brightgreen) ![Maven](https://img.shields.io/badge/build-Maven-blue)

**Asignatura:** Patrones y metodologías de desarrollo
**Estudiante:** _[Tu nombre completo]_
**Docente:** _[Nombre de la profesora]_
**Fecha:** _[dd/mm/aaaa]_

Solución completa de las dos guías del estudiante: laboratorios paso a paso, actividad de análisis, preguntas de verificación y trabajo autónomo (con diagramas, código y pruebas).

## 📘 Guías resueltas

| Guía | Laboratorio | Trabajo autónomo | Documento |
|---|---|---|---|
| **Patrones estructurales** | Adapter (pagos) · Facade (matrícula) | Decorator + Proxy — *Biblioteca digital* | [**docs/01-patrones-estructurales.md**](docs/01-patrones-estructurales.md) |
| **Patrones comportamentales** | Strategy (envíos) · Observer (pedidos) | State + Command — *Sistema de pedidos* | [**docs/02-patrones-comportamentales.md**](docs/02-patrones-comportamentales.md) |

Cada documento incluye:

- ✅ Laboratorio paso a paso con diagrama UML y salida obtenida
- ✅ Actividad de análisis: las 5 situaciones con el patrón elegido y su justificación
- ✅ Verificación: las 5 preguntas respondidas
- ✅ Trabajo autónomo: problema, diagrama, código, 3 pruebas por patrón, justificación, alternativa y limitación
- ✅ Autoevaluación frente a la rúbrica (25 / 30 / 20 / 15 / 10 %)

## 🗂️ Estructura del proyecto

```
patrones-diseno-java/
├── pom.xml
├── README.md
├── docs/
│   ├── 01-patrones-estructurales.md
│   └── 02-patrones-comportamentales.md
└── src/
    ├── main/java/co/edu/patrones/
    │   ├── Main.java                      ← demostración de los 8 patrones
    │   ├── estructurales/
    │   │   ├── adapter/     (laboratorio)
    │   │   ├── facade/      (laboratorio)
    │   │   ├── decorator/   (trabajo autónomo)
    │   │   └── proxy/       (trabajo autónomo)
    │   └── comportamentales/
    │       ├── strategy/    (laboratorio)
    │       ├── observer/    (laboratorio)
    │       ├── state/       (trabajo autónomo)
    │       └── command/     (trabajo autónomo)
    └── test/java/co/edu/patrones/
        ├── estructurales/      AdapterTest, FacadeTest, DecoratorTest, ProxyTest
        └── comportamentales/   StrategyTest, ObserverTest, StateTest, CommandTest
```

## ▶️ Cómo ejecutar

Requisitos: **JDK 17 o superior** y **Maven 3.8+** (o abrir el proyecto en IntelliJ IDEA / VS Code / NetBeans, que lo reconocen como proyecto Maven).

```bash
# Ejecutar las 26 pruebas unitarias
mvn test

# Ejecutar la demostración de todos los patrones
mvn compile exec:java
```

Sin Maven, solo con el JDK:

```bash
javac -d out $(find src/main/java -name "*.java")
java -cp out co.edu.patrones.Main
```

### Salida esperada (extracto)

```
--- Adapter (laboratorio) ---
Cobro externo: 12550 centavos

--- Proxy (trabajo autónomo - biblioteca) ---
Acceso denegado: el usuario no tiene préstamo activo
Descargando 'Design Patterns' del servidor remoto...
Contenido completo de Design Patterns
Contenido completo de Design Patterns      ← segunda lectura: no vuelve a descargar

--- Strategy (laboratorio) ---
2000.0
3600.0

--- State (trabajo autónomo - pedidos) ---
Pedido P-001: CREADO -> PAGADO
Pedido P-001: PAGADO -> ENVIADO
Regla de negocio: No se puede cancelar un pedido ENVIADO
```

## 🧪 Pruebas

| Patrón | Clase de prueba | Pruebas |
|---|---|---|
| Adapter | `AdapterTest` | 3 |
| Facade | `FacadeTest` | 3 |
| Decorator | `DecoratorTest` | 3 |
| Proxy | `ProxyTest` | 3 |
| Strategy | `StrategyTest` | 5 |
| Observer | `ObserverTest` | 3 |
| State | `StateTest` | 3 |
| Command | `CommandTest` | 3 |
| **Total** | | **26** |

## 🧭 Resumen: ¿qué patrón usar?

| Si el problema es… | Patrón |
|---|---|
| Dos interfaces incompatibles | Adapter |
| Un subsistema complejo que el cliente debe usar de forma sencilla | Facade |
| Añadir responsabilidades combinables sin subclases | Decorator |
| Tratar hojas y grupos de una jerarquía por igual | Composite |
| Controlar acceso, carga diferida o caché de un objeto | Proxy |
| Varios algoritmos intercambiables en ejecución | Strategy |
| Avisar a muchos interesados cuando algo cambia | Observer |
| Guardar, encolar o deshacer acciones | Command |
| Comportamiento que depende del estado y sus transiciones | State |
| Algoritmo con pasos fijos y uno o varios pasos variables | Template Method |

## 📚 Referencias

- Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
- Freeman, E., Robson, E., Bates, B., & Sierra, K. (2004). *Head First Design Patterns*. O'Reilly Media.
