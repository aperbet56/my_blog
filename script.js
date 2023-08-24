// Récupération des différents éléments
const postsContainer = document.querySelector(".posts__container");
const loading = document.querySelector(".loader");
const filterInput = document.querySelector(".filter");

// Création des variables limit et page pour limiter le nombre de postvisible sur une page
let limit = 5;
let page = 1;

// Création de la variable posts qui va stocker les données renvoyées par l'API dans un tableau
let posts = [];

/**
 * Déclaration de la fonction asynchrone getPosts
 * Envoi d'une requête HTTP de type GET grâce à fetch
 * Stockage des données de l'API dans la variable products
 */
const getPosts = async () => {
  await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      posts = value;
      console.log(posts);
    })
    .catch(function (err) {
      // Affichage d'un message d'erreur dans la console
      console.log("Désolé, une erreur est survenue sur le serveur.");
    });
};

// Déclaration de la fonction asynchrone showPosts pour gérer l'affichage des posts dans le DOM
const showPosts = async () => {
  // Appel de la fonction getPosts
  await getPosts();

  posts.forEach((post) => {
    // Création des différents éléments et insertion dans le DOM
    const postItem = document.createElement("article");
    postItem.classList.add("post");
    postItem.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postItem);
  });
};

// Appel de la fonction ShowPosts pour montrer les tous prmiers posts
showPosts();

// Déclaration de la onction Show loader qui va permettre de faire apparaître le loader et fetch plus de posts
const showLoading = () => {
  loading.classList.add("show");
  // La méthode globale setTimeout() permet de définir un minuteur (en millisecondes) qui exécute une fonction ou un code donné après la fin du délai indiqué.
  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      // Appel de la fonction showPosts
      showPosts();
    }, 300);
  }, 1000);
};

// Déclaration de la fonction FilterPosts qui va permettre de filter les posts selon le texte saisie par l'internaute dans l'input
const filterPosts = (e) => {
  filterInput.textContent = "";
  const searchedString = e.target.value.toLowerCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").textContent.toLowerCase();
    const body = post.querySelector(".post-body").textContent.toLowerCase();

    if (
      // La méthode indexOf() renvoie le premier indice pour lequel on trouve un élément donné dans un tableau.
      // Si l'élément cherché n'est pas présent dans le tableau, la méthode renverra -1.
      title.indexOf(searchedString) > -1 ||
      body.indexOf(searchedString) > -1
    ) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

// Ecoute de l'événement input sur le chanps dde saisie et appel de la fonction filterPosts
filterInput.addEventListener("input", filterPosts);

// Ecoute de l'événement scroll (le défilement est émis lorsque l'on fait défiler le document ou un élément) sur la page
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    // Appel de la fonction showLoading
    showLoading();
  }
});
