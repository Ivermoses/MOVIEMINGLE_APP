document.addEventListener('DOMContentLoaded', function() {
  const searchIcon = document.querySelector('.search-icon');
  const searchDropdown = document.querySelector('.search-dropdown');
  const searchCloseBtn = document.querySelector('.search-dropdown .close-btn');
  const notificationIcon = document.querySelector('.notification-icon');
  const notificationDropdown = document.querySelector('.notification-dropdown');
  const notificationCloseBtn = document.querySelector('.notification-dropdown .close-btn');
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  const sidebar = document.querySelector('.sidebar');
  const sidebarCloseBtn = document.querySelector('.sidebar .close-btn');

  function toggleDropdown(dropdown) {
      if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
      } else {
          dropdown.style.display = 'block';
      }
  }

  function closeAllDropdowns() {
      searchDropdown.style.display = 'none';
      notificationDropdown.style.display = 'none';
  }

  searchIcon.addEventListener('click', function(event) {
      event.stopPropagation();
      closeAllDropdowns();
      toggleDropdown(searchDropdown);
  });

  notificationIcon.addEventListener('click', function(event) {
      event.stopPropagation();
      closeAllDropdowns();
      toggleDropdown(notificationDropdown);
  });

  searchCloseBtn.addEventListener('click', function() {
      searchDropdown.style.display = 'none';
  });

  notificationCloseBtn.addEventListener('click', function() {
      notificationDropdown.style.display = 'none';
  });

  hamburgerIcon.addEventListener('click', function() {
      sidebar.classList.add('active');
  });

  sidebarCloseBtn.addEventListener('click', function() {
      sidebar.classList.remove('active');
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
      closeAllDropdowns();
  });

  // Prevent closing when clicking inside dropdowns
  searchDropdown.addEventListener('click', function(event) {
      event.stopPropagation();
  });

  notificationDropdown.addEventListener('click', function(event) {
      event.stopPropagation();
  });
});

// updated navdropdowns

document.addEventListener('DOMContentLoaded', function() {
  // Function to toggle dropdown
  function toggleDropdown(event) {
    event.preventDefault();
    const dropdownContent = this.nextElementSibling;
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  }

  // Add event listeners to all dropdown buttons
  const dropdowns = document.querySelectorAll('.nav-dropdown .dropbtn');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);
  });

  // Close dropdowns when clicking outside
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.querySelectorAll('.nav-dropdown-content');
      dropdowns.forEach(dropdown => {
        if (dropdown.style.display === 'block') {
          dropdown.style.display = 'none';
        }
      });
    }
  });

  // Toggle mobile menu
  const hamburger = document.querySelector('.hamburger-icon');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

});

// updated navdropdowns




// movie poster play button

const playButton = document.getElementById('playButton');
      
playButton.addEventListener('click', () => {
  // Add your play functionality here
  console.log('Play button clicked!');
});

//   carousel 

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel');
  const movies = carousel.querySelectorAll('.movie');
  const dots = document.querySelectorAll('.pagination .dot');
  const movieWidth = movies[0].offsetWidth + parseInt(getComputedStyle(movies[0]).marginRight);
  let currentIndex = 0;
  let startX;
  let scrollLeft;
  let isDragging = false;

  // Function to update active dot
  const updateActiveDot = (index) => {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
  };

  // Function to scroll to a specific movie
  const scrollToMovie = (index) => {
      carousel.scrollTo({
          left: index * movieWidth,
          behavior: 'smooth'
      });
      currentIndex = index;
      updateActiveDot(index);
  };

  // Add click event listeners to dots
  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => scrollToMovie(index));
  });

  // Mouse events for dragging
  carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.cursor = 'grabbing';
  });

  carousel.addEventListener('mouseleave', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2;
      carousel.scrollLeft = scrollLeft - walk;
  });

  // Update currentIndex and active dot on scroll
  carousel.addEventListener('scroll', () => {
      const index = Math.round(carousel.scrollLeft / movieWidth);
      if (index !== currentIndex) {
          currentIndex = index;
          updateActiveDot(index);
      }
  });

  // Optional: Auto-scroll functionality
  let autoScrollInterval;
  const startAutoScroll = () => {
      autoScrollInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % movies.length;
          scrollToMovie(currentIndex);
      }, 5000); // Change image every 5 seconds
  };

  const stopAutoScroll = () => {
      clearInterval(autoScrollInterval);
  };

  // Start auto-scroll and pause on hover
  startAutoScroll();
  carousel.addEventListener('mouseenter', stopAutoScroll);
  carousel.addEventListener('mouseleave', startAutoScroll);
});

// trending now js

const carousel = document.querySelector('.carousel-inner');
const items = carousel.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
let currentIndex = 0;

function updateCarousel() {
  const itemWidth = items[0].offsetWidth + 10; // Width + margin
  carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}

function moveNext() {
  currentIndex++;
  if (currentIndex >= items.length) {
      // Move first item to the end
      carousel.appendChild(items[0]);
      currentIndex = items.length - 1;
  }
  updateCarousel();
}

function movePrev() {
  currentIndex--;
  if (currentIndex < 0) {
      // Move last item to the beginning
      carousel.prepend(items[items.length - 1]);
      currentIndex = 0;
  }
  updateCarousel();
}

nextButton.addEventListener('click', moveNext);
prevButton.addEventListener('click', movePrev);

// Initialize
updateCarousel();

// this week hot picks

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel-inner-1');
  const items = document.querySelectorAll('.carousel-item-1');
  const pagination = document.querySelector('.pagination-1');
  let currentIndex = 0;
  const totalItems = items.length;

  // Clone items for continuous sliding
  items.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
  });

  // Create pagination dots
  items.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('pagination-dot');
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
  });

  function updateCarousel() {
      const offset = -currentIndex * 25;
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(${offset}%)`;
      
      const activeIndex = currentIndex % totalItems;
      items.forEach((item, index) => {
          item.classList.toggle('active', index === activeIndex);
      });

      const dots = document.querySelectorAll('.pagination-dot');
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeIndex);
      });
  }

  function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
  }

  function nextSlide() {
      currentIndex++;
      updateCarousel();

      // Check if we need to loop back to the beginning
      if (currentIndex >= totalItems) {
          setTimeout(() => {
              carousel.style.transition = 'none';
              currentIndex = 0;
              carousel.style.transform = `translateX(0)`;
              setTimeout(() => {
                  carousel.style.transition = 'transform 0.5s ease';
              }, 50);
          }, 500);
      }
  }

  // Auto-play functionality
  setInterval(nextSlide, 3000);

  // Initial update
  updateCarousel();
});

// movies section here

const movies = [
  { title: "Future Hell", year: 2020, rating: "TV-G", poster: "assets/images/movies24.jpg", quality: "HD" },
  { title: "Soviet: The Cold War", year: 2019, rating: "TV-G", poster: "assets/images/movies25.jpg", quality: "4K" },
  { title: "Inside Women", year: 2018, rating: "TV-G", poster: "assets/images/movies26.jpg", quality: "HD" },
  { title: "Spaceman", year: 2020, rating: "TV-G", poster: "assets/images/movies32.jpg", quality: "4K" },
  { title: "Voices", year: 2019, rating: "TV-G", poster: "assets/images/movies31.jpg", quality: "HD" },
  { title: "Colors of Pain", year: 2023, rating: "TV-G", poster: "assets/images/movies30.jpg", quality: "4K" },
  { title: "Green Magic World", year: 2020, rating: "TV-G", poster: "assets/images/movies29.jpg", quality: "HD" },
  { title: "Toto Family", year: 2021, rating: "TV-G", poster: "assets/images/movies28.jpg", quality: "4K" },
  { title: "Finding Love of Life", year: 2020, rating: "TV-G", poster: "assets/images/movies27.jpg", quality: "HD" },
  { title: "Meet the Brothers", year: 2024, rating: "TV-G", poster: "assets/images/movies33.jpg", quality: "4K" },
  { title: "Freedom Fighters", year: 2021, rating: "TV-G", poster: "assets/images/movies34.jpg", quality: "HD" },
  { title: "Patriot on Redline", year: 2022, rating: "TV-G", poster: "assets/images/movies35.jpg", quality: "4K" },
];

const movieGrid = document.getElementById('movieGrid');

movies.forEach(movie => {
  const movieCard = document.createElement('div');
  movieCard.className = 'movie-card';
  movieCard.innerHTML = `
      <a href="assets/video/video.mp4">
          <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
          <div class="overlays">
              <span class="quality">${movie.quality}</span>
              <span class="rating">7.5</span>
          </div>
      </a>
      <div class="movies-info">
          <h3 class="movie-title-3"><a href="assets/video/video.mp4">${movie.title}</a></h3>
          <div class="movie-metas">
              <span>${movie.rating}</span>
              <span>${movie.year}</span>
          </div>
      </div>
  `;
  movieGrid.appendChild(movieCard);
});

//  hit movies section 

const movieList = [
  {
      title: "Fight for Life",
      poster: "assets/images/asset-1.jpeg",
      duration: "2hr 00mins",
      type: "Action"
  },
  {
      title: "Machine War",
      poster: "assets/images/asset-2.jpg",
      duration: "1hr 22mins",
      type: "Action"
  },
  {
      title: "The Don of Thieves",
      poster: "assets/images/asset-3.jpg",
      duration: "1hr 24mins",
      type: "Drama"
  },
  {
      title: "The Bank Robbery",
      poster: "assets/images/asset-4.jpeg",
      duration: "1hr 35mins",
      type: "Action"
  },
  {
      title: "The Warrior Life",
      poster: "assets/images/asset-5.jpeg",
      duration: "2hr 00mins",
      type: "Action"
  },
  {
      title: "Machine War",
      poster: "assets/images/asset-6.jpeg",
      duration: "1hr 22mins",
      type: "Action"
  },
  {
      title: "The Horse Lady",
      poster: "assets/images/asset-7.jpeg",
      duration: "1hr 24mins",
      type: "Drama"
  },
  {
      title: "Ship Of Full Moon",
      poster: "assets/images/asset-8.jpeg",
      duration: "1hr 35mins",
      type: "Action"
  },
  {
      title: "Rebuneka the dull",
      poster: "assets/images/asset-9.jpeg",
      duration: "1hr 35mins",
      type: "Action"
  }
];

const movieCarouselElement = document.getElementById('movieCarousel');

movieList.forEach(movie => {
  const movieCard = document.createElement('div');
  movieCard.className = 'hit-movie-card';
  movieCard.innerHTML = `
      <div class="poster-container">
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="poster-overlay">
              <a href="assets/video/video.mp4" class="hit-play-button" >▶</a>
          </div>
          <div class="button-group">
              <button class="like-button like"><i class="fas fa-heart"></i></button>
              <button class="like-button share"><i class="fas fa-share"></i></button>
              <button class="like-button plus">+</button>
          </div>
          <div class="share-dropdown">
              <img src="/api/placeholder/24/24" alt="Facebook" class="share-icon">
              <img src="/api/placeholder/24/24" alt="Twitter" class="share-icon">
              <img src="/api/placeholder/24/24" alt="Instagram" class="share-icon">
          </div>
      </div>
      <div class="movi-info">
          <a href="#" class="movi-title">${movie.title}</a>
          <div class="movi-meta">
              ${movie.duration} • <span class="movie-type">${movie.type}</span>
          </div>
      </div>
  `;
  movieCarouselElement.appendChild(movieCard);

  const shareButton = movieCard.querySelector('.share');
  const shareDropdown = movieCard.querySelector('.share-dropdown');
  shareButton.addEventListener('click', () => {
      shareDropdown.classList.toggle('active');
  });
});

// slide banner section

  const slides = document.querySelectorAll('.carousel-slide');
      const indicators = document.querySelectorAll('.indicator');
      let currentSlide = 0;

      function showSlide(index) {
          slides[currentSlide].classList.remove('active');
          indicators[currentSlide].classList.remove('active');
          currentSlide = (index + slides.length) % slides.length;
          slides[currentSlide].classList.add('active');
          indicators[currentSlide].classList.add('active');
      }

      function nextSlide() {
          showSlide(currentSlide + 1);
      }

      setInterval(nextSlide, 5000);

      indicators.forEach((indicator, index) => {
          indicator.addEventListener('click', () => showSlide(index));
      });
  // back to the top button

  // Get the button
  let backToTopBtn = document.getElementById("backToTopBtn");

  // When the user scrolls down 100px from the top of the document, show the button
  window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          backToTopBtn.style.display = "flex";
      } else {
          backToTopBtn.style.display = "none";
      }
  };

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.onclick = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}