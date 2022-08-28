# Setup basic load balancing with Nginx (On AWS EC2 Instance)

1. Create AWS Ubuntu EC2 instance and connect through SSH
2. Install Nginx and Replace the nginx.conf file with following code (File path: etc/nginx/nginx.conf)
```
# For Basic Round-Robing
http {
   upstream sampleapi {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001;
        server 127.0.0.1:3002;
        server 127.0.0.1:3003;
   }
   server {
     listen 80;
     location / {
         proxy_pass http://sampleapi;
     }
   }
}
events {}
```
3. Install Node v18.4.0 and Docker Engine
4. Create sample app with `npm init` and create index.js file and paste following code
```
const express = require('express');
const app = express();
const port = parseInt(process.argv[2])

if (typeof port !== "number") {
    console.log("couldn't find the port")
    process.exit();
}

app.get('/', (req, res) => {
  res.send({
      message: `Hello, I'm running on port ${port}`
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})
```
5. Install required node modules `npm install express`
6. Create `Dockerfile` with different ports according the nginx configurations
```
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Change 3003 according to relevant port on both EXPOSE and CMD commands
EXPOSE 3003
CMD [ "node", "index.js", "3003" ]
```
7. Create `.dockerignore` to ignore unwanted file when copying and building
```
node_modules
npm-debug.log
```
8. Build and run 4 different docker images with respective ports
```
# Build Images
sudo docker build . -t <docker-image-name>

# Run Images
sudo docker run -p <port-mentioned-dockerfile>:<port-mentioned-dockerfile> -d <docker-image-name>

```
9. Finally, check on browser or terminal with EC2 instance public url
![image]('terminal.png')