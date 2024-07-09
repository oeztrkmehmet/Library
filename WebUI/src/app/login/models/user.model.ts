export interface UserForAuthenticationDto {
    userName: string;
    password: string;
}

export interface AuthResponseDto {
    response: string;
}
export interface RegisterModel {
    userName: string;
    password: string;
    nameSurname: string;
    phoneNumber: string;
  }