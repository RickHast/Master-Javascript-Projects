const userNameForm = document.querySelector('#user-name-form')
const userLastFiveRepots = document.querySelector('#user-last-five-repots')
const title = document.querySelector("#title")
const actualUserDiv = document.createElement('div')
actualUserDiv.id = 'actual-user-div'
const actualImgDiv = document.querySelector("#actual-img-div")
const userNameInput = document.querySelector('#user-name-input')
const lastProfiles = document.querySelector("#last-profiles")

const newCache = cacheFunction()

const lastFivesSearcheProfiles = []

const lastFivesButtons = function (userNameValue) {
    lastProfiles.textContent = ''
    const h2 = document.createElement("h2")
    h2.textContent = 'Last Searches Profiles: '
    lastProfiles.appendChild(h2)
    lastFivesSearcheProfiles.forEach((profile) => {
        const button = document.createElement('button')
        button.textContent = profile

        button.addEventListener('click', (e) => {
            main(button.textContent, true)
        })

        lastProfiles.appendChild(button)
    })
}

const main = function (userNameValue, isButton) {

    if (isButton){
        const githubUser = new GithubUser(userNameValue)
        const cache = newCache()

        githubUser.displayThisUserInfos(actualUserDiv, actualImgDiv, userLastFiveRepots, cache.readCache(userNameValue))
    } else {
        const githubUser = new GithubUser(userNameValue)
        const userReposInfo = githubUser.getReposInfo()
        const userInfo = githubUser.getGlobalInfo((err, globalData) => {
            if (err) {
                alert(err)
            }else {
                userReposInfo.then((reposData) => {

                if(lastFivesSearcheProfiles.length === 5) {
                    lastFivesSearcheProfiles.shift()
                }

                if(lastFivesSearcheProfiles.includes(userNameValue) && isButton === false){
                    alert("This user exist in the your last five searches profiles")
                    return
                }else {
                    lastFivesSearcheProfiles.push(userNameValue)
                    lastFivesButtons(userNameValue)
                }
                const cache = newCache()
                cache.addToCache(userNameValue, globalData, reposData)

                githubUser.displayThisUserInfos(actualUserDiv, actualImgDiv, userLastFiveRepots, cache.readCache(userNameValue))
                }).catch((error) => {
                    alert(error)
                    return
                })
            }
        })
    }
    
}
userNameForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const userNameValue = userNameInput.value.trim()
    
    if(userNameValue === ''){
        alert('Please enter a valid value for the gitub user name')
        return
    }
    main(userNameValue, false)
})

// Affichage des 5 derniers dépots: nom, description, language principal, étoiles
