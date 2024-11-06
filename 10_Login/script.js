const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginMessage = document.getElementById('login-message');

const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerConfirm = document.getElementById('register-confirm-password');
const registerTerms = document.getElementById('register-terms');
const registerMessage = document.getElementById('register-message');

var type = "register";

var savedUsers = [];

function refresh()
{
    registerButton.classList.remove('disabled');
    loginButton.classList.remove('disabled');

    loginForm.classList.remove('d-none');
    registerForm.classList.remove('d-none');

    loginMessage.classList.remove('d-none');
    registerMessage.classList.remove('d-none');

    loginMessage.classList.add('d-none');
    registerMessage.classList.add('d-none');

    if(type === "register")
    {
        loginForm.classList.add('d-none');
        registerButton.classList.add('disabled');
    }
    else
    {
        registerForm.classList.add('d-none');
        loginButton.classList.add('disabled');
    }
}

refresh();

loginButton.addEventListener("click", () =>
{
    type = "login";
    refresh();
});
registerButton.addEventListener("click", () =>
{
    type = "register";
    refresh();
});

function clearMessage(obj)
{
    obj.classList.remove('d-none');
    obj.classList.remove('alert-success');
    obj.classList.remove('alert-danger');

    obj.classList.add('d-none');
}

loginForm.addEventListener("submit", (event) =>
{
    event.preventDefault();

    clearMessage(loginMessage);
    loginMessage.classList.remove('d-none');

    if(loginEmail.value === '' || loginPassword.value === '' || !loginEmail.value.includes("@") || !loginEmail.value.includes("."))
    {
        loginMessage.classList.add('alert-danger');
        loginMessage.textContent = "Email or password cannot be empty and must be valid!";
    }
    else
    {
        for(var i = 0; i < savedUsers.length; i++)
        {
            if(savedUsers[i].email == loginEmail.value && savedUsers[i].password == loginPassword.value)
            {
                window.location.href = "/6_Wordle/";
                return;
            }
        }

        loginMessage.classList.add('alert-danger');
        loginMessage.textContent = "Email or password is incorrect!";
    }
});
registerForm.addEventListener("submit", (event) =>
{
    event.preventDefault();
    clearMessage(registerMessage);
    registerMessage.classList.remove('d-none');

    if(registerEmail.value === '' || registerPassword.value == '' || !registerEmail.value.includes("@") || !registerEmail.value.includes("."))
    {
        registerMessage.classList.add('alert-danger');
        registerMessage.textContent = 'Email or password cannot be empty and must be valid!';
    }
    else if(registerPassword.value != registerConfirm.value)
    {
        registerMessage.classList.add('alert-danger');
        registerMessage.textContent = 'Pasword and confirm password does not match!';
    }
    else if(!registerTerms.checked)
    {
        registerMessage.classList.add('alert-danger');
        registerMessage.textContent = 'You need to accept the terms to register!';
    }
    else
    {
        for(var i = 0; i < savedUsers.length; i++)
        {
            if(savedUsers[i].email == registerEmail.value)
            {
                registerMessage.classList.add('alert-danger');
                registerMessage.textContent = 'This email is already registered!';
                return;
            }
        }

        type = "login";
        clearMessage(registerMessage);
        clearMessage(loginMessage);

        refresh();

        loginMessage.classList.remove('d-none');
        loginMessage.classList.add('alert-success');
        loginMessage.textContent = `User ${registerEmail.value} successfully registered!`;

        savedUsers.push({
            email:registerEmail.value,
            password:registerPassword.value
        });
    }
});