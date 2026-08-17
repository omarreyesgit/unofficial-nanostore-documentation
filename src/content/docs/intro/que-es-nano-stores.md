---
title: ¿Ques es Nano Stores
description: Nano Stores es una biblioteca ligera de gestión de estado para aplicaciones JavaScript 

---

[**Nano Stores**]('https://github.com/nanostores/nanostores') es una biblioteca ligera para gestionar el estado de aplicaciones JavaScript. Permite crear pequeños stores independientes que pueden ser utilizados y observados desde diferentes partes de una aplicación.

Está diseñada para funcionar con diferentes tecnologías frontend, como React, Vue, Svelte, Preact, Solid y JavaScript sin framework.

Su principal objetivo es proporcionar una forma sencilla de compartir estado y mantener su lógica separada de la interfaz, evitando añadir complejidad innecesaria a la aplicación.

## ¿Qué es el estado?

En una aplicación frontend, el estado es la información que puede cambiar durante la ejecución de la aplicación y que puede afectar a su comportamiento o a lo que se muestra en pantalla.

Por ejemplo:

* El usuario que ha iniciado sesión.
* Los productos de un carrito.
* Las preferencias de la aplicación.
* El tema claro u oscuro.
* Los filtros seleccionados.
* El estado de una petición.
* El número de notificaciones pendientes.

A medida que una aplicación crece, compartir esta información entre diferentes componentes puede resultar más complicado.

Nano Stores propone dividir esta información en stores pequeños y especializados.

Stores pequeños e independientes

En lugar de mantener todo el estado de una aplicación en una única estructura global, podemos dividirlo según la responsabilidad de cada parte:

```text
Aplicación
│
├── Usuario
│   └── $user
│
├── Carrito
│   └── $cart
│
├── Preferencias
│   └── $preferences
│
└── Notificaciones
    └── $notifications
```

Cada store representa una parte concreta del estado y puede ser utilizado de forma independiente.

Por ejemplo, podemos crear un store para almacenar el número de notificaciones:

```typescript
import { atom } from 'nanostores'

export const $notifications = atom(0)
```

Su valor puede consultarse:

```typescript
const notifications = $notifications.get()
```

y modificarse:

```typescript
$notifications.set(5)
```

También podemos reaccionar a sus cambios:

```typescript
$notifications.subscribe(value => {
  console.log('Notificaciones:', value)
})
```

Los componentes que utilizan el store no necesitan conocer cómo se almacena o modifica internamente el estado.

## Sin Providers ni configuración compleja

Una de las características más interesantes de Nano Stores es que el núcleo de la biblioteca no necesita un Provider para compartir estado.

Por ejemplo, en React, utilizando Context, es habitual crear un contexto y envolver parte de la aplicación:

```typescript
<ThemeProvider>
  <App />
</ThemeProvider>
```

Con Nano Stores podemos definir directamente el estado:

```typescript
import { atom } from 'nanostores'

export const $theme = atom('light')
```

y consumirlo desde los componentes que lo necesiten.

```text
             $theme
                │
       ┌────────┼────────┐
       │        │        │
       ▼        ▼        ▼
    Header   Settings   Profile
```

No es necesario crear una jerarquía de `Provider` para hacer que el store esté disponible.

Esto permite reducir el boilerplate necesario para compartir estados sencillos y evita introducir infraestructura adicional cuando no es necesaria.

> Esto no significa que Nano Stores elimine toda la configuración en cualquier escenario. Las integraciones con determinados frameworks pueden proporcionar sus propios mecanismos, pero los stores del núcleo no dependen de un `Provider`.

## Separación entre estado e interfaz

Nano Stores permite mantener la lógica relacionada con el estado fuera de los componentes de la interfaz.

Por ejemplo, podemos definir toda la lógica del carrito en un módulo:

```typescript
import { atom } from 'nanostores'

export const $cart = atom<string[]>([])

export function addToCart(productId: string) {
  $cart.set([
    ...$cart.get(),
    productId
  ])
}
```

El componente solo necesita consumir el estado:

```text
                Store
                 │
               $cart
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
    CartBadge          CartPage
```

De esta forma, la lógica de negocio puede mantenerse separada de la representación visual.

Esta separación también facilita reutilizar la misma lógica desde diferentes componentes o tecnologías.

## No depende de un framework concreto

Nano Stores está diseñado para que los stores puedan utilizarse desde diferentes entornos frontend.

Podemos definir un store una sola vez:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)
```

y utilizarlo desde diferentes tecnologías mediante sus respectivas integraciones:

```text
                Nano Stores
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
        React           Vue          Svelte
          │              │              │
          └──────────────┼──────────────┘
                         │
                    mismo estado
```

Esto permite mantener la lógica del estado independiente de la tecnología utilizada para construir la interfaz.

## ¿Cuándo puede ser útil?

Nano Stores puede ser una buena opción cuando necesitas:

* Compartir estado entre diferentes componentes.
* Mantener la lógica del estado fuera de la interfaz.
* Crear stores pequeños y especializados.
* Evitar una configuración global innecesariamente compleja.
* Utilizar el mismo estado desde diferentes partes de una aplicación.
* Trabajar con diferentes frameworks frontend.
* Mantener una solución de gestión de estado sencilla y modular.

No significa que Nano Stores sea la solución adecuada para todas las aplicaciones. La elección de una herramienta de gestión de estado depende de la arquitectura, el tamaño y las necesidades concretas de cada proyecto.

En resumen

Nano Stores propone un modelo sencillo:

```text
        Crear un store
              │
              ▼
        Almacenar estado
              │
              ▼
       Modificar estado
              │
              ▼
      Notificar cambios
              │
              ▼
          Actualizar UI
```

La idea fundamental es **dividir el estado de la aplicación en pequeñas unidades independientes que puedan ser utilizadas y observadas desde diferentes partes del proyecto**.

Su API minimalista permite compartir estado sin necesidad de introducir una arquitectura compleja, mientras que sus integraciones permiten utilizar estos stores desde diferentes frameworks y entornos.

En las siguientes páginas veremos los conceptos fundamentales de Nano Stores y cómo crear nuestros primeros *stores* con `atom` y `map`.
