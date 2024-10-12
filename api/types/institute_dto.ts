export type Institute = {
    instituteId: string;
    name: string;
    description: string;
    intituteType: string;
    partnerType: string;
    price: number;
    photosUrl: string[];
    logoPhoto: string;
    phoneNumber: string;
}

export type getAllInstituteByIdResponseDTO = { 
    institutes: Institute[],    
}

export type getInstituteByPartnerTypeResponseDTO = { 
    institutes: Institute[],    
    message: string
}