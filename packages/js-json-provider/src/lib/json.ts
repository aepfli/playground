import { GeneralError } from '@openfeature/extra';
import { JsonValue } from '@openfeature/js-sdk';
import { EvaluationContext, Provider, ResolutionDetails } from '@openfeature/openfeature-js';
import Ajv2020 from 'ajv/dist/2020';
import { copyFileSync, existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';
import schema from '../../../../schemas/flag.schema.json';
import { EvaluationEngine } from './evaluation-engine';
import { OpenFeatureFeatureFlags } from './flag';

const EXAMPLE_JSON_FILE = 'flags.json.example';
const JSON_FILE = 'flags.json';

const ajv = new Ajv2020({
  useDefaults: true,
  allowUnionTypes: true,
  allowMatchingProperties: false,
});

const validate = ajv.compile<OpenFeatureFeatureFlags>(schema);

/**
 * NOTE: This is an unofficial provider that was created for demonstration
 * purposes only. The playground environment will be updated to use official
 * providers once they're available.
 */
export class JsonProvider implements Provider {
  metadata = {
    name: 'json',
  };

  private readonly evaluationEngine = new EvaluationEngine();

  constructor() {
    // if the .json file doesn't exist, copy the example.
    if (!existsSync(join(JSON_FILE))) {
      copyFileSync(EXAMPLE_JSON_FILE, JSON_FILE);
    }
  }

  async resolveBooleanEvaluation(
    flagKey: string,
    _: boolean,
    context: EvaluationContext
  ): Promise<ResolutionDetails<boolean>> {
    const flags = await this.getFlags();
    return this.evaluationEngine.evaluate(flags, flagKey, 'boolean', context);
  }

  async resolveStringEvaluation(
    flagKey: string,
    _: string,
    context: EvaluationContext
  ): Promise<ResolutionDetails<string>> {
    const flags = await this.getFlags();
    return this.evaluationEngine.evaluate(flags, flagKey, 'string', context);
  }

  async resolveNumberEvaluation(
    flagKey: string,
    _: number,
    context: EvaluationContext
  ): Promise<ResolutionDetails<number>> {
    const flags = await this.getFlags();
    return this.evaluationEngine.evaluate(flags, flagKey, 'number', context);
  }

  async resolveObjectEvaluation<U extends JsonValue>(
    flagKey: string,
    _: U,
    context: EvaluationContext
  ): Promise<ResolutionDetails<U>> {
    const flags = await this.getFlags();
    return this.evaluationEngine.evaluate(flags, flagKey, 'object', context);
  }

  private async getFlags() {
    const flags = JSON.parse((await readFile(JSON_FILE)).toString());
    const valid = validate(flags);
    if (!valid) {
      throw new GeneralError('Invalid flag config');
    }

    return flags;
  }
}
