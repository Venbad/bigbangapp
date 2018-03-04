import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AddFriend/>
      </div>
    );
  }
}

class AddFriend extends Component {
   constructor(props) {
    super(props);
    this.state = {
      value: [],	
	  filter : 0,
	  guests : 0,
      changeName: -1
    }

    
    this.keyCount = 0
    this.handleFilter = this.handleFilter.bind(this)
    this.getKey = this.getKey.bind(this)
	this.handleCheck = this.handleCheck.bind(this)
    this.handleDelTodoItem = this.handleDelTodoItem.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    
  }
  
  
  getKey(){
    return this.keyCount++
}
  
  
  handleDelTodoItem(v){
	let array = this.state.value
  	array.splice(v, 1)
  	this.setState({value: array })
    console.log(this.state.value)
    this.guestsNumber()
  }
  
  
  
  handleKeyPress = (e) => { 
    if (e.key === 'Enter') {
    	if(this.refs.nameInput.value !== ""){
    		var str = this.refs.nameInput.value.trim()
    		if(str !==""){
      this.state.value.push({name: str, flag: false})
      this.refs.nameInput.value = ''
    this.guestsNumber()
    }
  }
  }
  }
 
  
  
  handleChangeName(e) {
  	this.setState({changeName: e})
    console.log('do validate')
  }
  
  handleCheck(i) {
  	let stateCopy = this.state.value.slice()
  	stateCopy[i].flag = !stateCopy[i].flag
  	this.setState({value: stateCopy })
    console.log(this.state.value)
    this.guestsNumber()
  }
 
 
 guestsNumber(){
 	var g=0
 	for(var i = 0; i < this.state.value.length; i++){
      if(this.state.value[i].flag === true){
         g++
      }
      g++
    }
    this.setState({guests: g})
    localStorage.setItem('guests', JSON.stringify(this.state.value))
 } 
 
 
 componentDidMount(){
	this.guestsNumber()
 }
 
 
 componentWillMount(){
 	if(localStorage.getItem('guests') !== null){
		this.setState({value: JSON.parse(localStorage.getItem('guests'))})
	}	
 }
 
 
 handleFilter(v){
 	this.setState({filter: v})
 	console.log(this.state.filter)
 }
  
  
  handleConfirm(e){
  	if(this.refs['nameChange' + e].value === ""){
  	this.handleDelTodoItem(e)
  	this.refs['nameChange' + e].value = ''
  }
  else
  {
  	let stateCopy = this.state.value.slice()
  	stateCopy[e].name = this.refs['nameChange' + e].value
  	this.setState({value: stateCopy })
  	this.guestsNumber()
  }
  console.log(this.state.value)
  this.setState({changeName: -1})
  }
  
  
  
  render() {
    let { value } = this.state;
    return (
      <div>   
        <input autoFocus={true} className="text" type="text" placeholder="Введите имя гостя" onKeyPress={this.handleKeyPress} ref="nameInput" />
        {value.map((v, i) => {
          return <div key={this.getKey()} style={(v.flag === true && this.state.filter === 1)||(v.flag === false && this.state.filter === 2) ? {display: 'none'} : {}}>
          <h1 className="other">
          	<a className="font" onDoubleClick={this.handleChangeName.bind(this, i)} style={(this.state.changeName === i) ? {display: 'none'} : {}}>
           		{ v.name } 
           	</a>
           	<input className="text2" type="text" defaultValue={v.name} style={(this.state.changeName === i) ? {} : {display: 'none'}} ref={'nameChange' + i} onBlur={this.handleConfirm.bind(this, i)} />  придет с парой:  <input type="checkbox" onChange={this.handleCheck.bind(this, i)} defaultChecked={v.flag}/>
           	<button className="allbutton" onClick={this.handleDelTodoItem.bind(this, i)}>Удалить</button>
           </h1>
        </div>
          
        })}
        <div><h1> Всего гостей: {this.state.guests}</h1></div>
        <div><h1>
        Фильтр: <button className="allbutton" onClick={this.handleFilter.bind(this, 2)}>С парой</button>
        <button className="allbutton" onClick={this.handleFilter.bind(this, 1)}>Без пары</button>
        <button className="allbutton" onClick={this.handleFilter.bind(this, 0)}>Все</button>
        </h1></div>
      </div>
    )
  }
}
export default App;
