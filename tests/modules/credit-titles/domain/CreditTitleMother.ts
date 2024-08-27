import { faker } from '@faker-js/faker'
import { Factory } from 'fishery'

import { CreditTitle } from '../../../../src/modules/credit-titles/domain/CreditTitle'

const CreditTitleFactory = Factory.define<CreditTitle>(() => ({
  code: faker.datatype.number(),
  date: faker.lorem.sentence(),
  concept: faker.lorem.sentence(),
  reference: faker.lorem.sentence(),
  amountCollected: faker.datatype.number(),
  amountCollectedInWords: faker.lorem.sentence(),
  value: faker.datatype.number(),
  valueInWords: faker.lorem.sentence(),
  interest: faker.datatype.number(),
  interestInWords: faker.lorem.sentence(),
  surcharges: faker.datatype.number(),
  surchargesInWords: faker.lorem.sentence(),
  change: faker.datatype.number(),
  changeInWords: faker.lorem.sentence(),
  totalToPay: faker.datatype.number(),
  totalInWords: faker.lorem.sentence(),
  paymentMethod: faker.lorem.sentence(),
  account: faker.lorem.sentence(),
  bank: faker.lorem.sentence(),
  check: faker.lorem.sentence(),
  notes: faker.lorem.sentence(),
  collector: faker.lorem.sentence(),
  invoiceNumber: faker.datatype.number()
}))

export const CreditTitleMother = {
  create: (params?: Partial<CreditTitle>): CreditTitle => CreditTitleFactory.build(params),
  createList: (length = 5): CreditTitle[] => CreditTitleFactory.buildList(length)
}
