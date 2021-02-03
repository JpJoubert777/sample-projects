import axios from "axios";

var api = axios.create({baseURL: "http://localhost:5300/"});

export default{
    embeddedToken(){
        return api.get("getEmbedToken");
    },
    helloWorld(){
        return api.get("helloWorld");
    },
    sendEmail(id){
        console.log("sendEmail/" + id)
        return api.post("sendEmail/" + id);
    }
}