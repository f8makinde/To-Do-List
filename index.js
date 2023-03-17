const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []


const btn = document.getElementById("btn")

btn.addEventListener('click', () =>{
    const item = document.getElementById("items")
    createItem(item)
})
function displayItems(){
    let items = ""

    for(let i = 0; i < itemsArray.length; i++){
        items += `      
         <div class='item flex flex-col gap-3'>
        <div class="input-controller">
            <textarea disabled class="px-16 font-medium py-2 indent-1 text-lg resize-none text-black">${itemsArray[i]}</textarea>
            <div class="edit-controller">
                <i class="fa-solid fa-trash deleteBtn text-xl"></i>
                <i class="fa-solid fa-pen-to-square editBtn text-xl"></i>
            </div>
        </div>
        <div class="update-controller">
            <button class="save-btn btn pointer bg-black text-white py-3 px-8">Save</button>
            <button class="cancel-btn btn pointer bg-black text-white py-3 px-8">Cancel</button>
        </div>
    </div>`
    }
   document.getElementById("displayText").innerHTML = items
   activateDeleteBtn()
   activateEditBtn()
   activateSaveBtn()
   activateCancelBtn()
  
}
function activateDeleteBtn(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i)  => {
        db.addEventListener("click", () => {deleteItem(i)})
    })

  } 

  function activateEditBtn(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {
         eb.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
         })
    })

  }
  function activateSaveBtn(){
    const saveBtn = document.querySelectorAll(".save-btn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
        
    })
  }
  function activateCancelBtn(){
    const cancelBtn = document.querySelectorAll(".cancel-btn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i) => {
        cb.addEventListener("click", () => {
           updateController[i].style.display = "none"
           inputs[i].disabled = true
        })
   })
  }
  function updateItem(text, i){
    itemsArray[i] = text
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
  }
function deleteItem(i){
    itemsArray.splice(i, 1)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
function createItem(item){
    if(item.value === ""){
        return
    }
    itemsArray.push(item.value)
    localStorage.setItem("items", JSON.stringify(itemsArray))
    location.reload()
}
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    document.getElementById("date").innerHTML = `${date[0]} ${date[1]} ${date[2]} ${date[3]}`
    console.log(date)
}
function render(){
    displayDate()
    displayItems()
}
render()