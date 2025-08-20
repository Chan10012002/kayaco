
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Order Placed</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="background">
    <div class="card">
      <div class="top-nav">
        
      </div>
      <h1>Order Placed!</h1>
      <p>Your order was successfully placed<br>and is being prepared for delivery.</p>
      <div class="image-box">
        <img src="/img/k-mart.jpg" alt="Order basket">
      </div>
      <a href="/cart" class="btn">BACK TO CART</a>
     
    </div>
  </div>
</body>


<style>
  body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f7f9fa;
}

.background {
  height: 100vh;
  background: linear-gradient(to top, #4E71FF 50%, #f7f9fa 50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  background: white;
  width: 320px;
  padding: 30px 20px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  position: relative;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
}

.card h1 {
  font-size: 22px;
  margin: 10px 0;
}

.card p {
  color: #555;
  font-size: 14px;
  margin-bottom: 25px;
  line-height: 1.5;
}

.image-box img {
  width: 200px;
  margin-bottom: 25px;
  margin-left: 40px;
}

.btn {
  display: inline-block;
  background: linear-gradient(to right, #4E71FF, #4E71FF);
  color: white;
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.btn:hover {
  background: #3a56c9;
}


</style>
