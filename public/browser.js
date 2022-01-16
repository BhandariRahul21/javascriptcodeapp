function itemTemplate(item){
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
  <span class="item-text">${item.text}</span>
  <div>
    <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
    <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
  </div>
</li>`
}

//client side rendering
  //Initial Page load render
let ourHTML=items.map(function(item){
  return itemTemplate(item)
}).join('')
//join convert array to string text 
document.getElementById("item-list").insertAdjacentHTML("beforeend",ourHTML)

//create feature
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit",function(e){
  e.preventDefault()
  axios.post('/create-item',{ text: createField.value}).then(function(response){
    //create html for new item
    document.getElementById("item-list").insertAdjacentHTML("beforeend",itemTemplate(response.data))
    //clear the data on sunbimmision of text
    createField.value=""
    //mouse cursor point on target place
    createField.focus()
   }).catch(function(){
     console.log("Please try again later")
   })
})

document.addEventListener("click",function(e){
  
  //delete feature
  if (e.target.classList.contains("delete-me")){
    if (confirm("Do you want to delete this item")){
      axios.post('/delete-item',{ id: e.target.getAttribute("data-id")}).then(function(){
        e.target.parentElement.parentElement.remove()
       }).catch(function(){
         console.log("Please try again later")
       })
    }
  }

  //Update feature
  if (e.target.classList.contains("edit-me")){
      let userInput= prompt("Enter your desire new text",e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
      
      
      if (userInput) {
        axios.post('/update-item',{text: userInput, id: e.target.getAttribute("data-id")}).then(function(){
          e.target.parentElement.parentElement.querySelector(".item-text").innerHTML= userInput
         }).catch(function(){
           console.log("Please try again later")
         })
      }
  }
})