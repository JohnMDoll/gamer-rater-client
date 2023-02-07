import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from "../../managers/EventManager.js"

export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        gameId: 1,
        description: ""
    })
    let gameCopy = { ...currentEvent }

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const gameMapper = () => {
        return (
            <select className="games" onChange={eventDataUpdater} name="gameId" >
                {games.map(game => <option name="gameId" key={`game--${game.id}`} value={game.id}>{game.name}</option>)}
            </select>)
    }

    const eventDataUpdater = (evt) => {
        gameCopy[evt.target.name] = evt.target.value
        setCurrentEvent(gameCopy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__name">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event Date</label>
                    <input type='date' name="date" required autoFocus className="event__date"
                        value={currentEvent.date}
                        onChange={eventDataUpdater}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game</label>
                    {gameMapper()}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={eventDataUpdater}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        game: currentEvent.gameId,
                        date: currentEvent.date
                    }
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}