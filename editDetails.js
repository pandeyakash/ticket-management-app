const url = `http://localhost:1818/tickets`;
let id = localStorage.getItem("editID");
console.log(id);

const form = document.querySelector("form");

getData();

async function getData() {
  let response = await fetch(url);
  let data = await response.json();
  displayData(data);
}

function displayData(data) {
  data.forEach((ele) => {
    if (ele.id == id) {
      document.getElementById("task-title").value = ele.title;
      document.getElementById("task-description").value = ele.description;
      document.getElementById("task-dueDate").value = ele.dueDate;
      document.getElementById("task-status").value = ele.status;
    }
  });
}

form.addEventListener("submit", () => {
  event.preventDefault();
  let title = document.getElementById("task-title").value;
  let description = document.getElementById("task-description").value;
  let dueDate = document.getElementById("task-dueDate").value;
  let status = document.getElementById("task-status").value;
  let data = {
    title,
    description,
    status,
    dueDate,
  };
  updateData(data);
  window.location.href = "index.html";
});

async function updateData(data) {
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
