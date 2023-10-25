

 

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODkwODBkMzY2ZWM4ZDAxOTNkZmFhOTcyNTc2Y2Y1MyIsInN1YiI6IjY1MTVkNTNlMDQ5OWYyMDBhYmJkOWVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-WKAds2sWQSL5jvOm6bCRiIMiAeo5-MMwJGILvZL5sQ'
  }
};


let main=document.getElementById('main');

const IMAGE_URL='https://image.tmdb.org/t/p/w500';



let data;
let movieCards = [];


getMovies();



 

function getMovies() {
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => {
            data = response.results; 
            showMovies(data);
           
            movieCards = document.querySelectorAll('.movie-card');
           
            addClickListenerToCards();
        })
        .catch(err => console.error(err));
}




function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
      
        const { title, poster_path, vote_average, overview,id} = movie;
        const movieEl = document.createElement('div');
      
        movieEl.classList.add('movie-card');
        movieEl.setAttribute('data-movie-id', id);
        movieEl.innerHTML = `
            <div class="movie-info">
             
                <img src="${IMAGE_URL+poster_path}"  class="movie-poster">
                <h4 class="movie-title">${title}</h4>
                <span class="green">${vote_average}</span>
                <button type="button" id="desc-button" class="desc-button onclick="showDesc"></button>

                <p id="description" style="display:none" class="movie-description">"${overview}"</p>
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function showDesc(){
  var descbutton=document.getElementById("desc-button");
console.log("açıklama butonu");
  var description=document.getElementById('description');
  description.style.display="block";

}




function addClickListenerToCards() {
 
  movieCards.forEach(card => {
      card.addEventListener('click', () => {
          console.log('Tıklama çalışıyor');
       
          const movieId = card.getAttribute('data-movie-id');
          getMovieDetails(movieId);
      });
  });
}

function getMovieDetails(movieId) {
 
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then(response => response.json())
      .then(movieData => {
          console.log(movieData);
          showMovieDetails(movieData);
          
          
      })
      .catch(err => console.error(err));
}

function showMovieDetails(movieData) {
    const movieDetailsDiv = document.createElement('div');
    movieDetailsDiv.classList.add('movie-details');
    
    
    
    
    main.style.width = "100%";
    const side = document.getElementById('side');
    side.style.display = "none";
  
    movieDetailsDiv.innerHTML = `
    
      <img src="${IMAGE_URL + movieData.poster_path}" class="movie-poster">
      <div class="movie-detail-info">
      <img src="${IMAGE_URL+movieData.backdrop_path}" class=background-image>
        <h1 class="movie-title">${movieData.title}</h1>
        <div class="info-head">   
        <p style=" color: #593196; 
        font-size: 16px;
        margin: 10px 0;" class="movie-release-date">Release Date: ${movieData.release_date}</p>
        <p class="movie-genres">Genres: ${movieData.genres.map(genre => genre.name).join(', ')}</p>
        <p class="movie-runtime">Runtime: ${movieData.runtime} minutes</p>
        </div>
       
        <p class="movie-description">${movieData.overview}</p>
       
        
        
        
        <p class="movie-rating">Rating: ${movieData.vote_average}</p>
        <p class="movie-budget">Budget: $${movieData.budget.toLocaleString()}</p>
        <p class="movie-revenue">Revenue: $${movieData.revenue.toLocaleString()}</p>
        <p class="movie-tagline">Tagline: ${movieData.tagline}</p>
        <p class="movie-imdb">IMDb ID: ${movieData.imdb_id}</p>
        <p class="movie-language">Language: ${movieData.original_language}</p>
        
      </div>
    `;
  
   
    main.innerHTML = '';
    
    var movieinfodiv=document.getElementById("");
    var companies=movieData.production_companies;;
    console.log(companies[0]);
    companies.forEach(company=>{

      const companyEl = document.createElement('div');
     
      
      const { logo_path,name,origin_country} = company;

      companyEl.innerHTML = `
      <div class=company-info>
      <img src="${IMAGE_URL+logo_path}" style="width:120px"></img>
      <title>${name}</title>
    </div>
        `;

       

    movieDetailsDiv.appendChild(companyEl);
      
    })
   
    main.appendChild(movieDetailsDiv);
  }
  














   





