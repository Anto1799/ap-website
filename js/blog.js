document.addEventListener('DOMContentLoaded', function() {
    // Blog Pagination and Filtering
    const postsPerPage = 3; 
    let currentPage = 1;
    let filteredPosts = [];

    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const paginationContainer = document.querySelector('.pagination-container');
    const prevButton = paginationContainer?.querySelector('button:first-child');
    const nextButton = paginationContainer?.querySelector('button:last-child');
    const pageButtons = paginationContainer ? Array.from(paginationContainer.querySelectorAll('button')).slice(1, -1) : [];

    if (blogCards.length) {
        filteredPosts = Array.from(blogCards);
        updatePagination();
        showPage(1);

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentPage = 1;
                filterPosts(button);
                updatePagination();
                showPage(1);
            });
        });

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            });

            nextButton.addEventListener('click', () => {
                const maxPages = Math.ceil(filteredPosts.length / postsPerPage);
                if (currentPage < maxPages) {
                    showPage(currentPage + 1);
                }
            });
        }

        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                showPage(parseInt(button.textContent));
            });
        });
    }

    // News Slider
    const newsContainer = document.querySelector('.news-container');
    const newsCards = document.querySelectorAll('.news-container .news-card');
    const sliderPrevBtn = document.querySelector('.prev-btn');
    const sliderNextBtn = document.querySelector('.next-btn');
    
    if (newsContainer && newsCards.length) {
        let currentSlideIndex = 0;
        const cardWidth = newsCards[0].offsetWidth + 32; // width + gap
        const totalSlides = newsCards.length;
        
        // Auto slide
        let autoSlideInterval = setInterval(slideNext, 5000);
        
        function slideNext() {
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            updateSlider();
        }
        
        function slidePrev() {
            currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        function updateSlider() {
            newsContainer.style.transform = `translateX(-${currentSlideIndex * cardWidth}px)`;
        }
        
        // Slider Event Listeners
        sliderPrevBtn?.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            slidePrev();
            autoSlideInterval = setInterval(slideNext, 5000);
        });
        
        sliderNextBtn?.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            slideNext();
            autoSlideInterval = setInterval(slideNext, 5000);
        });
        
        newsContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        newsContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(slideNext, 5000);
        });
    }

    // Blog Functions
    function filterPosts(selectedButton) {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        selectedButton.classList.add('active');

        const selectedCategory = selectedButton.textContent.trim();

        if (selectedCategory === 'All') {
            filteredPosts = Array.from(blogCards);
        } else {
            filteredPosts = Array.from(blogCards).filter(card => {
                const cardCategory = card.querySelector('.category').textContent;
                return cardCategory === selectedCategory;
            });
        }

        blogCards.forEach(card => {
            card.style.display = 'none';
        });
    }

    function showPage(pageNumber) {
        currentPage = pageNumber;
        const start = (pageNumber - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogCards.forEach(card => {
            card.style.display = 'none';
            card.style.animation = 'none';
        });

        filteredPosts.slice(start, end).forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out';
        });

        updatePaginationButtons();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

        pageButtons.forEach((button, index) => {
            if (index < totalPages) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        if (prevButton && nextButton) {
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages || totalPages === 0;
        }
    }

    function updatePaginationButtons() {
        pageButtons.forEach(button => {
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        updatePagination();
    }
});