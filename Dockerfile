FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install -D ts-node-dev 
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run","prod"]  


