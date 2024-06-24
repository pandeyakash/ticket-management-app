const url = `http://localhost:1818/tickets`;

const form = document.querySelector("form");

form.addEventListener("submit", () => {
  event.preventDefault();
  let title = document.querySelector("#task-title").value;
  let description = document.querySelector("#task-description").value;
  let dueDate = document.querySelector("#task-dueDate").value;
  let status = document.querySelector("#task-status").value;

  putData(title, description, status, dueDate);
});

async function putData(title, description, status, dueDate) {
  let obj = {
    title,
    description,
    status,
    dueDate,
  };
  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  window.location.href = "index.html";
}
