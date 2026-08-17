// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Documentación No-Oficial de Nano Stores',
      locales: {
        root: {
          label: 'Español',
          lang: 'es'
        }
      },
      customCss: ['./src/styles/custom.css'],

      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/nanostores/nanostores'
        }
      ],

      sidebar: [
        {
          label: 'Introducción',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: '¿Qué es Nano Stores?', slug: 'intro/que-es-nano-stores' },
            { label: 'Conceptos fundamentales', slug: 'intro/conceptos' },
            {
              label: '¿Por qué Nano Stores?',
              slug: 'intro/por-que-nano-stores'
            }
          ]
        },
        {
          label: 'Primeros pasos',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Instalación', slug: 'primeros-pasos/install' },
            { label: 'Primer store', slug: 'primeros-pasos/primer-store' },
            { label: 'TypeScript', slug: 'primeros-pasos/type-script' }
          ]
        },
        {
          label: 'Stores principales',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Atoms', slug: 'main-stores/atoms' },
            { label: 'Maps', slug: 'main-stores/maps' },
            { label: 'Computed Stores', slug: 'intro/example' },
            { label: 'Lazy Stores', slug: 'intro/example' },
            { label: 'Effects', slug: 'intro/example' },
            { label: 'Batching', slug: 'intro/example' },
            { label: 'Map Creator', slug: 'intro/example' },
            { label: 'Tasks', slug: 'intro/example' },
            { label: 'Store Events', slug: 'intro/example' }
          ]
        },
        {
          label: 'Frameworks',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'React', slug: 'intro/example' },
            { label: 'Preact', slug: 'intro/example' },
            { label: 'Vue', slug: 'intro/example' },
            { label: 'Svelte', slug: 'intro/example' },
            { label: 'Solid', slug: 'intro/example' },
            { label: 'Lit', slug: 'intro/example' },
            { label: 'Angular', slug: 'intro/example' },
            { label: 'Alpine.js', slug: 'intro/example' },
            { label: 'Web Components', slug: 'intro/example' },
            { label: 'Vanilla JavaScript', slug: 'intro/example' }
          ]
        },
        {
          label: 'Avanzado',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Renderizado del lado del servidor',
              slug: 'intro/example'
            },
            { label: 'Testing', slug: 'intro/example' }
          ]
        },
        {
          label: 'Patrones',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Mover la lógica a los stores',
              slug: 'intro/example'
            },
            {
              label: 'Separar el estado de los efectos',
              slug: 'intro/example'
            },
            {
              label: ' Suscribirse a los cambios de los stores',
              slug: 'intro/example'
            }
          ]
        },
        {
          label: 'Stores inteligentes',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'Asíncronos',
              slug: 'intro/example'
            },
            {
              label: 'Persistentes',
              slug: 'intro/example'
            },
            {
              label: 'Almacenamiento',
              slug: 'intro/example'
            },
            {
              label: 'Router',
              slug: 'intro/example'
            },
            {
              label: 'Media Query',
              slug: 'intro/example'
            },
            {
              label: 'Deep Map',
              slug: 'intro/example'
            },
            {
              label: 'Query',
              slug: 'intro/example'
            }
          ]
        },
        {
          label: 'Solución de problemas',
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: 'ESM',
              slug: 'intro/example'
            }
          ]
        }
        /*  {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }]
        } */
      ]
    })
  ]
})
