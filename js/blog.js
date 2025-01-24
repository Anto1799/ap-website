document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

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
            
            // Reset and reload news with current filter
            currentPage = 1;
            loadNews(currentPage);
        });
    });
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

    // Sample news data
    const newsData = [
        {
            category: 'Blockchain',
            title: 'Ethereum Layer 2 Solutions Gain Traction',
            content: 'Latest developments in Ethereum scaling solutions show promising results for mass adoption.',
            date: '2024-01-20',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        {
            category: 'Finance',
            title: 'DeFi Market Analysis Q1 2024',
            content: 'An overview of the latest trends in decentralized finance and market predictions.',
            date: '2024-01-18',
            twitterLink: 'https://twitter.com/your-tweet-link'
        },
        // Add more news items
    ];

    function createNewsCard(news, index) {
        const delay = (index % newsPerPage) * 100;
        return `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
                <div class="card">
                    <div class="card-body">
                        <span class="category-badge">${news.category}</span>
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

    function loadNews(page) {
        // Filter news based on current category
        const filteredNews = currentFilter === 'all' 
            ? newsData 
            : newsData.filter(news => news.category === currentFilter);

        const start = (page - 1) * newsPerPage;
        const end = start + newsPerPage;
        const newsToShow = filteredNews.slice(start, end);

        const newsHTML = newsToShow.map((news, index) => createNewsCard(news, index)).join('');
        
        if (page === 1) {
            newsGrid.innerHTML = newsHTML;
        } else {
            newsGrid.insertAdjacentHTML('beforeend', newsHTML);
        }

        // Refresh AOS for new elements
        AOS.refresh();

        // Hide load more button if no more news
        if (end >= newsData.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        loadNews(currentPage);
    });

    // Initial load
    loadNews(currentPage);
});