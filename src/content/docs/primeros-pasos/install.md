---
title: Instalación
description: Pasos para instalar Nano Stores.

---

Nano Stores se distribuye como un paquete de npm, por lo que puedes instalarlo utilizando el gestor de paquetes que prefieras.

## npm

```text
npm install nanostores
```

## pnpm

```text
pnpm add nanostores
```

## yarn

```text
yarn add nanostores
```

## bun

```text
bun add nanostores
```

Una vez instalado, puedes importar las funcionalidades que necesites directamente desde `nanostores`:

```typescript
import { atom } from 'nanostores'
```

## Integraciones con frameworks

El paquete principal contiene la funcionalidad básica de Nano Stores. Para utilizarlo cómodamente con determinados frameworks, existen paquetes de integración específicos.

Por ejemplo, para React:

```text
pnpm add @nanostores/react
```

Y posteriormente:

```typescript
import { useStore } from '@nanostores/react'
```

Otros frameworks disponen de sus propias integraciones, que veremos en la sección Frameworks.

## Comprobar la instalación

Después de instalar Nano Stores, puedes crear un pequeño store para comprobar que todo funciona correctamente:

```typescript
import { atom } from 'nanostores'

export const $counter = atom(0)
```

Si el proyecto puede compilar este código correctamente, Nano Stores está listo para utilizarse.

>**Consejo**: instala únicamente las integraciones que necesites. El paquete principal y las integraciones están separados para mantener la solución modular.

En la siguiente página crearemos nuestro primer store y veremos cómo leer, modificar y observar su estado.
