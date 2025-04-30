import { useState } from 'react'
import Form from './Form'
import { ToastContainer, toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import Items from './Items'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    list = JSON.parse(localStorage.getItem('list'))
  } else {
    list = []
  }
  return list
}

const setLocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items))
}

const App = () => {
  const [items, setItems] = useState(getLocalStorage)

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    }
    const newItems = [...items, newItem]
    setItems(newItems)
    setLocalStorage(newItems)
    toast.success('Item added to the List')
  }

  const removeItem = (itemId) => {
    const deleteItem = items.filter((item) => item.id !== itemId)
    setItems(deleteItem)
    setLocalStorage(deleteItem)
    toast.success('Item successfully deleted in the List')
  }

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed }
        return newItem
      }
      return item
    })
    setItems(newItems)
    setLocalStorage(newItems)
  }
  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
      <ToastContainer position="top-center" />
    </section>
  )
}

export default App
