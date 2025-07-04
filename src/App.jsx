import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';

const { FiTruck, FiMapPin, FiPackage, FiCalculator, FiDollarSign } = FiIcons;

function App() {
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [result, setResult] = useState(null);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [availableWeights, setAvailableWeights] = useState([]);

  const rates = {
    mumbai: {
      weights: ["50", "800", "1500", "2500"],
      locations: {
        "WARE HOUSE TO CARGO": [1000, 1500, 2000, 2500],
        "SANTACRUZ/ KHAR": [1500, 2500, 3000, 3500],
        "DADAR /PAREL": [2000, 3500, 4000, 4500],
        "MUMBAI CENTRAL / GRANT ROAD": [2500, 4000, 4500, 5500],
        "SAKINAKA": [1500, 2000, 2500, 3000],
        "GHATKOPAR / VIKROLI / KURLA": [2000, 2500, 3000, 3500],
        "KANDIVALI": [2000, 2500, 3500, 4000],
        "MIRA BHAYANDER": [2500, 3200, 4000, 4500],
        "VASAI": [3000, 3500, 4500, 5500],
        "TARAPUR": [4500, 6500, 7500, 9000],
        "THANE": [2500, 3500, 4000, 5000],
        "BHIWANDI": [3000, 4000, 4500, 5500],
        "DOMBIVALI": [3000, 4000, 4500, 5500],
        "AM BERNATH": [3500, 4000, 5000, 6000],
        "KALWA / RABALE / MAHAPE": [2500, 3800, 4500, 5000],
        "TALOJA / KALMBOU / PANVEL": [3000, 4000, 4500, 5500],
        "KHOPOLI": [4500, 6500, 7500, 8000],
        "DAMAN": [6500, 5700, 8500, 9500],
        "PUNE /CHAKAN / BHOSARI / PIMPRI-CHINCHWAD": [5500, 7000, 7500, 8500],
        "RANJANGAON / WAGHOLI / LONIKAND": [6000, 7500, 8500, 9500]
      }
    },
    pune: {
      weights: ["50", "100", "200", "400"],
      locations: {
        "Pune City Area (BHOSRI)": [1200, 1400, 1800, 2100],
        "PimpriChinchwad, Dapodi, Kasarwadi, Tathawade": [1200, 1400, 1800, 2100],
        "Wagholi, Chakan, Talegaon, Pirangut, Alandi, Shivane, Hinjewadi, Urse, Takwe, Mulshi": [1500, 1900, 2100, 2300],
        "Phursungi, Nandedphata, Narhe, Pisoli, Yewalewadi, Sanaswadi, Lonikand, Lonikalbhor, Shindewadi, Bhimakoregaon": [1500, 1900, 2100, 2300],
        "Saswad, Sahajpur, Urulikanchan, Nandur, Shikrapur, Kondhapuri, Ranjangaon, Jejuri, Shirwal": [2200, 2500, 2700, 3000]
      }
    },
    maharashtra: {
      weights: ["50", "200", "300"],
      locations: {
        "Bhandgaon / Kurkumbh / Satara": [3500, 4500, 5500],
        "Baramati / Phaltan / Ahmednagar": [4000, 5000, 6000],
        "Sangli / Miraj / Kolhapur": [4500, 5500, 6500],
        "Aurangabad / Nashik / Solapur": [5500, 6500, 7000]
      }
    }
  };

  const zoneOptions = [
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'pune', label: 'Pune' },
    { value: 'maharashtra', label: 'Other Maharashtra' }
  ];

  useEffect(() => {
    if (selectedZone && rates[selectedZone]) {
      const locations = Object.keys(rates[selectedZone].locations);
      const weights = rates[selectedZone].weights;
      setAvailableLocations(locations);
      setAvailableWeights(weights);
      setSelectedLocation('');
      setSelectedWeight('');
      setResult(null);
    } else {
      setAvailableLocations([]);
      setAvailableWeights([]);
      setSelectedLocation('');
      setSelectedWeight('');
      setResult(null);
    }
  }, [selectedZone]);

  const calculateRate = () => {
    if (!selectedZone || !selectedLocation || !selectedWeight) {
      setResult({
        error: 'Please select all fields to calculate shipping rate.'
      });
      return;
    }

    const weight = parseFloat(selectedWeight);
    const weightIndex = rates[selectedZone].weights.indexOf(String(weight));
    const basePrice = rates[selectedZone].locations[selectedLocation][weightIndex];

    const customClearance = 2500;
    const handling = 1500;
    const doc = 1000;
    const thc = Math.max(weight * 1.9, 250);
    const loadingUnloading = Math.max(weight * 2, 250);

    const total = basePrice + customClearance + handling + doc + thc + loadingUnloading;

    setResult({
      basePrice,
      customClearance,
      handling,
      doc,
      thc: parseFloat(thc.toFixed(2)),
      loadingUnloading: parseFloat(loadingUnloading.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4"
            >
              <SafeIcon icon={FiTruck} className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Shipping Rate Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Calculate accurate shipping costs for your deliveries
            </p>
          </div>

          {/* Main Calculator */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <SafeIcon icon={FiCalculator} className="w-6 h-6 mr-2 text-blue-600" />
                Calculate Shipping
              </h2>

              <div className="space-y-6">
                {/* Zone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2 text-blue-600" />
                    Select Zone
                  </label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">-- Choose Zone --</option>
                    {zoneOptions.map((zone) => (
                      <option key={zone.value} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <SafeIcon icon={FiMapPin} className="w-4 h-4 mr-2 text-green-600" />
                    Select Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    disabled={!selectedZone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {selectedZone ? '-- Choose Location --' : '-- Select zone first --'}
                    </option>
                    {availableLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <SafeIcon icon={FiPackage} className="w-4 h-4 mr-2 text-purple-600" />
                    Select Weight
                  </label>
                  <select
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    disabled={!selectedZone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">-- Choose Weight --</option>
                    {availableWeights.map((weight) => (
                      <option key={weight} value={weight}>
                        {weight} kg
                      </option>
                    ))}
                  </select>
                </div>

                {/* Calculate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={calculateRate}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                >
                  <SafeIcon icon={FiCalculator} className="w-5 h-5 mr-2" />
                  Calculate Shipping Rate
                </motion.button>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <SafeIcon icon={FiDollarSign} className="w-6 h-6 mr-2 text-green-600" />
                Shipping Breakdown
              </h2>

              {result ? (
                result.error ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-medium">{result.error}</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold">₹{result.basePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Custom Clearance:</span>
                        <span className="font-semibold">₹{result.customClearance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Handling:</span>
                        <span className="font-semibold">₹{result.handling.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Documentation:</span>
                        <span className="font-semibold">₹{result.doc.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">THC:</span>
                        <span className="font-semibold">₹{result.thc.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Loading & Unloading:</span>
                        <span className="font-semibold">₹{result.loadingUnloading.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mt-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">Total Shipping Cost:</span>
                        <span className="text-2xl font-bold text-green-600">
                          ₹{result.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              ) : (
                <div className="text-center py-12">
                  <SafeIcon icon={FiPackage} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Select zone, location, and weight to calculate shipping cost
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;