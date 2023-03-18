let sideBarInnerWidth = $(".sideBarInner").innerWidth();
    $(document).ready(function () {
        $("#loading").fadeOut(1000, function () {
            $("body").css('overflow', 'auto');
        });
        $(".sideBar").animate({left:-sideBarInnerWidth}, 500);
    });

$("#sideBarIcon").click(function () { 
    let sideBarIcon = document.getElementById('sideBarIcon');
    if ($(".sideBar").css('left') == '0px') {
        sideBarIcon.classList.replace("fa-xmark", "fa-bars");
        $(".sideBar").animate({left:-sideBarInnerWidth}, 500)
    }
    else
    {
        sideBarIcon.classList.replace("fa-bars", "fa-xmark");
        $(".sideBar").animate({left: "0px"}, 500)
    }
    
});

$(".sideBarInner").click(function(e) {
    let option = e.target.innerHTML;
    let optionHttp = new XMLHttpRequest;
    sideBarIcon.classList.replace("fa-xmark", "fa-bars");
    $(".sideBar").animate({left:-sideBarInnerWidth}, 500);

    if (option == "search") {
        let container = `
        <div class="container w-75 text-center">
        <div class="row py-4">            
        <div class="col-md-6">
            <input type="search" class="form-control text-white bg-transparent" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input type="search" class="form-control text-white bg-transparent" max-length="1" placeholder="Search By First Letter">
        </div>
    </div>
        </div>`;
    document.getElementById('mealItems').innerHTML = container;
    }
    if(option == "categories")
    {
        let categoriesList = [];
        optionHttp.open('GET',`https://www.themealdb.com/api/json/v1/1/categories.php`);
        optionHttp.send();
        optionHttp.addEventListener('readystatechange', function(){
            if(optionHttp.readyState === 4)
            {
                categoriesList = JSON.parse(optionHttp.response).categories;
                console.log(categoriesList);
            }
            let container = ``;
            for (let i = 0; i< categoriesList.length; i++) {
                container += 
                `<div class="col-md-3 g-4">
                <div class="mealImg">
                <img class="w-100" src="${categoriesList[i].strCategoryThumb}" alt="">
                <div class="lyr bg-white bg-opacity-75 py-4 px-2 text-center overflow-hidden ">
                <h3>${categoriesList[i].strCategory}</h3>
                <p class="mb-3">${categoriesList[i].strCategoryDescription}</p>
                </div>
                </div>
                </div>`;
            }
            document.getElementById('mealItems').innerHTML = container;
        })
    }
    if(option == "area")
    {
        let areaList = [];
        optionHttp.open('GET',`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        optionHttp.send();
        optionHttp.addEventListener('readystatechange', function(){
            if(optionHttp.readyState === 4)
            {
                areaList = JSON.parse(optionHttp.response).meals;
                console.log(areaList);
            }
            let container = ``;
            for (let i = 0; i< areaList.length; i++) {
                container += 
                `<div class="col-md-3 g-4 text-white text-center">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${areaList[i].strArea}</h3>
                </div>`;
            }
            document.getElementById('mealItems').innerHTML = container;
        })
    }
    if(option == "ingredients")
    {
        let ingredientList = [];
        optionHttp.open('GET',`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        optionHttp.send();
        optionHttp.addEventListener('readystatechange', function(){
            if(optionHttp.readyState === 4)
            {
                ingredientList = JSON.parse(optionHttp.response).meals;
                console.log(ingredientList);
            }
            let container = ``;
            for (let i = 0; i< 20; i++) {
                container += 
                `<div class="col-md-3 g-4 text-white text-center overflow-hidden ">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredientList[i].strIngredient}</h3>
                <p class="mb-3">${ingredientList[i].strDescription}</p>
                </div>`;
            }
            document.getElementById('mealItems').innerHTML = container;
        })
    }

    if(option == "contact us")
    {
        let container = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
        <div class="row py-5 g-4">            
        <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Enter Your Name">
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" placeholder="Enter Your Email">
        </div>
        <div class="col-md-6">
            <input type="text" class="form-control" placeholder="Enter Your Phone">
        </div>
        <div class="col-md-6">
            <input type="email" class="form-control" placeholder="Enter Your Age">
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control" placeholder="Enter Your Password">
        </div>
        <div class="col-md-6">
            <input type="password" class="form-control" placeholder="Repassword">
        </div>
    </div>
        <button class="btn btn-outline-danger px-2 mt-3 rounded-1" disabled>Submit</button>
    </div>
        </div>`;
    document.getElementById('mealItems').innerHTML = container;
    }
})

let myHttp = new XMLHttpRequest;
myHttp.open('GET','https://www.themealdb.com/api/json/v1/1/search.php?s=');
myHttp.send();
let mealsList = [];

myHttp.addEventListener('readystatechange', function(){
    if(myHttp.readyState === 4)
    {
        mealsList = JSON.parse(myHttp.response).meals;
        displayMeals(mealsList)
    }
})


function displayMeals(arr)
{
    let container = ``;
    for (let i = 0; i<arr.length; i++) {
        container += 
        `<div class="col-md-3 g-4">
        <div class="mealImg">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="">
        <div class="lyr bg-white bg-opacity-75 py-4 px-2 d-flex align-items-center">
        <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>`;
    }
    document.getElementById('mealItems').innerHTML = container;
    $(".mealImg").click(function(e){
        let mealDetails = ``;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].strMeal == e.target.firstElementChild.innerHTML)
            {
                mealDetails += `
                <div class="col-md-4 g-4">
                <div class="mealDetails text-white">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="">
                    <!-- <div class="lyr bg-white bg-opacity-75 py-4 px-2 d-flex align-items-center">
                    </div> -->
                    <h3>${arr[i].strMeal}</h3>
                </div>
            </div>

            <div class="col-md-8 g-4">
                <div class="mealDetails text-white">
                    <h2>Instructions</h2>
                    <p>${arr[i].strInstructions}</p>
                    <h3>Area : <span>${arr[i].strArea}</span></h3>
                    <h3>Category : <span>${arr[i].strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="d-flex flex-wrap g-3">
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure1} ${arr[i].strIngredient1}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure2} ${arr[i].strIngredient2}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure3} ${arr[i].strIngredient3}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure4} ${arr[i].strIngredient4}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure5} ${arr[i].strIngredient5}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure6} ${arr[i].strIngredient6}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure7} ${arr[i].strIngredient7}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure8} ${arr[i].strIngredient8}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure9} ${arr[i].strIngredient9}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure10} ${arr[i].strIngredient10}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure11} ${arr[i].strIngredient11}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure12} ${arr[i].strIngredient12}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure13} ${arr[i].strIngredient13}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure14} ${arr[i].strIngredient14}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure15} ${arr[i].strIngredient15}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure16} ${arr[i].strIngredient16}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure17} ${arr[i].strIngredient17}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure18} ${arr[i].strIngredient18}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure19} ${arr[i].strIngredient19}</li>
                        <li class="alert alert-info m-2 p-1">${arr[i].strMeasure20} ${arr[i].strIngredient20}</li>
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="d-flex flex-wrap g-3">
                        <li class="alert alert-danger m-2 p-1">${arr[i].strTags}</li>
                    </ul>
                    <a class="btn btn-success"href="${arr[i].strSource}">Source</a>
                    <a class="btn btn-danger" href="${arr[i].strYoutube}">Youtube</a>
                </div>
            </div>`;
            }
            document.getElementById('mealItems').innerHTML = mealDetails;

        }
    })
}
