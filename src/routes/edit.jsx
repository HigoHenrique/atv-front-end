import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateGame } from "../games";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateGame(params.gameId, updates);
  return redirect(`/games/${params.gameId}`);
}

export default function EditGame() {
  const game = useLoaderData();

  return (
    <Form method="post" id="game-form">
      <p>
        <span>Nome</span>
        <input
          placeholder="Nome do jogo"
          aria-label="Nome do jogo"
          type="text"
          name="name"
          defaultValue={game.name}
        />
      </p>
      <label>
        <span>Gênero</span>
        <input
          type="text"
          name="tag"
          placeholder="digite o gênero do jogo"
          defaultValue={game.tag}
        />
      </label>
      <label>
        <span>Capa</span>
        <input
          placeholder="https://site.com/capa.jpg"
          aria-label="Capa URL"
          type="text"
          name="img"
          defaultValue={game.img}
        />
      </label>
      <label>
        <span>Descrição</span>
        <textarea
          name="description"
          defaultValue={game.description}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Salvar</button>
      </p>
    </Form>
  );
}