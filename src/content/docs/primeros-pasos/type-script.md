---
title: TypeScript
description: Uso de TypeScript en Nano Stores.

---

Nano Stores funciona con TypeScript y permite tipar los valores de los stores para obtener autocompletado y comprobaciones durante el desarrollo.

## Tipar un store

Podemos indicar directamente el tipo del valor:

```typescript
import { atom } from 'nanostores'

export const $counter = atom<number>(0)
```

En muchos casos TypeScript puede inferir el tipo automáticamente:

```typescript
export const $counter = atom(0)
```

Aquí `$counter` será interpretado como un store cuyo valor es `number`.

## Objetos

También podemos utilizar interfaces o tipos personalizados:

```typescript
type User = {
  id: number
  name: string
  email: string
}

export const $user = atom<User | null>(null)
```

Ahora TypeScript sabe que el store puede contener un `User` o `null`.

```typescript
$user.set({
  id: 1,
  name: 'Ana',
  email: 'ana@example.com'
})
```

Si intentamos introducir un valor incompatible, TypeScript mostrará un error:

```typescript
$user.set('Ana') // Error
```

## Obtener el tipo de un store

Nano Stores también proporciona `StoreValue` para obtener el tipo del valor almacenado:

```typescript
import type { StoreValue } from 'nanostores'

type UserState = StoreValue<typeof $user>
```

En este caso:

```typescript
UserState
```

será equivalente a:

```typescript
User | null
```

Esto resulta especialmente útil cuando queremos reutilizar el tipo de un store sin tener que declararlo nuevamente.

## ¿Por qué utilizar TypeScript?

Combinar Nano Stores con TypeScript permite:

* Detectar errores de tipos durante el desarrollo.
* Obtener autocompletado.
* Definir claramente la estructura del estado.
* Reutilizar los tipos de los stores.
* Facilitar el mantenimiento de aplicaciones grandes.

Un ejemplo completo podría quedar así:

```typescript
import { atom } from 'nanostores'
import type { StoreValue } from 'nanostores'

type User = {
  id: number
  name: string
}

export const $user = atom<User | null>(null)

export function setUser(user: User) {
  $user.set(user)
}

export type UserState = StoreValue<typeof $user>
```

>**Consejo**: deja que TypeScript infiera los tipos cuando sean evidentes y utiliza tipos explícitos cuando el estado sea más complejo o necesite documentar claramente su estructura.
