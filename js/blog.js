// blog.js
document.addEventListener('DOMContentLoaded', function() {
    // Configurazione
    const postsPerPage = 3; // Numero di post per pagina
    let currentPage = 1;
    let filteredPosts = [];

    // Seleziona elementi DOM
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const paginationContainer = document.querySelector('.pagination-container');
    const prevButton = paginationContainer.querySelector('button:first-child');
    const nextButton = paginationContainer.querySelector('button:last-child');
    const pageButtons = Array.from(paginationContainer.querySelectorAll('button')).slice(1, -1);

    // Inizializza
    filteredPosts = Array.from(blogCards);
    updatePagination();
    showPage(1);

    // Event Listeners per i bottoni categoria
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentPage = 1;
            filterPosts(button);
            updatePagination();
            showPage(1);
        });
    });

    // Event Listeners per la paginazione
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

    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            showPage(parseInt(button.textContent));
        });
    });

    // Funzioni
    function filterPosts(selectedButton) {
        // Aggiorna stato bottoni
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        selectedButton.classList.add('active');

        const selectedCategory = selectedButton.textContent.trim();

        // Filtra i post
        if (selectedCategory === 'All') {
            filteredPosts = Array.from(blogCards);
        } else {
            filteredPosts = Array.from(blogCards).filter(card => {
                const cardCategory = card.querySelector('.category').textContent;
                return cardCategory === selectedCategory;
            });
        }

        // Nascondi tutti i post
        blogCards.forEach(card => {
            card.style.display = 'none';
        });
    }

    function showPage(pageNumber) {
        currentPage = pageNumber;
        const start = (pageNumber - 1) * postsPerPage;
        const end = start + postsPerPage;

        // Nascondi tutti i post
        blogCards.forEach(card => {
            card.style.display = 'none';
            card.style.animation = 'none';
        });

        // Mostra solo i post della pagina corrente
        filteredPosts.slice(start, end).forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out';
        });

        updatePaginationButtons();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

        // Aggiorna numeri pagina
        pageButtons.forEach((button, index) => {
            if (index < totalPages) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        // Aggiorna stato prev/next
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    function updatePaginationButtons() {
        // Aggiorna stato active dei bottoni pagina
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