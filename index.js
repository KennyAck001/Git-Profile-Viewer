let search = document.querySelector('.button');
let searchBar = document.querySelector('.search');
let value;

async function gitProfile(value) {

    let request = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://api.github.com/users/${value}`)}`
    );
    let result = await request.json();
    let data = JSON.parse(result.contents);

    outPut(data);

    
}

searchBar.addEventListener('keypress', async (event)=>{
    if (event.key === "Enter") { // ✅ Check if Enter key is pressed
        event.preventDefault(); // ✅ Prevent default form submission (if inside a form)
        value = searchBar.value
        
        await loader();
        gitProfile(value);

    }


})



search.addEventListener("click", async () => {
    value = searchBar.value;
    if (!value) {
        alert("Please enter a username!");
        return;
    }

   
    await loader(); 
    
  
    gitProfile(value);
});

function loader() {
    return new Promise((resolve) => {
        document.querySelector(".viewer").innerHTML = `<span class="loader"></span>`
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}



function outPut(data){

    let {avatar_url,name,bio,followers,following,html_url,public_repos} = data;


    if(!avatar_url){
        document.querySelector('.viewer').innerHTML = ` <h1 class = "Not">User Not Found</h1>`
        return
    }

    if(!bio){
        bio = ''
    }

    document.querySelector('.viewer').innerHTML = `
              <div class="imgConatiner">
                <img src=${avatar_url} alt="" class="image">
                <div class="About">
                    <p class="name">${name}</p>
                    <p class="bio">${bio}</p>
                </div>

            </div>
            <div class="FolloweContainer">
                <div class="followList">
                    <div class="Followers">
                        <p class="followData">Follower</p>
                        <p class="followValue">${followers}</p>
                    </div>
                    <div class="Following">
                        <p class="followingData">Flowing</p>
                        <p class="followingValue">${following}</p>
                    </div>
                    <div class="Repositories">
                        <p class="repositoryData">Repository</p>
                        <p repositoryValue>${public_repos}</p>
                    </div>
                </div>
                <div class="Go">
                    <a href = "${html_url}" target = "blank" class = "Go">
                    View Profile
                    </a>
                </div>
            </div>
    `

    
}
