# Vicevil Wiki

Wiki construida con Docusaurus 3.10.2, publicada en GitHub Pages y editable desde el navegador mediante Decap CMS 3.15.1.

## Desarrollo local

Requiere Node.js 20 o posterior.

```bash
npm ci
npm run start
```

Comprobaciones antes de publicar:

```bash
npm run typecheck
npm run build
```

## Publicación

El workflow `.github/workflows/deploy-pages.yml` comprueba los pull requests y publica automáticamente cada cambio enviado a `main`. GitHub Pages debe mantener **GitHub Actions** como fuente de publicación y `vicevil.wiki` como dominio personalizado.

## Organización de la documentación

La documentación empieza en `/docs/` y la portada del dominio redirige allí. `sidebars.ts` genera toda la barra lateral desde la estructura de `docs`:

- Cada carpeta se muestra como una categoría desplegable.
- Cada archivo Markdown se muestra como una página.
- `sidebar_position` ordena las páginas.
- Los prefijos numéricos de rutas como `01-plugin/02-comandos` ordenan carpetas y páginas; Docusaurus no muestra esos números en las etiquetas.
- `sidebar_label` permite usar en la barra lateral un nombre diferente al título de la página.

El repositorio solo incluye `docs/inicio.md` como página mínima necesaria. No contiene carpetas ni páginas de plugins de ejemplo.

## Panel de edición

El panel está en `https://vicevil.wiki/admin/` y usa una única colección jerárquica llamada **Documentación**. Desde ella se pueden crear páginas, elegir rutas con subcarpetas, mover entradas y editar su orden.

La colección jerárquica de Decap CMS está documentada como función beta. La estructura permanece guardada como archivos Markdown normales, por lo que no bloquea el contenido dentro del CMS.

El editor incluye:

- títulos de nivel 1 a 6;
- negrita, cursiva, tachado, código y enlaces;
- citas, listas numeradas y listas con viñetas;
- imágenes y bloques de código;
- avisos Docusaurus `note`, `tip`, `info`, `warning`, `caution` y `danger`;
- bloques desplegables;
- pestañas;
- modo visual y modo raw para tablas, HTML, JSX, componentes React y MDX avanzado;
- campos de título, descripción, palabras clave, URL, posición, borrador, índice y visibilidad del título.

La sintaxis manual correcta de un aviso requiere saltos de línea:

```md
:::caution[Título opcional]

Contenido del aviso.

:::
```

Decap gestiona el contenido de `docs`. Cambios estructurales del propio sitio —navbar, colores, componentes React, plugins o configuración de Docusaurus— se realizan en el repositorio, porque no son contenido Markdown.

## Autenticación

Decap usa el backend de GitHub con el proxy OAuth desplegado en `https://auth.vicevil.wiki`. Las credenciales se almacenan como secretos de producción en Vercel y no están en este repositorio. El alcance `repo` es necesario mientras el repositorio sea privado.

## Referencias oficiales

- [Documentación y sidebars de Docusaurus](https://docusaurus.io/docs/sidebar)
- [Funciones Markdown y MDX](https://docusaurus.io/docs/markdown-features)
- [Avisos de Docusaurus](https://docusaurus.io/docs/markdown-features/admonitions)
- [Colecciones jerárquicas de Decap CMS](https://decapcms.org/docs/collection-nested/)
- [Widgets de Decap CMS](https://decapcms.org/docs/widgets/)
- [Componentes personalizados del editor](https://decapcms.org/docs/custom-widgets/)
