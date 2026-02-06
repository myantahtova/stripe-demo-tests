import { APIRequestContext } from '@playwright/test';
import { ChargeResponse, ChargeResponseSchema } from '@api-schemas/responses/charge.response';
import { ChargeAsserter } from '@asserters/charge-asserter';
import { BaseController } from '@controllers/base-controller';

const CHARGES_PATH = '/v1/charges';

export class ChargeController extends BaseController<ChargeController, ChargeAsserter> {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async retrieveCharge(chargeId: string): Promise<ChargeController> {
    return this.get(`${CHARGES_PATH}/${chargeId}`, undefined, ChargeResponseSchema);
  }

  getCharge(): ChargeResponse {
    return this.getResponseBody<ChargeResponse>();
  }

  getChargeId(): string {
    return this.getCharge().id;
  }

  getAmount(): number {
    return this.getCharge().amount;
  }

  assertThat(): ChargeAsserter {
    return new ChargeAsserter(this);
  }
}
