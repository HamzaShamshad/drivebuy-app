export  const  CURRENT_USER= "CURRENT_USER"

export const userDetail=(obj) =>{
    return {
        type: CURRENT_USER,
        user_obj: obj
    }
}
