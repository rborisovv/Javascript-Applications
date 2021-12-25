import { render } from "../node_modules/lit-html/lit-html.js";
import page from "../node_modules/page/page.mjs";
import { homePage } from "./view/home.js";
import { loginPage } from "./view/login.js";
import { registerPage } from "./view/register.js";
import { logout } from "./api/data.js";
import { catalogPage } from "./view/catalog.js";
import { detailsPage } from "./view/details.js";
import { createPage } from "./view/create.js";
import { editPage } from "./view/edit.js";

const main = document.querySelector('main');
const guestNav = document.querySelector('nav>div#guest');
const userNav = document.querySelector('nav>div#user');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

updateNav();
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.updateNav = updateNav;
    next();
}

function updateNav() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        userNav.style.display = "inline";
        guestNav.style.display = "none";
    } else {
        userNav.style.display = "none";
        guestNav.style.display = "inline";
    }
}

async function onLogout() {
    await logout();
    updateNav();
    page.redirect('/');
}