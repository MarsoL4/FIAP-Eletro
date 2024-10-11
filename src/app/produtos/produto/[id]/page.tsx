"use client"
import { TipoProduto } from "@/types"
import { useEffect, useState } from "react"

export default function produto({params}:{params:{id:number}}){

    const [produto, setProduto] = useState<TipoProduto>()

    useEffect(()=>{
        const chamadaApi = async ()=>{
            const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`)
            const data = await response.json()
            setProduto(data)
            console.log(data);
            
        }
        chamadaApi()
    },[]) /*[]-> indica que só ocorrerá apos a pagina ser carregada*/

    return(
        <main className="grow">
            <h2 className="text-3xl text-center text-indigo-600 mb-4">Produto</h2>

            <div>
                <p>Id: {produto?.id} {/*Coloca o ? pois há a possibilidade desse valor não receber nada*/}</p>
                <p>Nome: {produto?.nome}</p>
                <p>Preço: {produto?.preco}</p>
                <p>Estoque: {produto?.estoque}</p>
            </div>
        </main>
    )
}