import './App.css';
import { useState } from 'react';

function App() {

  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);
  const [mouseOverItemIndex, setMouseOverItemIndex] = useState(-1);
  
  const addItem = () => {
    if (item == '') {
      return;
    }
    setItems([...items, {value: item, checked: false}]);
    setItem('');
  }

  const addHandler = () => {
    addItem();
  }

  const inputKeyDownHandler = (event) => {
    if (event.keyCode === 13) {
      addItem();
    }
  }

  const removeHandler = (index) => {
    setItems(items.filter((item, i) => i != index));
  }

  const onCheckboxClickHandler = (event, index) => {
    const updatedItems = items.map((item, i) => {
      if (i === index) {
        item.checked = event.target.checked;
      }
      return item;
    });
    setItems(updatedItems);
  }

  return (
    <div className="app">
      <div className="card">
        <h2 className="title">Todo App</h2>
        <div className="inputContainer">
          <input className="input" value={item} onKeyDown={inputKeyDownHandler} onChange={(event) => setItem(event.target.value)}></input>
          <button className="addButton" onClick={addHandler}></button>
        </div>
        <ul className="list">
          {items.map((element, index) => (
            <li key={index} className="listItem" onMouseOver={() => setMouseOverItemIndex(index)} onMouseOut={() => setMouseOverItemIndex(-1)}>
              <div className="itemContainer">
                <div className="labelContainer">
                  <input type="checkbox" checked={element.checked} onChange={(event) => onCheckboxClickHandler(event, index)}></input>
                  <label>{element.value}</label>
                </div>
                <button onClick={() => removeHandler(index)} className={mouseOverItemIndex === index ? 'removeButtonShown' : 'removeButtonHidden'}></button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          You have {items.filter(item => !item.checked).length} pending tasks.
        </div>
      </div>
    </div>
  );
}

export default App;
