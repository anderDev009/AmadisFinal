import apiAmadis from "../Api/ApiAmadis";


export const GetMaterias = async ()=>{
    const response = await apiAmadis.get("/materias_disponibles");
    return response.data.data;
}

export const AddrMateriaPreseleccion = async (codigo)=>{
    const response = await apiAmadis.post("/preseleccionar_materia",codigo)
    return response.data.success === true;
}

export const CancelMateria = async (codigo)=>{
    const response = await apiAmadis.post("/cancelar_materia",codigo)
    return response.data.success === true;
}

export const GetPreseleccion = async ()=>{
    const response = await apiAmadis.get("/ver_preseleccion");
    return response.data.data;
}

