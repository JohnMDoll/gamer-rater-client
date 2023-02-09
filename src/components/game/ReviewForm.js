import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createReview, getGame } from '../../managers/GameManager.js'


export const ReviewForm = () => {
    const gameId = useParams().gameId
    const navigate = useNavigate()
    const [game, setGame] = useState([])
    const [categories, setCategories] = useState([])
    const [review, setReview] = useState("")

    useEffect(() => {
        getGame(gameId).then(data => setGame(data))
    }, [])

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title"><i>{game.title}</i> review:</h2>
            <fieldset>
                <div className="form-group">
                    <textarea type="textarea" name="title" required autoFocus className="form-control"
                        value={review} placeholder="Write your review here"
                        onChange={e => setReview(e.target.value)}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const new_review = {
                        review: review,
                        gameId: gameId
                    }

                    // Send POST request to your API
                    createReview(new_review)
                        .then(() => navigate(`/games/${gameId}`))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}