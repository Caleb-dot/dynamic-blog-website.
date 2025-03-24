document.getElementById('post-form')?.addEventListener('submit', function (event) {
    event.preventDefault();

    let title = document.getElementById('post-title').value;
    let content = document.getElementById('post-content').value;

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    let newPost = { id: Date.now(), title, content };
    posts.push(newPost);

    localStorage.setItem('posts', JSON.stringify(posts));

    window.location.href = "index.html";
});

window.onload = function () {
    let postList = document.getElementById('post-list');
    if (!postList) return;

    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        let postElement = document.createElement('div');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${post.id}" class="btn">Read More</a>
        `;
        postList.appendChild(postElement);
    });
};

if (window.location.pathname.includes('post.html')) {
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get('id');

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-content').innerText = post.content;

        document.getElementById('delete-btn').addEventListener('click', function () {
            let updatedPosts = posts.filter(p => p.id != postId);
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            window.location.href = "index.html";
        });

        document.getElementById('edit-btn').addEventListener('click', function () {
            let newTitle = prompt("Edit title:", post.title);
            let newContent = prompt("Edit content:", post.content);

            post.title = newTitle;
            post.content = newContent;

            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.reload();
        });
    }
}