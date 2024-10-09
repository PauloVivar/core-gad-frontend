import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from '../../shared/hooks/useAuth'

import {
  initialTermForm,
  loadingTerms,
  onSelectedTermForm,
  onOpenForm,
  onCloseForm,
  fetchLatestTermStart,
  fetchLatestTermSuccess,
  fetchLatestTermError,
  setUserTermsStatus,
  recordTermsInteractionStart,
  recordTermsInteractionSuccess,
  recordTermsInteractionError,
  loadingError
} from '../slices/index'

import { useState } from 'react'
import { useGetTerms } from './get/use-get-terms'
import { useRecordTerm } from './record/use-record-term'
import { useCheckTerm } from './check/use-checked-term'
import { useGetLastTerm } from './get-by-latest/use-get-latest-term'
import { Term } from '@/modules/terms/domain/Term'
import { AppStore } from '@/redux/store'

const useTerms = () => {
  const {
    terms,
    termSelected,
    visibleForm,
    errors,

    latestTerm,
    latestTermError,

    userTermsStatus,
    recordingTermsInteraction,
    recordingTermsInteractionError
  } = useSelector((state: AppStore) => state.terms)

  const { data, error } = useGetTerms()
  const { data: lastTerm } = useGetLastTerm()
  const { mutate: recordTerm } = useRecordTerm()
  const check = useCheckTerm()

  const dispatch = useDispatch()

  const { handlerLogout } = useAuth()

  // Agregar estado para mostrar el último término en TermsPage()
  const [showLatestTerm, setShowLatestTerm] = useState(false)

  const getTerms = async () => {
    dispatch(loadingTerms(data))
    if (error) return handlerLogout()
  }

  const handlerSelectedTermForm = (term: Partial<Term>) => {
    //Se muestra form al seleccionar
    dispatch(onSelectedTermForm({ ...term }))
  }

  const handlerOpenForm = () => {
    dispatch(onOpenForm())
  }

  const handlerCloseForm = () => {
    dispatch(onCloseForm())
    dispatch(loadingError({}))
  }

  // Función asíncrona para obtener los últimos términos
  const getLatestTerms = async () => {
    setShowLatestTerm((prev) => !prev)
    if (!showLatestTerm) {
      try {
        dispatch(fetchLatestTermStart())
        dispatch(fetchLatestTermSuccess(lastTerm))
        console.log('getLatestTerms_data', lastTerm)
        return lastTerm
      } catch (error) {
        dispatch(fetchLatestTermError(error))
      }
    }
  }

  // Función asíncrona para checkear el estado de términos de usuario
  const getCheckUserTermsStatus = async (userId: string) => {
    try {
      const result = check.mutate(userId) //se pasa desestructurado ya que así recibe en termsService
      dispatch(setUserTermsStatus(result))
      return result
    } catch (error) {
      console.error(
        'Error al comprobar el estado de los términos de usuario:',
        error
      )
      dispatch(loadingError(error))
      handlerLogout()
      return false
    }
  }

  // Función asíncrona para registrar la interacción de términos
  const getRecordTermsInteraction = async (
    userId: string,
    accepted: boolean
  ) => {
    dispatch(recordTermsInteractionStart())

    try {
      const result = recordTerm({ userId, accepted })
      dispatch(recordTermsInteractionSuccess(result))
      return result
    } catch (error) {
      dispatch(recordTermsInteractionError(error))
    }
  }

  return {
    initialTermForm,
    terms,
    termSelected,
    visibleForm,
    errors,

    latestTerm,
    latestTermError,

    showLatestTerm,

    userTermsStatus,
    recordingTermsInteraction,
    recordingTermsInteractionError,

    getTerms,
    handlerSelectedTermForm,
    handlerOpenForm,
    handlerCloseForm,

    getLatestTerms,
    getCheckUserTermsStatus,
    getRecordTermsInteraction
  }
}

export { useTerms }
