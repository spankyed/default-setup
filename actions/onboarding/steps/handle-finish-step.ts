import type { EntityId, Services } from '../../../src/types';
import { finishOnboarding, type OnboardingState } from '../onboarding-helpers';

export function handleFinishStep(
  services: Services,
  state: OnboardingState,
  threadId: EntityId,
) {
  finishOnboarding(services, state, threadId);
}
