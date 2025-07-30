import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DealDetails from '../../Pages/DealDetails';
import { useNavigate } from 'react-router-dom';


const colors = {
  'green-primary': '#4CAF50',
  'green-secondary': '#8BC34A',
  'green-light': '#DCEDC8',
  'green-dark': '#388E3C',
  'gray-light': '#F5F5F5',
  'gray-medium': '#E0E0E0',
  'gray-dark': '#757575',
};

const DealCard = ({ deal, onClick }) => {
  return (
    <div
      onClick={() => onClick(deal)}
      className={`p-6 rounded-lg border cursor-pointer flex flex-col space-y-4 transition-all duration-200
        shadow-md hover:shadow-lg`}
      style={{
        borderColor: colors['gray-medium']
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">HDFC Bank</h3>
          <div className="flex items-center text-sm mt-1" style={{ color: colors['gray-dark'] }}>
            <span className="font-medium">{deal.instrumentType}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-lg" style={{ color: colors['black'] }}>
            ₹{deal.dealAmount?.toLocaleString()}
          </div>
          <div className="text-sm mt-1" style={{ color: colors['gray-dark'] }}>
            {deal.tenure} Days
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {[deal.interestRateType, `Interest: ${deal.interestRate}%`, deal.preClosureAllowed ? "Pre-closure allowed" : "No pre-closure"].map((tag, index) => (
          <span key={index} className="px-2 py-1 rounded-md text-xs font-medium" style={{ backgroundColor: colors['green-light'], color: colors['green-dark'] }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};


const DealBoardSection = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/borrowing/borrowing-requests');
        setDeals(res.data);
      } catch (error) {
        console.error('Error fetching borrowing requests:', error.message);
      }
    };

    fetchDeals();
  }, []);

  const handleCardClick = () => {
    navigate("/deal"); // ✅ navigate to ProfilePage
  };

  return (
   <div className="flex flex-col space-y-6 flex-1 p-8">
      <div className="grid grid-cols-1 gap-6">
        {deals.length > 1 ? (
          <DealCard
            deal={deals[0]}
            onClick={handleCardClick} // ✅ same-tab navigation
          />
        ) : (
          <p className="text-gray-500">No borrowing requests available.</p>
        )}
      </div>
    </div>
  );

};

export default DealBoardSection;
