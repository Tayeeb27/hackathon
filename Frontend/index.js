
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

    const deletePost = document.createElement("button"); //maybe dont need this here
    deletePost.textContent = "Delete";
    post.appendChild(deletePost);

    return post;
}


/////////LOAD POST


async function loadDiary () {
    try {
      const response = await fetch("http://localhost:3000/diary");
      const posts = await response.json();
        console.log(posts);
      if (response.status == 200) {
        const container = document.getElementById("posts");
  
        posts.forEach(p => {
          const elem = createPostElement(p);
          container.appendChild(elem);
        });
      } else {
        window.location.assign("./index.html");
      }
    } catch (error) {
      console.log(error);
    }
  }
loadDiary()




/////////CREATE POST

document.getElementById("diaryForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const words = document.querySelector('#words')
    const category = document.querySelector('#category')
    const diaryForm = document.querySelector('#diaryForm')
    const form = {words:words.value, category:category.value};
    console.log(form)
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    }

    const result = await fetch("http://localhost:3000/diary", options);

    if (result.status == 201) {
        alert("Entry Entered successfully")
        window.location.reload();
        diaryForm.reset()
    }
})