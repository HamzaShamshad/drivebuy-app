export  const  CURRENT_LOC= "CURRENT_LOC"

export const saveLocation=(obj) =>{
    return {
        type: CURRENT_LOC,
        curr_loc: obj
    }
}
