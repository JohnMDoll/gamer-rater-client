import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getGame, getGameTypes, updateGame } from "../../managers/GameManager.js"
import { getEvent, updateEvent } from "../../managers/EventManager.js"
import "./event.css"

export const UpdateEvent = (props) => {
    const navigate = useNavigate()
    const eventId = useParams()
    const [event, setEvent] = useState()
    const [types, setTypes] = useState([])
    let eventCopy = { ...event }

    useEffect(() => {
        getEvent(eventId.id).then(data => setEvent(data))
        getGameTypes().then(data => setTypes(data))
    }, [])

    const eventDataUpdater = (evt) => {
        eventCopy[evt.target.id] = evt.target.value
        setEvent(eventCopy)
    }

    const handleUpdateEvent = () => {
        updateEvent(event, eventId.id)
        navigate("/events")
    }

    return (
        <>
            {
                <fieldset className="event--form">
                    <h2>Update Event</h2>
                    <label htmlFor="input">Description</label>
                    <input
                        className="event__description"
                        id="description"
                        onChange={eventDataUpdater}
                        defaultValue={event?.description} />
                    <label htmlFor="input">Event Date</label>
                    <input
                        type='date'
                        className="event__date"
                        id="date"
                        onChange={eventDataUpdater} 
                        defaultValue={event?.date} />
                    <label htmlFor="input">Game</label>
                    <input
                        className="event__game"
                        id="game.name"
                        onChange={eventDataUpdater}
                        defaultValue={event?.game.name} />
                    <button onClick={handleUpdateEvent}>Update</button>
                </fieldset>
            }
        </>
    )
}