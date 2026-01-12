# ---- Base Node ----
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# ---- Dependencies ----
FROM base AS deps

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies for build
RUN pnpm install --frozen-lockfile

# ---- Production Dependencies ----
FROM base AS prod-deps

COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# ---- Build ----
FROM base AS build

# Copy all dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js application
RUN pnpm run build

# ---- Production ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=8080

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Install pnpm in runner
RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

# Copy production dependencies from prod-deps stage
COPY --from=prod-deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Copy built application from build stage
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=build --chown=nextjs:nodejs /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Copy next.config if it exists
COPY --from=build --chown=nextjs:nodejs /app/next.config.* ./

# Switch to non-root user
USER nextjs

# Expose port (Cloud Run standard)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Start Next.js on port 8080
CMD ["pnpm", "start", "-p",
