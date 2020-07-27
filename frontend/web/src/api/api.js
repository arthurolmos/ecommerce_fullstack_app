

export const searchCep = async (zip, abortController) => {

    const trim = zip.replace(/-/g, '')

    const resp = await fetch(`https://viacep.com.br/ws/${trim}/json/unicode/`, )
                    .then(data => {
                        return data.json()

                    })
                    .catch(error => {
                        return ({ result: false, error: error })
                    })

    return resp
}



export const generalFetch = async (url) => {

    const resp = await fetch(url)
                    .then(data => {
                        return data.json()

                    })
                    .catch(error => {
                        return ({ result: false, error: error })
                    })

    return resp
}