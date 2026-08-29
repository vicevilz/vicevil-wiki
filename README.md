# Vicevil Wiki

Base de documentación de los plugins de Vicevil, construida con Docusaurus y editable desde el navegador mediante Decap CMS.

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

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` comprueba los pull requests y publica automáticamente cada cambio enviado a `main`.

Paso manual obligatorio:

1. Abre `Settings > Pages` en este repositorio.
2. En `Build and deployment > Source`, elige **GitHub Actions**.
3. En `Custom domain`, configura `vicevil.wiki`.
4. Activa **Enforce HTTPS** cuando GitHub termine de emitir el certificado.

El repositorio puede permanecer privado únicamente si la cuenta dispone de un plan de GitHub que incluya Pages para repositorios privados. Si no lo incluye, GitHub pedirá cambiarlo a público o actualizar el plan; este proyecto no cambia la visibilidad automáticamente.

## DNS de `vicevil.wiki`

Configura el dominio raíz con los cuatro registros `A` oficiales de GitHub Pages:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Opcionalmente añade los cuatro registros `AAAA` oficiales y un `CNAME` para `www` que apunte a `vicevilz.github.io`. Evita registros comodín. GitHub recomienda verificar el dominio en la cuenta antes de enlazarlo.

## Activación de Decap CMS

La interfaz ya está disponible en `/admin/`, pero GitHub exige un servidor OAuth para iniciar sesión. GitHub Pages no ejecuta ese servidor.

La configuración actual espera el proxy OAuth en `https://auth.vicevil.wiki`, con estas rutas:

- `/auth`: inicia la autorización con GitHub.
- `/callback`: recibe el código y devuelve la sesión a Decap CMS.

Pasos manuales obligatorios:

1. Despliega un proxy OAuth compatible con Decap CMS en un servicio serverless, por ejemplo Cloudflare Workers.
2. Crea una GitHub OAuth App en `Settings > Developer settings > OAuth Apps`.
3. Usa `https://vicevil.wiki` como Homepage URL.
4. Usa la URL de callback indicada por el proxy, normalmente `https://auth.vicevil.wiki/callback`.
5. Guarda el Client ID y Client Secret como secretos del proxy; nunca los añadas al repositorio.
6. Si utilizas otro dominio o una ruta de autenticación distinta, actualiza `base_url` y `auth_endpoint` en `static/admin/config.yml`.

El backend solicita el alcance `repo` porque este repositorio es privado. Cada persona que edite con esta configuración debe tener permiso de escritura en el repositorio.

## Edición de contenido

Decap CMS gestiona las páginas Markdown de estas carpetas:

- `docs/velevators`
- `docs/vcombat`
- `docs/vlottery`
- `docs/vstaff`

Las páginas iniciales contienen marcadores explícitos donde todavía faltan datos confirmados del plugin; no deben sustituirse por información inferida.

## Referencias oficiales

- [Despliegue de Docusaurus en GitHub Pages](https://docusaurus.io/docs/deployment/github-pages)
- [Integración de Docusaurus y Decap CMS](https://decapcms.org/docs/docusaurus/)
- [Backend de GitHub en Decap CMS](https://decapcms.org/docs/github-backend/)
- [Workflows personalizados de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Dominio personalizado en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

