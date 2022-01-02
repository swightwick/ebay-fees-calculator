import './App.css';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
			cost: '',
			price: '',
			postage: 0,
			percentOff: 0,
			rate: 10.6667,
			profitFixed: '-'
		};
		this.handleChange = this.handleChange.bind(this);
		this.calcData = this.calcData.bind(this);
		this.totalFeesFixed = '-'
		this.vatFixed = '-'
		this.payoutFixed = '-'
		this.subTotalFeesFixed = '-'
		this.minusPostage = '-'
		this.fixedFvf = 0.25
  }

	handleChange = event => {
		const target = event.target;
    const name = target.name;
		if (event.target.value < 0) {
			event.target.value = 0
		}
    this.setState({[name]: event.target.value});
  }

	calcData() {
		this.fullPriceFee = (this.state.price / 100) * 10.6667
		this.promoRatePercent = 100 - this.state.percentOff
		this.fvf = 	(this.fullPriceFee / 100) * this.promoRatePercent
		this.subTotalFees = this.fvf + this.fixedFvf
		this.subTotalFeesFixed = this.subTotalFees.toFixed(2)
		this.vat = (this.subTotalFees / 100) * 20
		this.vatFixed = this.vat.toFixed(2)
		this.totalFees = this.subTotalFees + this.vat
		this.totalFeesFixed = this.totalFees.toFixed(2)
		this.payout = this.state.price - this.totalFees
		this.payoutFixed = this.payout.toFixed(2)
		this.profit = (this.payout - this.state.cost) - this.state.postage
		this.minusPostage = this.payoutFixed - this.state.postage
		this.setState({
			profitFixed: this.profit.toFixed(2)
		});
	}

  render() {
    return (
    <div className="App md:h-screen flex justify-center items-start sm:items-center h-full bg-gray-300">

			<div className="box flex flex-col sm:w-96 text-gray-700 bg-gray-100 rounded-xl overflow-hidden drop-shadow-lg rounded-lg m-4">
				<div className="p-5 mb-1">
					<img src="https://upload.wikimedia.org/wikipedia/commons/4/48/EBay_logo.png" className="logo px-16 sm:px-20 md:px-24 mx-auto" alt="logo" />
					<h1 className="mb-4 mt-1 text-xl font-bold">Promotion fees calculator</h1>
					{/* Cost */}
					<div className="mb-4">
						<label htmlFor="cost" className="block mb-1 text-sm font-medium text-left text-gray-600">Item retail cost</label>
						<div className="mt-1 relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<span className="text-gray-700">&pound;</span>
							</div>
							<input type="number" name="cost" id="cost" min="1" value={this.state.cost} inputMode="numeric" pattern="[0-9]*" placeholder="449.99" className="shadow-sm rounded-lg w-full pl-8 py-3 bg-white placeholder-gray-300 focus:ring-2 focus:ring-rose-500 focus:outline-none transition ease-in-out duration-500" required onChange={this.handleChange}/>
						</div>
					</div>

					{/* sale price */}
					<div className="mb-4">
						<label htmlFor="price" className="block mb-1 text-sm font-medium text-left text-gray-600">eBay item sale price</label>
						<div className="mt-1 relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<span className="text-gray-700">&pound;</span>
							</div>
							<input type="number" name="price" id="price" min="1" value={this.state.price} inputMode="numeric" pattern="[0-9]*" placeholder="579.99" className="shadow-sm rounded-lg w-full pl-8 py-3 bg-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ease-in-out duration-500" required onChange={this.handleChange}/>
						</div>
					</div>

					{/* postage */}
					<div className="mb-4">
						<label htmlFor="postage" className="block mb-1 text-sm font-medium text-left text-gray-600">Delivery cost <small>(if listing includes free P&P)</small></label>
						<div className="mt-1 relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<span className="text-gray-700">&pound;</span>
							</div>
							<input type="number" name="postage" id="postage" min="0" value={this.state.postage} inputMode="numeric" pattern="[0-9]*" className="shadow-sm rounded-lg w-full pl-8 py-3 bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none transition ease-in-out duration-500" onChange={this.handleChange}/>
						</div>
					</div>

					{/* offer */}
					<div className="mb-0">
						<label htmlFor="percentOff" className="block mb-1 text-sm font-medium text-left text-gray-600">Promotion percentage off <small>(eg 70%)</small></label>
						<div className="mt-1 relative">
							<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<span className="text-gray-700">&#37;</span>
							</div>
							<input type="number" name="percentOff" id="percentOff" min="0" max="100" inputMode="numeric" pattern="[0-9]*" placeholder="-" value={this.state.percentOff} className="shadow-sm rounded-lg w-full pl-8 py-3 bg-white focus:ring-2 focus:ring-green-500 focus:outline-none transition ease-in-out duration-500" onChange={this.handleChange}/>
						</div>
					</div>
				</div>

				<button onClick={this.calcData} className={`transition ease-in-out duration-500 mx-5 mb-6 px-5 py-3 border-gray-300 text-white rounded ${!this.state.cost || !this.state.price ? 'true bg-gray-300 text-gray-400 cursor-not-allowed' : 'false bg-blue-500'}`} disabled={!this.state.cost || !this.state.price}>
					Calculate
				</button>

				{/* results */}
				<div className="bg-gray-200">
						<div className="px-5 border-t border-gray-300 pt-4 pb-3">
							<div className="flex flex-row justify-between mb-1 pb-0">
								<label className="font-medium">FVF (10.6667%) + 25p</label>
								<div>&pound;{this.subTotalFeesFixed}</div>
							</div>
							<div className="flex flex-row justify-between mb-2 pb-2 border-b border-dashed border-gray-300">
								<label className="font-medium">VAT (20%)</label>
								<div>&pound;{this.vatFixed}</div>
							</div>
							<div className="flex flex-row justify-between pt-1">
								<label className="font-bold">Total Fees</label>
								<div className="font-bold">&pound;{this.totalFeesFixed}</div>
							</div>
						</div>
						<div className="px-5 mb-3 border-t border-gray-300 pt-3">
							<div className="flex flex-row justify-between pb-2">
								<label className="font-medium">Payout</label>
								<div>&pound;{this.payoutFixed}</div>
							</div>
							{this.state.postage >= 1 &&
								<div className="flex flex-row justify-between mb-1 pb-2">
									<label className="font-medium">Delivery</label>
									<div>(-&pound;{this.state.postage}) &pound;{this.minusPostage}</div>
								</div>
							}
							<div className="flex flex-row justify-between pt-2 border-t border-dashed border-gray-300">
								<label className="font-bold">Profit</label>
								<div className="font-bold">&pound;{this.state.profitFixed}</div>
							</div>
						</div>
					</div>

			</div>
    </div>
    );
  }
}

export default App;