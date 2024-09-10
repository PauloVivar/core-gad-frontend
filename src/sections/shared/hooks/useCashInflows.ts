import { createCashInflow } from '@/modules/cash-inflows/application/create/createCashInflow'
import { getCashInflow } from '@/modules/cash-inflows/application/get/getCashInflow'
import { CashInflow } from '@/modules/cash-inflows/domain/CashInflow'
import { createApiCashInflowRepository } from '@/modules/cash-inflows/infrastructure/ApiCashInflowsRepository'
import { addCashInflow, loadingCashInflow } from '@/redux/states/cash-inflows'
import { useDispatch, useSelector } from 'react-redux'

const repository = createApiCashInflowRepository()

export const useCashInflows = () => {
  const { cashInflows } = useSelector((state) => state.cashInflows)
  const dispatch = useDispatch()

  const create = async (cashInflow: CashInflow) => {
    await createCashInflow(repository)(cashInflow)
    dispatch(addCashInflow(cashInflow))
  }

  const get = async (cashInflowCode: number) => {
    const cashInflow = await getCashInflow(repository)(cashInflowCode)
    dispatch(loadingCashInflow(cashInflow))
    return cashInflow
  }

  return { cashInflows, create, get }
}
