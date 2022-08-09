import { REACT_APP_ROUTE } from "@env"

export async function fetcher (route, method, data, callback){
    if (data.length === 0){
        if (callback) return callback()
        else return {data:[]}
    }else{
        const url=`${REACT_APP_ROUTE}${route}`
        console.log(url)
        const body = JSON.stringify(data)
        const result = await fetch(url,
        { 
            method,
            mode: 'cors',
            body,
            headers:{
                'Content-Type' : 'application/json'
            }
        }).catch(err => {
            alert('probleme')
            console.log(err)
            return {err}
        })
        if ("ok" in result){
            const ladata = await result.json()
            if (callback) callback({data: JSON.stringify(ladata)})
            else return {data:ladata}
        }else return {err:result.err}
    }
}