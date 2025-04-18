# Frontend Gimnasio IronHaven

Este es un proyecto desarrollado con Angular para la materia Desarrollo de Software de la Universidad Tecnológica Nacional Facultad Regional Rosario.
Se trata de un sitio web que dispone de información para visitantes (potenciales clientes) y cuenta con 2 niveles de acceso: uno para entrenadores y otro para clientes.

## Entrenadores

Cumplen el rol de administradores del sistema. Pueden gestionar y administrar usuarios, clases, membresías y crear rutinas para los clientes. Tienen acceso a estadísticas valiosas para la empresa, como lo son los ingresos del último mes, cantidad de membresías activas, clases que se brindan, entre otros.

## Clientes

A través de la autogestión pueden comprar membresías para asistir al gimnasio (mediante la plataforma de pagos Stripe), inscribirse a clases y registrar la ejecución de los ejercicios asignados. Disponen de secciones exclusivas para establecer metas y registrar progresos.

## Características generales

Los usuarios de cualquier tipo, pueden comunicarse a través de un chat. El sistema notifica mediante correos electrónicos la proximidad del vencimiento de una membresía, la disponibilidad de una nueva clase y el registro correcto en la plataforma. Por otra parte, se ejecutan tareas diarias automáticamente, que se encargan de enviar notificaciones al cliente y liberar cupos en las diferentes clases (ocupados por clienes que dejaron de asistir al gimnasio).

A continuación se detallan los pasos para instalar y ejecutar el proyecto de manera sencilla.

## Requisitos

- **Node.js**: Asegúrate de tener instalada la versión 20.19.0 (LTS) de Node.js. Puedes descargarla desde [nodejs.org](https://nodejs.org/).
- **npm**: npm se instala automáticamente con Node.js, pero si necesitas actualizarlo, puedes hacerlo ejecutando el siguiente comando:
  ```
  npm install -g npm
  ```

## Instalación

1. Clona este repositorio en tu computadora:

```
git clone https://github.com/AgustinStringa/tp-dsw-frontendapp.git
```

2. Accede al directorio del proyecto:

```
cd tp-dsw-frontendapp
```

3. Instala las dependencias:

```
npm install
```

## Ejecución

Puedes elegir cualquiera de los siguientes modos según tus necesidades. Sólo ejecuta la el comando mostrado.

### Modo de Desarrollo

```
ng serve
```

Luego abre `http://localhost:4200/` en tu navegador.

### Modo de Producción

```
ng build
```

Los archivos generados se encontrarán en el directorio `dist/`

### Ejecutar tests unitarios

```
ng test
```

### Ejecutar tests end-to-end

Antes de ejecutar las pruebas E2E, asegúrate de que la aplicación Angular esté en ejecución.

```
npm run e2e
```

## Autores

- **Aarón De Bernardo** - [aarondebernardo@gmail.com]
- **Agustín Stringa** - [stringaagustin1@gmail.com]
- **Elías Danteo** - [elias.danteo.tomas@hotmail.com]
- **Francisca Gramaglia** - [franciscagramaglia714@gmail.com]
