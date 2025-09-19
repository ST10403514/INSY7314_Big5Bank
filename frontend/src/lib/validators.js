export const patterns = {
  username: /^[A-Za-z0-9_]{4,30}$/,
  fullName: /^[A-Za-z ,.'-]{2,100}$/,
  idNumber: /^\d{13}$/,
  accountNumber: /^\d{8,20}$/,
  amount: /^\d{1,14}(\.\d{1,2})?$/,
  swift: /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/
}

export function validateRegister(data){
  const errors = {}
  if(!patterns.fullName.test(data.fullName)) errors.fullName = 'Invalid name'
  if(!patterns.idNumber.test(data.idNumber)) errors.idNumber = 'Invalid SA ID (13 digits)'
  if(!patterns.accountNumber.test(data.accountNumber)) errors.accountNumber = 'Invalid account number'
  if(!patterns.username.test(data.username)) errors.username = 'Invalid username'
  if(!patterns.amount.test(String(data.amount || ''))) errors.amount = 'Invalid amount'
  if(!patterns.swift.test(data.swift)) errors.swift = 'Invalid SWIFT code'
  return errors
}
