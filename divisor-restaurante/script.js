function calculate() {
  const clientsInput = document.getElementById('clients').value;
  const productsInput = document.getElementById('products').value;

  const clients = clientsInput.split(',').map(client => client.trim());
  const products = productsInput.split(',').map(product => product.trim());

  const prices = {};

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const price = parseFloat(prompt(`Digite o preço do produto ${product}:`));
    prices[product] = price;
  }

  const consumption = {};

  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    const clientProducts = prompt(`Digite os produtos consumidos por ${client}:`).split(',').map(product => product.trim());

    consumption[client] = clientProducts;
  }

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  const table = document.createElement('table');
  const tableHeader = document.createElement('tr');
  tableHeader.innerHTML = '<th>Cliente</th><th>Valor Consumido</th><th>10% de Serviço</th><th>Valor a Pagar</th>';
  table.appendChild(tableHeader);

  let totalBill = 0;

  for (let i = 0; i < clients.length; i++) {
    const client = clients[i];
    const clientProducts = consumption[client];
    let clientTotal = 0;

    for (let j = 0; j < clientProducts.length; j++) {
      const product = clientProducts[j];

      if (products.includes(product)) {
        const price = prices[product];
        clientTotal += price;
      }
    }

    const serviceCharge = clientTotal * 0.1;
    const totalPayment = clientTotal + serviceCharge;

    totalBill += totalPayment;

    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `<td>${client}</td><td>R$ ${clientTotal.toFixed(2)}</td><td>R$ ${serviceCharge.toFixed(2)}</td><td>R$ ${totalPayment.toFixed(2)}</td>`;
    table.appendChild(tableRow);
  }

  resultsContainer.appendChild(table);

  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `<td colspan="3"><strong>Total:</strong></td><td><strong>R$ ${totalBill.toFixed(2)}</strong></td>`;
  table.appendChild(totalRow);
}
