import {readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const adminPath = fileURLToPath(new URL('../static/admin/index.html', import.meta.url));
const moduleScript = '    <script type="module"';
const marker = '<!-- Vicevil legacy CMS route compatibility -->';
const compatibilityScript = `    ${marker}
    <script>
      if (window.location.hash.startsWith('#/collections/documentation')) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    </script>
`;

const html = await readFile(adminPath, 'utf8');

if (!html.includes(moduleScript)) {
  throw new Error('No se encontró el punto de inserción en el panel generado por TinaCMS.');
}

if (!html.includes(marker)) {
  await writeFile(adminPath, html.replace(moduleScript, compatibilityScript + moduleScript), 'utf8');
}
