const loadCategory = () => {
    fetch("https://newspaper-2jgz.onrender.com/news/categories/")
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
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
    console.log(search);
    const slider = document.getElementById("slider2");
    const spinner = document.getElementById("spinner");
    const noData = document.getElementById("nodata");

    if (slider) {
        slider.innerHTML = ""; // Clear previous articles
    }
    if (spinner) {
        spinner.style.display = "block";
    }
    if (noData) {
        noData.style.display = "none";
    }

    fetch(`https://newspaper-2jgz.onrender.com/news/articles/?search=${search}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            
            if (spinner) {
                spinner.style.display = "none";
            }

            if (data.results.length > 0) {
               
                displayArticle(data.results);
            } else {
                if (noData) {
                    noData.style.display = "block";
                }
            }
        })
        .catch((error) => {
            console.error('Error fetching articles:', error);
            if (spinner) {
                spinner.style.display = "none";
            }
            if (noData) {
                noData.style.display = "block";
            }
        });
};

const handleSearch = () => {
    const value = document.getElementById("search").value.trim(); // Trim any leading or trailing spaces
    console.log('Search value:', value); // Check the value in console for debugging
    loadArticles(value); // Call your function to load articles based on the search value
};








const displayArticle = (articles) => {
    console.log('amar article',articles);
    const parent = document.getElementById("slider2");

    if (parent) {
        articles.forEach((article) => {
            const truncatedBody = article.body.length > 50 ? article.body.substring(0, 50) + '...' : article.body;
            loadReview(article.category);
            const li = document.createElement("li");
            li.innerHTML = `
                <div class="card shadow h-100">
                     <a  href="topics-detail.html?title=${
                    article.title}">
                    <div class="card-body d-flex flex-column flex-md-row">
                        <div class="flex-grow-1">
                            <strong>${article.title}</strong>
                            <p class="card-text">${truncatedBody}</p>
                            <span class="badge bg-design rounded-pill ms-auto"> Category:${article.category}</span>
                        </div>
                        <div class="px-md-2">  <span class="badge bg-design rounded-pill ms-auto">Author:${article.author}</span></div>
                    </div>
                    
                    </a>
                </div>
            `;
            parent.appendChild(li);
        });
    }
};







const loadReview = () => {
    fetch(`https://newspaper-2jgz.onrender.com/news/ratings/`)
        .then((res) => res.json())
        .then((data) => {
            console.log('load data')

           
            // Log the data to check the response
            displayReview(data.results); // Display the first review
           
        })
        .catch((error) => console.error('Error fetching reviews:', error)); // Log any errors
};

const displayReview = (reviews) => {
    console.log("amar reviews:",reviews);
    const parent = document.getElementById("slider3");
    parent.innerHTML = ''; // Clear existing reviews if any

    reviews.forEach((review) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="card shadow h-100">
                <div class="card-body d-flex flex-column flex-md-row">
                    <div class="flex-grow-1">
                        <strong>${review.rating}</strong>
                        <p class="card-text"><h6>Title:</h6>${review.body.slice(0, 100)}</p>
                        <span class="badge bg-design rounded-pill ms-auto"> Reviewer ID: ${review.user}</span>
                    </div>
                    <div class="px-md-2">  <span class="badge bg-design rounded-pill ms-auto"> Author: ${review.article}</span></div>
                   
                </div>
            </div>
        `;
        parent.appendChild(li);
    });
};





loadReview('');

loadArticles('');
loadCategory();





