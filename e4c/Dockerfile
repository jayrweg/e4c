# E4C Next.js Production Dockerfile
# For deploying to custom servers, VPS, or cloud platforms

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/e4c

# Install dependencies
COPY e4c/package.json e4c/package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app/e4c

COPY --from=deps /app/e4c/node_modules ./node_modules
COPY e4c/ .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET=production
ARG SANITY_API_TOKEN
ARG RESEND_API_KEY

ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET

# Build Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app/e4c

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/e4c/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/e4c/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/e4c/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
