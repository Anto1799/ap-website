document.addEventListener('DOMContentLoaded', function() {
    // Blog Pagination and Filtering
    const postsPerPage = 3; 
    let currentPage = 1;
    let filteredPosts = [];

    // DOM Selectors
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const paginationContainer = document.querySelector('.pagination-container');
    const prevButton = paginationContainer?.querySelector('button:first-child');
    const nextButton = paginationContainer?.querySelector('button:last-child');
    const pageButtons = paginationContainer ? Array.from(paginationContainer.querySelectorAll('button')).slice(1, -1) : [];

    // Initialize blog functionality if cards exist
    if (blogCards.length) {
        filteredPosts = Array.from(blogCards);
        updatePagination();
        showPage(1);

        // Category filtering
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                currentPage = 1;
                filterPosts(button);
                updatePagination();
                showPage(1);
            });
        });

        // Pagination navigation
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

        // Page number buttons
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                showPage(parseInt(button.textContent));
            });
        });
    }

    // Filter posts by category
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

    // Show posts for current page
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

    // Update pagination state
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

    // Update pagination button states
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

    // Bootstrap Tooltips Initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});