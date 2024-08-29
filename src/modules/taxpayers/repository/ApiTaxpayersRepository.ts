import { taxpayersApi } from '@/interceptors/taxpayers'
import { AxiosResponse } from 'axios'

//url viene por defecto de taxpayersApi
const BASE_URL = '';

interface Contribuyente {
  legalPerson: number | undefined;
  ci?: string;
  fullName: string;
  address: string;
  phone: string;
  taxpayerCity: string;
  houseNumber: string;
  birthdate: Date | undefined;
  disabilityPercentage: number;
  maritalStatus: number;
  [key: string]: any; // Permite propiedades adicionales de cualquier tipo
}

//const findAllPages = async (page = 0) => {
const findAllPages = async (page: number = 0): Promise<AxiosResponse> => {
  try {
    const response = await taxpayersApi.get(`${BASE_URL}/page/${page}`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const save = async (contribuyenteData: Contribuyente): Promise<AxiosResponse> => {
  try {
    return await taxpayersApi.post(BASE_URL, contribuyenteData);
  } catch (error) {
    throw error;
  }
}

const update = async (contribuyenteData: Contribuyente): Promise<AxiosResponse> => {
  try {
    const { ci, ...data } = contribuyenteData;
    return await taxpayersApi.put(`${BASE_URL}/${ci}`, data);
  } catch (error) {
    throw error;
  }
}

//{ exists: boolean }
const checkContribuyenteExists = async (ci: string): Promise<boolean> => {
  try {
    const response = await taxpayersApi.get<boolean>(`${BASE_URL}/check/${ci}`);
    return response.data;
  } catch (error) {
    console.error('Error al verificar contribuyente:', error);
    throw error;
  }
};

const getContribuyenteInfo = async (ci: string): Promise<Contribuyente> => {
  try {
    const response = await taxpayersApi.get(`${BASE_URL}/${ci}`);
    //console.log('validado desde texayerService getContribuyenteInfo: ', response.data)
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del contribuyente:', error);
    throw error;
  }
};

export { 
  findAllPages, 
  save, 
  update, 
  checkContribuyenteExists, 
  getContribuyenteInfo,
};
