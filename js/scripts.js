const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const studentId = '200552716';
const studentName = 'AJAY SONY';

async function fetchPosts() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
       throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    return await response.json();
  } catch(e) {
    console.log(e);
  }
}

function listPosts(postContainerElementId) {
    const postContainerElement = document.getElementById(postContainerElementId);

    if (!postContainerElement) {
        return;
    }

    const studentInfo = document.createElement('p');
    studentInfo.textContent = `Student ID: ${studentId} | Name: ${studentName}`;
    postContainerElement.appendChild(studentInfo);

    fetchPosts()
     .then((posts) => {
        if (!posts || posts.length === 0) {
            postContainerElement.innerHTML += '<p>No posts fetched.</p>';
            return;
        }

        for(const post of posts) {
            postContainerElement.appendChild(createPostElement(post));
        }
     })
     .catch((e) => {
        console.log(e);
     });
}

function createPostElement(post) {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', `${apiUrl}/${post.id}`);
    anchorElement.setAttribute('target', '_blank');
    anchorElement.innerText = post.title;

    const postTitleElement = document.createElement('h3');
    postTitleElement.appendChild(anchorElement);

    return postTitleElement;
}

// Call listPosts with the id of the container element where you want to display the posts
listPosts('post-container');
