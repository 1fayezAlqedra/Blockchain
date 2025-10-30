// بيانات وهمية للمنتجات (Mock Data)
const productsData = [
    {
        id: "1",
        title: "Luxury Leather Bag",
        category: "Accessories",
        price: "120.00 Block",
        description: "Experience elegance with our Luxury Leather Bag. Crafted from genuine Italian leather, this bag offers ample space, durable construction, and a timeless design perfect for daily use or travel.",
        image: "assets/images/product-1.jpg"
    },
    {
        id: "2",
        title: "Smart Watch X10",
        category: "Electronics",
        price: "85.00 Block",
        description: "The Smart Watch X10 features a vibrant display, heart rate monitor, and long-lasting battery. Stay connected and track your fitness goals effortlessly.",
        image: "assets/images/product-2.jpg"
    },
    {
        id: "3",
        title: "Vintage Camera",
        category: "Photography",
        price: "350.00 Block",
        description: "Capture moments with a classic touch. This Vintage Camera is a fully functional piece of history, perfect for collectors and photography enthusiasts.",
        image: "assets/images/product-3.jpg"
    }
];


function loadProductDetails(productId) {
    // 1. البحث عن المنتج المطابق للمعرف
    const product = productsData.find(p => p.id === productId);

    if (product) {
        // 2. تحديث عناصر HTML بناءً على بيانات المنتج
        document.getElementById('productTitle').textContent = product.title;
        document.querySelector('.product-category').textContent = `Category: ${product.category}`;
        document.getElementById('productPrice').textContent = product.price;
        document.querySelector('.product-description p').textContent = product.description;
        document.getElementById('mainProductImage').src = product.image;
        document.getElementById('mainProductImage').alt = product.title;
        
        console.log(`Successfully loaded details for: ${product.title}`);

    } else {
        // في حال لم يتم العثور على المنتج
        document.getElementById('productTitle').textContent = "Product Not Found";
        document.querySelector('.product-detail-container').innerHTML = "<h1>404: Sorry, this product is unavailable.</h1>";
        console.error(`Product with ID ${productId} not found.`);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // --- Add to Cart Logic (unchanged) ---
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const productTitle = document.getElementById('productTitle').textContent;
            const quantity = document.getElementById('quantity').value;
            alert(`Added ${quantity} of "${productTitle}" to the cart!`);
        });
    }

    // --- Image Gallery Swap Logic (unchanged) ---
    // (يجب أن يتم تعديله ليعمل مع الصور المصغرة الخاصة بكل منتج حقيقي)
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Mock swap: In a real app, this should load the specific high-res image
                mainImage.src = this.src.replace('-thumb1', '').replace('-thumb2', ''); 
            });
        });
    }


    // **********************************************
    // *** الأهم: منطق استخراج معرف المنتج وعرض التفاصيل ***
    // **********************************************

    // 1. قراءة الـ URL واستخراج الباراميتر (id)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // 2. إذا وجدنا ID، نقوم بتحميل التفاصيل
    if (productId) {
        loadProductDetails(productId);
    } else {
        // في حال فتح الصفحة بدون معرف (id) في الرابط
        console.error("No Product ID found in the URL.");
        document.getElementById('productTitle').textContent = "No Product Selected";
        document.querySelector('.product-detail-container').innerHTML = "<h1>Please select a product from the <a href='products.html'>products page</a>.</h1>";
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
