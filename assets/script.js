
let findUserInDB = (id) => {
    const users = [ {id: 1, name: "Dima", friend:3}, {id: 2, name: "Lima", friend:2}, {id: 1, name: "Kama", friend:1} ]
    return new Promise((res, rej)=> {
        setTimeout(() => {
            let user = users.find(u => u.id === id)
            if(user === null){
                rej("user not found")
            } else {
                res(user)
            }
        }, 1500)
    })
}

findUserInDB(1) //инициализационный промис
    .then(user => {
        return user.friend
    })
    .then(friendId => findUserInDB(friendId))
    .catch((error)=> {
        return {name: "Friend Bot", friends: 3}
    })//обрабатываем сценарий ошибки
    .then(friend1 => {
        console.log(friend1.name)
        return friend1.friend
    })
    .then(friendId => findUserInDB(friendId))
    .then(friend2 => console.log(friend2.name))
    .catch((error)=> alert(error)) //обрабатываем ошибку

async function run() { //async await это синтаксический сахар на then и catch
    try {
        let user = await findUserInDB(1)
        console.log(user.name)
        let friend1
        try {
            friend1 = await findUserInDB(user.friend)
        } catch (error) {
            friend1 = {name: "Friend Bot", friends: 3}
        }
        console.log(friend1.name)
        let friend2 = await findUserInDB(friend1.friend)
        console.log(friend2.name)

    } catch (error) {
        alert(error)
    }
}

const api = {
    save() {

    },
    read() {
        return {name: "it-kamasutra"}
    }
}

async function run() { //если не было промисификации в api
    await api.save() //если промис ждет когда зарезолвиться если не промис сразу возвращает
    let data = await api.read()
    console.log(data)
}

run()















let axios = {
    _fake(url,data) {
        return  new Promise((resolve) => {
            setTimeout(()=> {
                let responseData = {
                    text: `${url} loves you`
                }
                if(url.indexOf("it-kamasutra") > 0){
                    responseData = {
                        requestCount: data.count,
                        message: "we will prepare"
                    }
                } else if (url.indexOf("google" > 0)) {
                    responseData = {
                        vacancies: 12
                    }
                } else if (url.indexOf("microsoft" > 0)) {
                    responseData = {
                        vacancies: 12
                    }
                }
                resolve({
                    request: {},
                    status: 200,
                    headers: {},
                    config: {},
                    data: responseData
                })
            })
        })
    },
    post(url, data) {
        return this._fake(url,data)
    },
    get(url,data) {
        return this._fake(url,data)
    }
}