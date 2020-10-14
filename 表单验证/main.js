//get element
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//showError
function showError (input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error'
    const small = formControl.querySelector("small");
    small.innerText = message
}

//showSuccess
function showSuccess (input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//check email
function checkEmail (input) {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (input.value.trim() === '') {
        showError(input, '邮箱为必填项')
    }
    else if (!reg.test(String(input.value.trim()))) {
        showError(input, '邮箱格式错误')
    }
    else {
        showSuccess(input)
    }
}

//check length
function checkLength (input, min, max) {
    if (input.length.trim() === '') {
        showError(input, `${input.placeholder.slice(3)}为必填项`)
    }
    else if (input.value.length < 3 || input.value.length > 15) {
        showError(input, `${input.placeholder.slice(3)}的长度在${min}个字符到${max}个字符之间`)
    }
    else {
        showSuccess(input)
    }
}

//check passwords match
function checkPasswordsMatch (input1, input2) {
    if (input1.value.trim() === '') {
        showError(input1, '密码为必填项')
        showError(input2, '确认密码为必填项')
    }
    else if (input1.value === input2.value) {
        showSuccess(input2)
    } else {
        showError(input2, '密码不匹配')
    }
}


//checkRequired
function checkRequired (inputArr) {
    inputArr.forEach(
        input => {
            if (input.value.trim() === '') {
                showError(input, `${input.placeholder.slice(3)}为必填项`)
            } else {
                showSuccess(input)
            }
        }
    )
}

//event listener
form.addEventListener("submit", (e) => {
    e.preventDefault()
    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 12)
    checkEmail(email)
    checkPasswordsMatch(password, password2)
})