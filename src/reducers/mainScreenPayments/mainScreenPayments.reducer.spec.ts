import { mainScreenPaymentsReducer } from '@moneyboy/reducers/mainScreenPayments/mainScreenPayments.reducer';

describe('mainScreenPaymentsReducer', () => {
  it('should return an empty object on empty input', () => {
    expect(mainScreenPaymentsReducer([], { payments: [] })).toStrictEqual([]);
  });
});
