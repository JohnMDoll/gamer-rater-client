import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGame, getGameCategories, updateGame } from "../../managers/GameManager.js"
import "./game.css"

export const UpdateGame = (props) => {
    const navigate = useNavigate()
    const gameId = useParams()
    const [game, setGame] = useState()
    const [categories, setCategories] = useState([])
    let gameCopy = { ...game }

    useEffect(() => {
        getGame(gameId.id).then(data => setGame(data))
        getGameCategories().then(data => setCategories(data))
    }, [])

    const gameCategoryMapper = () => {
        return (
            <select className="game__categories" onChange={gameDataUpdater} id="game_type" value={game?.game_type.id} >
                {categories.map(category => <option key={`gamecategory--${category.id}`} value={category.id}>{category.label}</option>)}
            </select>)
    }

    const gameDataUpdater = (evt) => {
        gameCopy[evt.target.id] = evt.target.value
        setGame(gameCopy)
    }

    const handleUpdateGame = () => {
        updateGame(game, gameId.id)
        navigate("/")
    }

    return (
        <>
            {
                <fieldset className="game--form">
                    <h2>Update Game</h2>
                    <label htmlFor="input">Name of Game</label>
                    <input
                        className="game__title"
                        id="title"
                        onChange={gameDataUpdater}
                        defaultValue={game?.title} />
                    <label htmlFor="input">Number of Players</label>
                    <input
                        type='number'
                        className="game__players"
                        id="number_of_players"
                        onChange={gameDataUpdater} 
                        defaultValue={game?.number_of_players} />
                    <label htmlFor="input">Game Designer</label>
                    <input
                        className="game__designer"
                        id="designer"
                        onChange={gameDataUpdater}
                        defaultValue={game?.designer} />
                    <label htmlFor="input">Game Category</label>
                    {gameCategoryMapper()}
                    <label htmlFor="input">Difficulty 1-10</label>
                    <input
                        type='number'
                        className="game__skillLevel"
                        id="skill_level"
                        onChange={gameDataUpdater}
                        defaultValue={game?.skill_level} />
                    <button onClick={handleUpdateGame}>Update</button>
                </fieldset>
            }
        </>
    )
}