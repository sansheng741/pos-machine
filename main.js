var db = [
   {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      price: 3
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      price: 3
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      price: 5
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      price: 15
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      price: 2
    },
    {
      barcode: 'ITEM000005',
      name: 'Instant Noodles',
      price: 4
    }
];

function printReceipt(barcodes) {
//     console.log(`
// ***<store earning no money>Receipt ***
// Name: Coca-Cola, Quantity: 5, Unit price: 3 (yuan), Subtotal: 15 (yuan)
// Name: Sprite, Quantity: 2, Unit price: 3 (yuan), Subtotal: 6 (yuan)
// Name: Battery, Quantity: 1, Unit price: 2 (yuan), Subtotal: 2 (yuan)
// ----------------------
// Total: 23 (yuan)
// **********************`)
	let items = countItemQuantity(barcodes);
	let itemDetals = getItemDetail(items);
	let printableItems = itemSubtotal(itemDetals);
	let totalPrice = calcTotalPrice(printableItems);
	let receipt = formatReceipt(printableItems,totalPrice);
	
	console.log(receipt);
}
function countItemQuantity(barcodes){
	var items = [{barcode: "",quantity: 0}];
	//记录items的下标
	var itemsIndex = 0;
	for(var i = 0; i < barcodes.length; i++){
		var isContain = false;
		//如果items中已存在这个商品，那么就将数量+1
		for(var j = 0; j < items.length; j++){
			if(items[j].barcode == barcodes[i]){
				items[j].quantity += 1;
				isContain = true;
				break;
			}
		}	
		//如果不存在就添加一个商品
		if(!isContain){
			var item = {};
			item.barcode = barcodes[i];
			item.quantity = 1;
			items[itemsIndex++] = item;
		}
	}
	return items;
}

function getItemDetail(items){
	for(var i = 0; i < items.length; i++){
		for(var j = 0; j < db.length; j++){
			if(items[i].barcode == db[j].barcode){
				items[i].name = db[j].name;
				items[i].price = db[j].price;
			}
		}
	}
	return items;
}

function itemSubtotal(itemDetals){
	for(var i = 0; i < itemDetals.length; i++){
		itemDetals[i].subtotal = itemDetals[i].price * itemDetals[i].quantity;
	}
	return itemDetals;
}

function calcTotalPrice(printableItems){
	var totalPrice = 0;
	for(var i = 0; i < printableItems.length; i++){
		totalPrice += printableItems[i].subtotal;
	}
	return totalPrice;
}

function formatReceipt(printableItems,totalPrice){
	var receipt = '\n***<store earning no money>Receipt ***\n';
	for(var i = 0; i < printableItems.length; i++){
		receipt += `Name: ${printableItems[i].name}, Quantity: ${printableItems[i].quantity}, Unit price: ${printableItems[i].price} (yuan), Subtotal: ${printableItems[i].subtotal} (yuan)\n`;
	}
	receipt += '----------------------\n';
	receipt += `Total: ${totalPrice} (yuan)\n`;
	receipt += '**********************';
	
	return receipt;
}

module.exports = {
    printReceipt
};