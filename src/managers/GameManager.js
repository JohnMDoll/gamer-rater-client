export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getReviews = () => {
    return fetch("http://localhost:8000/reviews", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getReview = (id) => {
    return fetch(`http://localhost:8000/reviews/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch(`http://localhost:8000/games`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(game)
    })
        .then(response => response.json())
}

export const createCategory = (gameId, categoryId) => {
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(
            {
                gameId: gameId,
                categoryId: categoryId
            }
        )
    })
}

export const createReview = (review) => {
    return fetch(`http://localhost:8000/reviews`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(review)
    })
        .then(response => response.json())
}

export const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(game)
    })
}

export const updateCategory = (gameId, categories) => {
    return fetch(`http://localhost:8000/categories/%`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(
            {
                gameId: gameId,
                categories: categories
            }
        )
    })
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
        },
        method: "DELETE",
    })
        .then(getGames)
}
// modify to return user's rating to display by default on game detail page
// export const getRating = (id) => {
//     return fetch(`http://localhost:8000/ratings/${id}`, {
//         headers: {
//             "Authorization": `Token ${localStorage.getItem("gr_token")}`
//         }
//     })
//         .then(response => response.json())
// }

export const createRating = (rating, gameId) => {
    return fetch(`http://localhost:8000/ratings`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            rating: rating,
            gameId: gameId
        })
    })
        .then(response => response.json())
}