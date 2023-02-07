import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager.js"
import "./event.css"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section onClick={() => navigate(`/editevent/${event.id}`)} key={`event--${event?.id}`} className="event">
                        <div className="event__title">{event?.game?.name} with {event?.organizer?.user?.first_name}</div>
                        <div className="event__date">On {event?.date} </div>
                        <div className="event__description">{event?.description} </div>
                        <div className="event__type">Type of Game: {event?.game?.game_type.label}</div>
                        <button id="delete"
                            onClick={evt => {
                                evt.stopPropagation()
                                deleteEvent(event.id)
                                    .then(data => setEvents(data))
                            }}
                            className="btn btn-primary">Delete</button>

                        {
                            event.joined ?
                                <button className="btn btn-primary" id="leave" onClick={evt => {
                                    evt.stopPropagation()
                                    evt.preventDefault()
                                    leaveEvent(event.id)
                                        .then(data => setEvents(data))
                                }}>Leave</button>
                                :
                                <button className="btn btn-primary" id="join" onClick={evt => {
                                    evt.stopPropagation()
                                    evt.preventDefault()
                                    joinEvent(event.id)
                                        .then(data => setEvents(data))
                                }}>Join</button>
                        }
                    </section>
                })
            }
        </article >
    )
}