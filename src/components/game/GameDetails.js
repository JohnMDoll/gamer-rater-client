import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { checkGameEdit } from "../../managers/AuthManager.js"
import { createRating, getGame, getGameCategories, updateGame } from "../../managers/GameManager.js"
import "./game.css"

export const GameDetails = (props) => {
    const navigate = useNavigate()
    const gameId = useParams()
    const [game, setGame] = useState({categories: []})
    const [newRating, setNewRating] = useState(5)

    useEffect(() => {
        getGame(gameId.id).then(data => setGame(data))
    }, [])

    useEffect(() => {
        getGame(gameId.id).then(data => setGame(data))
    }, [game.average_rating])

    const gameCategoryMapper = () => {
        return (
            <ul className="game__categories" name="gameCategoryId" >
                {game?.categories.map(category => <li key={`gamecategory--${category.id}`} >{category.label}</li>)}
            </ul>)
    }
    const gameReviewMapper = () => {
        return (
            <ul className="game__reviews" name="gameReviewId" >
                {game?.game_reviews?.map(review => <li key={`gamereview--${review.id}`} >
                    <div>{review.review}</div>
                    <div>{review.player.full_name || review.player}, {new Date(review.date_reviewed).toLocaleString('en-US', { timeZone: 'CST' })}</div>
                </li>)}
            </ul>)
    }

    return (
        <>
            {
                <section className="game--form">
                    <button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            navigate({ pathname: `/games/${game.id}/review` })
                        }}
                    >Review</button>
                    <h2>Game Details</h2>
                    {!game?.can_edit ? "" :
                        <button className="game-editor" onClick={() => navigate(`./edit`)}>Edit This Game</button>}
                    <div className="game__title" id="name" >
                        {`${game?.title}`}
                    </div>
                    <div className="game__title" id="name" >
                        <i>{`"${game?.description}"`}</i>
                    </div>
                    <div className="game__players" id="number_of_players">
                        {`${game?.min_number_of_players}-${game?.max_number_of_players} players`}
                    </div>
                    <div className="game__maker" id="maker" >
                        {`Designed by ${game?.designer}`}
                    </div>
                    <div className="game__year" id="year_released" >
                        {`Released ${game?.year_released}`}
                    </div>
                    <div className="game__time" id="est_play_time" >
                        {`Game Length (minutes): ${game?.est_play_time}`}
                    </div>
                    <div className="game__age" id="min_age" >
                        {`Recommended Age: ${game?.min_age}`}
                    </div>
                    <div className="game__categories" id="categories" >
                        {`Categories:`}
                        {gameCategoryMapper()}
                    </div>
                    <div className="game__categories" id="categories" >
                        {`Rating: ${game?.average_rating}/10`}
                    </div>
                    <div className="game__categories" id="categories" >
                        {`Your Rating: 1`}
                        <input type="range" min="1" max="10" onChange={(e) => setNewRating(e.target.value)}
                            defaultValue="5" className="slider" id="myRange" />
                        {`10  `}
                        <button onClick={() => {
                            createRating(newRating, gameId.id )
                                .then(getGame(gameId.id))
                        }}>
                            Submit Rating
                        </button>
                    </div>
                    <div className="game__reviews" id="reviews" >
                        {`Reviews:`}
                        {gameReviewMapper()}
                    </div>
                </section>
            }
        </>
    )
}