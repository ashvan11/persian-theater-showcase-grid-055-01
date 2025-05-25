
import { useState } from "react";

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  onSeatSelect: (seatId: string, isSelected: boolean) => void;
  selectedSeats: string[];
  unavailableSeats: string[];
  purchasedSeats: string[];
  waitingSeats: string[];
}

const SeatMap = ({ 
  rows, 
  seatsPerRow, 
  onSeatSelect, 
  selectedSeats, 
  unavailableSeats, 
  purchasedSeats, 
  waitingSeats 
}: SeatMapProps) => {
  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return 'selected';
    if (purchasedSeats.includes(seatId)) return 'purchased';
    if (waitingSeats.includes(seatId)) return 'waiting';
    if (unavailableSeats.includes(seatId)) return 'unavailable';
    return 'available';
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-500 hover:bg-blue-600 cursor-pointer';
      case 'selected': return 'bg-red-500 cursor-pointer';
      case 'purchased': return 'bg-gray-800 cursor-not-allowed';
      case 'waiting': return 'bg-orange-500 cursor-not-allowed';
      case 'unavailable': return 'bg-gray-400 cursor-not-allowed';
      default: return 'bg-blue-500 hover:bg-blue-600 cursor-pointer';
    }
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === 'available') {
      onSeatSelect(seatId, true);
    } else if (status === 'selected') {
      onSeatSelect(seatId, false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Stage */}
      <div className="bg-gray-200 rounded-lg py-3 px-8 mb-4">
        <span className="text-sm font-semibold">صحنه نمایش</span>
      </div>

      {/* Seat Grid */}
      <div className="grid gap-2">
        {/* Column headers */}
        <div className="grid grid-cols-[auto_repeat(16,1fr)] gap-1 mb-2">
          <div></div>
          {Array.from({length: seatsPerRow}, (_, i) => (
            <div key={i} className="text-center text-xs text-foreground/60 w-7 h-7 flex items-center justify-center">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Seat rows */}
        {Array.from({length: rows}, (_, rowIndex) => {
          const rowNumber = rowIndex + 1;
          return (
            <div key={rowNumber} className="grid grid-cols-[auto_repeat(16,1fr)] gap-1">
              {/* Row number */}
              <div className="text-center text-xs text-foreground/60 w-7 h-7 flex items-center justify-center">
                {rowNumber}
              </div>
              
              {/* Seats in this row */}
              {Array.from({length: seatsPerRow}, (_, seatIndex) => {
                const seatNumber = seatIndex + 1;
                const seatId = `${rowNumber}-${seatNumber}`;
                const status = getSeatStatus(seatId);
                
                return (
                  <button
                    key={seatId}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={status === 'purchased' || status === 'waiting' || status === 'unavailable'}
                    className={`w-7 h-7 rounded text-xs font-medium transition-colors ${getSeatColor(status)}`}
                    title={`صندلی ${seatId} - ${status === 'available' ? 'آزاد' : status === 'selected' ? 'انتخاب شما' : status === 'purchased' ? 'خریداری شده' : status === 'waiting' ? 'در انتظار پرداخت' : 'غیرقابل خرید'}`}
                  >
                    {seatNumber}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500"></div>
          <span>آزاد</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500"></div>
          <span>انتخاب شما</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-800"></div>
          <span>خریداری شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-500"></div>
          <span>در انتظار پرداخت</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-400"></div>
          <span>غیرقابل خرید</span>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
