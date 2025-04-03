export interface Book {
    id: string;
    userId: string | null;
    name: string;
    author: string;
    year: number;
    category: {
      id: string;
      name: string;
    };
    description: string;
    cover: string;
    uploadDate: string;
    maxReservationPeriod: number;
    pageSize: number;
    isReserved: boolean;
    isPublished: boolean;
    isUserBook: boolean;
  }
  