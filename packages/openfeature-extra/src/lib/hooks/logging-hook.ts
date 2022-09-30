import { Hook, HookContext, ResolutionDetails, FlagValue } from '@openfeature/js-sdk';
import { EOL } from 'os';

/**
 * A hook that simply logs at every life-cycle stage.
 */
export class LoggingHook implements Hook {
  name = 'logging';

  before(hookContext: HookContext) {
    console.log(`Running 'before' logger hook for flag: ${hookContext.flagKey}`);
    console.log(JSON.stringify(hookContext.context, undefined, 2));
  }

  after(hookContext: HookContext, details: ResolutionDetails<FlagValue>) {
    console.log(`Running 'after' logger hook for flag: ${hookContext.flagKey}`);
    console.log(`Evaluation details:${EOL}${JSON.stringify(details, undefined, 2)}`);
  }

  // finally(hookContext: HookContext) {
  //   console.log(
  //     `Running 'finally' logger hook for flag: ${hookContext.flagKey}`
  //   );
  // }

  error(hookContext: HookContext, err: Error) {
    console.log(`Running 'error' logger hook for flag: ${hookContext.flagKey}`);
    console.error(err);
  }
}
