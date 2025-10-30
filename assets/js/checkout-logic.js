document.addEventListener('DOMContentLoaded', () => {
    const shippingForm = document.getElementById('shippingForm');

    if (shippingForm) {
        shippingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple check that all fields are filled (browser handles required, but good practice)
            const address = document.getElementById('address').value;
            const cardNumber = document.getElementById('cardNumber').value;

            if (address.length < 10) {
                alert('Please enter a full and valid address.');
                return;
            }

            // Simple Card Number length check (should be more robust)
            if (cardNumber.replace(/\s/g, '').length !== 16) {
                alert('Please enter a valid 16-digit card number.');
                return;
            }

            // Mock successful order placement
            alert('Order Placed Successfully! Thank you for your purchase.');
            // In a real app, redirect to Order Confirmation page
            // window.location.href = 'order-confirmation.html'; 
        });
    }
});
const contractAddress = "728c8db707a7648549f9829f990e09c16c21ebbbf2a149781af76d926ea8d9ed"; 
const contractABI = [
 [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			}
		],
		"name": "ProductCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ProductSold",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "createProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "sold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

];

let provider, signer, contract;

// 🔹 الاتصال بمحفظة MetaMask
async function connectWallet() {
    if (window.ethereum) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            alert("✅ تم الاتصال بالمحفظة: " + address);
            console.log("Connected address:", address);
        } catch (err) {
            alert("❌ خطأ أثناء الاتصال: " + err.message);
        }
    } else {
        alert("⚠️ الرجاء تثبيت MetaMask أولًا!");
    }
}

// ⚠️ اجعل الدالة متاحة عالميًا للزر في HTML
window.connectWallet = connectWallet;

// 🔹 جلب المنتجات من العقد
async function loadProducts() {
  const count = await contract.productCount();
  const container = document.getElementById("products");
  container.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const p = await contract.products(i);
    if (!p.sold) { // فقط المنتجات غير المباعة
      const div = document.createElement("div");
      div.className = "product-item";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p>💰 السعر: ${ethers.formatEther(p.price)} ETH</p>
        <button onclick="buyProduct(${p.id}, ${p.price})">🛒 اشتري الآن</button>
      `;
      container.appendChild(div);
    }
  }
}

// 🔹 شراء منتج
async function buyProduct(id, priceWei) {
  const tx = await contract.buyProduct(id, { value: priceWei });
  await tx.wait();
  alert("✅ تمت عملية الشراء بنجاح!");
  loadProducts(); // تحديث المنتجات بعد الشراء
}
