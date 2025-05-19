# Americas Countries Explorer

## Descripción
Americas Countries Explorer es una aplicación web interactiva que permite explorar información detallada sobre los países de las Américas (América del Norte, Central y del Sur). Los usuarios pueden seleccionar una región, ver una lista de países con sus banderas, y acceder a detalles como capital, población, idiomas, moneda, fronteras, y un mapa interactivo de cada país. La aplicación está diseñada con un enfoque en Responsive Web Design, asegurando una experiencia fluida en dispositivos móviles y de escritorio.

## Características

- Navegación por regiones: Selecciona entre América del Norte, Central o del Sur para ver los países correspondientes.
- Lista de países: Muestra tarjetas con el nombre, bandera, capital e idioma principal de cada país.
- Detalles del país: Al hacer clic en "Ver más", se muestran:
    - Bandera y escudo oficial.
    - Capital, población, idiomas (todos los disponibles), moneda y fronteras (códigos alpha-3).
    - Mapa interactivo centrado en el país, usando OpenStreetMap.

- Carga dinámica: Indicadores de carga para datos ("Cargando detalles del país...") y mapas ("Cargando Mapa...").
- Imágenes rotativas: Muestra imágenes aleatorias (montaña, Panamá, río) en la vista de lista, ocultas en la vista de detalles.
- Botón "Home": Permite volver a la lista de países desde la vista de detalles.
Diseño responsivo: Adaptado para móviles, tabletas y escritorios con Bootstrap.

Tecnologías
- React: Biblioteca de JavaScript para la interfaz de usuario.
- Bootstrap 5.3.6: Framework CSS para diseño responsivo y componentes estilizados.
- REST Countries API: Fuente de datos para información de países (https://restcountries.com/v3.1).
- OpenStreetMap: Proveedor de mapas interactivos embebidos.
- JavaScript (ES6+): Lógica de la aplicación.
CSS personalizado: Estilos adicionales para la navegación y tarjetas.

## APIs Utilizadas
- REST Countries API:
    - Lista de países: https://restcountries.com/v3.1/subregion/${region}
    - Detalles del país: https://restcountries.com/v3.1/alpha/${code}
    - Proporciona datos como nombres, banderas, escudos, capitales, población, idiomas, monedas, fronteras y coordenadas.

- OpenStreetMap:
    - Mapas embebidos: https://www.openstreetmap.org/export/embed.html?bbox=...
    - Muestra mapas centrados en las coordenadas del país (latlng).