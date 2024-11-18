//👇🏻 get customers list
export const getCustomers = async (user_id: string) => {
    return await customersDB.select().from(customersTable).where(eq(customersTable.owner_id, user_id)).orderBy(desc(customersTable.created_at));
};

//👇🏻 get single customer
export const getSingleCustomer = async (name: string) => {
    return await customersDB.select().from(customersTable).where(eq(customersTable.name, name));
};

//👇🏻 add a new row to the customers table
export const addCustomer = async (customer: Customer) => {
    await customersDB.insert(customersTable).values({
        owner_id: customer.user_id,
        name: customer.name,
        email: customer.email,
        address: customer.address,
 });
};

//👇🏻 delete a customer
export const deleteCustomer = async (id: number) => {
  await customersDB.delete(customersTable).where(eq(customersTable.id, id));
};

//👇🏻 get user's bank info
export const getUserBankInfo = async (user_id: string) => {
    return await bankInfoDB.select().from(bankInfoTable).where(eq(bankInfoTable.owner_id, user_id));
};

//👇🏻 update bank info table
export const updateBankInfo = async (info: any) => {
await bankInfoDB.insert(bankInfoTable)
 .values({
        owner_id: info.user_id,
        bank_name: info.bank_name,
        account_number: info.account_number,
        account_name: info.account_name,
        currency: info.currency,
 })
 .onConflictDoUpdate({
            target: bankInfoTable.owner_id,
            set: {
                bank_name: info.bank_name,
                account_number: info.account_number,
                account_name: info.account_name,
                currency: info.currency,
 },
 });
};