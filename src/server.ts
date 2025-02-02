import express, { Application } from "express";
import http from "http";
import { Server, Socket } from "socket.io"
class App {
    private app: Application
    private http: http.Server
    private io: Server
    constructor() {
        this.app = express();
        this.http = http.createServer(this.app);
        this.io = new Server(this.http);
        this.listenSocket();
        this.setupRoutes()
    }
    listenServer() {
        this.http.listen(3333, () => console.log("Server Running at Port 3333 🚀"));
    }
    listenSocket() {
         this.io.on("connection", (socket) => {
             console.log(`socket ${socket.id} connected`);
            
            socket.on("message", (msg)=>{
                this.io.emit("message", msg)
            })
            })

             
    }
    setupRoutes() { 
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })
    }
}
const app = new App()

app.listenServer();
