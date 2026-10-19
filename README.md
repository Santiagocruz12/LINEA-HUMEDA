# LÍNEA HÚMEDA - Control de Inventarios & WMS Maquinaria Pesada

Sistema integral de gestión de inventarios, trazabilidad de seriales y control de despachos para equipos de **Línea Húmeda** (Bombas Hidráulicas, Tomas de Fuerza PTO, Cilindros Telescópicos, Válvulas Neumáticas y Winches de Arrastre).

---

## 🚀 Características Principales

* **Control de Salidas & Pistoleo de Seriales:**
  * Entrada flexible por escáner de código de barras o digitación manual alfanumérica sin restricciones.
  * Trazabilidad por técnico responsable (**JOHAN** o **SANTIAGO**).
  * Auto-generación de consecutivos de remisión (`REM-XXXX`).
  
* **Consolidado de Salidas en Tiempo Real:**
  * Vista cronológica completa con fecha, documento, ítem/referencia, serial y responsable.
  * Filtros dinámicos por técnico, familia hidráulica y búsqueda de texto.
  * Descarga en formato **Excel (.xlsx)** y **CSV**.

* **Eliminación Segura con Confirmación Previa:**
  * Eliminación individual de cualquier registro erróneo con ventana modal de confirmación detallada.
  * Botón de **"Vaciar Consolidado / Vaciar Todo"** para limpiar el consolidado con restablecimiento automático de seriales a estado *Disponible*.
  * Soporte completo para referencias con comillas dobles (ej. `BOMBA"ENG...`, `CIL"TE...`) y seriales especiales (ej. `M1CS'RSK'50`).

* **Sincronización con Bases de Datos Excel:**
  * Importación masiva de referencias, existencias y seriales desde archivos `.xlsx`, `.xls` o `.csv` con motor SheetJS en el cliente.
  * Descarga de plantilla modelo con columnas estandarizadas.

* **Catálogo & Gestión de Proveedores:**
  * 79 referencias oficiales preconfiguradas con sus familias y fabricantes (Parker, HYVA, Chelsea, Bezares, Vickers/Eaton, Permco, Aber, Rexroth Bosch, etc.).
  * Capacidad de añadir nuevas referencias con sus proveedores correspondientes.

---

## 📁 Estructura del Proyecto

```text
LINEA HUMEDA/
├── index.html                                 # Acceso directo y redirección al Dashboard
├── Informe_promedios_2026-10-18.xlsx          # Base de datos inicial de referencias
├── stitch_control_de_inventarios_dashboard/
│   └── stitch_control_de_inventarios_dashboard/
│       ├── wms_store.js                       # Capa de almacenamiento y lógica de negocio (WMSStore)
│       ├── dashboard_principal_de_inventario/ # Dashboard ejecutivo y KPIs operativos
│       ├── registrar_salida_de_inventario/    # Módulo de salidas (pistoleo/manual) y consolidado
│       ├── historial_de_entradas_y_salidas/   # Consolidado maestro, filtros y vaciado
│       └── cat_logo_de_stock_y_existencias/   # Catálogo maestro de existencias y proveedores
```

---

## 🖥️ Cómo Ejecutar

1. Clona este repositorio o descarga los archivos.
2. Abre `index.html` en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
3. No requiere instalación de servidores ni bases de datos externas; todo funciona en el navegador con almacenamiento local (`localStorage`).

---

## 👤 Desarrollado para
**LÍNEA HÚMEDA - MAQUINARIA PESADA**  
Gestión de Despachos: Johan & Santiago
