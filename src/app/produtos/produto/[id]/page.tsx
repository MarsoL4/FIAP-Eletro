"use client"
import { TipoProduto } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function produto({params}:{params:{id:number}}){

    const navigate = useRouter()

    const [produto, setProduto] = useState<TipoProduto>({
        id: 0,
        nome: '',
        preco: 0,
        estoque: 0
    })

    const id = params.id

    //Recuperando o produto da API através do ID
    useEffect(()=>{
        const chamadaApi = async ()=>{
            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`)
            const data = await response.json()
            setProduto(data)
            console.log(data);
            
        }
        chamadaApi()
    },[id])

    //Função para armazenar os dados digitados pelo usuário no obj produto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const{name, value} = e.target
        setProduto({...produto, [name]:value})
    } 

    return(
        <main className="grow">
            <h2 className="text-3xl text-center text-indigo-600 mb-4">Produto</h2>

            <form >
                <div>
                    <label htmlFor="idnome">Nome</label>
                    <input type="text" name="nome" value={produto.nome} id="idnome" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="idpreco">Preço</label>
                    <input type="number" step={'0,01'} name="preco" value={produto.preco} id="idpreco" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="idestoque">Estoque</label>
                    <input type="number" name="estoque" value={produto.estoque} id="idestoque" onChange={handleChange}/>
                </div>
                <button type="submit">Editar Produto</button>
            </form>
            <button></button>
        </main>
    )
}