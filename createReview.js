document.addEventListener('DOMContentLoaded', () => {
    loadArticleForReviews();
    loadAuthors();
    document.getElementById('articleForm').addEventListener('submit', (event) => {
        event.preventDefault();
        createReview();
    });
});

const loadArticleForReviews = () => {
    fetch(`https://newspaper-2jgz.onrender.com/news/articles/`)
        .then((res) => res.json())
        .then((data) => {
            const relatedArticles = data.results;
            const relatedArticlesList = document.getElementById("related-articles-list");
            relatedArticles.forEach(article => {
                const option = document.createElement("option");
                option.value = article.id; // Set the value of the option to article ID
                option.textContent = article.title; // Set the text content of the option
                relatedArticlesList.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading articles:", error));
};

const loadAuthors = () => {
    fetch("https://newspaper-2jgz.onrender.com/accounts/")
        .then(response => response.json())
        .then(authors => {
            console.log("Fetched authors:", authors);
            const authorSelect = document.getElementById("author");
            authors.results.forEach(author => {
                const option = document.createElement("option");
                option.value = author.id;
                option.text = author.username;
                authorSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching authors:", error));
};

const createReview = () => {
    const articleId = document.getElementById('related-articles-list').value;
    const body = document.getElementById('body').value;
    const rating = document.getElementById('rating').value;
    const authorId = document.getElementById('author').value;

    if (!articleId || !body || !rating || !authorId) {
        console.error("All fields are required");
        return;
    }

    const reviewData = {
        article: articleId,
        body: body,
        rating: rating,
        user: authorId
    };

    fetch("https://newspaper-2jgz.onrender.com/news/ratings/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    })
    .then((data) => {
        console.log("Review posted successfully:", data);
       
        document.getElementById('success').textContent = data.detail;

    })
    .catch((error) => {
        console.error("Error posting review:", error);
        document.getElementById('error').textContent = error.detail;
    });
};
