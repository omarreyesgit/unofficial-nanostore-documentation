---
title: Primer Store
description: Pasos crear la tu primera store.

---

## Tu primer store

Un `store` es una unidad independiente que contiene un estado y permite acceder a él, modificarlo y reaccionar a sus cambios.

Para crear un store sencillo podemos utilizar `atom()`:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)
```

En este ejemplo, `$counter` comienza con el valor `0`.

## Leer el valor

Podemos obtener el valor actual utilizando `get()`:

```typescript
const value = $counter.get()

console.log(value) // 0
```

## Modificar el valor

Para cambiarlo utilizamos `set()`:

```typescript
$counter.set(10)
```

También podemos utilizar el valor actual para realizar operaciones:

```typescript
export function increment() {
  $counter.set($counter.get() + 1)
}
```

## Escuchar cambios

Si necesitamos reaccionar cuando el valor cambie, podemos utilizar `subscribe()`:

```typescript
$counter.subscribe(value => {
  console.log('Nuevo valor:', value)
})
```

El callback se ejecutará inmediatamente con el valor actual y posteriormente cada vez que el store cambie.

Si solo queremos reaccionar a cambios posteriores podemos utilizar `listen()`:

```typescript
$counter.listen(value => {
  console.log('El contador cambió:', value)
})
```

## Ejemplo completo

Podemos reunir todo en un pequeño store:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)

export function increment() {
  $counter.set($counter.get() + 1)
}

export function decrement() {
  $counter.set($counter.get() - 1)
}
```

La estructura sería:

```text
$counter
   │
   ├── get()        → leer
   ├── set()        → modificar
   ├── subscribe()  → observar estado
   └── listen()     → observar cambios
```

Este patrón constituye la base para trabajar con stores más avanzados en Nano Stores.

En las siguientes páginas veremos cómo tipar los stores con TypeScript y cómo trabajar con estructuras de estado más complejas.