# Stage 1: Python environment
FROM python:3.9-alpine AS python_env
# Stage 1: Python environment with TensorFlow
FROM gcr.io/tensorflow/tensorflow:latest

# Set working directory in the container
WORKDIR /app

# Install necessary dependencies for building Python from source
RUN apt-get update && \
    apt-get install -y build-essential wget git

# Install Python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Check installed Python packages for debugging
RUN pip list

# Stage 2: Node
# Install dependencies only when needed
FROM node:lts-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json ./
RUN npm ci


# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# If using npm comment out above and use below instead
RUN npm run build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:lts-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/ml /app/ml

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
#COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy Python environment
COPY --from=python_env /usr/local /usr/local

# Ensure /usr/local/bin is in PATH for python
ENV PATH="/usr/local/bin:${PATH}"

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "start"]
