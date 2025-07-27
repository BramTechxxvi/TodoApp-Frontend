const API_BASE = "http://localhost:8080";

 const getAuthToken = ()=> {
    return localStorage.getItem("token");
 };

 async function apiRequest(endpoint, method= "GET", data= null, isAuth=true) { 
    const headers = { "Content-type": "application/json" };
    if (isAuth && getAuthToken()) headers["Authorization"] = `Bearer ${getAuthToken()}`;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    })

    if(!response.ok) {
        const error = await response.text();
        throw new Error(error || "API error");
    }
    return response.json();;
 }