import express from "express";
import * as dotenv from "dotenv";
import Combos from "./src/controllers/Combos.js"
import Salas from "./src/controllers/Sala.js";

dotenv.config()

const port = process.env.PORT || 3002;
const app = express()

    /**
     * verificação de servidor online
     */
    app.listen(port, () => {
        console.log(`servidor online em http://localhost:${port}`)
    })

app.use(express.json())

Combos.combos(app)
Salas.rotas(app)
