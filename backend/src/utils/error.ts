export const errorHandler=(statusCode:any,message:any)=>{
  let error=new Error();
  let myError={
    ...error,
    statusCode:statusCode,
    message:message
  }
  return myError;
}