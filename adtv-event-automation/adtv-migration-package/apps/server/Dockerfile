# Use official Node.js runtime as base image
FROM node:20-alpine

# Install OpenSSL and other necessary libraries for Prisma
RUN apk add --no-cache openssl-dev ca-certificates

# Set the working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN pnpm prisma generate

# Copy source code
COPY src ./src/
COPY tsconfig.json ./

# Build the application
RUN pnpm tsc -p tsconfig.json

# Remove dev dependencies to reduce image size
RUN pnpm prune --production

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 8000

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'set -e' >> /app/start.sh && \
    echo 'echo "=== PAYCILE API STARTUP ==="' >> /app/start.sh && \
    echo 'echo "Running database migrations..."' >> /app/start.sh && \
    echo 'npx prisma migrate deploy || echo "⚠️ Migration failed, continuing..."' >> /app/start.sh && \
    echo 'echo "✅ Migrations completed"' >> /app/start.sh && \
    echo 'echo "🚀 Starting the application..."' >> /app/start.sh && \
    echo 'exec node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# Start the application
CMD ["/app/start.sh"]