const movieInput = document.querySelector("#movie-input");
const movieBtn = document.querySelector("#movie-btn");
const movieList = document.querySelector(".movie-display");
const movieFilter = document.querySelector(".movie-filter");


//event listeners
document.addEventListener("DOMContentLoaded", displayLocalMovies);
movieBtn.addEventListener("click",addMovie);
movieList.addEventListener("click",delDoneMovie);

movieFilter.addEventListener("click", movieFilterFunc);


//functions

function addMovie(event){
    const movie = document.createElement("div");
    const movieItem = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");

    movie.classList.add("movie-item");
    //list item
    movieItem.innerText = movieInput.value;
    

    //delete button
    delBtn.classList.add("del-btn");
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';

    //done button
    doneBtn.classList.add("done-btn");
    doneBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';

    //appending elements
    movie.appendChild(movieItem);
    movie.appendChild(doneBtn);
    movie.appendChild(delBtn);
    movieList.appendChild(movie);
    movieLocalStorage(movieInput.value);
   
    
    //preventing default behaviour of submit button
    movieInput.value = "";
    event.preventDefault();
};


//function to delete or check watched movies
function delDoneMovie(event){

    //const movie = event.target;
    if (event.target.classList[0]==="del-btn"){
        event.target.parentElement.classList.add("fall");
        delLocalMovie(event.target.parentElement);
        event.target.parentElement.addEventListener("transitionend",()=>{
            event.target.parentElement.remove();
        })
    }

    if (event.target.classList[0]==="done-btn"){
        event.target.parentElement.classList.toggle("done");
    }

}


//function to filter movies

function movieFilterFunc(event){
    const allMovies = movieList.childNodes;
    //console.log(allMovies);
    allMovies.forEach(movie=>{
        switch (event.target.value) {
            case "all":
                //console.log(movie);
                movie.style.display=("flex");
                
                break;
            case "watched":
                if (movie.classList.contains("done")) {
                    movie.style.display=("flex");
                } else {
                    movie.style.display=("none");
                }
                break;
            case "notWatched":
                if (!movie.classList.contains("done")) {
                    movie.style.display=("flex");
                } else {
                    movie.style.display=("none");
                }
                
                break;
                    
            default:
                break;
        }
    })
    
}


function movieLocalStorage(movies){
    let localMovies;
    if(localStorage.getItem("localMovies")===null){
        localMovies = [];
        
    }
    else{
        localMovies = JSON.parse(localStorage.getItem("localMovies"));
    }

    localMovies.push(movies);
    localStorage.setItem("localMovies", JSON.stringify(localMovies));
}

function displayLocalMovies(){
    let localMovies;
    if(localStorage.getItem("localMovies")===null){
        localMovies = [];
        
        
    }
    else{
        localMovies = JSON.parse(localStorage.getItem("localMovies"));
    
    }


    localMovies.forEach(localMovie=>{
        const movie = document.createElement("div");
        const movieItem = document.createElement("li");
        const delBtn = document.createElement("button");
        const doneBtn = document.createElement("button");

        movie.classList.add("movie-item");
        //list item
        movieItem.innerText = localMovie;
        

        //delete button
        delBtn.classList.add("del-btn");
        delBtn.innerHTML = '<i class="fas fa-trash"></i>';

        //done button
        doneBtn.classList.add("done-btn");
        doneBtn.innerHTML = '<i class="fas fa-clipboard-check"></i>';

        //appending elements
        movie.appendChild(movieItem);
        movie.appendChild(doneBtn);
        movie.appendChild(delBtn);
        movieList.appendChild(movie);
        
    })    

}

function delLocalMovie (movie){
    let localMovies;
    if(localStorage.getItem("localMovies")===null){
        localMovies = [];
        
    }
    else{
        localMovies = JSON.parse(localStorage.getItem("localMovies"));
        
    }

    movieIndex = localMovies.indexOf(movie.childNodes[0].innerText);
    localMovies.splice(movieIndex,1);
    localStorage.setItem("localMovies",JSON.stringify(localMovies));
}


