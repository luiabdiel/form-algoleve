import '/style.css'

document.querySelector('#app').innerHTML = `
   <div class="container">
    <img
      src="https://raw.githubusercontent.com/luiabdiel/img-cdn-algoleve/main/algo.png"
      alt="image">
    <form class="container-text">
      <h2>Falta pouco!!</h2>
      <p>Para ter acesso ao ebook gratuito "Elegância das cores" e aprender como elas impactam o seu look e a sua imagem, deixe a AlgoLeve te conhecer um pouco mais 👇📭</p>
        <label>
        <span>Nome*</span>
        <input type="text" name="name" placeholder="Digite seu nome">
      </label>
      <label>
        <span>Email*</span>
        <input type="email" name="email" placeholder="Digite seu melhor email">
      </label>
      <label>
        <span class="span-select">Deseja ser notificado sobre novidades?</span>
        <select name="notifications">
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </select>
      </label>
      <button type="submit">
         Pegue seu ebook🎁💮
      </button>
    </form>
  </div>
`;

const KEY = import.meta.env.VITE_SHEETMONKEY_API_KEY;

const downloadFile = (url) => {
  const link = document.createElement("a");

  link.href = url; 
  link.setAttribute("download", "Elegância_das_cores.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector("button");

  const nameInput = form.querySelector("input[name=name]");
  const emailInput = form.querySelector("input[name=email]");
  const notificationsSelect = form.querySelector("select[name=notifications]");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const notifications = notificationsSelect.value === "sim";

  if (name.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres");

    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email inválido");

    return;
  }

  button.disabled = true;
  button.innerHTML = `<div class="loading"></div>Enviando...`;

  fetch(`https://api.sheetmonkey.io/form/${KEY}`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({ name, email, notifications })
  }).then(res => {
    button.innerHTML = `Download concluído 🎉`;
    button.disabled = false;

    const fileUrl = "https://drive.google.com/uc?id=15AOfbeRPUTVMY-pcRNAl_lhAzCYRRz7f&export=download";

    downloadFile(fileUrl);
  }).catch(err => {
    alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");

    button.innerHTML = `Pegue seu ebook🎁💮`;
    button.disabled = false;
  });
};

document.querySelector("form").addEventListener("submit", handleSubmit);