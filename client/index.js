
const addPostBtn = document.querySelector('#add-post-btn');
const postContainer = document.getElementById('postContainer');
const imageLink = document.querySelector('#link');
const postDescription = document.querySelector('#description');



function addPost(blogData) {
    // select the post container
    const postContainer = document.getElementById('postContainer');

    // Create the post card element
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    postCard.setAttribute('data-id', blogData.id);

    // Create the image element
    const imageElement = document.createElement('img');
    imageElement.classList.add('post-image');
    imageElement.src = blogData.link;
    imageElement.alt = 'Image Loading';

    // Create the description paragraph
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.classList.add('post-description');
    descriptionParagraph.innerText = blogData.description;

    // Create the comment input
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Write your comment here';
    commentInput.classList.add('input-box');

    // Create the add comment button
    const addCommentBtn = document.createElement('button');
    addCommentBtn.textContent = 'Send';
    addCommentBtn.classList.add('button-class');
    addCommentBtn.setAttribute('data-post-id', blogData.id);

    addCommentBtn.addEventListener('click', async () => {
        const text = commentInput.value;
        const postId = addCommentBtn.getAttribute('data-post-id');


        if (text.trim() !== '') {
            try {
                const response = await axios.post('http://localhost:3000/posts/insertComment', {
                    text: text,
                    PostId: postId
                });

                const newComment = response.data.comment;
                console.log(response);

                displayComment(newComment, postId);
            }
            catch (err) {
                console.log(err);
            }
        }
    });

    // Append elements to the post card
    postCard.appendChild(imageElement);
    postCard.appendChild(descriptionParagraph);
    postCard.appendChild(commentInput);
    postCard.appendChild(addCommentBtn);

    // Append the post card to the post container
    postContainer.appendChild(postCard);
}

function displayComment(comment, postId) {
    const postCard = document.querySelector(`.post-card[data-id="${comment.PostId}"]`);
    console.log(postCard);
    if (postCard) {
        
        const commentElement = document.createElement('p');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>Anonymous:</strong><br>${comment.text}`;

        // Append the comment element to the post card
        postCard.appendChild(commentElement);
    }
}



document.addEventListener('DOMContentLoaded', async function () {
    try {
        const posts = await axios.get('http://localhost:3000/posts/getAllPosts');
        const data = posts.data.response;
        // const postContainer = document.getElementById('postContainer');



        data.forEach(async post => {

            addPost(post);

            const comments = await axios.get(`http://localhost:3000/posts/getComments/${post.id}`);

            const postComments = comments.data.comments;

            for (const comment of postComments) {
                displayComment(comment, post.id);
            }




        });


    } catch (err) {
        console.log(err);
    }
});

addPostBtn.addEventListener('click', async function (event) {
    event.preventDefault();
    const link = imageLink.value;
    const description = postDescription.value;

    const blogdataObject = {
        "link": link,
        "description": description
    }
    try {
        const post = await axios.post('http://localhost:3000/posts/insertPost', blogdataObject);
        const postData = post.data.data;

        addPost(postData);
    }
    catch (err) {
        console.error(err);
    }

});



