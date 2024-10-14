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
    institute: Institute,
    message: string
}