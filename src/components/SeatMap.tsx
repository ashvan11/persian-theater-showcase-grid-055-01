
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
      case 'available': return 'bg-blue-500 hover:bg-blue-600 cursor-pointer border-blue-300';
      case 'selected': return 'bg-red-500 cursor-pointer border-red-400';
      case 'purchased': return 'bg-gray-800 cursor-not-allowed border-gray-600';
      case 'waiting': return 'bg-orange-500 cursor-not-allowed border-orange-400';
      case 'unavailable': return 'bg-gray-400 cursor-not-allowed border-gray-300';
      default: return 'bg-blue-500 hover:bg-blue-600 cursor-pointer border-blue-300';
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

  // Create section-based layout like a real theater
  const createTheaterLayout = () => {
    const sections = [];
    
    // VIP Section (Front 2 rows with wider spacing)
    sections.push({
      name: "VIP",
      rows: 2,
      seatsPerRow: 12,
      startRow: 1,
      className: "mb-6",
      seatSpacing: "gap-3"
    });

    // Main Section (Middle rows)
    sections.push({
      name: "اصلی",
      rows: 4,
      seatsPerRow: 16,
      startRow: 3,
      className: "mb-4",
      seatSpacing: "gap-2"
    });

    return sections;
  };

  const sections = createTheaterLayout();

  return (
    <div className="flex flex-col items-center gap-6 bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-lg">
      {/* Stage */}
      <div className="relative mb-8">
        <div className="bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg py-4 px-12 shadow-lg">
          <span className="text-lg font-bold text-white">صحنه نمایش</span>
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gold-500"></div>
      </div>

      {/* Theater Sections */}
      <div className="w-full max-w-4xl space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={section.name} className={section.className}>
            {/* Section Header */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-foreground/80 bg-card px-4 py-2 rounded-full inline-block">
                بخش {section.name}
              </h3>
            </div>

            {/* Section Layout */}
            <div className="flex flex-col items-center gap-2">
              {/* Column headers */}
              <div className={`grid gap-1 mb-2`} style={{gridTemplateColumns: `auto repeat(${section.seatsPerRow}, 1fr)`}}>
                <div className="w-8"></div>
                {Array.from({length: section.seatsPerRow}, (_, i) => (
                  <div key={i} className="text-center text-xs text-foreground/60 w-8 h-8 flex items-center justify-center">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Seat rows for this section */}
              {Array.from({length: section.rows}, (_, rowIndex) => {
                const rowNumber = section.startRow + rowIndex;
                
                return (
                  <div key={rowNumber} className={`grid gap-1 ${section.seatSpacing}`} style={{gridTemplateColumns: `auto repeat(${section.seatsPerRow}, 1fr)`}}>
                    {/* Row number */}
                    <div className="text-center text-sm font-semibold text-foreground/70 w-8 h-8 flex items-center justify-center bg-card rounded">
                      {String.fromCharCode(65 + rowNumber - 1)}
                    </div>
                    
                    {/* Seats in this row */}
                    {Array.from({length: section.seatsPerRow}, (_, seatIndex) => {
                      const seatNumber = seatIndex + 1;
                      const seatId = `${rowNumber}-${seatNumber}`;
                      const status = getSeatStatus(seatId);
                      
                      return (
                        <button
                          key={seatId}
                          onClick={() => handleSeatClick(seatId)}
                          disabled={status === 'purchased' || status === 'waiting' || status === 'unavailable'}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105 border-2 ${getSeatColor(status)} ${status === 'selected' ? 'ring-2 ring-red-300' : ''}`}
                          title={`صندلی ${String.fromCharCode(65 + rowNumber - 1)}${seatNumber} - ${status === 'available' ? 'آزاد' : status === 'selected' ? 'انتخاب شما' : status === 'purchased' ? 'خریداری شده' : status === 'waiting' ? 'در انتظار پرداخت' : 'غیرقابل خرید'}`}
                        >
                          {seatNumber}
                        </button>
                      );
                    })}

                    {/* Aisle marker for main section */}
                    {section.name === "اصلی" && (
                      <div className="text-center text-xs text-foreground/40 w-8 h-8 flex items-center justify-center">
                        راهرو
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Section spacing */}
            {sectionIndex < sections.length - 1 && (
              <div className="flex items-center justify-center my-4">
                <div className="w-32 h-px bg-border"></div>
                <span className="px-4 text-xs text-foreground/50">راهرو</span>
                <div className="w-32 h-px bg-border"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mt-8 bg-card p-4 rounded-lg w-full max-w-2xl">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 bg-blue-500 border-blue-300"></div>
          <span>آزاد</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 bg-red-500 border-red-400"></div>
          <span>انتخاب شما</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 bg-gray-800 border-gray-600"></div>
          <span>خریداری شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 bg-orange-500 border-orange-400"></div>
          <span>در انتظار پرداخت</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded border-2 bg-gray-400 border-gray-300"></div>
          <span>غیرقابل خرید</span>
        </div>
      </div>

      {/* Theater Info */}
      <div className="text-center text-sm text-foreground/60 mt-4">
        <p>ظرفیت کل: {sections.reduce((total, section) => total + (section.rows * section.seatsPerRow), 0)} صندلی</p>
        <p>بخش VIP: ردیف‌های A-B | بخش اصلی: ردیف‌های C-F</p>
      </div>
    </div>
  );
};

export default SeatMap;
