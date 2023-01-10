<h1>Open Book API</h1>

<h2>Proposta da API</h2>
<p>Ser um sistema para editoras e autores de livros publicarem suas obras literárias para leitura página a página.</p>
<p>Permitir acesso a listagem de autores e livros cadastrados e publicados.</p>
<hr>

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