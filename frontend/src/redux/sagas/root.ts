import { all } from 'redux-saga/effects'
import studentSagaListener from 'redux/sagas/students'

export function* rootSaga() {
  yield all([...studentSagaListener])
}
