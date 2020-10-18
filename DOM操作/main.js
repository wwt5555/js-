//获取节点
const main = document.getElementById('main')
const addUsrBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWeathBtn = document.getElementById('calculate-wealth')

let data = []
getRandomUser()
getRandomUser()
getRandomUser()
//fetch random user and add money
async function getRandomUser () {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()
    const user = data.results[0]
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser)
}

//添加随机生成对象到data数组
function addData (obj) {
    data.push(obj)
    updateDOM()
}

//updateDOM
function updateDOM (provideData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'
    provideData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

//转换为货币格式
function formatMoney (number) {
    return '$' + number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

//double money
function doubleMoney () {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM()
}

//sortByRichest
function sortByRichest () {
    data.sort((a, b) => b.money - a.money)
    updateDOM()
}

//showMillionaires
function showMillionaires () {
    data = data.filter(user => user.money > 1000000)
    updateDOM()
}

//calculateWealth
function calculateWealth () {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)
    const wealthElement = document.createElement('div')
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)
}

//事件监听
addUsrBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWeathBtn.addEventListener('click', calculateWealth)
