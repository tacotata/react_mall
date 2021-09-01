import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { Nav } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import './Detail.scss'
import { 재고context } from './App'
import { CSSTransition } from 'react-transition-group'
import './Detail.scss'
import { connect } from 'react-redux'
let 박스 = styled.div`
  padding: 20px;
`
let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`

// class Detail2 extends React.Component {
//   componentDidMount(){

//   }

//   componentWillUnmount(){

//   }

// }

function Detail(props) {
  let [alert, alert변경] = useState(true)
  let [inputData, inputData변경] = useState('')
  let [누른탭, 누른탭변경] = useState(0)
  let [스위치, 스위치변경] = useState(false)
  let 재고 = useContext(재고context)
  useEffect(() => {
    // axios.get()

    let 타이머 = setTimeout(() => {
      alert변경(false)
    }, 2000)
    console.log('안녕')
    return () => {
      clearTimeout(타이머)
    }
  }, [])

  // return function 어쩌고(){실행할 코드}
  //사라질 때 실행(unmount) 이름 귀찮아 그럼 화살표함수

  // useEffect여러개 실행해도 되고 적은 순서대로 실행됨

  let { id } = useParams()
  let history = useHistory()
  let 찾은상품 = props.shoes.find(function (상품) {
    return 상품.id == id
  })
  return (
    <div className="container">
      <박스>
        <제목 className="red">상세페이지</제목>
      </박스>

      <input
        onChange={(e) => {
          inputData변경(e.target.value)
        }}
      />

      {alert === true ? <Alert /> : null}
      {/* <div className="my-alert2">
        <p>재고가 얼마 남지 않았습니다.</p>
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <Info 재고={props.재고} />
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 11])
              props.dispatch({
                type: '항목추가',
                payload: { id: 찾은상품.id, name: 찾은상품.title, quan: 1 },
              })
              // 개발환경에서 ㅠㅔ이지 이동시 강제 새로고침 안함
              history.push('/cart')
            }}
          >
            주문하기
          </button>
          &nbsp;
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack()
              //   history.push('/')
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              누른탭변경(0)
              스위치변경(false)
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              누른탭변경(1)
              스위치변경(false)
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  )
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true)
  })

  if (props.누른탭 === 0) {
    return <div>000</div>
  } else if (props.누른탭 === 1) {
    return <div>1111</div>
  } else if (props.누른탭 === 1) {
    return <div>222</div>
  }
}

function Alert() {
  return (
    <div className="my-alert2">
      <p>재고가 얼마 남지 않았습니다.</p>
    </div>
  )
}

function 함수명(state) {
  console.log(state)
  return {
    //state를 props화 해주세요
    state: state.reducer,
    alert열렸니: state.reducer2,
  }
}

function Info(props) {
  return <p>재고:{props.재고[0]} </p>
}
export default connect(함수명)(Detail)
