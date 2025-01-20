import apiClient from "../apiClient"
import endpoints from "../endpoints"

const registerUser = async (user: any) => {
    const response = await apiClient.post(`${endpoints.auth}/register`, registerRequest)

    if

}