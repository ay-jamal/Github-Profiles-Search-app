const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username) {
  try {
    const { data } = await axios.get(APIURL + username);
    creatUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No User Found");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios.get(APIURL + username + "/repos?sort=created");
    addRepoTocard(data);
  } catch (err) {
    creatErrorCard("Problem Fetching Repo");
  }
}

function creatUserCard(user) {
  const cardHtml = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>
      <div id="repos"></div>
    </div>
  </div>
    `;
  main.innerHTML = cardHtml;
}

function addRepoTocard(repos) {
  const repoEl = document.getElementById("repos");
  repos.slice(0, 10);
  repos.forEach((repo) => {
    const repoLink = document.createElement("a");
    repoLink.classList.add("repo");
    repoLink.href = repo.html_url;
    repoLink.target = "_blank";
    repoLink.innerText = repo.name;
    repoEl.appendChild(repoLink);
  });
}

function creatErrorCard(masege) {
  const cardHtml = `
    <div class='card'>
     <h1>${masege}</h1>
    
    </div>
    `;
  main.innerHTML = cardHtml;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);

    search.value = "";
  }
});
