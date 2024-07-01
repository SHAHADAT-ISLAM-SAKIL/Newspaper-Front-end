const getparams = () => {
    const param = new URLSearchParams(window.location.search).get("title");
    fetch(`https://newspaper-2jgz.onrender.com/news/articles/?search=${param}`)
    .then((res) => res.json())
    .then((data) => {
        const article = data.results[0];
        loadDetails(article);
        loadRelatedArticles(article.category);
    });
};

const loadDetails = (article) => {
    const parent = document.getElementById("details-container");
    const div = document.createElement("div");
    div.innerHTML = `
        <header class="site-header d-flex flex-column justify-content-center align-items-center">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-lg-5 col-12 mb-5">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="index.html">Homepage</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Details</li>
                            </ol>
                        </nav>
                        <h2 class="text-white">${article.title}</h2>
                        <div class="d-flex align-items-center mt-5">
                            <a href="#topics-detail" class="btn custom-btn custom-border-btn smoothscroll me-4">Read More</a>
                            <a href="#top" class="custom-icon bi-bookmark smoothscroll"></a>
                        </div>
                    </div>
                    <div class="col-lg-5 col-12">
                        <div class="topics-detail-block bg-white shadow-lg">
                            <img src="${article.image}" class="topics-detail-block-image img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section class="topics-detail-section section-padding" id="topics-detail">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-12 m-auto">
                        <h3 class="mb-4">${article.title}</h3>
                        <p>${article.body}</p>
                        <blockquote>
                            Date: ${article.publishing_time} <br> Category: ${article.category} <br> Author: ${article.author}
                        </blockquote>
                        <div class="row my-4">
                            <div class="col-lg-6 col-md-6 col-12">
                                <img src="${article.image}" class="topics-detail-block-image img-fluid">
                            </div>
                        </div>
                        <p>Most people start with freelancing skills they already have as a side hustle to build up income. This extra cash can be used for a vacation, to boost up savings, investing, build business.</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="related-articles-section section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-12 m-auto">
                        <h4 class="mb-4">Related Articles:</h4>
                        <ul id="related-articles-list" class="list-unstyled">
                            <!-- Related articles will be loaded here -->
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
    parent.appendChild(div);
};

const loadRelatedArticles = (category) => {
    fetch(`https://newspaper-2jgz.onrender.com/news/articles/?category=${category}`)
    .then((res) => res.json())
    .then((data) => {
        const relatedArticles = data.results.slice(0, 2); // Get the first 2 articles
        const relatedArticlesList = document.getElementById("related-articles-list");
        relatedArticles.forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="topics-detail.html?title=${article.title}">${article.title}</a>`;
            relatedArticlesList.appendChild(li);
        });
    });
};

getparams();
