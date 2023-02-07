export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch(`http://localhost:8000/games`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(game)
    })
}

export const updateGame = (game, id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(game)
    })
}

export const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
        },
        method: "DELETE",
    })
    .then(getGames)
}