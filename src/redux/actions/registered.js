export  const  REGESTERED_USER= "REGESTERED_USER"

export const registeredUser=(obj) =>{
    return {
        type: REGESTERED_USER,
        user_obj: obj
    }
}
