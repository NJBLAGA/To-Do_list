let list = retrieveArray()
const domList = document.getElementById("dom-list")

function retrieveArray() {
    const listString = localStorage.getItem("list")
    return JSON.parse(listString || "[]")
}

function addToArray(item) {
    list.push(item)
    localStorage.setItem("list", JSON.stringify(list))
}

function addStrikeOutEvent(node) {
    node.addEventListener("click", () => {
        const arrayItem = list[parseInt(node.id)]
        arrayItem.completed = !arrayItem.completed
        localStorage.setItem("list", JSON.stringify(list))
        node.classList.toggle("strike-out")
    })
}

function buildListItem(todo, nextIndex) {
    const listItem = document.createElement("li")
    listItem.id = nextIndex
    const text = document.createTextNode(todo.content) //had to use strike through with a innertext
    if (todo.completed) {
        listItem.classList.add("strike-out")
    }
    addStrikeOutEvent(listItem)
    listItem.appendChild(text)
    domList.appendChild(listItem)
}

function buildList() {
    list.forEach((item, index) => buildListItem(item, index));
}

function createErrorP(message) {
    const errorPara = document.getElementById("error")
    errorPara.textContent = message
    setTimeout(() => {
        errorPara.textContent = ""
    }, 2000)

}

function onSubmit(event) {
    event.preventDefault()
    console.log(event)
    const input = document.getElementById("text-input")
    if (!input.value) {
        createErrorP("Input cannot be empty")
        return
    }
    const todo = { content: input.value, completed: false }
    buildListItem(todo, list.length)
    addToArray(todo)
    input.value = ""
}
window.addEventListener("load", buildList)

document.getElementById("form").addEventListener("submit", onSubmit)