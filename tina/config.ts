import {defineConfig} from 'tinacms';
import {wikiMdxTemplates} from './templates';

const branch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'main';

const docReference: any = {
  name: 'doc',
  label: 'Página',
  ui: {
    itemProps: (item: {label?: string; document?: string}) => ({
      label: item?.label || item?.document || 'Página',
    }),
  },
  fields: [
    {name: 'document', label: 'Documento', type: 'reference', collections: ['doc'], required: true},
    {name: 'label', label: 'Nombre en la barra lateral', type: 'string', required: true},
  ],
};

const externalLink: any = {
  name: 'link',
  label: 'Enlace externo',
  ui: {itemProps: (item: {label?: string}) => ({label: item?.label || 'Enlace'})},
  fields: [
    {name: 'label', label: 'Nombre', type: 'string', required: true},
    {name: 'href', label: 'URL', type: 'string', required: true},
  ],
};

const category = (depth: number): any => ({
  name: 'category',
  label: 'Categoría o carpeta',
  ui: {
    defaultItem: {link: 'generated'},
    itemProps: (item: {label?: string}) => ({label: item?.label || 'Categoría'}),
  },
  fields: [
    {name: 'label', label: 'Nombre', type: 'string', required: true},
    {
      name: 'link',
      label: 'Página de portada',
      type: 'string',
      options: [
        {label: 'Índice automático', value: 'generated'},
        {label: 'Sin portada', value: 'none'},
      ],
    },
    {name: 'collapsed', label: 'Aparece cerrada', type: 'boolean'},
    {
      name: 'items',
      label: 'Contenido',
      type: 'object',
      list: true,
      templates: depth > 0 ? [category(depth - 1), docReference, externalLink] : [docReference, externalLink],
    },
  ],
});

const documentationFields: any[] = [
  {name: 'title', label: 'Título', type: 'string', isTitle: true, required: true},
  {name: 'sidebar_label', label: 'Nombre en la barra lateral', type: 'string'},
  {name: 'slug', label: 'URL personalizada', type: 'string'},
  {name: 'description', label: 'Descripción SEO', type: 'string', ui: {component: 'textarea'}},
  {name: 'keywords', label: 'Palabras clave', type: 'string', list: true, ui: {component: 'tags'}},
  {name: 'draft', label: 'Borrador', type: 'boolean'},
  {name: 'hide_title', label: 'Ocultar título automático', type: 'boolean'},
  {name: 'hide_table_of_contents', label: 'Ocultar índice de la derecha', type: 'boolean'},
  {name: 'pagination_next', label: 'Página siguiente personalizada', type: 'string'},
  {name: 'pagination_prev', label: 'Página anterior personalizada', type: 'string'},
  {
    name: 'body',
    label: 'Contenido',
    type: 'rich-text',
    isBody: true,
    templates: wikiMdxTemplates,
  },
];

const documentationCollection = (name: string, label: string, path: string): any => ({
  name,
  label,
  path,
  format: 'mdx',
  ui: {
    allowedActions: {create: true, delete: true, createNestedFolder: true},
    filename: {
      readonly: false,
      parse: (filename: string) => filename
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9_./-]/g, '')
        .toLowerCase(),
    },
  },
  fields: documentationFields,
});

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {outputFolder: 'admin', publicFolder: 'static'},
  media: {tina: {mediaRoot: 'uploads', publicFolder: 'static'}},
  schema: {
    collections: [
      documentationCollection('doc', 'Documentation — English', 'docs'),
      documentationCollection('doc_es', 'Documentación — Español', 'i18n/es/docusaurus-plugin-content-docs/current'),
      documentationCollection('doc_de', 'Dokumentation — Deutsch', 'i18n/de/docusaurus-plugin-content-docs/current'),
      documentationCollection('doc_pt_br', 'Documentação — Português (Brasil)', 'i18n/pt-BR/docusaurus-plugin-content-docs/current'),
      documentationCollection('doc_pl', 'Dokumentacja — Polski', 'i18n/pl/docusaurus-plugin-content-docs/current'),
      documentationCollection('doc_fr', 'Documentation — Français', 'i18n/fr/docusaurus-plugin-content-docs/current'),
      {
        name: 'navigation',
        label: 'Estructura y barra lateral',
        path: 'config/navigation',
        format: 'json',
        ui: {
          global: true,
          allowedActions: {create: false, delete: false, createNestedFolder: false},
        },
        fields: [
          {name: 'label', label: 'Nombre interno', type: 'string', isTitle: true, required: true, ui: {component: 'hidden'}},
          {
            name: 'items',
            label: 'Apartados de la barra lateral',
            description: 'Añade categorías, páginas o enlaces y arrástralos para cambiar el orden.',
            type: 'object',
            list: true,
            templates: [category(4), docReference, externalLink],
          },
        ],
      },
      {
        name: 'settings',
        label: 'Apariencia y ajustes',
        path: 'config/site',
        format: 'json',
        ui: {
          global: true,
          allowedActions: {create: false, delete: false, createNestedFolder: false},
        },
        fields: [
          {name: 'label', label: 'Nombre interno', type: 'string', isTitle: true, required: true, ui: {component: 'hidden'}},
          {name: 'title', label: 'Nombre de la wiki', type: 'string', required: true},
          {name: 'tagline', label: 'Descripción general', type: 'string'},
          {name: 'favicon', label: 'Favicon', type: 'image'},
          {name: 'logo', label: 'Logotipo', type: 'image'},
          {name: 'socialCard', label: 'Imagen para redes sociales', type: 'image'},
          {name: 'primaryColor', label: 'Color principal claro', type: 'string', ui: {component: 'color'}},
          {name: 'darkPrimaryColor', label: 'Color principal oscuro', type: 'string', ui: {component: 'color'}},
          {
            name: 'defaultColorMode',
            label: 'Tema predeterminado',
            type: 'string',
            options: [{label: 'Oscuro', value: 'dark'}, {label: 'Claro', value: 'light'}],
          },
          {name: 'keywords', label: 'Palabras clave generales', type: 'string', list: true, ui: {component: 'tags'}},
          {
            name: 'announcement',
            label: 'Anuncio superior',
            type: 'object',
            fields: [
              {name: 'enabled', label: 'Mostrar anuncio', type: 'boolean'},
              {name: 'content', label: 'Contenido HTML', type: 'string', ui: {component: 'textarea'}},
              {name: 'backgroundColor', label: 'Color de fondo', type: 'string', ui: {component: 'color'}},
              {name: 'textColor', label: 'Color de texto', type: 'string', ui: {component: 'color'}},
              {name: 'isCloseable', label: 'Se puede cerrar', type: 'boolean'},
            ],
          },
          {
            name: 'navbar',
            label: 'Enlaces de navegación',
            type: 'object',
            list: true,
            ui: {itemProps: (item: {label?: string}) => ({label: item?.label || 'Enlace'})},
            fields: [
              {name: 'label', label: 'Nombre', type: 'string', required: true},
              {name: 'href', label: 'URL', type: 'string', required: true},
              {
                name: 'position',
                label: 'Posición',
                type: 'string',
                options: [{label: 'Izquierda', value: 'left'}, {label: 'Derecha', value: 'right'}],
              },
            ],
          },
          {
            name: 'footer',
            label: 'Columnas del pie',
            type: 'object',
            list: true,
            ui: {itemProps: (item: {title?: string}) => ({label: item?.title || 'Columna'})},
            fields: [
              {name: 'title', label: 'Título', type: 'string', required: true},
              {
                name: 'items',
                label: 'Enlaces',
                type: 'object',
                list: true,
                ui: {itemProps: (item: {label?: string}) => ({label: item?.label || 'Enlace'})},
                fields: [
                  {name: 'label', label: 'Nombre', type: 'string', required: true},
                  {name: 'href', label: 'URL', type: 'string', required: true},
                ],
              },
            ],
          },
          {name: 'copyright', label: 'Texto de copyright', type: 'string'},
        ],
      },
    ],
  },
});
