const SERVER_ADDRESS = 'https://localhost:5001'
const RESOURCE = 'tasks'

export const fetchTasksApi = async (route = `${SERVER_ADDRESS}/${RESOURCE}`) => {
  try {
    const res = await fetch(route)
    const data = await res.json()
    return data
  }
  catch (error) {
    console.log("Error fetching tasks");
    return false;
  }
}

export const fetchTaskApi = async (id) => {
  try {
    const res = await fetch(`${SERVER_ADDRESS}/${RESOURCE}/${id}`)
    const data = await res.json()
    return data
  }
  catch (error) {
    console.log("Error fetching tasks");
    return false;
  }
}

export const addTaskApi = async (newTask) => {
  try {
    const res = await fetch(`${SERVER_ADDRESS}/${RESOURCE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })

    const data = await res.json()
    return data
  }
  catch (error) {
    console.log("Error adding task", newTask);
    return false;
  }
}

export const deleteTaskApi = async (id) => {
  try {
    await fetch(`${SERVER_ADDRESS}/${RESOURCE}/${id}`, {
      method: 'DELETE'
    })
    return true;
  }
  catch (error) {
    console.log("Error deleting", id);
    return false;
  }
}

export const updateTaskApi = async (id, taskBody) => {
  try {
    await fetch(`${SERVER_ADDRESS}/${RESOURCE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(taskBody)
    })
    return true;
  }
  catch (error) {
    console.log("Error updating task", id);
    return false;
  }
}

