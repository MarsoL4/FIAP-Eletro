import { TipoProduto } from "@/types";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
    const produtos: TipoProduto[] = JSON.parse(file);

    const produto = produtos.find(p => p.id == params.id);
    return NextResponse.json(produto);
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
    try {
        const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');
        const produtos: TipoProduto[] = JSON.parse(file);
        const index = produtos.findIndex(p => p.id == params.id);

        if (index !== -1) {
            const body = await request.json();
            produtos.splice(index, 1, body);
            await fs.writeFile(process.cwd() + '/src/data/base.json', JSON.stringify(produtos, null, 2));
            return NextResponse.json({ msg: 'Produto atualizado com sucesso' });
        } else {
            return NextResponse.json({ msg: 'Produto não encontrado' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ msg: 'Erro ao atualizar o produto: ' + error }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json', 'utf-8');

}
