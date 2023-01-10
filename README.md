<h1>Open Book API</h1>

<h3><strong>Proposta:</strong></h3>
<p>Ser um sistema para editoras e autores de livros publicarem suas obras literárias para leitura página a página e permitir acesso à listagem de autores e livros cadastrados e publicados.</p>
<hr noshade />

<h2>[201] Aderir autores ao sistema com sucesso.</h2>
<h3>POST - /author</h3>

<strong>Essa rota não necessita autenticação bearer token. Campos de envio para request:</strong>
<ul>
    <li><strong>name: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>email: </strong>Entrada obrigatória do tipo string email e máximo 100 chars.</li>
    <li><strong>password: </strong>Entrada obrigatória do tipo string e máximo 50 chars.</li>
    <li><strong>city: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>country: </strong>Entrada obrigatória do tipo string e máximo 100 chars.</li>
    <li><strong>isAdm: </strong>Entrada opcional do tipo boolean com padrão falso.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">201</strong> para criação realizada com sucesso:</p>
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
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para email já existente:</p>
<pre>
{
    "message": "Email already registered to another author."
}
</pre>
<hr noshade />

<h2>[200] Listar autores cadastrados no sistema e seus respectivos livros.</h2>
<h3>GET - /author</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para listagem bem sucedida:</p>
<pre>
[
    {
    "id": "9521d750-a277-4237-bad2-dc2d6d988151",
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
    "id": "ce486924-b51f-4c39-a04f-5792e997cfad",
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
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">204</strong> para lista vazia de autores:</p>
<pre>
{
    "message": "There are no authors registered yet."
}
</pre>
<hr noshade />

<h2>[200] Mostrar um autor específico cadastrado no sistema e seus respectivos livros.</h2>
<h3>GET - /author/:id</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body, mas é preciso enviar o id do autor como parâmetro:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
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
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para autor inexistente ou não encontrado:</p>
<pre>
{
    "message": "Author not found."
}
</pre>
<hr noshade />


<h2>[200] Autenticar acesso a autores cadastrados.</h2>
<h3>POST - /login</h3>

<strong>Essa rota não necessita autenticação bearer token. Campos de envio para request:</strong>
<ul>
    <li><strong>email: </strong>Entrada obrigatória do tipo string email e máximo 100 chars.</li>
    <li><strong>password: </strong>Entrada obrigatória do tipo string e máximo 50 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para validação de credenciais realizada com sucesso:</p>
<pre>
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FkbSI6ZmFsc2UsImlhdCI6MTY3MTcyNjYyNSwiZXhwIjoxNjcxODEzMDI1LCJzdWIiOiJhMTkzYzY5YS02NzRkLTQ2N2QtOGZlOC0yNGUwOTBlZWYxNzAifQ.pZIAgGuHqx-70DrTnJ2lSH8WS6527RGTVDjldhdtlJ8"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para email e/ou senha inválidas ou inexistente:</p>
<pre>
{
    "message": "Invalid access credentials."
}
</pre>
<hr noshade />

<h2>[201] Criar novo livro para o autor autenticado.</h2>
<h3>POST - /books</h3>

<strong>Essa rota necessita autenticação bearer token para identificar o autor. Campos de envio para request:</strong>
<ul>
    <li><strong>title: </strong>Entrada obrigatória e única do tipo string e máximo 100 chars.</li>
    <li><strong>category: </strong>Entrada obrigatória do tipo array de numbers com o id das categorias a serem relacionadas com o livro.</li>
    <li><strong>about: </strong>Entrada obrigatória do tipo string e máximo 120 chars.</li>
    <li><strong>coverUrl: </strong>Entrada obrigatória do tipo string e máximo 350 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">201</strong> para criação realizada com sucesso:</p>
<pre>
{
    "id": "97036eff-9a4a-4062-b11a-014f3842808a",
    "title": "Hammerdown",
    "category": [1,8,12],
    "about": "A história de um herói guerreiro da idade média que enfrenta o império para salvar todo um povoado."
    "coverUrl": "http://mh.app.br/HDCover.png",
    "createdAt": "2023-01-01"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para título de livro já existente:</p>
<pre>
{
    "message": "Book title already registered into the system."
}
</pre>
<hr noshade />