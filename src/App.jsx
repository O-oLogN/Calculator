import { useSelector, useDispatch } from 'react-redux';
import { clickButtonAction } from './actions';
import { Provider } from 'react-redux';
import { store } from './store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

const AppContainer = () => {
  const str = useSelector(state => state.onButtonClickReducer);
  return (
    <>
      <div id="container">
        <Screen id="screen-top" value={str.topScreen} />
        <Screen id="screen-bottom" value={str.bottomScreen}/>
        <Keyboard />
      </div>
      <p id="text">Designed and Coded By</p>
      <p id="author">OLogN</p>
    </>
  );
};

const Screen = ({ id, value }) => {
  return (
    <div className="screen" id={ id }>{ value }</div>
  );
};

const Keyboard = () => {
  const dispatch = useDispatch();

  return (
    <div id="keyboard">
      <FirstRow dispatch={ dispatch } />
      <SecondRow dispatch={ dispatch }/>
      <ThirdRow dispatch={ dispatch } />
      <FourthRow dispatch={ dispatch } />
      <FifthRow dispatch={ dispatch } />
      <EqualButton dispatch={ dispatch } />
    </div>
  );
};

const FirstRow = ({ dispatch }) => {
  return (
    <div id="first-row">
      <button onClick={ () => dispatch(clickButtonAction("AC")) } id="AC">AC</button>
      <button onClick={ () => dispatch(clickButtonAction("/")) } id="divide">/</button>
      <button onClick={ () => dispatch(clickButtonAction("*")) } id="multiply">x</button>
    </div>
  );
};

const SecondRow = ({ dispatch }) => {
  return (
    <div id="second-row">
      <button onClick={ () => dispatch(clickButtonAction("7")) } id="seven">7</button>
      <button onClick={ () => dispatch(clickButtonAction("8")) } id="eight">8</button>
      <button onClick={ () => dispatch(clickButtonAction("9")) } id="nine">9</button>
      <button onClick={ () => dispatch(clickButtonAction("-")) } id="subtract">-</button>
    </div>
  );
};

const ThirdRow = ({ dispatch }) => {
  return (
    <div id="third-row">
      <button onClick={ () => dispatch(clickButtonAction("4")) } id="four">4</button>
      <button onClick={ () => dispatch(clickButtonAction("5")) } id="five">5</button>
      <button onClick={ () => dispatch(clickButtonAction("6")) } id="six">6</button>
      <button onClick={ () => dispatch(clickButtonAction("+")) } id="add">+</button>
    </div>
  );
};

const FourthRow = ({ dispatch }) => {
  return (
    <div id="fourth-row">
      <button onClick={ () => dispatch(clickButtonAction("1")) } id="one">1</button>
      <button onClick={ () => dispatch(clickButtonAction("2")) } id="two">2</button>
      <button onClick={ () => dispatch(clickButtonAction("3")) } id="three">3</button>
    </div>
  );
};

const FifthRow = ({ dispatch }) => {
  return (
    <div id="fifth-row">
      <button onClick={ () => dispatch(clickButtonAction("0")) } id="zero">0</button>
      <button onClick={ () => dispatch(clickButtonAction(".")) } id="dot">.</button>
    </div>
  );
};

const EqualButton = ({ dispatch }) => {
  return (
    <button onClick={ () => dispatch(clickButtonAction("=")) } id="equal">=</button>
  );
};

export default App;