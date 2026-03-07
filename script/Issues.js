const issuesContainer = document.getElementById("issuesContainer")
const issueCount = document.getElementById("issueCount")

async function loadIssue(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    displayIssues(data.data)
}

loadIssue()

function displayIssues(issues){
    issuesContainer.innerHTML = ""
    issueCount.innerText = issues.length + " Issues"

    issues.forEach(issue =>{
        const div = document.createElement("div")

 const border =issue.status === "open" ? "border-green-500":"border-purple-500"

 div.className =`bg-white p-5 rounded-xl shadow border-t-4 ${border}`
 
 div.innerHTML = ` <div class="flex justify-between items-start">
                 <div class="bg-green-100 p-2 rounded-full">
                 <img src="./assets/Aperture.png" class="w-5">
                 </div>
                 
                 <div class="bg-red-100 text-red-500 px-4 py-1 rounded-full text-sm font-semibold">
                 ${issue.priority}
                 </div>
                 
                 </div>
                 
                 
                 <h2 class="font-bold text-xl mt-4 text-gray-800">
                 ${issue.title}
                 </h2>
                 
                 
                 <p class="text-gray-500 mt-2">
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
                 
`
        issuesContainer.appendChild(div)
    })
}