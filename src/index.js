import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

let alert초기값 = true

function reducer2(state = alert초기값, 액션) {
  if (액션.type === '닫기') {
    return !state
  }
  return state
}

let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '좋은신발', quan: 3 },
  { id: 2, name: '높은신발', quan: 5 },
]
//데이터 수정 방법 !!!!
//기본파라미터
function reducer(state = 초기값, 액션) {
  if (액션.type === '항목추가') {
    //state안에 id가 액션.데이터인게 있냐??
    let found = state.findIndex((a) => {
      return a.id === 액션.payload.id
    })

    if (found >= 0) {
      let copy = [...state]
      copy[found].quan++
      return copy
    } else {
      let copy = [...state]
      copy.push(액션.payload)
      return copy
    }
  } else if (액션.type === '수량증가') {
    let copy = [...state]
    copy[액션.payload].quan++
    return copy
  } else if (액션.type === '수량감소') {
    let copy = [...state]
    copy[액션.payload].quan--
    return copy
  } else {
    return state
  }
}

//combineReducers 모든 reducer
let store = createStore(combineReducers({ reducer, reducer2 }))

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
