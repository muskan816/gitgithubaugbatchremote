import { createContext } from "react";

const userContext = createContext({
    loggedInUser: "dummy user",
})

export default userContext;