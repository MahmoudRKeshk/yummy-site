import { openNavBar , closeNavBar, showElement,hideElement, displayCategories, getCategories, displayAreas ,getAreas, getIngredients, displayIngredients, getMealsByFirstLetter, displayMeals, getMealsByName  } from "./utils.mjs";

let nav_close = document.getElementById('nav_close');
let nav_icon = document.getElementById('nav_icon');
let category_menu_item = document.getElementById('category_menu_item');
let areas_menu_item = document.getElementById('areas_menu_item');
let ingredients_menu_item = document.getElementById('ingredients_menu_item');
let contact_menu_item = document.getElementById('contact_menu_item');
let contact_modal = document.getElementById('contact_modal');
let close_contact_modal = document.getElementById('close_contact_modal');
let search_by_letter = document.getElementById("search_by_letter");
let search_by_name = document.getElementById("search_by_name");


// Navbar Functionality
nav_close.addEventListener('click',()=>{
  closeNavBar();
  setTimeout(()=>{
    showElement(nav_icon)
  },250)
})
nav_icon.addEventListener('click',()=>{
  openNavBar();
  setTimeout(()=>{
    hideElement(nav_icon);
  },250)
});

// search functionality
search_by_letter.addEventListener('change', ()=>{
  let value = search_by_letter.value;
  
  if(!value == ''){
    getMealsByFirstLetter(value).then(meals =>{
      displayMeals(meals)
    })
  }
}
)
search_by_name.addEventListener('change', ()=>{
  let value = search_by_name.value;
  if(!value == ''){
    getMealsByName(value).then(meals =>{
      displayMeals(meals)
    })
  }
}
)



// menu item functionality
/* 
  1. fetching categories and display it
  2. fetching areas and display it
  3. fetching ingredients and display it
  4. rendering the contact form
*/

// 1. categories
const categories_url = "https:www.themealdb.com/api/json/v1/1/categories.php"
category_menu_item.addEventListener('click', ()=>{
  if(!contact_modal.classList.contains('d-none')){
      hideElement(contact_modal);
  }
  getCategories(categories_url)
              .then(categories => displayCategories(categories));
  // after fetching the data close the side menu 
  closeNavBar();
  setTimeout(()=>{
    showElement(nav_icon)
  },250)
});

// 2. areas
const areas_url = "https:www.themealdb.com/api/json/v1/1/list.php?a=list"
areas_menu_item.addEventListener('click', ()=>{
  if(!contact_modal.classList.contains('d-none')){
    hideElement(contact_modal);
}
  getAreas(areas_url)
              .then(areas => displayAreas(areas));
  // after fetching the data close the side menu 
  closeNavBar();
  setTimeout(()=>{
    showElement(nav_icon)
  },250)
});

// 3. ingredients
const ingredients_url = "https:www.themealdb.com/api/json/v1/1/list.php?i=list"
ingredients_menu_item.addEventListener('click', ()=>{
  if(!contact_modal.classList.contains('d-none')){
    hideElement(contact_modal);
}
  getIngredients(ingredients_url).then(ingredients =>{
    displayIngredients(ingredients);
  })
  closeNavBar();
  setTimeout(()=>{
    showElement(nav_icon)
  },250)
})

// 4.modals
contact_menu_item.addEventListener('click', ()=>{
  const container = document.getElementById('container');
  container.innerHTML = `<h1 class="welcome_header">Welcome to Yummy!</h1>`
  showElement(contact_modal)
  closeNavBar();
  setTimeout(()=>{
    showElement(nav_icon)
  },250)
})
close_contact_modal.addEventListener('click', ()=>{
  hideElement(contact_modal);
});