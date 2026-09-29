class GithubUser {
    constructor(userName) {
        this.userName = userName
    }

    getGlobalInfo (callback) {
        const request = new XMLHttpRequest()

        request.addEventListener('readystatechange', (e) => {
            if (e.target.readyState === 4 && e.target.status === 200){
                const response = JSON.parse(request.responseText)
                callback(undefined, response)
            }else if (e.target.readyState === 4) {
                callback("Can't get this user informations, please check his github user name!", undefined)
            }
        })

        request.open('GET', `https://api.github.com/users/${this.userName}`)
        request.send()
    }

    async getReposInfo () {
        const response = await fetch(`https://api.github.com/users/${this.userName}/repos`)

        if (response.status === 200) {
            return response.json()
        }else {
            throw new Error("Can't get this user REPOS informations, please check his github user name!")
        }
    }

    displayThisUserInfos(actualUserDiv, actualImgDiv, userLastFiveRepots, cache) {

        const newCache = cache

        const avatar = document.createElement("img")
        const name = document.createElement("h2")
        const bio = document.createElement("p")
        const publicReposCount = document.createElement("p")
        const followers = document.createElement("p")
        const following = document.createElement("p")

        avatar.src = newCache.avatar
        avatar.alt = 'your profile picture'
        actualImgDiv.textContent = ''
        actualImgDiv.appendChild(avatar)

        name.textContent = newCache.name

        newCache.bio !== null ? bio.textContent = `Bio: ${newCache.bio}` : bio.textContent = 'Bio: Nothing about me'

        publicReposCount.textContent = `Actual public repos count: ${newCache.publicReposCount}`

        followers.textContent = `Followers: ${newCache.followers}`

        following.textContent = `Following: ${newCache.following}`

        actualUserDiv.textContent = ''
        actualUserDiv.appendChild(name)
        actualUserDiv.appendChild(bio)
        actualUserDiv.appendChild(publicReposCount)
        actualUserDiv.appendChild(followers)
        actualUserDiv.appendChild(following)
        actualImgDiv.appendChild(actualUserDiv)

        userLastFiveRepots.textContent = ''

        const title = document.createElement('div')
        const h2 = document.createElement('h2')
        h2.textContent = "Last Fives Repos"
        title.appendChild(h2)

        const p = document.createElement('p')
        newCache.reposLength < 5 ? p.textContent = `This repos have only ${newCache.reposLength} repos` : p.textContent = `He's keep working, which goat!`
        title.appendChild(p)

        userLastFiveRepots.appendChild(title)

        // last five repos
        const lastFivesRepos = newCache.lastFivesRepos

        Object.entries(lastFivesRepos).forEach(([key, value]) => {
            const repoDiv = document.createElement("div")
            const repoName = document.createElement('h3')
            const repoLanguage = document.createElement('p')
            const repoDescription = document.createElement('p')
            const repoStars = document.createElement('p')

            if (value !== undefined){
                repoName.textContent = `${value.name}`
                value.language !== null ? repoLanguage.textContent = `Language: ${value.language}` : repoLanguage.textContent = 'Language: No mention'
                value.description !== null ? repoDescription.textContent = `Description: ${value.description}` : repoDescription.textContent = 'Description: No description'
                repoStars.textContent = `Stargazers count: ${value.stargazers_count}`

                repoDiv.appendChild(repoName)
                repoDiv.appendChild(repoDescription)
                repoDiv.appendChild(repoLanguage)
                repoDiv.appendChild(repoStars)
                userLastFiveRepots.appendChild(repoDiv)
            }
        })
        
    }
}

