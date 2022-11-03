const requestURL = 'rooms.json';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = processData;

function processData() {
    const data = request.response;
    const projects = data.projects;
    populateProjectsCardGrid(projects);
}

function populateProjectsCardGrid(projects) {
    const populateRoomsCard = document.querySelector('.main__grid--container');

    if (projects.length > 0) {
        projects.forEach(project => {
            const divRooms = createElement('article', populateRoomsCard);
            const divLockers = createElement('div', divRooms)
            const titleRooms = createElement('h2', divLockers);
            titleRooms.textContent = project.name;

            const clientH2 = createElement('h2', divRooms);
            clientH2.textContent = project.client;

            const summaryDiv = createElement(
                'div',
                divRooms,
                'project-summary',
            );

            const summaryPara = createElement('p', summaryDiv);
            summaryPara.textContent = project.summary;

            if (
                project.technologystack !== undefined &&
                project.technologystack.length > 0
            ) {
                const technologyDiv = createElement(
                    'div',
                    divRooms,
                    'project-technology',
                );
                const technologyUL = createElement('ul', technologyDiv);
                project.technologystack.forEach(item => {
                    const itemLI = createElement('li', technologyUL);
                    itemLI.textContent = item;
                });
            }
        });
    }
}

// createElement helper function
function createElement(type, parent, classList) {
    const element = document.createElement(type);
    if (classList !== undefined) {
        typeof classList === 'Array' && classList.length > 0
            ? element.classList.add(...classList)
            : (element.className = classList);
    }
    parent.append(element);
    return element;
}

const hamburger = document.querySelector(".navigation__burger");
const navMenu = document.querySelector(".navigation__ul");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))