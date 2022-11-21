import { Outlet, Link, useLoaderData, Form, redirect, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { createGame, getGames } from "../games";

export async function action() {
  const game = await createGame();
  return redirect(`/games/${game.id}/edit`);
}

export async function loader() {
  const games = await getGames();
  return { games };
}

export default function Root() {
  const { games } = useLoaderData();
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
      <h1>Lista de jogos</h1>
        <div className="buttton-create">
          <Form method="post">
            <button type="submit">Novo Jogo</button>
          </Form>
        </div>
        <nav>
          {games.length ? (
            <ul>
              {games.map((game) => (
                <li key={game.id}>
                  <NavLink
                    to={`games/${game.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    {game.name ? (
                      <>
                        {game.name}
                      </>
                    ) : (
                      <i>Sem Nome</i>
                    )}{" "}
                    {game.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>Sem jogos</i>
            </p>
          )}
        </nav>
        <h2><a href="https://github.com/HigoHenrique" target="_black">Github do criador do site</a></h2>
      </div>
      <div id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}