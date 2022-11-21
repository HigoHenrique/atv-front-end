import { Form, useLoaderData } from "react-router-dom";
import { getGame } from "../games";

export async function loader ({ params }) {
  return getGame(params.gameId);
}

export default function Game() {

  const game = useLoaderData();

  return (
    <div id="game">
      <div>
        <img
          key={game.img}
          src={game.img || null}
        />
      </div>

      <div>
        <h1>
          {game.name ? (
            <>
              {game.name}
            </>
          ) : (
            <i>Sem Nome</i>
          )}{" "}
        </h1>
            <h2>{game.tag}</h2>
      
        {game.description && <p>{game.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Editar</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Você deseja excluir o jogo ?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Excluir</button>
          </Form>
        </div>
      </div>
    </div>
  );
}