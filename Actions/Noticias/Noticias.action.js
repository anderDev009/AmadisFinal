import apiAmadis from "../Api/ApiAmadis";



export const GetNoticias = async ()=>{
    const response = await apiAmadis.get("/noticias");
    return response.data.data;
}