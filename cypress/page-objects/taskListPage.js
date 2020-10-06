export default class TaskList {
  constructor() {
    this.itemBtn = '[data-qa="addItemBtn"]'
    this.textField = '[data-qa="textField"]'
    this.checkItem = '[data-qa="checkItem"]'
    this.deleteItem = '[data-qa="deleteItem"]'
  }
  visitPage() {
    cy
      .visit('http://localhost:1234/')
      .wait(1000)
      .get(this.textField).click()
  }
  addItem() {
    cy
      .get(taskList.textField).type('rice')
      .get(taskList.itemBtn).click()
  } 
}