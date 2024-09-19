export type Institute = {
    id: number;
    name: string;
    description: string;
    image: string;
    // Outras propriedades que façam sentido
}

export type getAllInstituteByIdResponseDTO = { 
    institutes: Institute[],
    message: string    
}

export type getInstituteByPartnerTypeResponseDTO = { 
    institutes: Institute[],
    message: string    
}