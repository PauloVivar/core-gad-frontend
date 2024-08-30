import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '@/sections/shared/hooks/useAuth';
//import { findAllPages, save, update, remove, register } from '@/services/userService';
import { findAllPages, save, update, remove, register } from '@/modules/users/repository/ApiUsersRepository';
import { checkContribuyenteExists, getContribuyenteInfo } from '@/modules/taxpayers/repository/ApiTaxpayersRepository';
import {
  initialUserForm,
  addUser,
  removeUser,
  updateUser,
  loadingUsers,
  onSelectedUserForm,
  onOpenForm,
  onCloseForm,
  loadingError,

  setContribuyenteExists,
  setContribuyenteInfo,
  clearContribuyenteInfo,

  setLoading,
  setErrors,
  clearErrors,
} from '@/redux/states/users';
//} from '@/store/slices/users/usersSlice';
import Swal from 'sweetalert2';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  acceptedTerms: boolean;
  //[key: string]: any;
}

interface UserForm extends User {
  legalPerson: string | undefined;
  ci: string;
  fullName: string;
  address: string;
  phone: string;
  taxpayerCity: string;
  houseNumber: string;
  birthdate: Date | undefined;
  disabilityPercentage: number;
  maritalStatus: number;
}

interface RootState {
  users: {
    users: User[];
    userSelected: User;
    visibleForm: boolean;
    errors: any;
    isLoading: boolean;
    paginator: any;
    contribuyenteExists: boolean | undefined;
    contribuyenteInfo: any | null;
  };
}

const useUsers = () => {
  const { handlerLogout } = useAuth();
  //Reducer para CRUD en el Frond
  //const [users, dispatch] = useReducer(usersReducer, initialUsers);
  
  //Redux para CRUD en el Frond
  const { 
    users, 
    userSelected, 
    visibleForm, 
    errors, 
    isLoading, 
    paginator,

    contribuyenteExists,
    contribuyenteInfo,
  } = useSelector((state: RootState) => state.users);
  //} = useSelector((state) => state.users);

  const dispatch = useDispatch();

  //Navigate para redirigir a UsersPage
  const navigate = useNavigate();

  //Obtiene la data de la API BACKEND con SPRING BOOT
  //const getUsers = async (page = 0) => {
  const getUsers = async (page: number = 0): Promise<void> => {
    try {
      const result = await findAllPages(page);
      // console.log('list_u: ', result);
      dispatch(loadingUsers(result.data));
    } catch (error: any) {
      if (error.response?.status == 401) {
        handlerLogout();
      }
    }
  };

  //const handlerCheckContribuyenteExists = async (ci) => {
  const handlerCheckContribuyenteExists = async (ci: string): Promise<boolean> => {
    dispatch(setLoading(true));
    try {
      const exists = await checkContribuyenteExists(ci);
      dispatch(setContribuyenteExists(exists));   //actualiza estado global (contribuyenteExists)
      
      console.log('test en useUser: ', exists)
      return exists;
    } catch (error: any) {
      dispatch(setErrors({ ci: 'Error al verificar contribuyente' }));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlerGetContribuyenteInfo = async (ci: string): Promise<any> => {
    dispatch(setLoading(true));
    try {
      const response = await getContribuyenteInfo(ci);
      dispatch(setContribuyenteInfo(response));
      return response;
    } catch (error: any) {
      dispatch(setErrors({ ci: 'Error al obtener información del contribuyente' }));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlerRegisterUser = async (user: User): Promise<User> => {
    //let response;
    dispatch(setLoading(true));
    dispatch(clearErrors());
    try {
      const response = await register(user);
      console.log('respuesta del registro: ', response.data);
      if (response && response.data) {
        dispatch(addUser(response.data));

        Swal.fire({
          title: 'Usuario creado!',
          text: 'Usuario creado con éxito',
          icon: 'success',
        });
  
        //Redirigir a login
        navigate('/login');
        return response.data;          // Asegúrar de que esto incluya el ID del usuario

      } else {
        throw new Error('La respuesta del servidor no contiene datos del usuario');
      }

    } catch (error: any) {
      if (error.response && error.response.status == 400) {
        //console.error('solicitud_incorrecta:',error.response.data);
        dispatch(loadingError(error.response.data));
      } else if (
        //500 -> error de server || 403 -> prohibido
        error.response &&
        error.response.status == 403 &&
        error.response.data?.message?.includes('constraint')
        ) {
          if (error.response.data?.message?.includes('users_ci_key')) {
            console.log({ci: 'El documento de identidad ya existe'});
            dispatch(loadingError({ username: 'El documento de identidad ya existe' }));
          }
          if (error.response.data?.message?.includes('users_email_key')) {
            console.log({email: 'El email ya existe'});
            dispatch(loadingError({ email: 'El email ya existe' }));
          }
      } else {
        //console.error('Error al registrar usuario:', error);
        dispatch(setErrors({ general: 'Error al registrar usuario' }));
        throw error;
      }
    } finally {
      dispatch(setLoading(false));
    }
    throw new Error('Error desconocido al registrar usuario');
  }

  const handlerAddUser = async (user: User): Promise<void> => {
    let response;
    try {
      //userSchema.parse(user);
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      };

      Swal.fire({
        title: user.id === 0 ? 'Usuario creado!' : 'Usuario actualizado!',
        text: user.id === 0 ? 'Usuario creado con éxito' : 'Usuario actualizado con éxito',
        icon: 'success',
      });

      //Form oculto y reseteado
      handlerCloseForm();
      //Redirigir a UsersPage
      navigate('/users');

    } catch (error: any) {
      handleAddUserError(error);
    }
  }

  const handleAddUserError = (error: any): void => {
    if (error.response && error.response.status === 400) {
      dispatch(loadingError(error.response.data));
    } else if (
      error.response &&
      error.response.status === 403 &&
      error.response.data?.message?.includes('constraint')
    ) {
      if (error.response.data?.message?.includes('users_username_key')) {
        dispatch(loadingError({ username: 'El username ya existe' }));
      }
      if (error.response.data?.message?.includes('users_email_key')) {
        dispatch(loadingError({ email: 'El email ya existe' }));
      }
    } else if (error.response?.status === 401) {
      handlerLogout();
    } else {
      throw error;
    }
  }

  const handlerDeleteUser = (id: number): void => {
    //console.log(id);

    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Este usuario será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // eliminar de la db -> Lógica para eliminar
          await remove(id);
          dispatch(removeUser(id));

          //antes con reducer
          // dispatch({
          //   type: 'removeUser',
          //   payload: id,
          // });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Usuario ha sido eliminado.',
            icon: 'success',
          });
        } catch (error: any) {
          if (error.response?.status == 401) {
            handlerLogout();
          }
        }
      }
    });
  };

  //const handlerSelectedUserForm = (user) => {
  const handlerSelectedUserForm = (user: UserForm): void => {
    //console.log(user);
    //Se muestra form al seleccionar
    dispatch(onSelectedUserForm({ ...user }));
  };

  const handlerOpenForm = (): void => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = (): void => {
    dispatch(onCloseForm());
    dispatch(loadingError({}));
  };

  const handlerClearContribuyenteInfo = (): void => {
    dispatch(clearContribuyenteInfo());
  };

  return {
    users,
    userSelected,
    visibleForm,
    errors,
    isLoading,
    paginator,
    contribuyenteExists,
    contribuyenteInfo,

    initialUserForm,
    getUsers,
    handlerRegisterUser,
    handlerAddUser,
    handlerDeleteUser,
    handlerSelectedUserForm,
    handlerOpenForm,
    handlerCloseForm,

    handlerCheckContribuyenteExists,
    handlerGetContribuyenteInfo,
    handlerClearContribuyenteInfo,
  };
};

export { useUsers };
