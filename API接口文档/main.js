//获得节点
const search = document.getElementById('search')
const submit = document.getElementById('submit')
const random = document.getElementById('random')
const mealsEl = document.getElementById('meals')
const resultHeading = document.getElementById('result-heading')
const single_mealEl = document.getElementById('single-meal')

//创建searchMeal函数并通过fetch API获得食谱数据
function searchMeal (e) {
    e.preventDefault()
    //清空single meal的内容
    single_mealEl.innerHTML = ''
    //获得search输入框的值
    const term = search.value
    //检查是否为空
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data => {
            // console.log(data);
            resultHeading.innerHTML = `<h2>${term}的查询结果为</h2>`
            if (data.meals === null) {
                resultHeading.innerHTML = `<p>没有查询到相关食谱请重新输入</p>`
            } else {
                mealsEl.innerHTML = data.meals.map(meal => `
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealId = "${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
                `).join('')
            }
            //清空搜索框
            search.value = ""
        })
    } else {
        alert('请输入搜索的内容')
    }
}

//getMealById
function getMealById (mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res => res.json()).then(
        data => {
            const meal = data.meals[0]
            addMealToDOM(meal)
        }
    )
}

//getRandomMeal
function getRandomMeal () {
    mealsEl.innerHTML = ''
    resultHeading.innerHTML = ''
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
        const meal = data.meals[0]
        addMealToDOM(meal)
    })
}

//addMealToDOM
function addMealToDOM (meal) {
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            )
        } else {
            break
        }
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
        </div>
    </div>
    `
}


//设置事件监听
submit.addEventListener('submit', searchMeal)

random.addEventListener('click', getRandomMeal)

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false
        }
    })
    // console.log(mealInfo);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid')
        getMealById(mealID);
    }
})