(function () {
  const escapeHtml = (value) =>
    String(value || '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');

  CMS.registerEditorComponent({
    id: 'docusaurus-admonition',
    label: 'Aviso de Docusaurus',
    fields: [
      {
        name: 'type',
        label: 'Tipo',
        widget: 'select',
        options: [
          {label: 'Nota', value: 'note'},
          {label: 'Consejo', value: 'tip'},
          {label: 'Información', value: 'info'},
          {label: 'Advertencia', value: 'warning'},
          {label: 'Precaución', value: 'caution'},
          {label: 'Peligro', value: 'danger'},
        ],
        default: 'note',
      },
      {name: 'title', label: 'Título', widget: 'string', required: false},
      {name: 'content', label: 'Contenido', widget: 'markdown'},
    ],
    pattern: /^:::(note|tip|info|warning|caution|danger)(?:\[([^\]\n]*)\])?\n\n?([\s\S]*?)\n\n?:::$/m,
    fromBlock(match) {
      return {type: match[1], title: match[2] || '', content: match[3] || ''};
    },
    toBlock(data) {
      const title = data.title ? `[${data.title}]` : '';
      return `:::${data.type}${title}\n\n${data.content}\n\n:::`;
    },
    toPreview(data) {
      const title = data.title || data.type;
      return `<div class="alert alert--${escapeHtml(data.type)}"><strong>${escapeHtml(title)}</strong><div>${escapeHtml(data.content)}</div></div>`;
    },
  });

  CMS.registerEditorComponent({
    id: 'docusaurus-details',
    label: 'Bloque desplegable',
    fields: [
      {name: 'summary', label: 'Título visible', widget: 'string'},
      {name: 'content', label: 'Contenido desplegable', widget: 'markdown'},
    ],
    pattern: /^<details>\n\n<summary>([^\n<]*)<\/summary>\n\n([\s\S]*?)\n\n<\/details>$/m,
    fromBlock(match) {
      return {summary: match[1] || '', content: match[2] || ''};
    },
    toBlock(data) {
      return `<details>\n\n<summary>${data.summary}</summary>\n\n${data.content}\n\n</details>`;
    },
    toPreview(data) {
      return `<details open><summary>${escapeHtml(data.summary)}</summary><div>${escapeHtml(data.content)}</div></details>`;
    },
  });

  CMS.registerEditorComponent({
    id: 'docusaurus-tabs',
    label: 'Pestañas',
    fields: [
      {name: 'defaultValue', label: 'Pestaña inicial', widget: 'string', required: false},
      {
        name: 'tabs',
        label: 'Pestañas',
        widget: 'list',
        min: 2,
        summary: '{{fields.label}}',
        fields: [
          {name: 'value', label: 'Identificador', widget: 'string'},
          {name: 'label', label: 'Etiqueta', widget: 'string'},
          {name: 'content', label: 'Contenido', widget: 'markdown'},
        ],
      },
    ],
    pattern: /^<Tabs(?: defaultValue="([^"]*)")?>\n\n([\s\S]*?)\n\n<\/Tabs>$/m,
    fromBlock(match) {
      const tabs = [];
      const tabPattern = /<TabItem value="([^"]*)" label="([^"]*)">\n\n([\s\S]*?)\n\n<\/TabItem>/g;
      let tabMatch;
      while ((tabMatch = tabPattern.exec(match[2])) !== null) {
        tabs.push({value: tabMatch[1], label: tabMatch[2], content: tabMatch[3]});
      }
      return {defaultValue: match[1] || '', tabs};
    },
    toBlock(data) {
      const tabs = Array.isArray(data.tabs) ? data.tabs : [];
      const initial = data.defaultValue ? ` defaultValue="${data.defaultValue}"` : '';
      const items = tabs
        .map((tab) => `<TabItem value="${tab.value}" label="${tab.label}">\n\n${tab.content}\n\n</TabItem>`)
        .join('\n\n');
      return `<Tabs${initial}>\n\n${items}\n\n</Tabs>`;
    },
    toPreview(data) {
      const tabs = Array.isArray(data.tabs) ? data.tabs : [];
      return `<div><strong>Pestañas:</strong> ${tabs.map((tab) => escapeHtml(tab.label)).join(' · ')}</div>`;
    },
  });
})();
