
export type SuccessResponse<T> = {
    success: true;
    data: T;
  };
  
  export type ErrorDetail = {
    path: string;
    message: string;
  };
  
  export type ErrorResponse = {
    success: false;
    error: {
      code: string;
      message: string;
      details?: ErrorDetail[];
    };
  };
  
  export const success = <T>(data: T): SuccessResponse<T> => ({
    success: true,
    data,
  });
  
  export const errorResponse = (
    code: string,
    message: string,
    details?: ErrorDetail[]
  ): ErrorResponse => ({
    success: false,
    error: {
      code,
      message,
      details,
    },
  });
  