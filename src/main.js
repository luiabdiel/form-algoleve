import '/style.css'

document.querySelector('#app').innerHTML = `
   <div class="container">
    <img
      src="./assets/image/algoleve.png"
      alt="image">
    <form class="container-text">
      <h2>Falta pouco!!</h2>
      <p>Para ter acesso ao ebook gratuito "Elegância das cores" e aprender como elas impactam o seu look e a sua imagem, deixe a AlgoLeve te conhecer um pouco mais 👇📭</p>
        <label>
        <span>Nome</span>
        <input type="name" name="name" placeholder="Digite seu nome">
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" placeholder="Digite seu melhor email">
      </label>
      <button type="submit">Pegue seu ebook🎁💮</button>
    </form>
  </div>
`

const KEY = import.meta.env.VITE_SHEETMONKEY_API_KEY;

const handleSubmit = (event) => {
  event.preventDefault()

  const name = document.querySelector("input[name=name]").value
  const email = document.querySelector("input[name=email]").value

  fetch(`https://api.sheetmonkey.io/form/${KEY}`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name, email
    })
  })
}

document.querySelector("form").addEventListener("submit", handleSubmit)