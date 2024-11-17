// Replace 'YOUR_API_KEY' with your actual TMDb API key
const API_KEY = 'c441a7f5c47d171d0762285aac8ec758';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Function to fetch trending movies
async function fetchTrendingMovies() {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results.slice(0, 5); // Get the first 5 trending movies
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
}

// Function to fetch popular TV shows
async function fetchPopularTVShows() {
    try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results.slice(0, 10); // Get the first 10 popular TV shows
    } catch (error) {
        console.error('Error fetching popular TV shows:', error);
        return [];
    }
}

// Function to update the "Trending Now" section
function updateTrendingNow(movies) {
    const carousel = document.querySelector('.carousel-2 .carousel-inner');
    carousel.innerHTML = '';

    movies.forEach((movie, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.style.backgroundImage = `url('${IMAGE_BASE_URL}${movie.backdrop_path}')`;
        
        if (index === 0) {
            carouselItem.classList.add('active');
            updateMainContent(movie);
        }

        carousel.appendChild(carouselItem);
    });
}

// Function to update the main content in the "Trending Now" section
function updateMainContent(movie) {
    const title = document.querySelector('.container-3 .title');
    const description = document.querySelector('.container-3 .main-content');

    title.textContent = movie.title;
    description.textContent = movie.overview.slice(0, 150) + '...';
}

// Function to update the "Watch Shows Online" section
function updateWatchShowsOnline(shows) {
    const movieGrid = document.getElementById('movieGrid');
    movieGrid.innerHTML = '';

    shows.forEach(show => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <img src="${IMAGE_BASE_URL}${show.poster_path}" alt="${show.name}">
            <div class="movie-info">
                <h3>${show.name}</h3>
                <p>${show.first_air_date.split('-')[0]}</p>
            </div>
        `;
        movieGrid.appendChild(movieItem);
    });
}

// Main function to initialize the page
async function initPage() {
    const trendingMovies = await fetchTrendingMovies();
    const popularTVShows = await fetchPopularTVShows();

    updateTrendingNow(trendingMovies);
    updateWatchShowsOnline(popularTVShows);
}

// Call the init function when the page loads
window.addEventListener('load', initPage);