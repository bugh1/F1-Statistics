FROM node:10

# Create app directory
WORKDIR /app

# Install dependencies for server
COPY package*.json ./
RUN npm install

# Create app directory for frontend
WORKDIR /app/frontend

# Install dependencies for frontend
COPY frontend/package*.json ./
RUN npm install

# Bundle app source
WORKDIR /app
COPY . .

# Create production build for React app
WORKDIR /app/frontend
RUN npm run build

WORKDIR /app
ENV NODE_ENV production
EXPOSE 5000
CMD [ "npm", "start" ]
