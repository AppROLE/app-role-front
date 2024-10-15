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

export type getInstituteByIdResponseDTO = {
    addres: string;
    description: string;
    district_id: string;
    events_id: Array<string>;
    institute_id: string;
    institute_type: string;
    logo_photo: string;
    name: string;
    partner_type: string;
    phone: string;
    photos_url: Array<string>;
    price: number;
}