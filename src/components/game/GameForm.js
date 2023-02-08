import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameCategories, createCategory } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameCategories, setGameCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [currentGame, setCurrentGame] = useState({
        min_age: 1,
        min_number_of_players: 0,
        max_number_of_players: 0,
        title: "",
        designer: "",
        description: "",
        est_play_time: 0
    })
    let gameCopy = { ...currentGame }

    useEffect(() => {
        getGameCategories().then(data => setGameCategories(data))
    }, [])

    const catCheck = (e) => {
        let catCopy = new Set(categories)
        e.target.checked? 
        catCopy.add(e.target.value)
        : catCopy.delete(e.target.value)
        setCategories(Array.from(catCopy))
    }

    const gameCategoryMapper = () => {
        return (<div className="game__categories" >
                    {gameCategories.map((category) => { return <>
                        <input onChange={catCheck} name={category.label} type="checkbox" key={`gamecategory--${category.id}`} value={category.id} />
                        <label htmlFor={category.label}>
                            {category.label}
                        </label>
                    </>})}
                </div>
        )
    }

    const gameDataUpdater = (evt) => {
        gameCopy[evt.target.name] = evt.target.value
        setCurrentGame(gameCopy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Game Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Game Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Release Year: </label>
                    <input type="number" name="year_released" required autoFocus className="form-control" min={0} max={3000}
                        value={currentGame.year_released}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="min_number_of_players">Minimum Number of Players: </label>
                    <input type="number" name="min_number_of_players" required autoFocus className="form-control"
                        value={currentGame.min_number_of_players}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="max_number_of_players">Maximum Number of Players: </label>
                    <input type="number" name="max_number_of_players" required autoFocus className="form-control"
                        value={currentGame.max_number_of_players}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="est_play_time">Game Length (minutes): </label>
                    <input type="number" name="est_play_time" required autoFocus className="form-control"
                        value={currentGame.est_play_time}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="min_age">Recommended Age: </label>
                    <input type="number" name="min_age" required autoFocus className="form-control"
                        value={currentGame.min_age}
                        onChange={gameDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="select">Game Categories:</label>
                    {gameCategoryMapper()}
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        min_age: parseInt(currentGame.min_age),
                        min_number_of_players: parseInt(currentGame.min_number_of_players),
                        max_number_of_players: parseInt(currentGame.max_number_of_players),
                        description: currentGame.description,
                        est_play_time: parseInt(currentGame.est_play_time),
                        year_released: currentGame.year_released,
                        designer: currentGame.designer,
                        title: currentGame.title
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then((res) => {categories.map((cat) => { createCategory(res.id, cat) })}) //will use returned game_id to match with category ids in table
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}