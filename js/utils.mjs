let nav_bar = document.getElementById('nav');
let body = document.getElementById('body');
let blur_layer = document.getElementById('blur_layer');



// UI Utilities
export function closeNavBar(){
  nav_bar.classList.add('closed');
  hideElement(blur_layer)
  body.classList.remove("disable_scroll")
}
export function openNavBar(){
  nav_bar.classList.remove('closed');
  showElement(blur_layer)
  body.classList.add("disable_scroll")
}
export function hideElement(element){
  element.classList.add('d-none');
}
export function showElement(element){
  element.classList.remove('d-none');
}

/* 
              1. categories   |                       | 
  (Getting)   2. area         |  (Displaying Meals)   | => (Rendering Meal Detail)
              3. ingredients  |                       | 

*/

// Displaying Items Utilities
export function displayCategories(categories){
  const container = document.getElementById('container');
  container.innerHTML = `
  <div class="categories_container" id="categories_container"> 
    <div class="loading-spinner center_absolute"></div>
  </div>`;

  const categoryContainer = document.getElementById('categories_container');
  let content = ``;
  for (let item of categories){
    content += `
    <!-- category item -->
        <div class="category__item">
          <div class="image_container">
            <img src="${item.strCategoryThumb}" alt="">
          </div>
          <div class="category__text">
            <h3>${item.strCategory}</h3>
            <p>${item.strCategoryDescription}</p>
            <button data-category="${item.strCategory}" class="details_button">view items</button>
          </div>
        </div> 
    `
  }
  categoryContainer.innerHTML = content;
  let buttons = document.getElementsByClassName('details_button');
  for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
      let category = buttons[i].dataset.category;
      // getMeals => display meals
      getMealsInCategory(category).then(meals => displayMeals(meals))
    })
  }
}

export function displayAreas(areas){
  const container = document.getElementById('container');
  container.innerHTML = `
  <div class="areas_container" id="areas_container"> 
        <h2>Do you want meals from a specific area ??</h2>
        <ul class="areas_list" id="areas_list">
          <div class="loading-spinner center_absolute"></div>
        </ul>
  </div>`;

  const areas_list = document.getElementById('areas_list');
  let content = ``;
  for (let area of areas){
    content += `
        <li data-area ="${area.strArea}" class="area_button">${area.strArea}</li>
    `
  }
  areas_list.innerHTML = content;
  let buttons = document.getElementsByClassName('area_button');
  for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
      let area = buttons[i].dataset.area;
      // getMeals => display meals
      getMealsInArea(area).then(meals => displayMeals(meals))
    })
  }
}

export function displayIngredients(ingredients){
  const container = document.getElementById('container');
  container.innerHTML = `
  <h2>Do you want your meal to have specific ingredient ??</h2>
      <div class="ingredients_container">
        <ul class="occordion" id="ingredient_list">
          <div class="loading-spinner center_absolute"></div>
        </ul>
      </div>
    `;
  let ingredient_list = document.getElementById("ingredient_list");
  let content = ``
  ingredients.forEach(ingredient => {
    content += `
      <!-- item -->
          <li class="occordion__item">
            <input type="checkbox" name="singer_list" id="${ingredient.idIngredient}">
            <label for="${ingredient.idIngredient}">${ingredient.strIngredient}</label>
            <div class="occordion__content">
            ${ingredient.strDescription}
            <br>
            <button class="meals_link" data-ingredient="${ingredient.strIngredient}">view meals with this ingredient</button>  
            </div>
          </li>
    `
  });
  ingredient_list.innerHTML = content;
  let buttons = document.getElementsByClassName('meals_link');
  for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
      let ingredient = buttons[i].dataset.ingredient;
      getMealsInIngredient(ingredient).then(meals => displayMeals(meals))
    })
  }
}

export function displayMeals(meals){
  const container = document.getElementById('container');
  container.innerHTML = `
  <div class="gallery" id="gallery">
  
  </div>
    `;
  let gallery = document.getElementById('gallery');
  let content = ``
  meals.forEach(meal => {
    content += `
      <!-- GALLERY ITEM -->
        <div class="gallery__item">
          <div class="image_container">
            <img src="${meal.strMealThumb}" alt="">
          </div>
          <div class="overlay">
          <h5>${meal.strMeal}</h5>
          <button data-id=${meal.idMeal} class="overlay_button">view more</button>
          </div>
        </div>
    `
  });
  gallery.innerHTML = content;
  let buttons = document.getElementsByClassName('overlay_button');
  for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener('click', ()=>{
      let id = buttons[i].dataset.id;
      // Render Details
      window.scrollTo(0, 0);
      renderDetails(id)
    })
  }
}


// Fetching data utilities
export async function getCategories(url){
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error(error.message);
  }
};

export async function getAreas(url){
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data.meals;
  } catch(err){
    console.log(err);
  }
}

export async function getIngredients(url){
  try{
    let response = await fetch(url);
    let data = await response.json();
    data = data.meals;
    let filtered_data = data.filter(item =>{
      return item.strDescription != null ;
    })
    return filtered_data;
  } catch(err){
    console.log(err);
  }
}
async function getMealsInCategory(category){
  let url = `https:www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.meals;
}

async function getMealsInArea(area){
  let url = `https:www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.meals;
}

async function getMealsInIngredient(ingredient){
  let url = `https:www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.meals;
}
export async function getMealsByFirstLetter(letter){
  let url = `https:www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.meals;
}

export async function getMealsByName(name){
  let url = `https:www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  let response = await fetch(url);
  let data = await response.json();
  return data.meals;
}


// the function does both : getting details and displaying the details modal so it is called (render)
export async function renderDetails(id){
  // 1.show blur layer
  showElement(blur_layer);
  body.classList.add("disable_scroll");

  // 1.loading the animation 
  const details_modal = document.getElementById("details_modal");
  details_modal.innerHTML = `
    <div id="close_details_modal" class="close_details_modal">
      <svg class="medium__icon white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Menu / Close_SM">
        <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
    <div class="loading-spinner center_absolute"></div>
  `
  showElement(details_modal)

  // 2. getting the details using id
    let response = await fetch(`https:www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await response.json();
    let details = data.meals[0];

  if(details){
    // 3. displaying the data 
  let content =  ``;
  details_modal.innerHTML = 
  `
    <div id="close_details_modal" class="close_details_modal">
      <svg class="medium__icon white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g id="Menu / Close_SM">
        <path id="Vector" d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    </div>
    <h2>${details.strMeal}</h2>
    <div class="image_container"> 
      <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="">
    </div>
    <div class="description">
      <p>${details.strInstructions}</p>
      <ul>
        <li><span class="modal_badge">Area:</span>${details.strArea}</li>
        <li><span class="modal_badge">Category: </span>${details.strCategory}</li>
        <li><span class="modal_badge">Ingredients:</span>
          <ul>
            <li>${details.strIngredient1}</li>
            <li>${details.strIngredient2}</li>
            <li>${details.strIngredient3}</li>
            <li>${details.strIngredient4}</li>
          </ul>
        </li>
        <li><span class="modal_badge">Measures:</span>
          <ul>
            <li>${details.strMeasure1}</li>
            <li>${details.strMeasure2}</li>
            <li>${details.strMeasure3}</li>
          </ul>
        </li>
      </ul>
    </div>
  `
  }
  
  let close_details_modal = document.getElementById('close_details_modal');
  close_details_modal.addEventListener('click', ()=>{
    hideElement(blur_layer);
    hideElement(details_modal);
    body.classList.remove("disable_scroll");
  })
}




