const navbaContent = document.getElementById("navbar-content");
const menuBtns = document.querySelectorAll(".btn-bottom");

// PAGES
const profilePage = document.getElementById("profile-page");
const listPage = document.getElementById("list-page");
const contactsPage = document.getElementById("contacts-page");
const settingsPage = document.getElementById("settings-page");

// PROFILE
const profileCard = document.getElementById("card-profile");
const profileForm = document.getElementById("profile-form");
const btnEditProfile = document.getElementById("btn-edit-profile");
const btnSaveProfile = document.getElementById("btn-save-profile");
const profileName = document.getElementById("profile-name");
const profileDescription = document.getElementById("profile-description");

// CONTACTS
const contactsList = document.getElementById("contacts-list");
const searchContactsForm = document.getElementById("contacts-search-form");
const btnAddContact = document.getElementById("btn-add-contact");
const addContactForm = document.getElementById("add-contact-form");
/* const modalCreateContact = document.getElementById("modal-create-contact"); */

// SETTINGS
const btnClearStore = document.getElementById("btn-clear-store");
const switchTheme = document.getElementById("switch-theme");

// TODO LIST
const toDoList = document.getElementById("to-do-list");
const createTaskForm = document.getElementById("create-task-form");
const editTaskForm = document.getElementById("edit-task-form");
const deleteTaskForm = document.getElementById("delete-task-form");
const taskName = document.querySelector("#modal-delete-task #task-name");

// INITIAL OBJECTS
const user = {
  name: "Анастасия",
  description: "Фронтендерка",
};

let contacts = [
  { name: "Стив Джобс", mobile: "8979873498732" },
  { name: "Стив Возняк", mobile: "3675423475" },
  { name: "Балмер", mobile: "765467253467" },
];

let taskList = [
  {
    name: "Сделать домашку",
    done: false,
  },
  {
    name: "Сделать уборку",
    done: true,
  },
  {
    name: "Изучить БЭМ",
    done: false,
  },
  {
    name: "Пройти курсы JS",
    done: false,
  },
  {
    name: "Приготовить ужин",
    done: true,
  },
  {
    name: "Сходить на голосование",
    done: false,
  },
];

const createContactItem = (contact) =>
  `
        <li class="list-group-item">
            ${contact.name}
            <div>
                <small>${contact.mobile}</small>
            </div>
        </li>
    `;

const renderContacts = (contacts) => {
  contactsList.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const currentContact = contacts[i];
    contactsList.innerHTML += createContactItem(currentContact);
  }
};

const createTask = (task) => {
  const taskElem = document.createElement("li");
  taskElem.className = `list-group-item d-flex justify-content-between ${
    task.done && "done"
  }`;
  taskElem.innerHTML = `
        <div class="to-do-list-item-text">${task.name}</div>
        <div class="list-controls">
            <button class="btn btn-task btn-edit-task"
             data-toggle="modal"
             data-target="#modal-edit-task">
                <svg class="btn-icon">
                    <use xlink:href="./img/icons.svg#pencil"></use>
                </svg>
            </button>
            <button class="btn btn-task btn-delete-task"
             data-toggle="modal"
             data-target="#modal-delete-task">
                <svg class="btn-icon">
                    <use xlink:href="./img/icons.svg#trash"></use>
                </svg>
            </button>
        </div>
  `;
  return taskElem;
};

const renderToDoList = (taskList) => {
  toDoList.innerHTML = "";

  taskList.forEach((task, index) => {
    const newTask = createTask(task);
    toDoList.append(newTask);

    newTask.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.closest(".btn-edit-task")) {
        editTaskForm["name"].value = task.name;
        editTaskForm["name"].dataset.index = index;
      } else if (e.target.closest(".btn-delete-task")) {
        taskName.textContent = task.name;
        taskName.dataset.index = index;
      } else {
        taskList[index].done = !task.done;
        renderToDoList(taskList);
        localStorage.setItem("taskList", JSON.stringify(taskList));
      }
    });
  });
};

const changeNavbarContent = (value) => {
  navbaContent.innerText = value;
};

const changeProfileContent = (name, description) => {
  profileName.innerText = name;
  profileDescription.innerText = description;
};

const initialApp = () => {
  const savedName = localStorage.getItem("name");
  const savedDescription = localStorage.getItem("description");
  const savedContacts = localStorage.getItem("contacts");
  const savedTaskList = localStorage.getItem("taskList");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    switchTheme.classList.add("switch-active");
    switchTheme.setAttribute("data-checked", "1");
  }

  // Проверка на сохранённые имя и описание
  if (savedName) {
    user.name = savedName;
  }

  if (savedDescription) {
    user.description = savedDescription;
  }

  // Проверка сохраннённых контактов
  if (savedContacts) {
    contacts = JSON.parse(savedContacts);
  }

  // Проверка сохранненного списка задач
  if (savedTaskList) {
    taskList = JSON.parse(savedTaskList);
  }

  profilePage.style.display = "none";
  settingsPage.style.display = "none";
  listPage.style.display = "block";
  contactsPage.style.display = "none";

  profileForm.style.display = "none";

  menuBtns[2].classList.add("active");

  changeNavbarContent("Список");
  changeProfileContent(user.name, user.description);
  renderContacts(contacts);
  renderToDoList(taskList);

  profileForm["name"].value = user.name;
  profileForm["description"].value = user.description;
};

const menuBtnsBindEvent = () => {
  menuBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pageName = btn.getAttribute("data-pagename");
      const path = btn.getAttribute("data-path");

      changeNavbarContent(pageName);
      switchPage(path);

      document.querySelector(".btn-bottom.active")?.classList.remove("active");
      btn.classList.add("active");
    });
  });
};

const switchPage = (activePage) => {
  switch (activePage) {
    case "profile":
      profilePage.style.display = "block";
      settingsPage.style.display = "none";
      listPage.style.display = "none";
      contactsPage.style.display = "none";
      break;

    case "list":
      profilePage.style.display = "none";
      listPage.style.display = "block";
      contactsPage.style.display = "none";
      settingsPage.style.display = "none";
      break;

    case "contacts":
      profilePage.style.display = "none";
      listPage.style.display = "none";
      contactsPage.style.display = "block";
      settingsPage.style.display = "none";
      break;

    case "settings":
      profilePage.style.display = "none";
      listPage.style.display = "none";
      contactsPage.style.display = "none";
      settingsPage.style.display = "block";
      break;
  }
};

const switchProfileForm = (showProfileForm) => {
  if (showProfileForm) {
    profileForm.style.display = "block";
    profileCard.style.display = "none";
    showProfileForm = false;
    return;
  }

  profileForm.style.display = "none";
  profileCard.style.display = "block";
  showProfileForm = true;
  return;
};

btnEditProfile.addEventListener("click", () => {
  switchProfileForm(true);
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Сохраняем изменные данные
  // F12 -> Application -> storage
  localStorage.setItem("name", profileForm["name"].value);
  localStorage.setItem("description", profileForm["description"].value);

  changeProfileContent(
    profileForm["name"].value,
    profileForm["description"].value
  );
  switchProfileForm(false);
});

searchContactsForm["search-query-contacts"].addEventListener("input", () => {
  const query = searchContactsForm["search-query-contacts"].value;
  const filtredContacts = contacts.filter((contact) =>
    contact.name.includes(query)
  );

  renderContacts(filtredContacts);
});

addContactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = addContactForm["name"].value;
  const mobile = addContactForm["mobile"].value;

  if (name.length && mobile.length) {
    contacts.unshift({ name, mobile });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContacts(contacts);

    addContactForm["name"].value = "";
    addContactForm["mobile"].value = "";
  }
  $("#modal-create-contact").modal("hide");
});

btnClearStore.addEventListener("click", () => {
  if (localStorage.length > 0) {
    const userAnswer = confirm("Вы уверены что хотите очистить localstorage?");

    if (userAnswer) {
      localStorage.clear();
      changeProfileContent(user.name, user.description);
      renderContacts(contacts);
      renderToDoList(taskList);
    }
  }
});

switchTheme.addEventListener("click", () => {
  const checked = switchTheme.getAttribute("data-checked");
  switchTheme.classList.toggle("switch-active");
  document.body.classList.toggle("theme-dark");

  if (checked === "0") {
    switchTheme.setAttribute("data-checked", "1");
    localStorage.setItem("theme", "dark");
  } else {
    switchTheme.setAttribute("data-checked", "0");
    localStorage.setItem("theme", "light");
  }
});

deleteTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = taskName.dataset.index;
  taskList.splice(index, 1);
  renderToDoList(taskList);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  $("#modal-delete-task").modal("hide");
  taskName.textContent = "";
  taskName.removeAttribute("data-index");
});

createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = createTaskForm["name"].value;
  if (name.length) {
    taskList.push({
      name,
      done: false,
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderToDoList(taskList);
    createTaskForm["name"].value = "";
  }
  $("#modal-create-task").modal("hide");
});

editTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = editTaskForm["name"].value;
  const index = editTaskForm["name"].dataset.index;
  if (name.length) {
    taskList[index] = {
      name,
      done: false,
    };
    localStorage.setItem("taskList", JSON.stringify(taskList));
    renderToDoList(taskList);
    editTaskForm["name"].value = "";
    editTaskForm["name"].removeAttribute("data-index");
  }
  $("#modal-edit-task").modal("hide");
});

initialApp();
menuBtnsBindEvent();
