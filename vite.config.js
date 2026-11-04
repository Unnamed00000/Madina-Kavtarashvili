import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      // Cloudflare Pages uses a top-level 404 page for missing paths.
      // Unapproved legal drafts are deliberately excluded from the build.
      input: [
        fileURLToPath(new URL('./index.html', import.meta.url)),
        fileURLToPath(new URL('./gebaeudereinigung/index.html', import.meta.url)),
        fileURLToPath(new URL('./404.html', import.meta.url)),
      ],
    },
  },
});
