// Event listener for DOMContentLoaded to fetch categories and authors
const loadCatagoryAndAuthor= () => {
    // Fetch categories
    fetch("https://newspaper-2jgz.onrender.com/news/categories/")
        .then(response => response.json())
        .then(categories => {
            console.log("Fetched categories:", categories); // Optional: Logging for verification
            const categorySelect = document.getElementById("category");
            categories.results.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id; // Assuming 'id' is the property for value
                option.text = category.name; // Assuming 'name' is the property for display text
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));

    // Fetch authors
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

// Handle form submission
const CreateArticle = (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(); // Create FormData object to store form data

    // Retrieve values from form elements
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const category = document.getElementById('category').value;
    const author = document.getElementById('author').value;
    const image = document.getElementById('imageUpload').files[0]; // Get the first file object
    console.log("title", title, "body", body, "image", image.name, "category", category, "author", author);

    // Append values to FormData object
    formData.append('title', title);
    formData.append('body', body);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('image', image); // Append the file object directly

    // Retrieve token
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        console.error('Authorization token not found in localStorage');
        document.getElementById('error').textContent = 'Authorization token not found. Please log in again.';
        return;
    }

    // Fetch API to send form data to server
    fetch('https://newspaper-2jgz.onrender.com/news/articles/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `token ${localStorage.getItem('token')}`, // Corrected syntax and added Bearer
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log("Token:", token);
        return response.json();
    })
    .then(data => {
        console.log('Article created successfully:', data);
        document.getElementById('success').textContent = 'Article created successfully!';
        document.getElementById('error').textContent = ''; // Clear any previous error messages
    })
    .catch(error => {
        console.error('Error creating article:', error);
        document.getElementById('error').textContent = 'Error creating article. Please try again.';
        document.getElementById('success').textContent = ''; // Clear any previous success messages
    });
};

// Event listener to submit the form
document.getElementById('articleForm').addEventListener('submit', CreateArticle);

// Call this function to create the article form
loadCatagoryAndAuthor();
