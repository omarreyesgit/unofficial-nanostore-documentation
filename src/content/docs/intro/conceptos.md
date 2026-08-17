---
title: Conceptos fundamentales
description:  Conceptos fundamentales de Nano Stores

---

Para trabajar con Nano Stores es importante entender primero algunos conceptos básicos: **stores, estado, valores, suscripciones y listeners**.

Nano Stores utiliza estos conceptos como piezas independientes que pueden combinarse para construir una gestión de estado más compleja cuando la aplicación lo necesita.

## ¿Qué es un store?

Un **store** es una unidad que contiene un valor de estado y proporciona mecanismos para leerlo, modificarlo y reaccionar a sus cambios.

Por ejemplo:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)
```

En este caso, `$counter` es un store cuyo valor inicial es `0`.

Podemos representarlo de forma sencilla:

```text
┌──────────────────┐
│    $counter      │
│                  │
│      value       │
│        0         │
└──────────────────┘
```

El store no necesita conocer qué componente va a utilizar su información. Su responsabilidad es gestionar el estado y comunicar sus cambios.

el estado inicial es:

```text
0
```

Podemos modificarlo:

```typescript

$counter.set(10)

```

Ahora el estado es:

```text
10
```

El store sigue siendo el mismo; lo que ha cambiado es el valor que contiene.

```text
Antes                  Después

$counter               $counter
   │                       │
   ▼                       ▼
   0                      10
```

Esta distinción es importante: el store representa la unidad de estado, mientras que el valor es la información almacenada en ella.

## Leer el estado

Nano Stores proporciona **get()** para obtener el valor actual de un store.

```typescript
const value = $counter.get()

console.log(value)

```

Si el store contiene `10`, el resultado será:

```text
10
```

**get()** resulta útil cuando necesitamos conocer el valor actual de forma puntual.

Por ejemplo:

```typescript
function increment() {
  const current = $counter.get()

  $counter.set(current + 1)
}

```

Sin embargo, `get()` no establece una relación reactiva con el store. Si necesitamos que una interfaz se actualice automáticamente cuando cambie el estado, debemos utilizar una suscripción o el mecanismo proporcionado por la integración del framework.

## Modificar el estado

Para cambiar el valor de un `atom`, podemos utilizar `set()`:

```typescript
$counter.set(20)

```

El nuevo valor sustituirá al anterior.

También podemos utilizar el valor actual para calcular uno nuevo:

```typescript
function increment() {
  $counter.set($counter.get() + 1)
}

```

Después de ejecutar `increment()`:

```text
0 → 1 → 2 → 3 → 4 → ...
```

En stores más complejos, como los creados mediante `map`, existen mecanismos adicionales para modificar partes concretas del estado.

## Suscribirse a los cambios

Un store puede tener diferentes consumidores interesados en conocer cuándo cambia su estado.

Para ello podemos utilizar `subscribe()`:

```typescript
$counter.subscribe(value => {
  console.log('Nuevo valor:', value)
})

```

Cuando el valor cambie:

```typescript
$counter.set(5)

```

el callback recibirá el nuevo valor.

```text
                    $counter
                       │
                       │ cambia
                       ▼
                     5
                       │
                 notificación
                       │
              ┌────────┴────────┐
              ▼                 ▼
          Componente A      Componente B
```

Una característica importante de `subscribe()` es que **ejecuta el callback inmediatamente con el valor actual** y posteriormente cada vez que el valor cambie.

Por ejemplo:

```typescript
const $status = atom('idle')

$status.subscribe(status => {
  console.log(status)
})

```

La primera ejecución producirá:

```text
idle
```

y posteriormente:

```typescript

$status.set('loading')

```

producirá:

```text
loading
```

## Escuchar cambios con `listen()`

Nano Stores también proporciona `listen()`.

```typescript
$status.listen(status => {
  console.log('El estado ha cambiado:', status)
})

```

La diferencia fundamental es que `listen()` **no ejecuta el callback inmediatamente al registrarlo**. Solo se ejecutará cuando el valor cambie.

Por ejemplo:

```typescript
const $status = atom('idle')

$status.listen(status => {
  console.log(status)
})

```

En este momento no se ejecutará el callback.

Si posteriormente hacemos:

```typescript
$status.set('loading')

```

obtendremos:

```text
loading
```

Podemos visualizar la diferencia:

```text
                subscribe()        listen()

Store creado        │                  │
                    ▼                  ▼
              ejecuta callback    no ejecuta
                    │                  │
                    │                  │
              cambio de estado ────────┤
                    │                  │
                    ▼                  ▼
              ejecuta callback    ejecuta callback
```

## ¿Cuál utilizar?

Depende de lo que necesitemos.

`subscribe()` es útil cuando queremos conocer inmediatamente el estado actual y continuar reaccionando a sus cambios.

`listen()` es útil cuando solamente nos interesan los cambios que ocurran después de establecer la escucha.

## Los stores pueden tener múltiples consumidores

Un mismo store puede ser utilizado por diferentes partes de una aplicación.

Por ejemplo:

```typescript
export const $theme = atom<'light' | 'dark'>('light')

```

Podríamos tener:

```text
                    $theme
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Header       Settings      Preview
```

Cada consumidor puede reaccionar al mismo estado sin que tengamos que crear una conexión específica entre ellos.

Si el tema cambia:

```typescript
$theme.set('dark')

```

todos los consumidores suscritos podrán reaccionar al cambio.

## Los stores pueden combinarse

Los stores no tienen por qué funcionar de forma aislada.

Podemos utilizar varios stores para representar diferentes partes de una aplicación:

```typescript
const $user = atom<User | null>(null)

const $theme = atom<'light' | 'dark'>('light')

const $notifications = atom(0)

```

Y posteriormente crear otros stores cuyo valor dependa de ellos.

Por ejemplo, podemos derivar información a partir de `$user`:

```text
$user
  │
  ▼
computed
  │
  ▼
$isAuthenticated
```

Este mecanismo permite construir estados más complejos a partir de pequeñas unidades.

Lo veremos con más detalle en **Stores derivados**.

## Ciclo básico de un store

Podemos resumir el funcionamiento de un store sencillo en cuatro pasos:

```text
┌──────────────┐
│ Crear store  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Leer estado  │
│    get()     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Modificar    │
│    set()     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Notificar    │
│ suscriptores │
└──────────────┘
```

Por ejemplo:

```typescript
import { atom } from 'nanostores'

const $counter = atom(0)

$counter.subscribe(value => {
  console.log('Counter:', value)
})

$counter.set(1)
$counter.set(2)
$counter.set(3)

```

El resultado será:

```text

Counter: 0
Counter: 1
Counter: 2
Counter: 3

```

Este pequeño ciclo **—crear, leer, modificar y reaccionar—** constituye la base sobre la que se construyen las funcionalidades más avanzadas de Nano Stores.

En las siguientes páginas veremos cómo utilizar `atom` y `map` para crear stores adaptados a diferentes tipos de estado.