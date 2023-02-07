import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "../../managers/GameManager.js"
import "./game.css"

export const GameList = (props) => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games?.map(game => {
                    return <section onClick={() => navigate(`/editgame/${game.id}`)} key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.name} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}/10</div>
                        <button
                            onClick={evt => {
                                evt.stopPropagation()
                                deleteGame(game.id)
                                    .then(data => setGames(data))
                            }}
                            className="btn btn-primary">Delete</button>
                    </section>
                })
            }
        </article>
    )
}