const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove
    ('showRecipe');
});

//get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById
    ('search-input').value.trim();
    fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?
        i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if(data.meals){
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.
                        idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt="food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                   `;
                });
                mealList.classList.remove('notFound');
            } else{
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;
        });
    }
