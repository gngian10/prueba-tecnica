## Cómo ejecutar el proyecto

1. **Crear el proyecto desde cero con `nuxi`**

    - npx nuxi init prueba-tecnica
    - cd prueba-tecnica

2. **Configurar Tailwind CSS (v4 con Nuxt 4)**

    - npm install tailwindcss @tailwindcss/vite
    - En `nuxt.config.ts` agregar el plugin de Vite:

        ```ts
        import tailwindcss from "@tailwindcss/vite";

        export default defineNuxtConfig({
            vite: {
                plugins: [tailwindcss()],
            },
            css: ["~/assets/css/main.css"],
        });
        ```

    - Crear el archivo `./app/assets/css/main.css`:

        ```css
        @import "tailwindcss";
        ```

3. **Asegurarse que la aplicación corra localmente**

    - npm run dev
