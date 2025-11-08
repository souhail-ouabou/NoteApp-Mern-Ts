# ---- Build Stage ----
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build TS if needed (or just run ts-node)
RUN npm run build || true

EXPOSE 5000
CMD ["npm", "start"]
