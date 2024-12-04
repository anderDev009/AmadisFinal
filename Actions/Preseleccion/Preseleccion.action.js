import apiAmadis from "../Api/ApiAmadis";


export const GetMaterias = async ()=>{
    const response = await apiAmadis.get("/materias_disponibles");
    console.log(response.data);
    return response.data;
}

export const AddrMateriaPreseleccion = async (codigo)=>{
    const response = await apiAmadis.post("/preseleccionar_materia",codigo)
    return response.data.success === true;
}

export const CancelMateria = async (codigo)=>{
    try{
        const response = await apiAmadis.post("/cancelar_preseleccion_materia",codigo)
        return response.data.success === true;
    }catch(error) {
        console.log(error);
        return false;
    }

}

export const GetPreseleccion = async ()=>{
    const response = await apiAmadis.get("/ver_preseleccion");
    return response.data.data;
}

