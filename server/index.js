import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js'
import ConnectionDB from './database/mongodb.js'

const app = express();
const PORT = 8080;
const hostName = '127.0.0.8'

app.use(express.json())
app.use(express.urlencoded())
app.use(cors(
    {
        origin:["*"],
        method:["POST","GET"],
        credentials:true
    }
))


app.use("/", userRoutes);

app.get('/', (req, res) => res.send("Hello From Express"));
app.all("*", (req, res) => res.send("That routes doesno exist"))

app.listen(PORT, hostName, async () => {
    console.log(`server is started on http://${hostName}:${PORT}`);
    await ConnectionDB();
});
