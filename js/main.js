// ====================Static===============
const botunNaveOpen = document.getElementById('botun-nave')
const naveSide = document.getElementById('naveSide')
const printScren = document.getElementById('conttet')
const loedScren =document.getElementById('lode-scren')
const sarchebar = document.getElementById('searchControl')
let isValed =false;
searchByFLetter('b')



$("#naveSide i#botun-nave").click(() => {
    if ($("#naveSide").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})



















// ================Event=================



// ===================FUnction=================


// side bar
function openSideNav() {
    $("#naveSide").animate({
        left: 0
    }, 500)


    $("#botun-nave").removeClass("fa-align-justify");
    $("#botun-nave").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links-nave ul li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $("#naveSide .nav-tab").outerWidth()
    $("#naveSide").animate({
        left: -boxWidth
    }, 500)

    $("#botun-nave").addClass("fa-align-justify");
    $("#botun-nave").removeClass("fa-x");


    $(".links-nave ul li").animate({
        top: 300
    }, 500)
}
// end side bar








// searc api to Categories
async function getCategories() {

    closeSideNav()
    printScren.innerHTML= ''
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')


    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data = await api.json()


    cardOverDATA(data.categories)
    loedScren.classList.add('d-none')

}

// searc api to category meals
async function getCategoryMeals(category) {

    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')


    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await api.json()


    displayMeals(data.meals.slice(0, 20))
    loedScren.classList.add('d-none')

}


// searc api to Area
async function getArea() {

    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')


    const api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data = await api.json()


    crietArea(data.meals)
    loedScren.classList.add('d-none')

}

// searc api  to area meals
async function getAreaMeals(area) {

    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')


    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await api.json()



    displayMeals(data.meals)
    loedScren.classList.add('d-none')

}

// searc api  to Area meals details
async function getMealDetails(mealID) {
    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')

  
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await api.json();


    displayMealDetails(data.meals[0])
    loedScren.classList.add('d-none')

}

// searc api  to Area getIn gredients
async function getIngredients() {
    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')



    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data = await api.json()


    displayIngredients(data.meals.slice(0, 30))
    loedScren.classList.add('d-none')

}

// searc api  to Area meals details Meals
async function getIngredientsMeals(ingredients) {

    closeSideNav()
    printScren.innerHTML = ""
    sarchebar.innerHTML = ``
    loedScren.classList.remove('d-none')


    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await api.json()


    displayMeals(data.meals.slice(0, 20))
    loedScren.classList.add('d-none')

}

// searc api to search By FLetter
async function searchByFLetter(term) {

    closeSideNav()
    printScren.innerHTML = ""
    loedScren.classList.remove('d-none')


    term == "" ? term = "a" : "";
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    data = await api.json()


    data.meals ? displayMeals(data.meals) : displayMeals([])
    loedScren.classList.add('d-none')

}

// searc api to search By Name
async function searchByName(term) {

    closeSideNav()
    printScren.innerHTML = ""
    loedScren.classList.remove('d-none')


    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    data = await api.json()


    data.meals ? displayMeals(data.meals) : displayMeals([])
    loedScren.classList.add('d-none')

}




// Creates display meal
function displayMealDetails(meal) {
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `
            <li class="alert alert-info m-2 p-1">
              ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
            </li>`
        }
    }

    let tags = meal.strTags?.split(",")

    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">
         ${tags[i]}
        </li>`
    }



    let cartoona = `

    <div class="container my-5 p-2">
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-5">
            <div class="about-left">
                <div class="img-cont">
                    <img src="${meal.strMealThumb}" class="w-100">
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-7">
            <div class="about-right m-auto">
                <h2 class="mb-3 about-bold text-capitalize">${meal.strMeal}</h2>
                <p class="my-3 text-about-cont ">${meal.strInstructions}</p>
                
                <h5>Area : ${meal.strArea}</h5>
                <h5>Category : ${meal.strCategory}</h5>
               <div class="Recipes">
                <h6>Recipes :</h6>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${ingredients}
                </ul>
               </div>
               <div class="Tags">
                <h5>Tags :</h5>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                   ${tagsStr}
                    
                </ul>
               </div>
                <div class="but mt-5">
                    <a href="${meal.strSource}"target="_blank"  class="btn btn-success" >Source</a>
                    <a href="${meal.strYoutube}"target="_blank"  class="btn btn-danger">  Youtube </a>
                </div>

            </div>
        </div>
    </div>

</div>


`

    printScren.innerHTML = cartoona
}


// Creates Area
function crietArea(arr) {

    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="page-content col-md-3 ">
        <div class="card "  >
          <div class="content fa-solid fa-house-laptop fa-4x" >
            <h2 class="title ">${arr[i].strArea}</h2>

            
            <button onclick="getAreaMeals('${arr[i].strArea}')" class="btn btn-info mt-3 ">View Trips</button>
          </div>
        </div>

    </div>


`
    }

    printScren.innerHTML = cartoona
}

// Creates display meals
function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `

        
        <div class="page-content col-md-3">
        <div class="card" style="  background-image: url(${arr[i].strMealThumb});">
          <div class="content" >
            <h2 class="title">${arr[i].strMeal}</h2>
            <div class="cardw"> 
            </div>
            
            <button  onclick="getMealDetails('${arr[i].idMeal}')" class="btn btn-info mt-3 ">View Trips</button>
          </div>
        </div>

    </div>
`
    }

    printScren.innerHTML = cartoona
}


// card data Creates
function cardOverDATA(gamesDAta) {
    let cardeCriet = '';
    for (let i = 0; i < gamesDAta.length; i++) {

        cardeCriet += `   


        
        <div class="page-content col-md-3">
        <div class="card" style="  background-image: url(${gamesDAta[i].strCategoryThumb});">
          <div class="content" >
            <h2 class="title">${gamesDAta[i].strCategory}</h2>

            
            <button onclick="getCategoryMeals('${gamesDAta[i].strCategory}')" class="btn btn-info mt-3 ">View Trips</button>
          </div>
        </div>

    </div>
        
        `

    }

    printScren.innerHTML= cardeCriet
}

// form view Creates
function showContUs() {
    closeSideNav()
    printScren.innerHTML = `
    <form>
    <div class="row">
    <div class="text-center mt-5">
        <img src="pic/logo1.png" alt="" style="width: 10%;">
        
       </div>
     <div class="contact mt-4 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
    </div></div></form>
    `
    const inputs = document.querySelectorAll('input');

    submitBtn = document.getElementById("submitBtn")

    document.forms[0].addEventListener('input',function(){
        if ( nameValid(inputs[0]) 
            && emailValid(inputs[1]) 
            && phoneValid(inputs[2]) 
            && ageValid(inputs[3]) 
            && passwordValid(inputs[4]) 
            && repasswordValid(inputs[4] , inputs[5])
            )  {
                submitBtn.removeAttribute("disabled")
            } else {
                submitBtn.setAttribute("disabled", true)
            }
    })




    
}

// display Creates
function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="page-content col-md-3">
        <div class="fa-solid fa-house-laptop fa-4x card"  >
          <div class="content" >
            <h2 class="title">${arr[i].strIngredient}</h2>

            
            <button onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="btn btn-info mt-3 ">View Trips</button>
          </div>
        </div>

    </div>


     

        `
        console.log(arr[i].strIngredient);
    }

    printScren.innerHTML = cartoona
}

// show Search
function showSearchInputs() {
    sarchebar.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent " type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    printScren.innerHTML = ""
}



// =======================Validaion==============

function nameValid(input) {

    const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(regexStyle.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}

function emailValid(input) {
    
    const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    if(regexStyle.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}

function phoneValid(input) {
    const regexStyle =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if(regexStyle.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}

function ageValid(input) {

    const regexStyle =/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if(regexStyle.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}

function passwordValid(input) {
    
    const regexStyle =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(regexStyle.test(input.value)){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}

function repasswordValid(i , input) {

    if(input.value == i.value){
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');

        return true
    }
    else{
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');

        return false
    }
}
