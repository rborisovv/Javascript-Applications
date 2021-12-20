import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMemeDetails, deleteMeme } from "../api/data.js";

const detailsTemplate = (meme, isOwner, onClick) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <div id="memeOwnerBtns" style= ${isOwner ? "display: inline;" : "display: none;"}>
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button @click=${onClick} class="button danger">Delete</button>
            </div>

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeDetails(memeId);
    const isOwner = meme._ownerId === sessionStorage.getItem('userId');

    ctx.render(detailsTemplate(meme, isOwner, onClick));

    async function onClick() {
        const confirmed = confirm('Are you sure you want to delete this meme?');
        if (confirmed) {
            await deleteMeme(memeId);
            ctx.page.redirect('/catalog');
        }
    }
}