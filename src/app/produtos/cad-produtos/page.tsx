'use client'

import { TipoProduto } from "../../../types" 
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
 
export default function CadastroPrudutos(){
 
    const navigate = useRouter()
 
    const[produto,setProduto] = useState<TipoProduto>({
        id:0,
        nome:"",
        preco:0,
        estoque:0
    })
 
    const hadleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setProduto({...produto, [name]:value})
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const cabecalho = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(produto)
        }

        try{
            const response = await fetch("http://localhost:3000/api/base-produtos", cabecalho)
            
            if (response.ok){
                alert(`${produto.nome} cadastrado com sucesso!`)
                setProduto({id: 0, nome: "", preco: 0, estoque: 0})
                navigate.push('/produtos')
            }else{
                alert("Erro ao cadastrar!")
            }
            
        }catch(error){
            console.error("Erro ao cadastrar o produto", error);
        }
    }
 
    return(
        <main>
            <h1 className="text-3xl text-center font-bold mb-2 text-indigo-600">Cadastro de Produtos</h1>
            <p className="text-xl text-center font-semibold mb-4">Aqui inserimos um novo produto assim que chega na loja.</p>
            <form className="w-1/3 m-auto p-2 border border-indigo-950 rounded-md" onSubmit={handleSubmit}>
                <div className="flex flex-col p-2">
                    <label htmlFor="idnome" className="text-gray-700">Nome</label>
                    <input className= "border border-gray-700 p-1 rounded-md" type="text" name="nome" value={produto.nome} onChange={hadleChange}/>
                </div>
                <div className="flex flex-col p-2">
                    <label htmlFor="idpreco" className="text-gray-700">Preço</label>
                    <input className= "border border-gray-700 p-1 rounded-md" step={'0.01'} type="text" name="preco" value={produto.preco} id="idpreco" onChange={hadleChange}/>
                </div>
                <div className="flex flex-col p-2">
                    <label htmlFor="idestoque" className="text-gray-700">Estoque</label>
                    <input className= "border border-gray-700 p-1 rounded-md" type="number" name="estoque" id="idestoque" value={produto.estoque} onChange={hadleChange}/>
                </div>
                <button className="bg-green-700 text-white text-xl p-2 ms-auto me-2 block rounded-md" type="submit">Cadastrar Produto</button>
            </form>
        </main>
    )
}
 