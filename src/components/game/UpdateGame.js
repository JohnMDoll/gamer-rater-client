import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { checkGameEdit } from "../../managers/AuthManager.js"
import { createCategory, createGame, getGame, getGameCategories, updateCategory, updateGame } from "../../managers/GameManager.js"
import "./game.css"

export const UpdateGame = (props) => {
    const navigate = useNavigate()
    const [gameCategories, setGameCategories] = useState([])
    const [categories, setCategories] = useState([])
    const gameId = useParams()
    const [currentGame, setCurrentGame] = useState({
        min_age: 1,
        min_number_of_players: 0,
        max_number_of_players: 0,
        title: "",
        designer: "",
        description: "",
        est_play_time: 0,
        categories: [],
        creator: 0
    })
    let gameCopy = { ...currentGame }

    useEffect(() => {
        getGame(gameId.gameId).then(data => setCurrentGame(data))
        getGameCategories().then(data => setGameCategories(data))
    }, [])

    useEffect(() => {
        let catCopy = new Set(categories)
        currentGame.categories.map(cat => {
            catCopy.add(cat.id)
        })
        setCategories(Array.from(catCopy))
    }, [currentGame.categories])

    const catCheck = (e) => {
        let catCopy = new Set(categories)
        if (e.target.checked) {
            catCopy.add(parseInt(e.target.value))
            setCategories(Array.from(catCopy))
        } else {
            catCopy.delete(parseInt(e.target.value))
            setCategories(Array.from(catCopy))
        }
    }

    // {...currentGame.categories.find(cat => cat.id === category.id)? "checked" : console.log(category.id)}
    const gameCategoryMapper = () => {
        return (<div className="game__categories" >
            {gameCategories.map((category) => {
                return <>
                    <input onClick={catCheck} defaultChecked={currentGame.categories.find(cat => cat.id === category.id)} name={category.label} type="checkbox" key={`gamecategory--${category.id}`} value={category.id} />
                    <label key={`gamecategorylabel--${category.id}`} htmlFor={category.label}>
                        {category.label}
                    </label>
                </>
            })}
        </div>
        )
    }

    const gameDataUpdater = (evt) => {
        gameCopy[evt.target.name] = evt.target.value
        setCurrentGame(gameCopy)
    }

    return (<form className="gameForm">
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
                            defaultValue={currentGame.year_released}
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
                            id: currentGame.id,
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
                        updateGame(game)
                            .then((res) => { updateCategory(game.id, categories) }) 
                            .then(() => navigate(`/games/${game.id}`))
                    }}
                    className="btn btn-primary">Save</button>
            </form>
    )
}