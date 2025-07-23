## npm install dotenv

# Exercise 5 – Deploy the Social Media Dashboard App on Docker

## 🛠️ Update MongoDB Connection in `app.js`

Replace the existing MongoDB URL and connection logic with the following snippet:

```javascript
const uri = "mongodb://mongodb:27017";
mongoose.connect(uri, { dbName: 'SocialDB' });
```

> **Note:**  
> This URI works because the Docker Compose setup defines a MongoDB service named `mongodb`, using port `27017` (the default MongoDB port).  
> Unlike Exercise 1, no credentials are required here since the MongoDB container is configured without authentication.

### Run the following code

```bash
docker build . -t socialapp
```
> The docker-compose.yml has been created to run two containers, one for Mongo and the other for the Node app. Run the following command to run the server:

```bash
docker-compose up -d
```
```bash
docker login
docker tag socialapp:latest belvinard/socialapp:latest
docker push belvinard/socialapp:latest
```

##  Run Locally Built Image
```bash
docker run -p 3000:3000 socialapp:latest
```

##  Run from Docker Hub
```bash
docker run -p 3000:3000 belvinard/socialapp:latest
```