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
  const dateP = document.createElement("p");
  const sqlDate = data["date"];
  const date = new Date(sqlDate);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  dateP.textContent = formattedDate;
  post.appendChild(dateP);
/////////////////DELETE POST
  const deletePost = document.createElement("button"); 
  deletePost.textContent = "Delete";
  deletePost.value = data["diaryid"];
  post.appendChild(deletePost);

  deletePost.addEventListener("click", async (e) => {
    

  try {
    const id = e.target.value;
    const options = {
        method: "DELETE"
        
    }
    const response = await fetch(`http://localhost:3000/diary/${id}`, options)
    // Handle the response as needed
    window.location.assign("./index.html");
  } catch (error) {
      console.log("Error", error);
  }
    
  })

  return post;
}


/////////LOAD POST


async function loadDiary () {
  try {
    const response = await fetch("http://localhost:3000/diary");
    const posts = await response.json();
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

const datePicker = document.querySelector("#searchdate")

datePicker.addEventListener("click", async(e)=>{

  try {
    const response = await fetch(`http://localhost:3000/diary/date/${e.target.value}`);
    const posts = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("posts");

      container.innerHTML = "";
      posts.forEach(p => {
        const elem = createPostElement(p);
        container.appendChild(elem);
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
})

const category = document.querySelector('#searchcategory');
category. addEventListener('click', async(e)=>{
  try {
  const response = await fetch(`http://localhost:3000/diary/category/${e.target.value}`);
    const posts = await response.json();
    if (response.status == 200) {
      const container = document.getElementById("posts");
      container.innerHTML = "";
      posts.forEach(p => {
        const elem = createPostElement(p);
        container.appendChild(elem);
      });
    } else {
    }
  } catch (error) {
    console.log(error);
  }
})

