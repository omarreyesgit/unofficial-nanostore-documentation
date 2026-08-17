---
title: Atoms
description: Uso de Atoms en Nano Stores.

---


Los átomos **(atom)** son el tipo de store más sencillo de Nano Stores. Se utilizan para almacenar un único valor y reaccionar cuando este cambia.

## Crear un átomo

Podemos crear un **atom** indicando su valor inicial:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)
```

En este caso, `$counter` comienza con el valor `0`.

El valor puede ser de cualquier tipo:

```typescript
const $name = atom('Ana')

const $isLoggedIn = atom(false)

const $items = atom<string[]>([])
```

## Leer y modificar el valor

Para obtener el valor actual utilizamos `get()`:

```typescript
const count = $counter.get()
```

Para modificarlo utilizamos set():

```typescript
$counter.set(10)
```

También podemos utilizar el valor actual para realizar operaciones:

```typescript
export function increment() {
  $counter.set($counter.get() + 1)
}
```

## Reaccionar a los cambios

Podemos utilizar **subscribe()** para recibir el valor actual y sus futuras modificaciones:

```typescript
$counter.subscribe(value => {
  console.log('Contador:', value)
})
```

Si solo queremos reaccionar a cambios posteriores, podemos utilizar **listen()**:

```typescript
$counter.listen(value => {
  console.log('El contador cambió:', value)
})
```

## Ejemplo completo

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)

export function increment() {
  $counter.set($counter.get() + 1)
}

export function decrement() {
  $counter.set($counter.get() - 1)
}

$counter.subscribe(value => {
  console.log('Valor actual:', value)
})
```

La API básica puede resumirse así:

```text
atom()
  │
  ├── get()        → obtener el valor
  ├── set()        → cambiar el valor
  ├── subscribe()  → observar el valor
  └── listen()     → observar cambios
```

Los `atom` son especialmente útiles para **estados simples e independientes**. Cuando necesitamos gestionar objetos con varias propiedades, podemos utilizar los Mapas `(map)`.

