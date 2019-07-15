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

    static setUserContactNo(userId,contact_no){
        let userNamePath = "user/"+userId+"/details/contact_no"
        return firebase.database().ref(userNamePath).set(contact_no)
    }

    static setUserLongitude(userId,longitude){
        let userNamePath = "user/"+userId+"/details/longitude"
        return firebase.database().ref(userNamePath).set(longitude)
    }
    static setUserLatitude(userId,latitude){
        let userNamePath = "user/"+userId+"/details/latitude"
        return firebase.database().ref(userNamePath).set(latitude)
    }


    static setUserLicenceNo(userId,licence_no){
        let userNamePath = "user/"+userId+"/details/licence_no"
        return firebase.database().ref(userNamePath).set(licence_no)
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
     static setLocationMarker(userId, obj){
        let userNamePath = "/UserLocation/"+Date.now()
        return firebase.database().ref(userNamePath).set(obj)
    }
}

module.exports = Helpers