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
  const timeP = document.createElement("p");
  const sqlTime = data["time"];
  const [hours, minutes, seconds] = sqlTime.split(":");

  // Format the time in your desired way
  const formattedTime = `${hours}:${minutes}`;
  
  timeP.textContent = formattedTime;
  post.appendChild(timeP);
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
  const editPost = document.createElement("button");
  editPost.textContent = "Edit";
  editPost.value = data["diaryid"];
  post.appendChild(editPost);

// Add a click event listener to the "Edit" button
  editPost.addEventListener("click", () => {
    // Display an edit form with the current post content
    displayEditForm(data);
});


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
      //window.location.assign("./index.html");
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

datePicker.addEventListener("change", async(e)=>{

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
      datePicker.value = "";
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
      category.textContent = "";
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

function displayEditForm(data) {
  // Assuming you have a form element with an ID "editForm" in your HTML
  const editForm = document.getElementById("editForm");

  // Populate the form with the current post data
  document.querySelector('#editWords').value = data.words;
  document.querySelector('#editCategory').value = data.category;

  // Show the edit form
  editForm.style.display = "block";

  // Add a submit event listener to the edit form
  editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const editedWords = document.querySelector('#editWords').value;
      const editedCategory = document.querySelector('#editCategory').value;

      // Send an HTTP request to update the post on the server
      const updatedData = {
          words: editedWords,
          category: editedCategory
      };

      const options = {
          method: "PATCH", // Use the appropriate HTTP method for updating
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
      };

      try {
          const response = await fetch(`http://localhost:3000/diary/${data.diaryid}`, options);
          if (response.status == 200) {
              alert("Post updated successfully");
              
              window.location.reload();
          } else {
              alert("Error updating post");
          }
      } catch (error) {
          console.log("Error", error);
      }

      // Hide the edit form
      editForm.style.display = "none";
  });
}
