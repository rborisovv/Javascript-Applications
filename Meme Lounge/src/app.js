import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { logout } from './api/data.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

const main = document.querySelector('main');
const guestNav = document.querySelector('div.guest');
const userNav = document.querySelector('div.user');
document.getElementById('logoutBtn').addEventListener('click', logoutUser);

setUserNav();
page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage);
page('/create', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token === null) {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    } else {
        document.querySelector('div.profile > span').textContent = `Welcome, ${sessionStorage.getItem('email')}`;
        userNav.style.display = '';
        guestNav.style.display = 'none';
    }
}

async function logoutUser() {
    await logout();
    setUserNav();
    page.redirect('/');
}