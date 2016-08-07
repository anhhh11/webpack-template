import immutable from 'immutable'
import moment from 'moment'
/**
 * Mỗi sinh vật - VD như con người - sẽ ở trong một hoàn cảnh nào đó,
 * hoàn cảnh này bao gồm cá nhân(chủ quan) và môi trường(khách quan).
 * Họ sống để hoàn thành mục tiêu của bản thân.
 * Mapping khái niệm
 * Hoàn cảnh
 *  các nhân: initialState
 *  môi trường: environment
 * Sống - live
 * Đạt được mục tiêu - isAchievedGoal
 */
const log = console.log.bind(console);
export class Agent {
  constructor(environment = immutable.Map({}), initialState = immutable.Map({})) {
    this.state = initialState;
    this.environment = environment;
    this.state = this.state.set('currentPosition', this.state.get('startPosition'));
  }

  isGoalReached() {
    return this.state.get('currentPosition') === this.environment.get('destination');
  }

  live() {
    var start = moment();
    var alternatives = immutable.List();
    var x = 0;
    while (true) {
      x++;
      // Done on start
      if (this.isGoalReached()) {
        console.debug('Done on start');
        break;
      }
      // Find ways & try
      const currentPosition = this.state.get('currentPosition');
      const nextInformedPositions = this.environment.getIn(['maps', currentPosition]);
      const prioritizedPositions = nextInformedPositions
        .sortBy(function (distance, position) {
          return position;
        }, (positionA, positionB) => (positionA > positionB) ? -1 : 1);
      prioritizedPositions.forEach((distance, position) => {
        alternatives = alternatives.push(position);
      });
      // No ways -> done
      if (alternatives.count() == 0) {
        console.debug('No way to try! Get stuck');
        break;
      }
      // Has ways -> try
      const alternative = alternatives.last();
      alternatives = alternatives.pop();
      this.state = this.state
        .set('currentPosition', alternative);
      // Try success
      if (alternative === this.environment.get('destination')) {
        console.debug('Done after trying');
        break;
      }
      // Too long
      if (x == 200) {
        console.debug('Maybe loop forever');
        break;
      }
    }
    var end = moment();
    console.log('Path', this.state.get('path').toJS());
    console.debug(end.diff(start, 'mil'), 'mil');
  }

}
