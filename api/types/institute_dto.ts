export type Institute = {
    id: number;
    title: string;
    image: string;
    // Outras propriedades que façam sentido
}

export type getAllInstituteByIdResponseDTO = { 
    institutes: Institute[],
    message: string    
}