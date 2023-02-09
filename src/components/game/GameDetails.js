import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { checkGameEdit } from "../../managers/AuthManager.js"
import { getGame, getGameCategories, updateGame } from "../../managers/GameManager.js"
import "./game.css"

export const GameDetails = (props) => {
    const navigate = useNavigate()
    const gameId = useParams()
    const [game, setGame] = useState()

    useEffect(() => {
        getGame(gameId.id).then(data => setGame(data))
    }, [])

    const gameCategoryMapper = () => {
        return (
            <ul className="game__categories" name="gameCategoryId" >
                {game?.categories.map(category => <li key={`gamecategory--${category.id}`} >{category.label}</li>)}
            </ul>)
    }
    const gameReviewMapper = () => {
        return (
            <ul className="game__reviews" name="gameReviewId" >
                {game?.game_reviews.map(review => <li key={`gamereview--${review.id}`} >
                    <div>{review.review}</div>
                    <div>{review.player.full_name || review.player}, {review.date_reviewed}</div>
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
                    {/* {<button className="btn btn-2 btn-sep icon-create"
                        onClick={() => {
                            navigate({ pathname: `/games/${game.id}/edit` })
                        }}
                    >Edit Game</button>} */}
                    {   !game?.can_edit ? "" : 
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
                    {/* <button onClick={()=>navigate("/newgame")}>Update</button> */}
                    <div className="game__reviews" id="reviews" >
                        {`Reviews:`}
                        {gameReviewMapper()}
                    </div>

                </section>
            }
        </>
    )
}