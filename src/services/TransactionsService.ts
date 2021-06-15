import { BaseService } from "./infrastructure/BaseService";

/**
 * The transaction object
 * Value is of type `number` for simplification
 */
export interface Transaction {
    id?: number
    to: string
    from: string
    value: number
    when: Date
}

export interface TransactionsServiceState {
    transactions: Array<Transaction>
}

/**
 * TransacionsService class 
 * TODO: Complete the addTransaction and the getListOfTransactions methods
 */
export class TransactionsService extends BaseService<TransactionsServiceState> {
    constructor(initialState: TransactionsServiceState) {
        super(initialState || {
            transactions: []
        });
    }

    /**
     * It adds a transaction to the list
     */
    public async addTransaction(newTransaction: Transaction): Promise<Transaction> {
        return new Promise<Transaction>((resolve) => {
            setTimeout(() => {
                const currentTransactions = this.getState().transactions;
                const updatedTransaction = { id: currentTransactions.length + 1, ...newTransaction }
                this.updateState({ transactions: [...currentTransactions, updatedTransaction] });
                resolve(updatedTransaction)
            }, 2000);
        })
    }

    /**
     * It returns the list of transactions
     */
    public async getListOfTransactions(): Promise<Array<Transaction>> {
        return new Promise<Array<Transaction>>((resolve) => {
            setTimeout(() => {
                resolve(this.getState().transactions);
            }, 300);
        })
    }

}
