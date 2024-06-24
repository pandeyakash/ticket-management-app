const url = `http://localhost:1818/tickets`;

const ticketContainer = document.querySelector(".container");

getData();

async function getData() {
  let response = await fetch(url);
  let data = await response.json();
  displayData(data);
}

function displayData(data) {
  ticketContainer.innerHTML = "";
  data.forEach((ele) => {
    let card = document.createElement("tr");
    card.classList.add("card");

    let title = document.createElement("th");
    title.textContent = ele.title;

    let description = document.createElement("td");
    description.textContent = ele.description;

    let status = document.createElement("td");
    status.textContent = ele.status;

    let dueDate = document.createElement("td");
    dueDate.textContent = ele.dueDate;

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    let editC = document.createElement("td");
    editC.append(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    let deleteC = document.createElement("td");
    deleteC.append(deleteBtn);

    card.append(title, description, status, dueDate, editC, deleteC);

    ticketContainer.append(card);

    status.addEventListener("click", () => {
      if (ele.status === "Open") {
        status.textContent = "Close";
        let obj = {
          status: "Close",
        };
        updateData(obj, ele.id);
        getData();
      } else {
        let obj = {
          status: "Open",
        };
        status.textContent = "Open";
        updateData(obj, ele.id);
        getData();
      }
    });

    deleteBtn.addEventListener("click", async () => {
      await fetch(`${url}/${ele.id}`, {
        method: "DELETE",
      });
      ticketContainer.innerHTML = "";
      getData();
    });

    editBtn.addEventListener("click", () => {
      localStorage.setItem("editID", ele.id);
      window.location.href = "editDetails.html";
    });
  });
}

async function updateData(data, id) {
  await fetch(`${url}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
