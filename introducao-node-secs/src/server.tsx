import express from 'express';
const app = express();
app.listen(3333, () => {
    console.log('Server started on port 3333')
});

/*
    Para rodar de forma proficional esta aplicação,
    precisamos rodar o comando:
    "npx tsx src/server.ts"
    Porém isso não é legal, então vamos em package.json
    e em "scripts": { }, adicionamos o seguinte:
    "scripts": {
    "dev": "tsx watch src/server.ts"
    },
    Em que "watch" significa assitir todas as mudanças do arquivo
*/
