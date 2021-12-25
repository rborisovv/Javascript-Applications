import { html } from "../../node_modules/lit-html/lit-html.js";
import { editGame, getGameById } from "../api/data.js";

const editTemplate = (game, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="" .value=${game.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="" .value=${game.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="" .value=${game.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="" .value=${game.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${game.summary}></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const game = await getGameById(id);
    ctx.render(editTemplate(game, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();


        const formData = new FormData(ev.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const maxLevel = formData.get('maxLevel');
        const imageUrl = formData.get('imageUrl');
        const summary = formData.get('summary');

        if (title == false || category == false || maxLevel == false || imageUrl == false || summary == false) {
            return window.alert('Please fill al the fields!');
        }

        await editGame(id, { title, category, maxLevel, imageUrl, summary });
        ctx.page.redirect('/');
    }
}