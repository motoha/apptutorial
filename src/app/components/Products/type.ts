type DataItem = {
    // id: number;
    // name: string;
    // price: number;
    // image: string;
    id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  };
  
  type ApiResponse = {
    // success: boolean;
    // responseCode: number;
    data: DataItem[];
  };