const admonitionTemplate = {
  name: 'Admonition',
  label: 'Aviso destacado',
  ui: {
    defaultItem: {type: 'note', title: 'Nota'},
    itemProps: (item: {title?: string}) => ({label: item?.title || 'Aviso'}),
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo',
      type: 'string',
      options: [
        {label: 'Nota', value: 'note'},
        {label: 'Consejo', value: 'tip'},
        {label: 'Información', value: 'info'},
        {label: 'Advertencia', value: 'warning'},
        {label: 'Precaución', value: 'caution'},
        {label: 'Peligro', value: 'danger'},
      ],
    },
    {name: 'title', label: 'Título', type: 'string', required: true},
    {name: 'children', label: 'Contenido', type: 'rich-text'},
  ],
};

const detailsTemplate = {
  name: 'Details',
  label: 'Contenido desplegable',
  fields: [
    {name: 'summary', label: 'Texto visible', type: 'string', required: true},
    {name: 'children', label: 'Contenido desplegado', type: 'rich-text'},
  ],
};

const tabsTemplate = {
  name: 'Tabs',
  label: 'Pestañas',
  fields: [
    {
      name: 'children',
      label: 'Pestañas',
      type: 'rich-text',
      templates: [
        {
          name: 'TabItem',
          label: 'Pestaña',
          ui: {
            defaultItem: {label: 'Pestaña', value: 'pestana'},
            itemProps: (item: {label?: string}) => ({label: item?.label || 'Pestaña'}),
          },
          fields: [
            {name: 'label', label: 'Nombre visible', type: 'string', required: true},
            {
              name: 'value',
              label: 'Identificador',
              description: 'Sin espacios; por ejemplo: windows o linux.',
              type: 'string',
              required: true,
            },
            {name: 'children', label: 'Contenido', type: 'rich-text'},
          ],
        },
      ],
    },
  ],
};

const youtubeTemplate = {
  name: 'YouTubeEmbed',
  label: 'Vídeo de YouTube',
  fields: [
    {name: 'id', label: 'ID del vídeo', type: 'string', required: true},
    {name: 'title', label: 'Título accesible', type: 'string', required: true},
  ],
};

const buttonTemplate = {
  name: 'ButtonLink',
  label: 'Botón con enlace',
  ui: {defaultItem: {variant: 'primary', newTab: false}},
  fields: [
    {name: 'label', label: 'Texto', type: 'string', required: true},
    {name: 'href', label: 'Enlace', type: 'string', required: true},
    {
      name: 'variant',
      label: 'Estilo',
      type: 'string',
      options: [
        {label: 'Principal', value: 'primary'},
        {label: 'Secundario', value: 'secondary'},
        {label: 'Contorno', value: 'outline'},
      ],
    },
    {name: 'newTab', label: 'Abrir en pestaña nueva', type: 'boolean'},
  ],
};

const cardGridTemplate = {
  name: 'CardGrid',
  label: 'Cuadrícula de tarjetas',
  fields: [
    {name: 'title', label: 'Título del bloque', type: 'string'},
    {
      name: 'cards',
      label: 'Tarjetas',
      type: 'object',
      list: true,
      ui: {itemProps: (item: {title?: string}) => ({label: item?.title || 'Tarjeta'})},
      fields: [
        {name: 'icon', label: 'Icono o emoji', type: 'string'},
        {name: 'title', label: 'Título', type: 'string', required: true},
        {name: 'description', label: 'Descripción', type: 'string', ui: {component: 'textarea'}},
        {name: 'href', label: 'Enlace opcional', type: 'string'},
      ],
    },
  ],
};

const stepsTemplate = {
  name: 'Steps',
  label: 'Pasos numerados',
  fields: [
    {
      name: 'items',
      label: 'Pasos',
      type: 'object',
      list: true,
      ui: {itemProps: (item: {title?: string}) => ({label: item?.title || 'Paso'})},
      fields: [
        {name: 'title', label: 'Título', type: 'string', required: true},
        {name: 'text', label: 'Explicación', type: 'string', ui: {component: 'textarea'}},
      ],
    },
  ],
};

const galleryTemplate = {
  name: 'ImageGallery',
  label: 'Galería de imágenes',
  fields: [
    {
      name: 'images',
      label: 'Imágenes',
      type: 'object',
      list: true,
      ui: {itemProps: (item: {alt?: string}) => ({label: item?.alt || 'Imagen'})},
      fields: [
        {name: 'src', label: 'Imagen', type: 'image', required: true},
        {name: 'alt', label: 'Texto alternativo', type: 'string', required: true},
        {name: 'caption', label: 'Pie de imagen', type: 'string'},
      ],
    },
  ],
};

export const wikiMdxTemplates: any[] = [
  admonitionTemplate,
  detailsTemplate,
  tabsTemplate,
  youtubeTemplate,
  buttonTemplate,
  cardGridTemplate,
  stepsTemplate,
  galleryTemplate,
];

