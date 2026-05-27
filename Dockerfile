# ─────────────────────────────────────────────
# Stage 1: Build
# ─────────────────────────────────────────────
FROM node:20.14.0-alpine AS builder

WORKDIR /app

# Copiar solo los manifiestos primero (cache layer)
COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Build de producción con Vite
RUN npm run build

# ─────────────────────────────────────────────
# Stage 2: Serve con Nginx
# ─────────────────────────────────────────────
FROM nginx:1.27.0-alpine AS production

# Eliminar config default de nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copiar nuestra config personalizada
COPY nginx/nginx.conf /etc/nginx/conf.d/app.conf

# Copiar los archivos del build
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
