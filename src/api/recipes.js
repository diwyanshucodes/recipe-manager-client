
const BASE_URL = import.meta.env.VITE_API_URL
function getAuthHeaders(token) {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export async function getRecipes(token) {

    const res = await fetch(`${BASE_URL}/api/recipes`, {
        headers: getAuthHeaders(token)
    })

    return res;
}
export async function getRecipe(token, id) {

    const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        headers: getAuthHeaders(token)
    })

    return res;
}
export async function createRecipe(token, recipeData) {

    const res = await fetch(`${BASE_URL}/api/recipes`, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(recipeData)
    });

    return res;
}
export async function updateRecipe(token, id, recipeData) {

    const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(token),
        body: JSON.stringify(recipeData)
    });

    return res;
}
export async function deleteRecipe(token, id) {

    const res = await fetch(`${BASE_URL}/api/recipes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token)
    });

    return res;
}