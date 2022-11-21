import { redirect } from "react-router-dom";
import { deleteGame } from "../games";

export async function action({ params }) {
  await deleteGame(params.gameId);
  return redirect("/");
}