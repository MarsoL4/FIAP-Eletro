import { TipoProduto } from "../../../types" 
import { useRouter } from "next/router";
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
            <h1>Cadastro de Produtos</h1>
            <p>Aqui inserimos um novo produto assim que chega na loja.</p>
            <form>
                <div>
                    <label htmlFor="idnome">Nome</label>
                    <input type="text" name="nome" value={produto.nome}
                    onChange={hadleChange}/>
                </div>
                <div>
                    <label htmlFor="idpreco">Preço</label>
                    <input step={'0.01'} type="text" name="preco" value={produto.preco} id="idpreco"
                     onChange={hadleChange}/>
                </div>
                <div>
                    <label htmlFor="idestoque">Estoque</label>
                    <input type="number" name="estoque" id="idestoque" value={produto.estoque}
                     onChange={hadleChange}/>
                </div>
                <button type="submit">Cadastrar Produto</button>
            </form>
        </main>
    )
}
 