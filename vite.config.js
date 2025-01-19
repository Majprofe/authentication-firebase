import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('Cargando variables de entorno:', env); // Depuración
  return {
    build: {
      outDir: '../dist',
    },
  };
});
