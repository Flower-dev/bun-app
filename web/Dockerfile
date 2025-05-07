FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lockb .

# Install all dependencies including dev dependencies
RUN bun install

# Copy the entire project (including source code and configuration files)
COPY . .

# Set development environment
ENV NODE_ENV=development

# Serve the built frontend application
CMD ["bun", "run", "dev"]

EXPOSE 5173