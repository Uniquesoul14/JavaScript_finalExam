    const apiUrl = "https://api.rootnet.in/covid19-in/stats/latest";
    //array for the data
    let regionalData = [];

    // Fetch and display all data
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        regionalData = data.data.regional;
        displayData(regionalData);
      } 
      //to catch the errors if any there
      catch (error) {
        alert("Error fetching data.");
        console.error(error);
      }
    }

    // Display full or filtered data
    function displayData(data, highlightState = "") {
      const tbody = document.getElementById("covidTableBody");
      tbody.innerHTML = "";
      data.forEach((state, index) => {
        const total = state.confirmedCasesIndian + state.confirmedCasesForeign;
        const isHighlighted = state.loc.toLowerCase() === highlightState.toLowerCase();
        tbody.innerHTML += `
          <tr class="${isHighlighted ? 'highlight' : ''}">
            <td>${index + 1}</td>
            <td>${state.loc}</td>
            <td>${state.confirmedCasesIndian}</td>
            <td>${state.confirmedCasesForeign}</td>
            <td>${state.discharged}</td>
            <td>${state.deaths}</td>
            <td>${total}</td>
          </tr>
        `;
      });
    }

    // Fetch and display specific state, then revert to full
    function fetchSpecificState() {
      const input = document.getElementById("stateInput").value.trim();
      if (!input) return;
        //storing data in the server
      localStorage.setItem("lastSearchedState", input);
      const foundState = regionalData.find(state => state.loc.toLowerCase() === input.toLowerCase());

      if (foundState) {
        displayData(regionalData, input);
        setTimeout(() => displayData(regionalData), 3000); // Revert to full list after 3s
      } 
      //wrong typed errors
      else {
        alert("State not found!");
      }
    }

    // Load data on start 
    window.onload = () => {
      fetchData();
      //if need the last searched data //
    //   const lastState = localStorage.getItem("lastSearchedState");
    //   if (lastState) {
    //     document.getElementById("stateInput").value = lastState;
    //   }
    };
