# MELI Front-end challenge

## Instalación y ejecución

La aplicación fue construida utilizando [React](https://reactjs.org/) (front-end) y Node.js (back-end) [Node.js](https://nodejs.org/en/).

### Iniciando la aplicación con docker

Para instalar y ejecutar la aplicación con docker es necesario una instalacion de [Docker](https://docs.docker.com/get-docker/) en el equipo.

#### Iniciando el back-end con docker

Para instalar y ejecutar el back-end es necesario abrir una terminal sobre la ruta MELIChallenge/backend/ y ejecutar el siguiente comando para construir la imagen de docker,

*Construccion de la imagen de docker (back-end)*
```bash
docker build . -t meli-challenge-api
```

Luego se ejecuta el siguiente comando para levantar un contenedor basado en la imagen anteriormente creada.

*Creando la imagen de docker (back-end)*
```bash
docker run -p 8080:8080 -d meli-challenge-api
```

#### Iniciando el front-end con docker

De manera similar, para instalar y ejecutar el front-end es necesario abrir una terminal sobre la ruta MELIChallenge/frontend/meli-challenge y ejecutar el siguiente comando para construir la imagen de docker,

*Construccion de la imagen de docker (front-end)*
```bash
docker build . -t meli-challenge-app
```

Luego se ejecuta el siguiente comando para levantar un contenedor basado en la imagen anteriormente creada.

*Creando la imagen de docker (front-end)*
```bash
docker run -p 3000:3000 -d meli-challenge-app
```

### Iniciando la aplicación de desarrollo

Para instalar y ejecutar la aplicación en modo desarrollo es necesario tener instaladas las ultimas versiones de [Node y npm](https://nodejs.org/en/download/) asi como [React](https://reactjs.org/) 

Sobre la ruta frontend/meli-challenge ejecutar los siguientes cinabdos

*Instalacion de dependencias*
```bash
$ yarn install # or npm install
```

*Inciar servidor de desarrollo*
```bash
$ yarn start # or npm start
```

---

## Descripcion de la aplicacion

Se realizó la construcción desde 0 de una aplicación web cuya funcionalidad principal es la de brindar un buscador de items utilizando como fuente de datos el API de Mercado Libre

La arquitectura planteada para esta aplicación es la siguiente

![Diagrama de arquitectura](./Documentacion/Diagramas/MELI%20Challenge-Arquitectura.drawio.png)

Tal y como se observa en la imagen la aplicación consta de dos componentes principales, un API REST (back-end) construido en Node.js y un Front-end construido en React.js. A continuacion se detalla cada uno de estos componentes

### API REST (back-end)

A continuación se presenta el diagrama de componentes del API construido

![Diagrama de componentes API REST](./Documentacion/Diagramas/MELI%20Challenge-Componentes%20Back-end.drawio.png)

Tal como se observa en este diagrama la aplicacion se agrupa en los componentes correspondientes a cada uno de los servicios que expone el API, una seccion de scripts generales utilizados como utils en la logica construida para cada uno de los servcios y una seccion de views la cual permite visualizar los resultados a las consultas al API desde un navegador web de una forma mas ordenada.

#### Liberias utilizadas

- *Node.js* - runtime enviroment
- *express* - framework sobre el cual se hizo la construccion del API REST
- *axios* - cliente HTTP utilizado para hacer las consultas al API de MELI
- *pug* - view engine


Para este API se contruyo un [SWAGGER](https://app.swaggerhub.com/apis/FernandoMorantes/MELI_Challenge/1.0.0) en el que se encuentran definidos todos los servicios y modelos que la componen.


### Web application (front-end)

A continuación se presenta el diagrama de componentes de la aplicación construida

![Diagrama de componentes Front-end](./Documentacion/Diagramas/MELI%20Challenge-Componentes%20Front-end.drawio.png)

- **React.StrictMode:** resalta problemas que puedan encontarse dentro de los componentes de la aplicacion
- **BrowserRouter:** se encarga de gestionar cada una de las rutas dentro de la aplicación asi como de la vista que se renderiza en cada una
- **Layout:** se define el layout general utilizado en todas las vistas de la aplicacion. Dicho layout se compone de un header con la barra de busqueda y de un contenedor principal el cual contiene el contenido de la pagina
- **api:** clase encargada de hacer los llamados necesarios al API REST construida para esta aplicación
- **SearchBar:** se define la barra de busqueda como un text input con funciones de autocompletado basado en un historial de busquedas local almacenado en local storage
- **Main:** componente definido para la vista principal *ruta: /*
- **Breadcrumb:** componente que renderiza la ruta de navegacion (breadcrumb)
- **Search:** componente definido para la vista de resultados de la busqueda *ruta: /items?search=*
- **ProductsListCard:** componente que renderiza la informacion de un producto en la lista de resultados de la busqueda
- **Product** componente definido para la vista de detalle de un producto *ruta: /items/:id*
- **Error:** componente utilizado para mostar los mensajes de error en la aplicacion
- **CustomLoader:** componente que renderiza un componente visual de carga
- **useWindowSize:** custom hook que implementa el hook useLayoutEffect y un window listener para obtener el ancho y el alto de la pantalla

#### Liberias utilizadas

- *React.js* - framework sobre el cual se hizo la construccion de la aplicación
- *sass* - lenguaje utilizado para la definición de los estilos de la aplicación
- *axios* - cliente HTTP utilizado para hacer las consultas al API REST
- *react-bootstrap* - libreria de bootstrap para React, utilizada para manejar los diseños responsive de la aplicacion
- *@mui/material* - libreria de elementos de UI utilizada para definir la funcionalidad basica del autocomplete en la barra de busqueda

## [Diagramas](https://drive.google.com/file/d/1SU6ZBjcDzoVWn5WgehT-45X2Qk7qmgx7/view?usp=sharing) 
