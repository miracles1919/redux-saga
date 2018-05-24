import { fork, select, put, call, all, take } from 'redux-saga/effects';
import { selectedRedditSelector, postsByRedditSelector } from 'reducers/async/selectors';
import { requestPosts, receivePosts, INVALIDATE_REDDIT, SELECT_REDDIT } from 'actions/async';

function fetchPostsApi (reddit) {
  return fetch(`http://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => json.data.children.map(child => child.data));
}

function* fetchPosts (reddit) {
  yield put(requestPosts(reddit));
  const post = yield call(fetchPostsApi, reddit);
  yield put(receivePosts(reddit, post));
}

function* invalidateReddit () {
  while (true) {
    const { reddit } = yield take(INVALIDATE_REDDIT);
    yield call(fetchPosts, reddit);
  }
}

function* startup () {
  const selectedReddit = yield select(selectedRedditSelector);
  yield fork(fetchPosts, selectedReddit);
}

function* changeReddit () {
  const prevReddit = yield select(selectedRedditSelector);
  yield take(SELECT_REDDIT);
  const newReddit = yield select(selectedRedditSelector);
  const postsByReddit = yield select(postsByRedditSelector);
  console.log(postsByReddit);
  if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit);
}


export default function* async () {
  yield all([fork(startup), fork(invalidateReddit), fork(changeReddit)]);
}
