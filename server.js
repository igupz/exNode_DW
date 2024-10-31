const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let receitas = [
    { id: 1, nome: 'Bolo de Chocolate', ingredientes: ['farinha', 'chocolate', 'açúcar', 'leite'], tipo: 'sobremesa' },
    { id: 2, nome: 'Churrasco', ingredientes: ['carne', 'sal', 'carvão'], tipo: 'confraternização' },
    { id: 3, nome: 'Strogonoff', ingredientes: ['creme', 'frango', 'arroz', 'batata-palha'], tipo: 'almoço' }
];

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Listar todas as receitas
app.get('/receitas', (req, res) => {
    res.json(receitas);
});

// Buscar receitas por ingrediente ou tipo
app.get('/receitas/busca', (req, res) => {
    console.log('Rota /receitas/busca acessada');
    const { ingrediente, tipo } = req.query;
    console.log('Parâmetros de busca:', req.query);

    if (!ingrediente && !tipo) {
        console.log('Nenhum parâmetro fornecido.');
        return res.status(400).send('É necessário informar um ingrediente ou um tipo.');
    }

    let resultados = receitas;
    if (ingrediente) {
        resultados = resultados.filter(r => r.ingredientes.includes(ingrediente));
    }

    if (tipo) {
        resultados = resultados.filter(r => r.tipo.toLowerCase() === tipo.toLowerCase());
    }

    console.log('Resultados encontrados:', resultados);
    if (resultados.length === 0) {
        console.log('Nenhuma receita encontrada.');
        return res.status(404).send('Nenhuma receita encontrada para os critérios de busca fornecidos.');
    }

    res.json(resultados);
});

// Obter uma receita por ID
app.get('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (!receita) return res.status(404).send('Receita não encontrada.');
    res.json(receita);
});

// Adicionar uma nova receita
app.post('/receitas', (req, res) => {
    const receita = {
        id: receitas.length + 1,
        nome: req.body.nome,
        ingredientes: req.body.ingredientes,
        tipo: req.body.tipo
    };
    receitas.push(receita);
    res.status(201).json(receita);
});

// Atualizar uma receita existente
app.put('/receitas/:id', (req, res) => {
    const receita = receitas.find(r => r.id === parseInt(req.params.id));
    if (!receita) return res.status(404).send('Receita não encontrada.');
    receita.nome = req.body.nome;
    receita.ingredientes = req.body.ingredientes;
    receita.tipo = req.body.tipo;
    res.json(receita);
});

// Deletar uma receita
app.delete('/receitas/:id', (req, res) => {
    const receitaIndex = receitas.findIndex(r => r.id === parseInt(req.params.id));
    if (receitaIndex === -1) return res.status(404).send('Receita não encontrada.');
    receitas.splice(receitaIndex, 1);
    res.status(204).send();
});


app.get('/receitas/busca', (req, res) => {
    console.log('Rota /receitas/busca acessada'); // Adicione esta linha para debug
    const { ingrediente, tipo } = req.query;
    console.log('Parâmetros de busca:', req.query);

    if (!ingrediente && !tipo) {
        console.log('Nenhum parâmetro fornecido.');
        return res.status(400).send('É necessário informar um ingrediente ou um tipo.');
    }

    let resultados = receitas;
    if (ingrediente) {
        resultados = resultados.filter(r => {
            const hasIngredient = r.ingredientes.includes(ingrediente);
            console.log(`Verificando ingrediente: ${ingrediente} em ${r.nome}: ${hasIngredient}`);
            return hasIngredient;
        });
    }

    if (tipo) {
        resultados = resultados.filter(r => {
            const matchesType = r.tipo.toLowerCase() === tipo.toLowerCase();
            console.log(`Verificando tipo: ${tipo} em ${r.nome}: ${matchesType}`);
            return matchesType;
        });
    }

    console.log('Resultados encontrados:', resultados);
    if (resultados.length === 0) {
        console.log('Nenhuma receita encontrada.');
        return res.status(404).send('Nenhuma receita encontrada para os critérios de busca fornecidos.');
    }

    res.json(resultados);
});

// Inicializar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
