const apiUrl = "https://localhost:7201/api/Product";

async function getProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = '';

        products.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>$${p.price}</td>
                    <td>${p.category}</td>
                    <td>
                        <button onclick="deleteProduct(${p.id})" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

async function addProduct() {
    const product = {
        name: document.getElementById('pName').value,
        price: parseFloat(document.getElementById('pPrice').value),
        category: document.getElementById('pCategory').value,
        description: "Default description",
        stockQuantity: 10
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });

    if (response.ok) {
        getProducts();
        alert("Product added successfully!");
    } else {
        const errorData = await response.json();
        alert("Error: " + JSON.stringify(errorData.errors));
    }
}

async function deleteProduct(id) {
    if (confirm("Are you sure?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        getProducts();
    }
}

getProducts();