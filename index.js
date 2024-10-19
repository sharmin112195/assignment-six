// button categories
const buttonCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories))
    .catch((error)=>console.log(error))
};
// create displayCategories
const displayCategories=(categories)=>{
    const categoryContainer=document.getElementById("categories");
    
    categories.forEach((item)=>{
        console.log(item)
        
        // create a button
        const buttonContainer=document.createElement("div");
 
        buttonContainer.innerHTML=`
        <div onclick="loadCategoryButton('${item.category}')" class="py-4  h-20 btn md:px-20 rounded-xl bg-white border border-gray-300 font-extrabold text-md hover:border hover:border-2 hover:border-emerald-400 hover:rounded-full hover:bg-emerald-50 w-full flex items-center justify-center gap-2 cursor-pointer" > 
        <img class="w-8" src=${item.category_icon}/>
        <p>${item.category}</p>
       </div>
        `
        
        categoryContainer.append(buttonContainer)
    })
   
}

// card section
const cardContainer=()=>{
 
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res)=>res.json())
    .then((data)=>displayCard(data.pets))
    .catch((error)=>console.log(error))
    
}
const displayCard=(card)=>{
    const cardContent=document.getElementById("card");
    
    cardContent.innerHTML="";
    if(card.length==0){
      
          // cardContent.classList.remove("grid");
      cardContent.innerHTML=`
      <div class="flex flex-col py-20 gap-5 col-span-3 justify-center items-center shadow-lg w-full h-full bg-gray-100 rounded-md min-h-[300px]">
        <img src="images/error.webp" alt="">
                  <h2 class="text-3xl text-center font-semibold">No Information Available</h2>
                  <p class="text-gray-500 text-center">If want to know how to fix no information is available for this page.</p>
      </div>
      `;
      return;
    } else{
        //  cardContainer.classList.add("grid")
    }
    card.forEach((cards)=>{
        console.log(cards);
        
     const div=document.createElement("div");
     div.innerHTML=`
              <div class="card card-compact col-span-3 border border-2 border-gray-300 p-5 shadow-xl space-x-5 gap-5 mt-5 ml-5">              
                   <figure class="">
                   <img src=${cards.image} class="rounded-xl w-full h-full" alt="" />
                   </figure>
                  <div class="pl-3 py-4 text-start overflow-hidden">
                    <h2 class="card-title">${cards.pet_name}</h2>
                    <p><i class="fa-solid fa-border-none"></i> Breed:${cards.breed?cards.breed:"breed not found"}</p>
                    <p><i class="fa-regular fa-calendar"></i> Birth:${cards.date_of_birth?cards.date_of_birth:"unknown"}</p>
                    <p><i class="fa-solid fa-mercury"></i> Gender:${cards.gender?cards.gender:"not defined"}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Price:${cards.price?cards.price:"undefined"}$</p>
                    <div class="card-actions border-t pt-4 flex justify-between">
                      <button onclick="imageCard('${cards.image}')" class="btn btn-outline btn-accent"><i class="fa-regular fa-thumbs-up"></i></button>
                      <button class="btn btn-outline btn-accent" onclick="adoptData(this)">Adopt</button>
                      <button class="btn btn-outline btn-accent" onclick="loadDetails(${cards.petId})">Details</button>
                    </div>
                  </div>
                </div>
            
     `;
     cardContent.appendChild(div)
    })
}

const imageCard = (image) =>{
const imageCardContainer = document.getElementById("imgCard");
const div = document.createElement("div")
div.innerHTML=`
<div class="col-span-2 border-gray-300 shadow-xl content-start">
<figure class="">
      <img src=${image} class="rounded-lg alt="" />
  </figure>
</div>
`;

imageCardContainer.appendChild(div);


}



const loadCategoryButton=(id)=>{
  // alert(id)
  const cardCard = document.getElementById("card")
   const countValue = document.getElementById("spinner");
     
  // show spinner
    countValue.classList.remove("hidden")
    cardCard.classList.add("hidden")
   
   fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
   .then((res)=>res.json())
   .then((data)=>{
    
    setTimeout(()=>{
      displayCard(data.data)
      countValue.classList.add("hidden")
      cardCard.classList.remove("hidden")
     
      
    },2000)
   })
   .catch((error)=>console.log(error));
  //  hide spinner
   

  
}

// Details button click fetch

const loadDetails =async(petId)=>{
console.log(petId);
const url =`https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
const res = await fetch(url);
const data = await res.json();
petDisplayDetails(data.petData)
}

const petDisplayDetails = (pet)=>{
console.log(pet);
const detailsContainer = document.getElementById("modal-content");
detailsContainer.innerHTML=`
<img src=${pet.image} class="rounded-xl w-full h-full" alt="" />
         <div class="pl-3 py-4 text-start overflow-hidden">
              <h2 class="card-title text-2xl font-bold">${pet.pet_name}</h2>
              <div class="grid grid-cols-2">
                    <p><i class="fa-solid fa-border-none"></i> Breed:${pet.breed?pet.breed:"breed not found"}</p>
                    <p><i class="fa-regular fa-calendar"></i> Birth:${pet.date_of_birth?pet.date_of_birth:"unknown"}</p>
                    <p><i class="fa-solid fa-mercury"></i> Gender:${pet.gender?pet.gender:"not defined"}</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Price:${pet.price?pet.price:"undefined"}$</p>
                    <p><i class="fa-solid fa-dollar-sign"></i> Vaccinated status:${pet.vaccinated_status?pet.vaccinated_status:"undefined"}</p>
                    </div>
                    </div>
                    <div class="pt-4 border-t border-gray-400">
                    <h2 class="text-xl fond-bold pb-3">Details Information</h2>
                    <p>${pet.pet_details?pet.pet_details:"no information"}</p>
                    </div>
`;
document.getElementById("petModal").showModal()
}



// adopt button

const adoptData =(pes)=>{
  pes.innerHTML=`adopted`
  pes.setAttribute(`disabled`,true)
  let start = 3;
  let count = 1;
  const countDownValue = document.getElementById("count")
  const countDown = setInterval(() => {
    if (start >= count) {
      countDownValue.innerHTML = start;
      start--;
      my_modal_1.showModal();
    } else {
      clearInterval(countDown);
      countDownValue.innerHTML = "";
    }
  }, 1000);
  const myTimeout = setTimeout(() => {
    my_modal_1.close();
  }, 4000);
  
  

}

// spinner----->

  const countDownValue=document.getElementById("spinner")
  countDownValue.classList.remove("hidden")
  setTimeout(()=>{
    cardContainer()
    buttonCategories()
   
    
    countDownValue.classList.add("hidden")
  },2000)



  //  cardContainer()
  //   buttonCategories()

// sort section-------->

  const sortSection = async(sorts=false)=>{
   const url="https://openapi.programming-hero.com/api/peddy/pets";
   const res = await fetch(url);
   const data = await res.json();
   let sortCard = data.pets;
   if(sorts){
    sortCard = sortCard.sort((x,y)=>y.price - x.price);
   }
    displayCard(sortCard)
  }

  const sortBtn=document.getElementById("sort")
  sortBtn.addEventListener('click',()=>{
    sortSection(true)
  })
  sortBtn()

