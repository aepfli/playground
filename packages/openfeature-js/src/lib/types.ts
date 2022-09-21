import { EvaluationContext } from '@openfeature/js-sdk';
export interface HasTransactionContext extends TransactionContextManager {
  registerTransactionContextPropagator(transactionContext: TransactionContextManager): void;
}

export interface TransactionContextManager {
  getTransactionContext(): EvaluationContext;
  setTransactionContext(evaluationContext: EvaluationContext, callback: () => void): void;
}
