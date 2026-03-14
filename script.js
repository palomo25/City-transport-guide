function searchTransport(){
    let input = document.getElementById("searchInput")
    let filter = input.value.toLowerCase()
    let cards = document.getElementsByClassName("card")

    for(let i = 0; i < cards.length; i++){
        let text = cards[i].innerText.toLowerCase()
        cards[i].style.display = text.includes(filter) ? "block" : "none"
    }
}

let form = document.getElementById("bookingForm")
let bookingList = document.getElementById("bookingList")
let bookings = JSON.parse(localStorage.getItem("bookings")) || []

displayBookings()

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault()

        let name = document.getElementById("name").value
        let destination = document.getElementById("destination").value
        let transport = document.getElementById("transport").value

        if(name === "" || destination === "" || transport === ""){
            alert("Please fill all fields")
            return
        }

        bookings.push({name, destination, transport})
        localStorage.setItem("bookings", JSON.stringify(bookings))
        displayBookings()
        form.reset()
    })
}

function displayBookings(){
    if(!bookingList) return

    bookingList.innerHTML = ""

    bookings.forEach(function(b, index){
        let li = document.createElement("li")
        li.textContent = `${b.name} - ${b.transport} to ${b.destination}`

        let cancelBtn = document.createElement("button")
        cancelBtn.textContent = "Cancel"
        cancelBtn.style.background = "red"
        cancelBtn.style.color = "white"
        cancelBtn.style.border = "none"
        cancelBtn.style.borderRadius = "5px"
        cancelBtn.style.padding = "5px 10px"
        cancelBtn.style.marginLeft = "10px"
        cancelBtn.style.cursor = "pointer"

        cancelBtn.onclick = function(){
            if(confirm("Are you sure you want to cancel this booking?")){
                bookings.splice(index, 1)
                localStorage.setItem("bookings", JSON.stringify(bookings))
                displayBookings()
            }
        }

        li.appendChild(cancelBtn)
        bookingList.appendChild(li)
    })
}