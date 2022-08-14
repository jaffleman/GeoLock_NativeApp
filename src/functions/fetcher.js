import { REACT_APP_ROUTE } from "@env"

export default async function fetcher ({route, method, data, callback}){
    const url=`${REACT_APP_ROUTE}${route}`
    const body = JSON.stringify(data)
    const result = await fetch(url,
    { 
        method,
        mode: 'cors',
        body,
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    .then(result=>result.json())
    .then(json=>{
            callback(json)
    })  
    .catch(err => {
        alert('probleme')
        console.log(err)
        return {err}
    })
}

