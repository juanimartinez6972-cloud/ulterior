# Ulterior — Sofos

Sitio estático listo para publicar con GitHub Pages. Incluye la portada, las rutas de Ensayos, Investigación, Marte y Autor, el fondo panorámico, las imágenes y las tipografías usadas por la página.

## Publicación gratuita

En GitHub Free, Pages requiere que el repositorio sea público. Al hacerlo público, el código HTML/CSS/JS y los recursos de esta carpeta quedan visibles; no se incluye la dirección de correo del propietario.

1. Crear un repositorio llamado `ulterior` y cargar **el contenido de esta carpeta en la raíz** de la rama `main`.
2. En **Settings → Pages**, publicar desde la rama `main` y la carpeta `/(root)`.
3. En **Settings → Pages → Custom domain**, guardar `ulterior.dev.ar`. El archivo `CNAME` ya incluye ese dominio.
4. Cuando GitHub Pages indique que el sitio está publicado, configurar en Dev.AR un CNAME para `ulterior.dev.ar` que apunte a `<usuario-de-GitHub>.github.io`.
5. Esperar la emisión del certificado y activar **Enforce HTTPS** en GitHub Pages.

No cambiar el DNS hasta que el sitio de GitHub Pages esté activo. Dejar intactos los demás registros existentes.

Guías oficiales:
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
