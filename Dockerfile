# Stage 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY . .

RUN npm run build

# Stage 2: run
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install

CMD ["node", "dist/src/app.js"]
