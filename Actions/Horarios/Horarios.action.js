import apiAmadis from "../Api/ApiAmadis";

export const GetHorario = async()=>{
    const response  = await apiAmadis.get("/horarios");
    return response.data;
}