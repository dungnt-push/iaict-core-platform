FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY prisma ./prisma/

RUN npm install
COPY . .
RUN cd apps/api && npx prisma generate && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
