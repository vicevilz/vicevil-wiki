# Vicevil Wiki

Wiki construida con Docusaurus 3.10.2, TinaCMS 3.12.1 y GitHub Pages.

## Panel avanzado

El panel se genera en `/admin/` y tiene tres áreas:

- **Documentación**: páginas MDX, archivos multimedia y carpetas anidadas.
- **Estructura y barra lateral**: categorías, páginas, enlaces externos y orden mediante arrastrar y soltar.
- **Apariencia y ajustes**: nombre, descripción, logotipo, favicon, colores, tema, SEO, anuncio, navbar y footer.

El editor enriquecido admite encabezados, enlaces, imágenes, citas, listas, código, tablas, Mermaid, HTML/MDX y estos bloques configurados para la wiki:

- avisos destacados;
- contenido desplegable;
- pestañas;
- vídeo de YouTube;
- botones;
- cuadrículas de tarjetas;
- pasos numerados;
- galerías de imágenes.

Los componentes se pueden ampliar desde `tina/templates.ts` y `src/components/WikiBlocks`.

## Conexión con TinaCloud

1. Crear un proyecto en [TinaCloud](https://app.tina.io/) conectado a `vicevilz/vicevil-wiki`, rama `main`.
2. Configurar `https://vicevil.wiki` como URL de producción.
3. Añadir al repositorio estos secretos de GitHub Actions:
   - `TINA_PUBLIC_CLIENT_ID`
   - `TINA_TOKEN`

El workflow construye el panel antes de Docusaurus y publica ambos juntos en GitHub Pages.

## Desarrollo local

Requiere Node.js 22 o posterior.

```bash
npm ci
npm run dev
```

Comprobaciones:

```bash
npm run typecheck
npm run build:local
```

## Estructura

- `docs/`: páginas y carpetas de documentación.
- `config/navigation/sidebar.json`: árbol ordenado de la barra lateral.
- `config/site/settings.json`: apariencia y ajustes globales.
- `tina/config.ts`: campos y capacidades del panel.
- `tina/templates.ts`: bloques insertables en el editor.

## Referencias oficiales

- [TinaCMS con Docusaurus](https://tina.io/docs/guides/docusaurus)
- [Campos de texto enriquecido](https://tina.io/docs/reference/types/rich-text)
- [Colecciones y carpetas](https://tina.io/docs/reference/collections)
- [Despliegue en GitHub Pages](https://tina.io/docs/tinacloud/deployment-options/github-pages)
- [Markdown y MDX de Docusaurus](https://docusaurus.io/docs/markdown-features)
