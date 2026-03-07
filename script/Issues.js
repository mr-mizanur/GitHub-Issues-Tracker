const issusesContainer = document.getElementById("issuesContainer")
const issuseCount = document.getElementById("issueCount ")

async function loadIssuse(){
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()

    displayIssues(data.data)
 }
 loadIssuse()