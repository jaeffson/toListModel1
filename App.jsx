/* eslint-disable no-unused-vars */
import { useState } from "react"
import { v4 as uuid } from "uuid"
import { Container, ContainerItems, ListItem } from "./Components/styles"

import { FcFullTrash, FcCheckmark } from "react-icons/fc"




function App() {
  const [list, setList] = useState([])
  const [task, setTask] = useState('')
  const [error, setError] = useState("")

  function input(event) {
    setTask(event.target.value)

  }

  function addList() {
    if (task === "") {
      setError("O campo não pode ficar vazio!");
      return error;
    }

    setList([...list, { id: uuid(), task, finished: false }])
    setTask("") // Limpa o campo de entrada após adicionar o item
    setError("") // Limpa a mensagem de erro após adicionar o item
  }
  function endTask(id) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item
    )
    setList(newList);
  }
  function deleteTask(id) {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }


  return (

    <Container >
      <ContainerItems>
        <input className="input-value"
          onChange={input}
          placeholder="Oque tenho para fazer..."
          value={task}
        ></input>
        <button onClick={addList} >Adicionar</button>

        <ul>

          {list.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <ListItem key={item.id} isfinished={item.finished}>
              <FcCheckmark onClick={() => endTask(item.id)} />
              <li>{item.task}</li>
              <FcFullTrash onClick={() => deleteTask(item.id)} />
            </ListItem>
          ))}
        </ul>
      </ContainerItems>

    </Container>

  )

}

export default App
