
const cacheFunction = function () {
    const cache = {
        
    }

    return () => {
        return {
            addToCache(userName, userGlobalInfo, userReposInfo) {      
                cache[userName] = {
                    avatar: userGlobalInfo.avatar_url,
                    name: userGlobalInfo.name,
                    bio: userGlobalInfo.bio,
                    publicReposCount: userGlobalInfo.public_repos,
                    followers: userGlobalInfo.followers,
                    following: userGlobalInfo.following,
                    lastFivesRepos: {
                        one: userReposInfo[userReposInfo.length - 5],
                        two: userReposInfo[userReposInfo.length - 4],
                        three: userReposInfo[userReposInfo.length - 3],
                        four: userReposInfo[userReposInfo.length - 2],
                        five: userReposInfo[userReposInfo.length - 1],
                    },
                    reposLength: userReposInfo.length
                }
            },

            readCache(userName) {
                return cache[userName]
            },

        }
    }

}

// Affichage: avatar, nom, bio, nombre de repos publics, followers, following
