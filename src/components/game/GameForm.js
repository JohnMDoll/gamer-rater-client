import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        name: "",
        maker: "",
        gameTypeId: 1
    })
    let gameCopy = { ...currentGame }

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    const gameTypeMapper = () => {
        return (
            <select className="game__types" onChange={gameDataUpdater} name="gameTypeId" >
                {gameTypes.map(type => <option key={`gametype--${type.id}`} value={type.id}>{type.label}</option>)}
            </select>)
    }

    const gameDataUpdater = (evt) => {
        gameCopy[evt.target.name] = evt.target.value
        setCurrentGame(gameCopy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__name">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentGame.name}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Game Company Name: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Difficulty Level 1-10: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="select">Game Category</label>
                    {gameTypeMapper()}
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        name: currentGame.name,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}