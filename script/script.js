const issuesContainer = document.getElementById("issuesContainer");
const issueCount = document.getElementById("issueCount");
const buttons = document.querySelectorAll("#btnContener button");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");

const modal = document.getElementById("my_modal_3");
const modalContent = document.getElementById("modalContent");

let allIssues = [];

async function loadIssue(){

    loader.classList.remove("hidden");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    allIssues = data.data;

    displayIssues(allIssues);

    loader.classList.add("hidden");
}

function displayIssues(issues){

    issuesContainer.innerHTML = "";
    issueCount.innerText = issues.length + " Issues";

    issues.forEach(issue =>{

        const div = document.createElement("div");

        const border =
        issue.status === "open"
        ? "border-green-500"
        : "border-purple-500";

        const icon =
        issue.status === "open"
        ? "./assets/Open-Status.png"
        : "/assets/Closed- Status .png";

        div.className =
        `bg-white p-5 rounded-xl shadow border-t-4 ${border} cursor-pointer`;

        div.innerHTML = `
        <div class="flex justify-between items-start">
            <div class="bg-green-100 p-2 rounded-full">
                <img src="${icon}" class="w-5">
            </div>

            <div class="bg-red-100 text-red-500 px-4 py-1 rounded-full text-sm font-semibold">
                ${issue.priority}
            </div>
        </div>

        <h2 class="font-bold text-xl mt-4 text-gray-800">
        ${issue.title}
        </h2>

        <p class="text-gray-500 mt-2 line-clamp-2">
        ${issue.description}
        </p>

        <div class="flex gap-3 mt-4">
            <span class="border border-red-300 text-red-500 px-3 py-1 rounded-full text-sm">
            ${issue.category}
            </span>

            <span class="border border-yellow-400 text-yellow-600 px-3 py-1 rounded-full text-sm">
            ${issue.labels[0]}
            </span>
        </div>

        <div class="border-t mt-5 pt-3 text-gray-500 text-sm">
            <p>${issue.id} by ${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div>
        `;

        div.addEventListener("click", () =>{
            openIssueModal(issue);
        });

        issuesContainer.appendChild(div);
    });
}
function openIssueModal(issue){

    modalContent.innerHTML = `
        <h2 class="text-2xl font-bold mb-3">
        ${issue.title}
        </h2>

        <p class="text-gray-600 mb-4 line-clamp-2">
        ${issue.description}.line-clamp-2
        </p>

        <div class="flex gap-2 mb-4">
            <span class="border px-3 py-1 rounded text-red-500">
            Priority : ${issue.priority}
            </span>

            <span class="border px-3 py-1 rounded text-blue-500">
            Category : ${issue.category}
            </span>

            <span class="border px-3 py-1 rounded text-green-500">
            Status : ${issue.status}
            </span>
        </div>

        <div class="text-sm text-gray-500">
            <p><b>Author :</b> ${issue.author}</p>
            <p><b>ID :</b> ${issue.id}</p>
            <p><b>Created :</b> ${issue.createdAt}</p>
        </div>
    `;

    modal.showModal();
}

buttons.forEach(button =>{

    button.addEventListener("click", () =>{

        buttons.forEach(btn =>
        btn.classList.remove("btn-primary"));

        button.classList.add("btn-primary");

        const status = button.dataset.status;

        if(status === "all"){
            displayIssues(allIssues);
        }
        else{

            const filtered =
            allIssues.filter(issue =>
            issue.status === status);

            displayIssues(filtered);
        }

    });

});

searchInput.addEventListener("input", () =>{

    const query =
    searchInput.value.toLowerCase();

    const filtered =
    allIssues.filter(issue =>

        issue.title
        .toLowerCase()
        .includes(query)

        ||

        issue.description
        .toLowerCase()
        .includes(query)

    );

    displayIssues(filtered);

});

window.addEventListener("load", () =>{

    loader.classList.remove("hidden");

    setTimeout(() =>{

        loader.classList.add("hidden");

    },500);

});

loadIssue();