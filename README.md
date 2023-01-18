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
    "updatedAt": "2023-01-18T18:46:12.725Z",
    "createdAt": "2023-01-18T18:46:12.725Z",
    "isActive": true,
    "isAdm": true,
    "country": "Brasil",
    "city": "Belo Horizonte",
    "email": "mhmarques@rpgroom.com.br",
    "name": "Marcelo Henrique A. Marques",
    "id": "146c8c8b-fef1-4487-8641-cff3ef748c7a"
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

<strong>Essa rota necessita autenticação bearer token sem request body:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para listagem bem sucedida:</p>
<pre>
[
    {
        "id": "146c8c8b-fef1-4487-8641-cff3ef748c7a",
        "name": "Marcelo Henrique A. Marques",
        "email": "mhmarques@rpgroom.com.br",
        "isAdm": true,
        "isActive": true,
        "country": "Brasil",
        "city": "Belo Horizonte",
        "updatedAt": "2023-01-18T18:46:12.725Z",
        "createdAt": "2023-01-18T18:46:12.725Z",
        "books": [
            {
                "id": "24ee6f3d-8ba8-4e68-8ab7-cc118bd5ca75",
                "title": "Hammerdown. The 1st Book",
                "about": "Hammerdown is a mercenary from Sentry, the main city of the desert of Saint Blade.",
                "coverUrl": "https://mh.app.br/bookCover.png",
                "createdAt": "2023-01-18T18:51:25.092Z"
            }
        ]
    },
    {
        "id": "fae43b77-1c12-4fb4-af8e-4fb13fab5e26",
        "name": "Ronaldo Algusto Moreira Alves",
        "email": "ramalves@email.com",
        "isAdm": false,
        "isActive": true,
        "country": "Brasil",
        "city": "Miritituba",
        "updatedAt": "2023-01-18T18:50:16.343Z",
        "createdAt": "2023-01-18T18:50:16.343Z",
        "books": []
    }
]
</pre>
<hr noshade />

<h2>[200] Mostrar um autor específico cadastrado no sistema e seus respectivos livros.</h2>
<h3>GET - /author/:id</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body, mas é preciso enviar o id do autor como parâmetro:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
    {
        "id": "146c8c8b-fef1-4487-8641-cff3ef748c7a",
        "name": "Marcelo Henrique A. Marques",
        "email": "mhmarques@rpgroom.com.br",
        "isAdm": true,
        "isActive": true,
        "country": "Brasil",
        "city": "Belo Horizonte",
        "updatedAt": "2023-01-18T18:46:12.725Z",
        "createdAt": "2023-01-18T18:46:12.725Z",
        "books": [
            {
                "id": "24ee6f3d-8ba8-4e68-8ab7-cc118bd5ca75",
                "title": "Hammerdown. The 1st Book",
                "about": "Hammerdown is a mercenary from Sentry, the main city of the desert of Saint Blade.",
                "coverUrl": "https://mh.app.br/bookCover.png",
                "createdAt": "2023-01-18T18:51:25.092Z"
            }
        ]
    }
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para autor inexistente ou não encontrado:</p>
<pre>
{
    "message": "Author not found"
}
</pre>
<hr noshade />

<h2>[200] Alterar informações de um autor específico cadastrado no sistema.</h2>
<h3>PATCH - /author/:id</h3>

<strong>Essa rota necessita autenticação bearer token e é preciso enviar o id do autor como parâmetro. Apenas administradores e o próprio autor podem realizar modificação nos campos:</strong>

<ul>
    <li><strong>name: </strong>Entrada opcional do tipo string e máximo 100 chars.</li>
    <li><strong>password: </strong>Entrada opcional do tipo string e máximo 50 chars.</li>
    <li><strong>city: </strong>Entrada opcional do tipo string e máximo 100 chars.</li>
    <li><strong>country: </strong>Entrada opcional do tipo string e máximo 100 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
{
	"id": "c0b3d95e-08db-41db-a018-6f02b1aefc45",
	"name": "Ronaldo Algusto M. Alves",
	"email": "ramalves@email.com",
	"city": "São Paulo",
	"country": "Brasil",
	"isAdm": false,
	"isActive": true,
	"createdAt": "2023-01-18T17:09:29.508Z",
	"updatedAt": "2023-01-18T17:24:09.865Z",
	"deletedAt": null
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para autor inexistente ou não encontrado:</p>
<pre>
{
    "message": "Author not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para acesso indevido de autor não administrador:</p>
<pre>
{
    "message": "Unauthorized credential"
}
</pre>
<hr noshade />

<h2>[204] Aplicar soft delete em um author específico.</h2>
<h3>DELETE - /author/:id</h3>

<strong>Essa rota necessita autenticação bearer token e é preciso enviar o id do autor como parâmetro. Apenas administradores e o próprio autor podem realizar esta operação:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">204</strong> com o retorno vazio</p>
<pre>
{}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para autor inexistente ou não encontrado:</p>
<pre>
{
    "message": "Author not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para acesso indevido de autor não administrador:</p>
<pre>
{
    "message": "Unauthorized credential"
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
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para email e/ou senha inválidas ou inexistente:</p>
<pre>
{
    "message": "Email or password invalid"
}
</pre>
<hr noshade />

<h2>[201] Criar nova opção de categoria para livros.</h2>
<h3>POST - /categories</h3>

<strong>Essa rota necessita autenticação bearer token de administrador. Campo de envio para request:</strong>

<ul>
    <li><strong>name: </strong>Entrada obrigatória do tipo string com máximo de 60 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">201</strong> para criação realizada com sucesso:</p>
<pre>
{
    "id": "1",
    "name": "Adventure"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para nome de categoria já inexistente:</p>
<pre>
{
    "message": "Category name already registered into the system."
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para criação não autorizada:</p>
<pre>
{
    "message": "Unauthorized credential"
}
</pre>
<hr noshade />

<h2>[200] Mostrar listagem de categorias cadastradas no sistema.</h2>
<h3>GET - /categories</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body.</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
[
    {
        "id": 1,
        "name": "Adventure"
    },
    {
        "id": 2,
        "name": "Science Fiction"
    },
    {
        "id": 3,
        "name": "Action"
    },
    {
        "id": 4,
        "name": "Romance"
    }
]
</pre>
<hr noshade />

<h2>[200] Editar categorias cadastradas no sistema.</h2>
<h3>PATCH - /categories/:id</h3>

<strong>Essa rota necessita autenticação bearer token e é preciso enviar o id da categoria como parâmetro. Apenas administradores podem realizar modificação no campo:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
{
	"id": 4,
	"name": "Drama"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para lista vazia:</p>
<pre>
{
    "message": "There are no categories found"
}
</pre>
<hr noshade />

<h2>[200] Deletar categorias cadastradas no sistema.</h2>
<h3>DELETE - /categories/:id</h3>

<strong>Essa rota necessita autenticação bearer token e é preciso enviar o id da categoria como parâmetro. Apenas administradores podem realizar modificação no campo:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
{
    "message": "Category deleted"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para lista vazia:</p>
<pre>
{
    "message": "There are no categories found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para categoria utilizada em algum book:</p>
<pre>
{
    "message": "Category is already being used""
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
    "id": "2f455fae-64ea-472d-8d4d-3b2308daae16",
    "title": "Star Bards. Interstellar Colonies",
    "category": [
        1,
        2
    ],
    "about": "A gang of galatic mercenaries led by a couple of bards.",
    "coverUrl": "https://starbards.com/bookCover.png",
    "createdAt": "Wed Jan 18 2023 15:51:27 GMT-0300 (Horário Padrão de Brasília)"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token."
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
    "message": "Title already registered in the system."
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para categoria de livro inexistente:</p>
<pre>
{
    "message": "There is at least one category that is not in the database."
}
</pre>
<hr noshade />

<h2>[200] Listar livros cadastrados no sistema e seus respectivos autores.</h2>
<h3>GET - /books</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para listagem bem sucedida:</p>
<pre>
[
    {
        "id": "24ee6f3d-8ba8-4e68-8ab7-cc118bd5ca75",
        "title": "Hammerdown. The 1st Book",
        "about": "Hammerdown is a mercenary from Sentry, the main city of the desert of Saint Blade.",
        "category": [
            "Adventure",
            "Science Fiction"
        ],
        "coverUrl": "https://mh.app.br/bookCover.png",
        "author": {
            "id": "146c8c8b-fef1-4487-8641-cff3ef748c7a",
            "email": "mhmarques@rpgroom.com.br",
            "name": "Marcelo Henrique A. Marques",
            "city": "Belo Horizonte",
            "country": "Brasil"
        }
    },
    {
        "id": "b4edf618-2b68-49a5-b0f2-70f97453e43a",
        "title": "Star Bards. Interstellar Colonies",
        "about": "A gang of galatic mercenaries led by a couple of bards.",
        "category": [
            "Science Fiction",
            "Action"
        ],
        "coverUrl": "https://starbards.com/bookCover.png",
        "author": {
            "id": "fae43b77-1c12-4fb4-af8e-4fb13fab5e26",
            "email": "ramalves@email.com",
            "name": "Ronaldo Algusto Moreira Alves",
            "city": "Miritituba",
            "country": "Brasil"
        }
    }
]
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para lista vazia de livros:</p>
<pre>
{
    "message": "There are no books found"
}
</pre>
<hr noshade />

<h2>[201] Criar nova página de um livro específico.</h2>
<h3>POST - /books/:id</h3>

<strong>Essa rota necessita autenticação bearer token para identificar o autor e enviar o id do livro como parâmetro. Campos de envio para request:</strong>

<ul>
    <li><strong>page: </strong>Entrada obrigatória do tipo number.</li>
    <li><strong>chapter: </strong>Entrada obrigatória do tipo number.</li>
    <li><strong>isChapter: </strong>Entrada obrigatória do tipo boolean.</li>
    <li><strong>chapterTitle: </strong>Entrada obrigatória caso isChapter seja true, do tipo string e máximo 120 chars.</li>
    <li><strong>content: </strong>Entrada obrigatória do tipo string e máximo 480 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">201</strong> para criação realizada com sucesso:</p>
<pre>
{
    "page": 1,
    "chapter": 0,
    "isChapter": true,
    "chapterTitle": "Introdução",
    "content": "Este livro é uma aventura imaginada no futuro muito distante. Um tempo em que a raça humana coloniza múltiplos planetas.",
    "books": {
        "id": "b4edf618-2b68-49a5-b0f2-70f97453e43a",
        "title": "Star Bards. Interstellar Colonies",
        "about": "A gang of galatic mercenaries led by a couple of bards.",
        "coverUrl": "https://starbards.com/bookCover.png",
        "createdAt": "2023-01-18T19:08:29.114Z"
    },
    "id": "54933404-b75e-49a6-b8da-6a69363e4ec5",
    "createdAt": "2023-01-18T19:08:42.713Z"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para id de livro que não pertence ao autor logado:</p>
<pre>
{
    "message": "Unauthorized book access"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para página já existente para o este livro:</p>
<pre>
{
    "message": "Page already registered for this book"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para chapter e isChapter true já existente para o este livro:</p>
<pre>
{
    "message": "Chapter page already registered for this book"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">409</strong> para chapter tittle e isChapter true já existente para o este livro:</p>
<pre>
{
    "message": "Chapter title already registered for this book"
}
</pre>
<hr noshade />

<h2>[200] Mostrar informações sobre um livro específico.</h2>
<h3>GET - /books/:id</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body, mas necessita enviar o id do livro como parâmetro.</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
{
    "id": "f246c397-6ed4-405d-9df5-ab239733ce91",
    "title": "Hammerdown. The 1st Book",
    "about": "Hammerdown is a mercenary from Sentry, the main city of the desert of Saint Blade.",
    "category": [
    {
        "id": "1",
        "name": "Adventure"
    },
    {
        "id": "2",
        "name": "Science Fiction"
    }
    ],
    "coverUrl": "https://mh.app.br/bookCover.png",
    "createdAt": "2023-01-18T17:35:09.275Z",
    "author": {
        "id": "5f7fc983-89c4-41e3-9b63-81453cb8a378",
        "email": "mhmarques@rpgroom.com.br",
        "name": "Marcelo Henrique A. Marques",
        "city": "Belo Horizonte",
        "country": "Brasil"
    }
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<hr noshade />

<h2>[200] Alterar as informações de um livro específico.</h2>
<h3>PATCH - /books/:id</h3>

<strong>Essa rota necessita autenticação bearer token e enviar o id do livro como parâmetro. Campos de envio para request:</strong>

<ul>
    <li><strong>category: </strong>Entrada opcional do tipo array de numbers com o id das categorias a serem relacionadas com o livro.</li>
    <li><strong>about: </strong>Entrada opcional do tipo string e máximo 120 chars.</li>
    <li><strong>coverUrl: </strong>Entrada opcional do tipo string e máximo 350 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para alteração realizada com sucesso:</p>
<pre>
{
    "id": "c69023d5-c795-4671-b4d4-d6bd49b7afde",
    "title": "Star Bards. Interstellar Colonies",
    "about": "A gang of galatic mercenaries led by a couple of bards and a diverse crew.",
    "coverUrl": "https://starbards.com/bookCover.png",
    "createdAt": "2023-01-18T17:35:19.859Z",
    "books_categories": [
    {
        "id": 1,
        "categories": {
            "id": 1,
            "name": "Science Fiction"
        }
    },
    {
        "id": 2,
        "categories": {
            "id": 2,
            "name": "Action"
        }
    }
    ]
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": "Body is empty"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para id de livro que não pertence ao autor logado:</p>
<pre>
{
    "message": "Unauthorized book access"
}
</pre>
<hr noshade />

<h2>[204] Deletar um livro específico.</h2>
<h3>DELETE - /books/:id</h3>

<strong>Essa rota necessita autenticação bearer token e enviar o id do livro como parâmetro:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">204</strong> e um objeto vazio:</p>
<pre>
{ }
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para id de livro que não pertence ao autor logado:</p>
<pre>
{
    "message": "Unauthorized book access"
}
</pre>
<hr noshade />

<h2>[200] Mostrar página de um livro específico.</h2>
<h3>GET - /books/:id/:page</h3>

<strong>Essa rota não necessita autenticação bearer token nem request body, mas necessita enviar o id do livro e a página do livro como parâmetros.</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para retorno bem sucedido:</p>
<pre>
{
    "page": 1,
    "chapter": 0,
    "isChapter": true,
    "chapterTitle": "Introdução",
    "content": "Este livro é uma aventura imaginada no futuro muito distante. Um tempo em que a raça humana coloniza múltiplos planetas.",
    "createdAt": "2023-01-18T17:39:16.695Z",
    "books": {
        "id": "ac320b94-691d-470f-9e95-c7f113616b43",
        "title": "Star Bards. Interstellar Colonies",
        "about": "A gang of galatic mercenaries led by a couple of bards.",
        "coverUrl": "https://starbards.com/bookCover.png",
        "createdAt": "2023-01-18T17:37:33.817Z"
    }
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para página inexistente ou não encontrada:</p>
<pre>
{
    "message": "Page not found"
}
</pre>
<hr noshade />

<h2>[200] Alterar as informações de uma página de livro específico.</h2>
<h3>PATCH - /books/:id/:page</h3>

<strong>Essa rota necessita autenticação bearer token e enviar o id do livro e o número da página como parâmetros. Campos de envio para request:</strong>

<ul>
    <li><strong>content: </strong>Entrada opcional do tipo string e máximo 480 chars.</li>
</ul>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">200</strong> para alteração realizada com sucesso:</p>
<pre>
    {
    "content": "Pelas escotilhas que formam o observatório da ponte de comando é possível enxergar uma equipe sentada em uma mesa de reunião discutindo assuntos diversos organizados em um plano detalhado na tela do tablet que uma mulher de dread locks segura enquanto os verifica.",
    "chapterTitle": "Calisto Protocol",
    "isChapter": false,
    "chapter": 1,
    "page": 3,
    "id": "d51fdb59-a3b9-4d6d-848b-26cf06d69d78"
    }
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">400</strong> para request incorreto:</p>
<pre>
{
    "message": yup.error.errors
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para página de livro inexistente ou não encontrada:</p>
<pre>
{
    "message": "Page not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para id de livro que não pertence ao autor logado:</p>
<pre>
{
    "message": "Unauthorized book access"
}
</pre>
<hr noshade />

<h2>[204] Deletar uma página de um livro específico.</h2>
<h3>DELETE - /books/:id/:page</h3>

<strong>Essa rota necessita autenticação bearer token e enviar o id do livro e a página como parâmetros:</strong>

<p>Retorno esperado com status code <strong style="color:LimeGreen;font-size:18px">204</strong> e um objeto vazio:</p>
<pre>
{ }
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">401</strong> para ausência de autenticação por token:</p>
<pre>
{
    "message": "Missing or invalid token"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para livro inexistente ou não encontrado:</p>
<pre>
{
    "message": "Book not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">404</strong> para página de livro inexistente ou não encontrada:</p>
<pre>
{
    "message": "Page not found"
}
</pre>
<p>Retorno esperado com status code <strong style="color:red;font-size:18px">403</strong> para id de livro que não pertence ao autor logado:</p>
<pre>
{
    "message": "Unauthorized book access"
}
</pre>
<hr noshade />


