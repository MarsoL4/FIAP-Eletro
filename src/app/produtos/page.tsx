"use client"
import { TipoProduto } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Produtos(){

    const navigate = useRouter()

    const [lista, setLista] = useState<TipoProduto[]>([])

    useEffect(()=>{
        const chamadaApi = async () => {
            const response = await fetch("http://localhost:3000/api/base-produtos")
            const data = await response.json()
            setLista(data)
            console.log(data);            
        }
        chamadaApi()
    },[])

    const handleDelete = async (id: number)=>{
        try{
            const response = await fetch(`http://localhost:3000/api/base-produtos/${id}`, {method: "DELETE"})
            if(response.ok){
                window.location.reload()
            }else{
                alert("Erro ao deletar o produto")
                navigate.push('/produtos')
            }
        }catch(error){
            console.log("Falha ao apagar registro.", error);
        }

    }

    return(
        <main className="grow p-5">
            <h1 className="text-center text-4xl font-bold text-indigo-600 mb-4">Produtos</h1>
            <table className="w-2/3 m-auto"> {/*vai pegar 2/3 da tela*/}
                <thead className="bg-slate-900 text-white"> {/*Cabecalho (Parte de cima) da tabela*/}
                    <tr>
                        <th>Id</th><th>Nome</th><th>Preço</th><th>estoque</th><th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista.map(p=>(
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.preco}</td>
                                <td>{p.estoque}</td>
                                <td><Link className="font-bold text-red-600" href={`/produtos/produto/${p.id}`}>Editar</Link>
                                {" | "}
                                <button onClick={()=>handleDelete(p.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot className="bg-black text-white">
                    <tr>
                        <td colSpan={5}>Total de Produtos: {lista.length}</td> {/*colspan={5}*-> diz que vai pegar o tamanho de 5 colunas da tabela*/}
                    </tr>
                </tfoot>
            </table>
        </main>
    )
}

