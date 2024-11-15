

const HOME = document.querySelector(".home");
const details = document.querySelector(".details");
const Search =document.getElementById("saerchdata")
let submitBtn;
 





async function getMeals() {
    const load = document.querySelector(".load");
    load.classList.remove("hidden");
    load.classList.add("flex");
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const response = await api.json();
    displayMeals(response.meals);
    load.classList.add("hidden");
    load.classList.remove("flex");
    
 }


getMeals()
function displayMeals(data) {
    let mealsBox = ``;
    for (let i = 0; i < data.length; i++) {
        mealsBox += `
  <div onclick=" getMealDetails(${data[i]['idMeal']})"  class="meal-item rounded-xl relative group overflow-hidden" id="meal-item">
            <img src="${data[i]['strMealThumb']}" class="w-[100%] rounded-xl  img1 " alt="" >
            <div class="layer flex justify-start items-center absolute top-0  bottom-0    start-0 end-0 rounded-xl translate-y-[120%] group-hover:translate-y-[0] z-40 transition-all duration-[1s]">
             <p class="font-[500] si text-[28px] leading-[33.6px]">${data[i]['strMeal']}</p>
            </div>
        </div>
       `;
       document.getElementById("Data").classList.replace("md:grid-cols-1","md:grid-cols-4")
        document.getElementById("Data").innerHTML = mealsBox;
   
    }



}







   async function getMealDetails(mealID) {
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
     HOME.classList.add("hidden");
     details.classList.remove("hidden");
    displayMealsDetails([respone.meals[0]]);

}
   
  
function  displayMealsDetails(data) {
    let Recipes = '';
for (let i = 1; i <= 20; i++) {
    if (data[0] && data[0][`strMeasure${i}`] && data[0][`strIngredient${i}`]) {
    Recipes += `<button class="mt-2 me-2 gap-6 font-normal text-base text-[#055160] py-[7px] rounded px-3 bg-[#cff4fc]">${data[0][`strMeasure${i}`]} ${data[0][`strIngredient${i}`]}</button>`+`       `;
}

}

let tags = data[0].strTags?.split(",") || [];

let tagsStr = ''
for (let i = 0; i < tags.length; i++) {
tagsStr += `<button class="font-normal mt-2 text-base text-[#842029] py-[7px] rounded px-3 bg-[#f8d7da]">${tags[i]}</button>
    `+ ` `
    
}




    let meals = ``;
    for (let i = 0; i < data.length; i++) {
        meals += `
        <div class="imges">
            <img src="${data[i].strMealThumb}" class="w-full rounded-md" alt="">
            <p class="font-medium text-3xl mt-1 text-white">${data[i]['strMeal']}</p>
        </div>
        <div class="titleimage ">
            <p class="font-medium text-3xl text-white">Instructions</p>
            <p class="font-normal text-base text-white">${data[i]['strInstructions']}</p>
            <p class="font-semibold text-2xl text-white">Area: <span class="font-semibold text-2xl">${data[i]['strArea']}</span></p>
            <p class="font-semibold text-2xl text-white">Category: <span class="font-semibold text-2xl">${data[i]['strCategory']}</span></p>
            <p class="font-semibold text-2xl text-white">Recipes:</p>
            `+ Recipes + 
            `<p class="font-medium text-2xl text-white">Tags:</p>
            `+tagsStr+
            `<br>
            <button class="font-normal mt-2 text-base text-white py-[7px] rounded px-3 bg-[#198754] hover:bg-[#157347]">
                <a href="${data[i]['strSource']}">Source</a>
            </button>
            <button class="btnr font-normal mt-2 text-base text-white py-[7px] rounded px-3 bg-[#dc3445] hover:bg-[#bb2d3b]">
                <a href="${data[i]['strYoutube']}">Youtube</a>
            </button>
        </div>
        `;
       
    }

    document.getElementById("mealDetails").innerHTML = meals;
   
} 




async function getData(type, param = null) {
    const load = document.querySelector(".load");
    load.classList.remove("hidden");
    load.classList.add("flex");

    details.classList.add("hidden");

    let apiUrl;
    if (!param) {
        if (type === "category") {
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        } else if (type === "area") {
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
        } else if (type === "ingredient") {
            apiUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        }
    } else {
        if (type === "category") {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${param}`;
        } else if (type === "area") {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`;
        } else if (type === "ingredient") {
            apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${param}`;
        }
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!param) {
        if (type === "category") {
            displayCatrgory(data.categories);
        } else if (type === "area") {
            displayArea(data.meals);
        } else if (type === "ingredient") {
            displayIngr(data.meals);
        }

        const elements = document.querySelectorAll(
            type === "category" ? ".CatEgory" : 
            type === "area" ? ".area" : 
            ".ingredient"
        );

        elements.forEach(element => {
            element.addEventListener("click", (e) => {
                const paragraph = element.querySelector(
                    type === "category" ? ".cat" : 
                    type === "area" ? ".parea" : 
                    ".pIng"
                ).innerHTML;

                getData(type, paragraph); 
            });
        });
    } else {
        displayMeals(data.meals);
    }

    const HOME = document.querySelector(".home");
    HOME.classList.remove("hidden");
    load.classList.add("hidden");
    load.classList.remove("flex");
}


document.querySelector(".Categories").addEventListener("click", () => {
    getData("category");
 
});

document.querySelector(".Area").addEventListener("click", () => {
    getData("area");
  
});

document.querySelector(".Ingredients").addEventListener("click", () => {
    getData("ingredient");
   
   
});





 function displayCatrgory(data) {
    let mealsBox = ``;
    for (let i = 0; i < data.length; i++) {
       mealsBox += `
<div   class="rounded-xl relative group overflow-hidden CatEgory">
            <img src="${data[i]['strCategoryThumb']}" class="w-[100%] rounded-xl  img1 " alt="" >
            <div class="layer flex flex-col justify-start items-center absolute top-0  bottom-0    start-0 end-0 rounded-xl translate-y-[120%] group-hover:translate-y-[0] z-40 transition-all duration-[1s]">
             <p class="font-[500] text-center text-[28px] leading-[33.6px] cat ">${data[i]['strCategory']}</p>
             <p class="font-[400] text-center text-[14px] leading-[20px]  ">${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
       `;
       
    }
    document.getElementById("Data").classList.replace("md:grid-cols-1","md:grid-cols-4")
    document.getElementById("Data").innerHTML = mealsBox;
   
 }





 


    

   function   displayArea(data) {
            let areabox = ``;
            for (let i = 0; i < data.length; i++) {
               areabox += `
         <div class="flex flex-col mt-2 area">
               <i class="fa-solid fa-house-laptop fa-4x  text-white"></i>
               <p class="text-[28px] leading-9 mt-3 font-medium text-white parea">${data[i]['strArea']}</p>
               </div>
               `;
               
            }
            document.getElementById("Data").classList.replace("md:grid-cols-1","md:grid-cols-4")
            document.getElementById("Data").innerHTML = areabox;
           
         }




   

  function  displayIngr(data) {
    let Ingrbox = ``;
    for (let i = 0; i < 20; i++) {
       Ingrbox += `
<div class="flex flex-col mt-2 ingredient">  
    <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
    <p class="text-[28px] leading-9 mt-3 font-medium text-white pIng">${data[i]['strIngredient']}</p>
    <p class="text-base mt-3 font-normal text-white ">${data[i]['strDescription'].split(" ").slice(0,20).join(" ")}</p>
 </div>
       `;
       
    }
    document.getElementById("Data").classList.replace("md:grid-cols-1","md:grid-cols-4")
    document.getElementById("Data").innerHTML = Ingrbox;
   
 }


 
function contact(){
    const ContactUs  = document.querySelector(".ContactUs");
    ContactUs.addEventListener("click", () => displaycontact() )
    Search.classList.remove("hidden");
   }
   contact()
 function displaycontact() {
    let contactBox = 
  `
<div class="w-[75%] mx-auto justify-center items-center mt-10  h-screen flex flex-col " id="Contact">

    <div class="  w-full text-center grid grid-cols-1 md:grid-cols-2 gap-6" id="">
        <div class="">
            <input onkeyup="inputsValidation()"  class="w-full rounded-md px-3 py-[7px] outline-none button " type="text" id="NameInput" placeholder="Enter Your Name">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden" id="NameAlert" >Special characters and numbers not allowed</p>
            
        </div> 
        <div class="">
            <input onkeyup="inputsValidation()" class="w-full rounded-md px-3 py-[7px] outline-none button " type="email" id="EmailInput"  placeholder="Enter Your Email">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden" id="EmailAlert" >Email not valid *exemple@yyy.zzz</p>
        </div> 
    </div>
    <div class=" mt-5 w-full text-center grid grid-cols-1 md:grid-cols-2 gap-6" id="">
        <div class="">
            <input onkeyup="inputsValidation()" class="w-full rounded-md px-3 py-[7px] outline-none button " type="tel" id="PhoneInput"  placeholder="Enter Your Phone">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden" id="PhoneAlert">Enter valid Phone Number</p>
        </div> 
        <div class="">
            <input onkeyup="inputsValidation()" class="w-full rounded-md px-3 py-[7px] outline-none button " type="number" id="AgeInput"  placeholder="Enter Your Age">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden" id="AgeAlert">Enter valid age</p>
        </div> 
    </div>
    <div class=" mt-5 w-full text-center grid grid-cols-1 md:grid-cols-2 gap-6" id="">
        <div class="">
            <input onkeyup="inputsValidation()" class="w-full rounded-md px-3 py-[7px] outline-none button " type="password" id="PasInput"  placeholder="Enter Your Password">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden" id="PasAlert">Enter valid password Minimum eight characters, at least one letter and one number:</p>
        </div> 
        <div class="">
            <input onkeyup="inputsValidation()" class="w-full rounded-md px-3 py-[7px] outline-none button " type="password" id="rePasInput"  placeholder="Repassword">
            <p class="w-full rounded-md px-3 py-[13px] mt-1 bg-[#f8d7da] hidden"id="RepasAlert">Enter valid repassword</p>
        </div> 
    </div>
    <div class="mt-5 text-center">
        <button disabled class="text-[#dc3545] border border-[#dc3545] border-solid py-[5px] rounded-md px-3 opacity-65  bg-black" id="submitBtn">Submit</button>
         <p class="text-xl bg-[#99C68E] rounded-md text-center mt-3 hidden " id="psucess">Success</p>
    </div> 
  

    </div>

       `;
       document.getElementById("Data").classList.replace("md:grid-cols-4","md:grid-cols-1")
        document.getElementById("Data").innerHTML = contactBox;
        submitBtn = document.getElementById("submitBtn")
        
        document.getElementById("NameInput").addEventListener("focus", () => {
            nameInputTouched = true
        })
        document.getElementById("EmailInput").addEventListener("focus", () => {
            emailInputTouched = true
        })
    
        document.getElementById("PhoneInput").addEventListener("focus", () => {
            phoneInputTouched = true
        })
    
        document.getElementById("AgeInput").addEventListener("focus", () => {
            ageInputTouched = true
        })
    
        document.getElementById("PasInput").addEventListener("focus", () => {
            passwordInputTouched = true
        })
    
        document.getElementById("rePasInput").addEventListener("focus", () => {
            repasswordInputTouched = true
        })
    



}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {


    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("NameAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("NameAlert").classList.replace("hidden", "block")
    
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.getElementById("EmailAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("EmailAlert").classList.replace("hidden", "block")
    
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("PhoneAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("PhoneAlert").classList.replace("hidden", "block")
    
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("AgeAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("AgeAlert").classList.replace("hidden", "block")
    
        }
    }
    if (passwordInputTouched ) {
        if (passwordValidation()) {
            document.getElementById("PasAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("PasAlert").classList.replace("hidden", "block")
    
        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("RepasAlert").classList.replace("block", "hidden")
    
        } else {
            document.getElementById("RepasAlert").classList.replace("hidden", "block")
    
        }
    }

    if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
    let psucess=document.getElementById("psucess")
    psucess.classList.replace("hidden","block")

} else {
    submitBtn.setAttribute("disabled", true)
}

submitBtn.addEventListener("click",function(){
    document.getElementById("NameInput").value=""
    document.getElementById("EmailInput").value=""
    document.getElementById("PhoneInput").value=""
    document.getElementById("AgeInput").value=""
    document.getElementById("PasInput").value=""
    document.getElementById("rePasInput").value=""
    submitBtn.setAttribute("disabled", true)
    let psucess=document.getElementById("psucess")
    psucess.classList.replace("block","hidden")
})
    
}



function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("NameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("EmailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("PhoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("AgeInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("PasInput").value))
}

function repasswordValidation() {
    return document.getElementById("rePasInput").value == document.getElementById("PasInput").value
}

function contactus(){
    HOME.classList.remove("hidden");
    details.classList.add("hidden");

}

async function  SearchByFirstLetter(fletter) {
    details.classList.add("hidden");
    const letterToSearch = fletter || 'a';
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterToSearch}`);
    const response = await api.json();
    if (response.meals && response.meals.length > 0) {
        HOME.classList.remove("hidden");
        displayMeals(response.meals);
        ;
}}
 
   
async function SearchByName(name) {
    details.classList.add("hidden");
    const nameToSearch = name || ''; 
    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameToSearch}`);
    const response = await api.json();
    if (response.meals && response.meals.length > 0) {
        HOME.classList.remove("hidden");
        displayMeals(response.meals);
        ;
    } else {
        getMeals();
    }
}

 async function SearchCalling(){
    const Search  = document.querySelector(".search");
    Search.addEventListener("click", () => displaySearch());
    Search.addEventListener("click", function(){
        Search.classList.remove("hidden");
        HOME.classList.add("hidden");
        details.classList.add("hidden");
    });
 }

 function search_(){
    const Search  =  document.getElementById("saerchdata");
    Search.classList.remove("hidden");

}

 SearchCalling()


function displaySearch() {
        
        let searchbox = 
            `
          <div class=" grid grid-cols-1 md:grid-cols-2 gap-10" >
            <div id="input1">
                <input type="search" class="border border-white rounded w-full bg-black px-3 py-1 button" placeholder="Search By Name" onkeyup="SearchByName(this.value)" id="name" >
            </div>
            <div id="input2">
                <input type="search" class="border border-white rounded w-full bg-black px-3 py-1 button" maxlength="1" placeholder="Search By First Letter" onkeyup="SearchByFirstLetter(this.value)" id="letter" >
            </div>
            </div>
           `;
        document.getElementById("saerchdata").innerHTML= searchbox;  
     }




function toggleSidebar() {
    let leftSideWidth = $(".sidleft").innerWidth();
    $(".sidebar").css({ left: -leftSideWidth }); 

    let isOpen = false; 

    $(".fa-bars").click(function () {
        let mark = document.getElementById("mark");

        if (!isOpen) {
            $(".sidebar").animate({ left: 0 }, 500);
            mark.classList.replace("fa-bars", "fa-xmark");
            $(".ancors li").each(function (index) {
                $(this).animate({ top: 0 }, (index + 5) * 90);
            });
        } else {
            $(".sidebar").animate({ left: -leftSideWidth }, 500);
            mark.classList.replace("fa-xmark", "fa-bars");
            $(".ancors li").animate({ top: 300 }, 300);
        }

        isOpen = !isOpen; 
    });
}

function toggleIcons() {
    document.querySelector(".open_close_icon").classList.replace("fa-xmark", "fa-bars");
}

toggleSidebar();