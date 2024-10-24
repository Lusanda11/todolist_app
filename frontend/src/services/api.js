// ****************** api.js *********************


const token = localStorage.getItem("token"); // Ensure token is stored in localStorage

fetch("/api/todos", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,  // Send the token as "Bearer <token>"
    "Content-Type": "application/json"
  }
})
  .then(response => {
    if (!response.ok) {
      return response.json().then((data) => {
        throw new Error(data.message || "Unauthorized access");
      });
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Error:", error));

  // After successful login:
localStorage.setItem("token", responseData.token);
