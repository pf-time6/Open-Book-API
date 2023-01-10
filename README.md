<h1>Open Book API</h1>

<h3><strong>Proposta:</strong></h3>
<p>Ser um sistema para editoras e autores de livros publicarem suas obras literárias para leitura página a página e permitir acesso à listagem de autores e livros cadastrados e publicados.</p>
<hr noshade />

<h2>[201] Aderir autores ao sistema com sucesso.</h2>
<h3>POST - /author</h3>

<strong>Essa rota não necessita autenticação Bearer token. Campos de envio para request:</strong>
<ul>
    <li><strong>name: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>email: </strong>Entrada obrigatória do tipo string email e máximo 100 chars.</li>
    <li><strong>password: </strong>Entrada obrigatória do tipo string e máximo 50 chars.</li>
    <li><strong>city: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>country: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>isAdm: </strong>Entrada opcional do tipo boolean com padrão falso.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen">201</strong> para criação realizada com sucesso:</p>
<pre>
{
    "id": "9521d750-a277-4237-bad2-dc2d6d988151",
    "email": "marcelohm@gmail.com",
    "name": "Marcelo Henrique Marques",
    "city": "Belo Horizonte",
    "country": "Brasil",
    "isAdm": false,
    "isActive": true,
    "createdAt": "2023-01-01",
    "updatedAt": "2023-01-01"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red">409</strong> para email já existente:</p>
<pre>
{
    "message": "Email already registered to another author."
}
</pre>
<hr noshade />

<h2>[200] Listar autores cadastrados no sistema e seus respectivos livros.</h2>
<h3>GET - /author</h3>

<strong>Essa rota não necessita autenticação Bearer token nem request body:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen">200</strong> para listagem bem sucedida:</p>
<pre>
[
    {
    "uuid": "9521d750-a277-4237-bad2-dc2d6d988151",
    "email": "marcelohm@gmail.com",
    "name": "Marcelo Henrique Marques",
    "city": "Belo Horizonte",
    "country": "Brasil",
    "isAdm": false,
    "isActive": true,
    "createdAt": "2023-01-01",
    "updatedAt": "2023-01-01",
    "books":[
        {
            "uuid": "97036eff-9a4a-4062-b11a-014f3842808a",
            "title": "Hammerdown",
            "category": ["Fiction","Adventure","Action"],
            "about": "A história de um herói guerreiro da idade média que enfrenta o império para salvar todo um povoado.",
            "coverUrl": "http://mh.app.br/HDCover.png"
        }
    ]
    },
    {
    "uuid": "ce486924-b51f-4c39-a04f-5792e997cfad",
    "email": "paulonogres@gmail.com",
    "name": "Paulo Nogueira Resende",
    "city": "Rio de Janeiro",
    "country": "Brasil",
    "isAdm": false,
    "isActive": true,
    "createdAt": "2023-01-02",
    "updatedAt": "2023-01-02",
    "books":[]
    }
]
</pre>
<p>Retorno esperado com status code <strong style="color:red">204</strong> para lista vazia de autores:</p>
<pre>
{
    "message": "There are no authors registered yet."
}
</pre>
<hr noshade />