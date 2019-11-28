export  const  REGESTERED_USER= "REGESTERED_USER"
export const IS_LOADING = "IS_LOADING"
export const registeredUser=(obj) =>{
    return {
        type: REGESTERED_USER,
        user_obj: obj
    }
}
export const isLoading = (payload) => {
    return{
        type:  IS_LOADING,
        payload          
    }
}
