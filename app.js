// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');

    let repositoryInput = document.getElementById('repositoryInput');

    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    let gitHubRepository = repositoryInput.value;


    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername, gitHubRepository)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
             
            let ul = document.getElementById('userRepos');

            ul.innerHTML = '';
            
            for (let i in data) {
                // Get the ul with id of userRepos
                if (data.message === "Not Found") {
                    alert("Conta ou repositório não encontrado!");
                } else {
                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');
                    
                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                <p><strong>Mensagem:</strong> ${data[i].commit.message}</p>
                <p><strong>Data:</strong> ${data[i].commit.committer.date}</p>
            `);
                    // Append each li to the ul
                    ul.appendChild(li);
                }
            }
        })
})

function requestUserRepos(username, userRepository) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${userRepository}/commits`));
}