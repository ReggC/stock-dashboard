let chart;

async function loadStock() {
    const input = document.getElementById("symbol");

    if (!input) {
        console.error("Symbol input not found in DOM");
        return;
    }

    const symbol = input.value.trim().toUpperCase();

    if (!symbol) {
        console.warn("No symbol entered");
        return;
    }

    const response = await fetch(`/quote/${symbol}`);

    if (!response.ok) {
        console.error("Failed to fetch stock data");
        return;
    }

    const data = await response.json();

    const q = data.quote;
    const p = data.profile;

    console.log(q);

    document.getElementById("company").innerText = p.name || symbol;
    document.getElementById("price").innerText = "$" + q.c;
    document.getElementById("open").innerText = "$" + q.o;
    document.getElementById("high").innerText = "$" + q.h;
    document.getElementById("low").innerText = "$" + q.l;
    document.getElementById("prev").innerText = "$" + q.pc;

    buildChart(q);
}

function buildChart(q) {
    const ctx = document.getElementById("stockChart");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Open", "High", "Low", "Current"],
            datasets: [{
                label: "Price",
                data: [q.o, q.h, q.l, q.c]
            }]
        }
    });
}