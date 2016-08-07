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
 * Hoàn thành mục tiêu - go
 * Đạt được mục tiêu - isAchievedGoal
 */
const log = console.log.bind(console);
export class Agent {
  constructor(environment = immutable.Map({}), initialState = immutable.Map({})) {
    this.state = initialState;
    this.environment = environment;
  }

  go(currentPosition, goal, path) {
    if (currentPosition === goal) {
      return path.push(goal);
    }
    const nextInformedPositions = this.environment.getIn(['maps', currentPosition]);
    const prioritizedPositions = nextInformedPositions
      .sortBy(function (distance, position) {
        return position;
      }, (positionA, positionB) => (positionA > positionB) ? -1 : 1);
    for (let position of prioritizedPositions.keys()) {
      let newPath = this.go(position, goal, path.push(currentPosition));
      if (newPath) return newPath;
    }
  }

  live() {
    var start = moment();
    var path = this.go(this.state.get('startPosition'),
      this.environment.get('destination'),
      immutable.List());
    if (path) {
      console.debug(path.toJS());
    } else {
      console.debug('Not found');
    }
    var end = moment();
    console.debug(end.diff(start, 'mil'), 'mil');
  }

}
