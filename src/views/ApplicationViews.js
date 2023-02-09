import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { UpdateGame } from "../components/game/UpdateGame"
import { GameForm } from "../components/game/GameForm"
import { GameDetails } from "../components/game/GameDetails"
import { ReviewForm } from "../components/game/ReviewForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/games/:id" element={<GameDetails />} />
                <Route exact path="/games/:gameId/review" element={<ReviewForm />} />
                <Route exact path="/games/:gameId/edit" element={<UpdateGame />} />
            </Route>
        </Routes>
    </>
}
