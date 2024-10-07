export type Institute = {
    id: number;
    name: string;
    description: string;
    image: string;
}

export type getAllInstituteByIdResponseDTO = { 
    institutes: Institute[],    
}

export type getInstituteByPartnerTypeResponseDTO = { 
    institutes: Institute[],    
}