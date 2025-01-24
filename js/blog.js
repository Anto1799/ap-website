document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    let currentPage = 1;
    const newsPerPage = 6;
    const newsGrid = document.getElementById('news-grid');
    const loadMoreBtn = document.getElementById('load-more');
    const hidePostsBtn = document.getElementById('hide-posts');
    let visiblePosts = newsPerPage;

    // Sample news data
    const newsData = [
        {
            categories: ['Blockchain', 'Finance'],
            title: 'President Trump speach about crypto',
            content: 'President Donald Trump at Davos said he will make the United States the “World Capital of Artificial Intelligence and Crypto.”',
            date: '2024-01-20',
            twitterLink: 'https://x.com/Antonio02137195/status/1882742927992181062'
        },
        
        // Add more news items
    ];

    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    let currentFilter = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter
            currentFilter = btn.getAttribute('data-category');
            
            // Show all posts that were previously loaded
            loadNews(false, visiblePosts);
        });
    });

    function createNewsCard(news, index) {
        const delay = (index % newsPerPage) * 100;
        return `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card">
                    <div class="card-body">
                        <div class="category-container">
                            ${news.categories.map(cat => `<span class="category-badge">${cat}</span>`).join(' ')}
                        </div>
                        <h3 class="card-title">${news.title}</h3>
                        <p class="card-text">${news.content}</p>
                    </div>
                    <div class="card-footer">
                        <div class="card-footer-content">
                            <span class="post-date">${formatDate(news.date)}</span>
                            <a href="${news.twitterLink}" class="social-link" target="_blank">
                                <i class="bi bi-twitter-x"></i>
                                View on X
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function loadNews(append = false, limit = newsPerPage) {
        const filteredNews = currentFilter === 'all' 
            ? newsData 
            : newsData.filter(news => news.categories.includes(currentFilter));

        const newsToShow = filteredNews.slice(0, limit);
        const newsHTML = newsToShow.map((news, index) => createNewsCard(news, index)).join('');
        
        if (append) {
            newsGrid.insertAdjacentHTML('beforeend', newsHTML);
        } else {
            newsGrid.innerHTML = newsHTML;
        }

        AOS.refresh();

        // Update buttons visibility
        loadMoreBtn.style.display = limit >= filteredNews.length ? 'none' : 'inline-block';
        hidePostsBtn.style.display = limit > newsPerPage ? 'inline-block' : 'none';
    }

    // Hide posts button
    hidePostsBtn.addEventListener('click', () => {
        visiblePosts = newsPerPage;
        loadNews(false, visiblePosts);
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    loadMoreBtn.addEventListener('click', () => {
        visiblePosts += newsPerPage;
        loadNews(false, visiblePosts);
    });

    // Initial load
    loadNews();
});