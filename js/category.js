const loadCategory = () => {
    fetch("https://newspaper-2jgz.onrender.com/news/categories/")
    .then((res) => res.json())
    .then((data) => {
        const parent = document.getElementById("myTab");

        // Clear any existing content
        parent.innerHTML = '';

        // Loop through the categories and create list items
        data.results.forEach(category => {
            const li = document.createElement("li");
            li.className = "nav-item";
            li.innerHTML = `
                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#${category.name}-tab-pane" type="button" role="tab" aria-controls="${category.name}-tab-pane" aria-selected="false" onclick="loadArticles('${category.name}')" >${category.name}</button>
            `;
            parent.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
    });
};


const loadArticles = (search) => {
    document.getElementById("article").innerHTML = "";
    document.getElementById("spinner").style.display = "block";
    document.getElementById("nodata").style.display = "none";

    fetch(`https://newspaper-2jgz.onrender.com/news/articles/?search=${search}`)
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("spinner").style.display = "none";

            if (data.results.length > 0) {
                displayArticle(data.results);
            } else {
                document.getElementById("nodata").style.display = "block";
            }
        })
        .catch((error) => {
            console.error('Error fetching articles:', error);
            document.getElementById("spinner").style.display = "none";
            document.getElementById("nodata").style.display = "block";
        });
};

const displayArticle = (articles) => {
    const parent = document.getElementById("article");
   
    articles.forEach((article) => {
        const truncatedBody = article.body.length > 50 ? article.body.substring(0, 50) + '...' : article.body;

        const div = document.createElement("div");
        div.classList.add("col-12", "col-md-4", "mb-4");
        div.innerHTML = `
            <div class="custom-block bg-white shadow-lg">
                <a  href="topics-detail.html?title=${
                    article.title}">
                    <div class="d-flex flex-column">
                        <h5 class="mb-2">${article.title}</h5>
                        <p class="mb-0">${truncatedBody}</p>
                        <span class="badge bg-design rounded-pill ms-auto">${article.category}</span>
                    </div>
                    <img src="${article.image}" class="custom-block-image img-fluid" alt="">
                </a>
            </div>
        `;
        parent.appendChild(div);
    });
};

let currentReviewIndex = 0;
let reviewsData = [];

const loadReview = () => {
    fetch("https://newspaper-2jgz.onrender.com/news/ratings/")
        .then((res) => res.json())
        .then((data) => {
            reviewsData = data.results; // Store the reviews data
            console.log('Reviews Data:', reviewsData); // Log the data to check the response
            displayReview(currentReviewIndex); // Display the first review
        })
        .catch((error) => console.error('Error fetching reviews:', error)); // Log any errors
};

const displayReview = (index) => {
    const parent = document.getElementById("review-container");
    parent.innerHTML = ''; // Clear existing review if any
    const review = reviewsData[index];
    if (review) {
        const div = document.createElement("div");
        div.classList.add("review-card");
        div.innerHTML = `
            <div class="review-content">
                <h4 class="review-rating">${review.rating} Stars</h4>
                <p class="review-body">${review.body.slice(0, 100)}...</p>
                <h6 class="review-user">Reviewer ID: ${review.user}</h6>
            </div>
        `;
        parent.appendChild(div);
    }
};

const showNextReview = () => {
    if (currentReviewIndex < reviewsData.length - 1) {
        currentReviewIndex++;
        displayReview(currentReviewIndex);
    }
};

const showPrevReview = () => {
    if (currentReviewIndex > 0) {
        currentReviewIndex--;
        displayReview(currentReviewIndex);
    }
};

document.getElementById("next-btn").addEventListener("click", showNextReview);
document.getElementById("prev-btn").addEventListener("click", showPrevReview);

loadReview();


loadArticles('');
loadCategory();





