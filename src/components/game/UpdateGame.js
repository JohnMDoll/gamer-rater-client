import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGame, getGameTypes, updateGame } from "../../managers/GameManager.js"
import "./game.css"

export const UpdateGame = (props) => {
    const navigate = useNavigate()
    const gameId = useParams()
    const [game, setGame] = useState()
    const [types, setTypes] = useState([])
    let gameCopy = { ...game }

    useEffect(() => {
        getGame(gameId.id).then(data => setGame(data))
        getGameTypes().then(data => setTypes(data))
    }, [])

    const gameTypeMapper = () => {
        return (
            <select className="game__types" onChange={gameDataUpdater} id="game_type" value={game?.game_type.id} >
                {types.map(type => <option key={`gametype--${type.id}`} value={type.id}>{type.label}</option>)}
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
                        id="name"
                        onChange={gameDataUpdater}
                        defaultValue={game?.name} />
                    <label htmlFor="input">Number of Players</label>
                    <input
                        type='number'
                        className="game__players"
                        id="number_of_players"
                        onChange={gameDataUpdater} 
                        defaultValue={game?.number_of_players} />
                    <label htmlFor="input">Game Maker</label>
                    <input
                        className="game__maker"
                        id="maker"
                        onChange={gameDataUpdater}
                        defaultValue={game?.maker} />
                    <label htmlFor="input">Game Category</label>
                    {gameTypeMapper()}
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