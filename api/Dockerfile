FROM oven/bun

WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lockb .

# Install all dependencies including dev dependencies
RUN bun install

# Copy source code and configuration files
COPY src src
COPY tsconfig.json .

# Create volume for database
VOLUME ["/app/database.sqlite"]

# Set development environment
ENV NODE_ENV=development

# Start the application in development mode with watch
CMD ["bun", "--watch", "run", "src/index.ts"]

EXPOSE 3000