const loader = document.querySelector('.preload');
const emoji = loader.querySelector('.emoji');
let cards = document.getElementById('cards-inner');
let user_input_name= document.getElementById('input_user');
let user_input = document.getElementById('data_fields');
let stored_input = "";
let stored_name_input = "";

user_input_name.addEventListener('input' , (e)  => {
stored_name_input = e.target.value;
 getData(stored_name_input, stored_input); 

  })


user_input.addEventListener('change' , (e)  => {
stored_input = e.target.value;
    getData(stored_name_input, stored_input); 

  })
const emojis = ["🕐", "🕜", "🕑","🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢",  "🕗", "🕣", "🕘", "🕤", "🕙",  "🕥", "🕚", "🕦",  "🕛", "🕧"];

const interval = 125;

const loadEmojis = (arr) => {
    setInterval(() => {
      emoji.innerText = arr[Math.floor(Math.random() * arr.length)];
    }, interval);
}
loadEmojis(emojis);
 async function getData(sname_input = "" , input_data =""){
 console.log("Searching for:", sname_input);
    console.log("Sorting by:", input_data);

    cards.innerHTML = "";
    const url = "https://jsonplaceholder.typicode.com/users";
const response = await fetch(url);
const results = await response.json();
    try{
results.filter((data ) => {
 const { name} = data;
    return name.toLowerCase().includes(sname_input.toLowerCase());
    }).sort((a,b) =>{

 switch(input_data){
    case 'name':
     return   a.name.localeCompare(b.name);
        case 'email':
        console.log("email");
     return  a.email.localeCompare(b.email);
        case 'company':
     return a.company.name.localeCompare(b.company.name);
     case "":
        return 0;
 }
    }).map(data =>{
    const { id , name , username , address , phone, website, company , email} = data;
        let existingIds = JSON.parse(localStorage.getItem('card-ids')) || [];

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isEmailInvalid(email) {
    return !emailRegex.test(email); 
}
     let valid_email = isEmailInvalid(email) ?   email + "&#10060;" : email;
    let dynamic_class = existingIds.includes(String(id));
    cards.innerHTML += ` <div class="user-profile ${ dynamic_class ? 'highlight-box' : ' ' }" data-id="${id}">
   <p><strong>ID:</strong>${id}</p>
        <h1>User Profile ${username} </h1>
        <p><strong>Name:</strong>${name}</p>
        <p><strong>Address:</strong>${address.street}</p>
        <p><strong>Company:</strong>${company.name}</p>
        <p><strong>Phone:</strong>${phone}</p>
        <p><strong>Email:</strong>${valid_email}</p>
         <p><strong>Website:</strong>${website}</p>
    </div>`;
}
)
document.querySelector(".preload").style.display = "none";
}
    catch(error){
    console.log(error);
    }
}
getData("");
cards.addEventListener('click' , (e) =>{
    const clicked_cards = e.target.closest('.user-profile');
    if(!clicked_cards) return;
const clicked_ids = clicked_cards.dataset.id;
      clicked_cards.classList.add('highlight-box');
    let existingIds = JSON.parse(localStorage.getItem('card-ids')) || [];
    if(!existingIds.includes( clicked_ids)){
    existingIds.push(clicked_ids);
    } 
    localStorage.setItem('card-ids', JSON.stringify(existingIds));
})