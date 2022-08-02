import FilmesModels from "../Models/FilmesModel.js"
import FilmesMetodos from "../DAO/FilmesMetodos.js"
import FilmesDatabase from "../infra/FilmesDatabase.js"


class Filmes{
    /**
     * 
     * @param {*} app 
     * 
     */
    static rotas(app){
        app.get("/filmes", async (req, res) => {
            const response = await FilmesMetodos.listarTodosFilmes()
            res.status(200).json(response)
        })

        app.get("/filmes/:id", async (req, res) => {
            const response = await FilmesMetodos.listarFilmePorId(req.params.id)
            res.status(200).json(response)
        })

        app.post("/filmes", async (req, res) => {
            try {
                const filme = new FilmesModels(...Object.values(req.body))
                const response = await FilmesMetodos.novoFilme(filme)
                res.status(201).json(response)
                
            } catch (error) {
                res.status(400).json(error.message)
                console.log(error.message)
            }

        })

        // app.put("/filmes/:id", (req, res) => {
        //     const filme = new FilmesModels(...Object.values(req.body))
        //     const response = await FilmesMetodos.atualizarPorId(filme)
        //     res.status(201).json(response)
        // })

        app.delete("filmes/:id", async (req, res) => {
            const filme = await FilmesMetodos.deletaFilmePorId(req.params.id, req.bpdy)
            res.status(200).json(response)
        })

    }

   }

export default Filmes