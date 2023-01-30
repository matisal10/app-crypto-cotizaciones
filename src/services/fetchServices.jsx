
export const getCurrentPrice = async (id) => {

    let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
    // console.log("response: ", response)
    // console.log("Status: ", response.status)
    // console.log("OK: ", response.ok)
    // console.log('respo',response)
    return response.json()
}