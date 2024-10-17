export type Institute = {
    instituteId: string;
    name: string;
    description: string;
    intituteType: string;
    partnerType: string;
    price: number;
    photosUrl: string[];
    logoPhoto: string;
    phone: string;
}

export type getAllInstituteByIdResponseDTO = { 
    institutes: Institute[],
    message: string
}

export type getInstituteByPartnerTypeResponseDTO = { 
    institutes: Institute[],    
    message: string
}

export type getAllFavoritesInstitutesResponseDTO = { 
    institutes: Institute[],    
    message: string
}

export type updateFavoriteInstituteResponseDTO = { 
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