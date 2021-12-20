import { html } from "../../node_modules/lit-html/lit-html.js";
import { findMemesByOwner } from "../api/data.js";

const profileTemplate = (ownedMemes, username, email, memesCount, gender) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/${gender}.png">
        <div class="user-content">
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>My memes count: ${memesCount}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${ownedMemes.length == 0
             ? html`<p class="no-memes">No memes in database.</p>`
             : ownedMemes.map(memeTemplate)}
    </div>
</section>
`;

const memeTemplate = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`;

export async function profilePage(ctx) {
    const ownedMemes = await findMemesByOwner();

    const user = {
        username: sessionStorage.getItem('username'),
        email: sessionStorage.getItem('email'),
        memesCount: ownedMemes.length,
        gender: sessionStorage.getItem('gender')
    };
    console.log(user.gender)
    ctx.render(profileTemplate(ownedMemes, user.username, user.email, user.memesCount, user.gender));
}