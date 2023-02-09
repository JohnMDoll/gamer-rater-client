export const loginUser = (user) => {
  return fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
}

export const registerUser = (user) => {
  return fetch("http://127.0.0.1:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
}

export const checkGameEdit = (creatorId) => {
  return fetch(`http://127.0.0.1:8000/checkuser/${creatorId}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("gr_token")}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  })
    .then(response => response.json())
}