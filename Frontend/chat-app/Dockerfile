FROM node:20 

 WORKDIR /app

 COPY package.json .

 RUN npm install

 COPY . .

 EXPOSE 5173

 CMD ["npm", "run", "dev"]



#  docker run --name mongo --network mern -d -p 27017:27017 -v ~/opt/data:/data/db mongo:latest