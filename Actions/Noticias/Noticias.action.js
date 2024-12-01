import apiAmadis from "../Api/ApiAmadis";



const GetNoticias = async ()=>{
    const response = apiAmadis.get("/noticias");
    return response.data.data;
}