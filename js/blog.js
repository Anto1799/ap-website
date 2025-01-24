document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const newsPerPage = 6;
    const newsGrid = document.querySelector('.news-grid');
    const loadMoreBtn = document.getElementById('load-more');

    // Sample news data - replace with your actual news content
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
        // Add more news items here
    ];

    function createNewsCard(news) {
        return `
            <article class="news-card">
                <span class="category">${news.category}</span>
                <h3>${news.title}</h3>
                <p>${news.content}</p>
                <span class="date">${formatDate(news.date)}</span>
                <a href="${news.twitterLink}" class="social-link" target="_blank">
                    <i class="bi bi-twitter-x"></i>
                    View on X
                </a>
            </article>
        `;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    function loadNews(page) {
        const start = (page - 1) * newsPerPage;
        const end = start + newsPerPage;
        const newsToShow = newsData.slice(start, end);

        const newsHTML = newsToShow.map(createNewsCard).join('');
        
        if (page === 1) {
            newsGrid.innerHTML = newsHTML;
        } else {
            newsGrid.insertAdjacentHTML('beforeend', newsHTML);
        }

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