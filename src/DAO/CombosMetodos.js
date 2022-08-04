import DAO from "./DAO.js"
import Database from "../infra/Database.js"

class CombosMetodos extends DAO {
    static activePragma(){
        const pragma = "PRAGMA foreign_keys = ON"

        Database.run(pragma, (e) => {
            if(e){
                console.log(e)
            } else {
                console.log("Chaves estrangeiras ativas")
            }
        })
    }

    static async listarCombos(){
        const query = ` SELECT * FROM combos`
        const response = await this.listarTodos(query)
        return response
    }     
    static async listarCombosId(id){
        const query = ` SELECT * FROM combos WHERE id = ?`
        const response = await this.listarPorId(id, query)
        return response
    }
    static async listarCombosNome(name){
        const query = ` SELECT * FROM combos WHERE name = ?`
        const response = await this.listarPorId(name, query)
        
        return response
    }

    
    static createTableCombos() {
        this.activePragma()

        const query = `
            CREATE TABLE IF NOT EXISTS combos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR,
            price INT,
            item1 VARCHAR,
            item2 VARCHAR,
            item3 VARCHAR
        )`

        return new Promise((resolve, reject) => {
            Database.run(query, (e) => {
                if(e) {
                    reject(e.message)
                } else {
                    resolve("Tabela combos criada com sucesso")
                }
            })
        })
    }
    
    static async inserirCombos(combos) {
        const query = `
            INSERT INTO combos (name, price, item1, item2, item3)
            VALUES (?, ?, ?, ?, ?)`

        const response = await this.inserir(combos, query)

        return response
    }
    
    static async attCombosPorId(id, sala){
        const query = `
            UPDATE combos
            SET (name, price, item1, item2, item3) = (?,?,?,?,?) 
            WHERE id = ?`
        const response = await this.atualizaPorId(sala, id, query)
        return response;
    }

    static async deletarCombosPorId(id){
        const query = `
            DELETE * FROM combos WHERE id = ?`
        const response = await this.deletaPorId(query, id)
        return response;
    }

}

export default CombosMetodos

