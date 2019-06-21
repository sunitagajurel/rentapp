import  firebase from '../.././firebase'

class Helpers {
     static createNewVehicle(userId, obj){
        let userNamePath = "/user/"+userId+"/vehicles/"+Date.now()
        return firebase.database().ref(userNamePath).set(obj)
    }

    static createNewAllVehicle(userId, obj){
        let userNamePath = "/Vehicle/"+Date.now()
        return firebase.database().ref(userNamePath).set(obj)
    }

    
    static setUserName(userId, name){
        let userNamePath = "user/"+userId+"/details/name"
        return firebase.database().ref(userNamePath).set(name)
    }

    static setUserBio(userId, bio){
        let userNamePath = "user/"+userId+"/details/bio"
        return firebase.database().ref(userNamePath).set(bio)
    }

    static setUserPlace(userId, place){
        let userNamePath = "user/"+userId+"/details/place"
        return firebase.database().ref(userNamePath).set(place)
    }

    static setImageUrl(userId, url){
        let userNamePath = "user/"+userId+"/details/url"
        return firebase.database().ref(userNamePath).set(url)
    }
    static getImageUrl(userId, callback){
        let userNamePath = "user/"+userId+"/details/url"
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let imageUrl = ''
            if(snapshot.val()){
                imageUrl = snapshot.val()
            }
            callback(imageUrl)
        })
    }
    static getName(userId, callback){
        let userNamePath = "user/"+userId+"/details/name"
        firebase.database().ref(userNamePath).on('value', (snapshot) => {
            let name = ''
            if(snapshot.val()){
                name = snapshot.val()
            }
            callback(name)
        })
    }
}

module.exports = Helpers