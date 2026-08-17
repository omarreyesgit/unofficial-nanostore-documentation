---
title: ¿Por qué Nano Stores?
description: Nano Stores apuesta por  mantener el estado dividido en pequeñas unidades independientes y añadir únicamente la funcionalidad que realmente necesita la aplicación.

---

Existen muchas formas de gestionar el estado en una aplicación frontend. La elección depende de la arquitectura del proyecto, de su tamaño y de la cantidad de estado compartido que necesitemos.

Nano Stores apuesta por una idea sencilla: **mantener el estado dividido en pequeñas unidades independientes y añadir únicamente la funcionalidad que realmente necesita la aplicación**.

El proyecto destaca especialmente por su tamaño reducido, sus stores atómicos, el *tree-shaking*, el soporte para TypeScript y su capacidad para separar la lógica de los componentes.

## Menos configuración

Una de las ventajas de Nano Stores es que podemos crear un store directamente:

```typescript
import { atom } from 'nanostores'

export const $theme = atom('light')

```

No necesitamos crear una estructura adicional para que el store pueda compartirse entre diferentes partes de la aplicación.

Por ejemplo, en React podemos consumirlo directamente mediante su integración:

```typescript
import { useStore } from '@nanostores/react'
import { $theme } from './stores/theme'

export function ThemeLabel() {
  const theme = useStore($theme)

  return <span>Tema: {theme}</span>
}

```

Esto permite evitar parte del *boilerplate* que puede aparecer al implementar una solución basada en contextos y `Provider` cuando únicamente necesitamos compartir un estado sencillo.

## Stores pequeños y específicos

Nano Stores favorece dividir el estado en unidades pequeñas en lugar de crear un único store enorme.

Por ejemplo:

```typescript
export const $user = atom<User | null>(null)

export const $theme = atom<'light' | 'dark'>('light')

export const $cartItems = atom<CartItem[]>([])

```

Cada store tiene una responsabilidad concreta:

```text
                    Aplicación
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
        $user         $theme       $cartItems
          │             │             │
       Usuario        Tema          Carrito
```
Esta separación facilita localizar la lógica relacionada con cada parte del estado y reutilizarla desde diferentes componentes.

## Actualizaciones más específicas

Al trabajar con stores pequeños y derivados, los componentes pueden reaccionar únicamente al estado que necesitan.

Por ejemplo:

```typescript
export const $products = atom([
  { name: 'Teclado', price: 100 },
  { name: 'Ratón', price: 50 }
])

export const $total = computed(
  $products,
  products => products.reduce(
    (total, product) => total + product.price,
    0
  )
)

```

La relación sería:

```typescript
$products
    │
    ▼
 computed()
    │
    ▼
  $total

```

En lugar de que cada componente tenga que calcular nuevamente el total, podemos mantener ese cálculo dentro de un store derivado.

Nano Stores destaca precisamente el uso de stores atómicos y derivados para evitar que todos los componentes tengan que ejecutar selectores ante cualquier cambio del estado.

## Solo se incluye lo que utilizas

Nano Stores está diseñado teniendo en cuenta el tree-shaking.

Esto significa que, cuando una aplicación utiliza únicamente determinadas funcionalidades, el proceso de construcción puede eliminar código que no se utiliza.

Por ejemplo, una aplicación que solo necesita:

```typescript
import { atom } from 'nanostores'
```

no necesita incorporar funcionalidades que nunca utiliza.

El proyecto señala tanto su pequeño tamaño como el *tree-shaking* entre sus características principales.

## Lógica fuera de los componentes

Nano Stores está pensado para mover la lógica de estado fuera de los componentes.

Por ejemplo, en lugar de colocar toda la lógica del carrito dentro de un componente:

```typescript
function Cart() {
  // estado
  // peticiones
  // cálculos
  // acciones
  // ...
}
```

podemos mantenerla en un store:

```typescript
export const $cart = atom<CartItem[]>([])

export function addToCart(item: CartItem) {
  $cart.set([
    ...$cart.get(),
    item
  ])
}
```

El componente queda centrado en representar el estado:

```typescript
const cart = useStore($cart)

return (
  <span>
    {cart.length} productos
  </span>
)
```

De esta forma podemos separar:

```text
┌────────────────────┐
│       Store        │
│                    │
│ Estado             │
│ Acciones           │
│ Lógica de negocio  │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│     Componente     │
│                    │
│ Representación UI  │
└────────────────────┘
```

Esta separación es uno de los objetivos declarados del proyecto.

## Independiente del framework

Otra característica importante es que los stores pueden utilizarse desde diferentes tecnologías.

La misma lógica puede compartirse entre:

```text
                 Nano Stores
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
     React           Vue          Svelte
       │              │              │
       └──────────────┼──────────────┘
                      │
                 mismo estado
```

El proyecto proporciona integraciones para React, Preact, Vue, Svelte, Solid, Lit, Angular, Alpine y JavaScript sin framework.

Esto resulta especialmente interesante en proyectos donde la lógica de estado debe mantenerse independiente de la tecnología utilizada para construir la interfaz.

## Una solución pequeña no significa una solución limitada

Aunque el núcleo de Nano Stores es pequeño, el ecosistema proporciona funcionalidades adicionales para necesidades más específicas.

Por ejemplo:

* Stores asíncronos.
* Persistencia en localStorage.
* Sincronización entre pestañas.
* Routing.
* Media queries.
* Stores para estructuras anidadas.
* Obtención inteligente de datos remotos.

Estas funcionalidades se proporcionan mediante diferentes paquetes del ecosistema, en lugar de formar parte obligatoriamente del núcleo.

Esto permite adoptar una estrategia progresiva:

```text
Necesidad sencilla
       │
       ▼
     atom
       │
       ▼
Necesidad adicional
       │
       ▼
  Store especializado
```

La aplicación no tiene que incorporar una solución más compleja hasta que realmente la necesite.

## ¿Cuándo elegir Nano Stores?

Nano Stores puede ser una opción interesante cuando buscamos:

* Una solución ligera para compartir estado.
* Stores pequeños y especializados.
* Poco boilerplate.
* Separar la lógica de estado de los componentes.
* Compatibilidad con diferentes frameworks.
* Buen soporte para TypeScript.
* Aprovechar tree-shaking.
* Añadir funcionalidades avanzadas de forma progresiva.

Sin embargo, **no existe un gestor de estado universalmente mejor**. Una aplicación sencilla puede no necesitar ningún gestor de estado global, mientras que un proyecto con necesidades muy específicas puede beneficiarse de otra solución.

La decisión debería basarse siempre en las necesidades reales de la aplicación.

### En resumen

Nano Stores apuesta por una filosofía sencilla:

```text
       Estado pequeño
             │
             ▼
       Store pequeño
             │
             ▼
       Lógica aislada
             │
             ▼
       UI más sencilla
```

Su objetivo no es añadir una capa de abstracción innecesaria, sino proporcionar **pequeñas piezas que puedan combinarse cuando la aplicación las necesite**.
En las siguientes páginas veremos cómo instalar Nano Stores y crear nuestro primer store.
