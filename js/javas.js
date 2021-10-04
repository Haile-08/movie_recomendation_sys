
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7d9c39993cb9a463727c83e6463bbb8d&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const   SEARCH_URL ='https://api.themoviedb.org/3/search/movie?api_key=7d9c39993cb9a463727c83e6463bbb8d&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url){
    //Input
    const res = await fetch(url)
    const data = await res.json()
    //incrementaion
    incremention(data.results)
    //Formula
    RecomendationEngin(data.results)
    //OutPut
    showMovies(data.results)
    
}


//the recomendation engine
var number_of_movies = 0
var vote_average_arr = []
var vote_count_arr   = []

//The output json Data
var jsonfile = {
    1:{
        title:"0",
        score:"0",
    }
}
var objectkey = []

//The recomendation system function

function incremention(input){
     input.forEach((film) =>{

        const {vote_average, vote_count} = film    
        //1.vote average column      
         vote_average_arr[number_of_movies] = vote_average 
        //2. vote count column
        vote_count_arr[number_of_movies] = vote_count

     })
}

//the Recomendation Engin 

function RecomendationEngin(input2){
  var j = 2
  var C = math.mean(vote_average_arr)
  var M = math.quantileSeq(vote_count_arr, 0.90)
  input2.forEach((film2)=>{

       const{vote_count,title,vote_average}=film2     
       var V = vote_count
       var R = vote_average
       // The Formula
       var score = (V/(V+M) * R) + (M/(M+V) * C)
       if(vote_count>=M){
         jsonfile[j]= {title: `${title}`, score:`${score}`}
       }

    j++

  })
  console.log(jsonfile)
}


function showMovies(movies){

    main.innerHTML = ' '
    var p = 1
    var o = 0
    for (const key in jsonfile) {
            objectkey[o]=key
            o++
    }
    var stringobjectkey = objectkey.toString()
    console.log("The String With out , separation"+stringobjectkey)

    movies.forEach((movie)=> {

        const {title, poster_path, vote_average, overview} = movie
        var obj =stringobjectkey.split(",")  
         
        if(jsonfile[obj[p]]["title"]==title){
                    const movieEL = document.createElement('div')
                    movieEL.classList.add('movie')
                    movieEL.innerHTML = `
                    <div class="movie">
                    <img src="${IMG_PATH + poster_path}" alt = "${title}">
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getClassByRate(vote_average)}">
                    ${vote_average}
                </span>

             </div>
             <div class="overview">
                 <h3>overview</h3>
                  ${overview}
           </div>
    </div>
        `
        main.appendChild(movieEL)
        p=p+1
    
        }
        
})
}

// to color the vote
function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if (vote >= 5){
        return 'orange'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)
        search.value = ''
   }else{
       window.location.reload()
   }
})

