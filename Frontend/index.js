
//////////////CREATE ELEMENT

function createPostElement (data) {
    const post = document.createElement("div");
    post.className = "post";

    const content = document.createElement("p");
    content.textContent = data["words"];
    post.appendChild(content);
    const category = document.createElement("p");
    category.textContent = data["category"];
    post.appendChild(category);

    // const deletePost = document.createElement("button"); //maybe dont need this here
    // deletePost.textContent = "Delete";
    // post.appendChild(deletePost);

    return post;
}


/////////LOAD POST


async function loadDiary () {
    
    const response = await fetch("http://localhost:3000/diary");
    
    if (response.status == 200) {
        const posts = await response.json();
        const container = document.getElementById("posts");

        posts.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })

    } else {
        window.location.assign("./index.html");
    }

}
loadDiary()




/////////CREATE POST

document.getElementById("diaryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            content: form.get("content")
        })
    }

    const result = await fetch("http://localhost:3000/diary", options);

    if (result.status == 201) {
        window.location.reload();
    }
})