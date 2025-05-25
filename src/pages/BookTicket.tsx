
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ExpandableHeader from "../components/ExpandableHeader";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Showtime {
  id: string;
  day: string;
  date: string;
  time: string;
  status: string;
  remaining: number;
  countdown?: string;
}

interface Seat {
  id: string;
  row: number;
  number: number;
  status: 'available' | 'selected' | 'purchased' | 'waiting' | 'unavailable';
}

const BookTicket = () => {
  const { id } = useParams();
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const showtimes: Showtime[] = [
    { id: "1", day: "شنبه", date: "15 دی", time: "19:00", status: "موجود", remaining: 45 },
    { id: "2", day: "یکشنبه", date: "16 دی", time: "19:00", status: "موجود", remaining: 32, countdown: "خرید در 2 ساعت و 33 دقیقه" },
    { id: "3", day: "دوشنبه", date: "17 دی", time: "19:00", status: "تکمیل", remaining: 0 },
    { id: "4", day: "سه‌شنبه", date: "18 دی", time: "19:00", status: "موجود", remaining: 28 },
  ];

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    for (let row = 1; row <= 6; row++) {
      for (let seatNum = 1; seatNum <= 16; seatNum++) {
        const random = Math.random();
        let status: Seat['status'] = 'available';
        if (random < 0.1) status = 'purchased';
        else if (random < 0.15) status = 'waiting';
        else if (random < 0.18) status = 'unavailable';
        
        seats.push({
          id: `${row}-${seatNum}`,
          row,
          number: seatNum,
          status
        });
      }
    }
    return seats;
  };

  const [seats] = useState<Seat[]>(generateSeats);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeats(prev => [...prev, { ...seat, status: 'selected' }]);
    } else if (seat.status === 'selected') {
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
    }
  };

  const getSeatStatus = (seat: Seat) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    if (isSelected) return 'selected';
    return seat.status;
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-blue-500 hover:bg-blue-600';
      case 'selected': return 'bg-red-500';
      case 'purchased': return 'bg-gray-800';
      case 'waiting': return 'bg-orange-500';
      case 'unavailable': return 'bg-gray-400';
      default: return 'bg-blue-500';
    }
  };

  const totalPrice = selectedSeats.length * 150000; // 150,000 Toman per seat

  return (
    <div className="min-h-screen bg-background">
      <ExpandableHeader />
      
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <img 
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=400&fit=crop"
          alt="نمایش"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center">خرید بلیت نمایش</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-foreground/60">
            <li><Link to="/" className="hover:text-gold-500">خانه</Link></li>
            <li>/</li>
            <li><Link to={`/show/${id}`} className="hover:text-gold-500">جزئیات نمایش</Link></li>
            <li>/</li>
            <li className="text-foreground">خرید بلیت</li>
          </ol>
        </nav>

        {/* Process Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-gold-500 text-background' : 'bg-gray-300 text-gray-600'}`}>1</div>
            <span className="text-sm">انتخاب سانس</span>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-gold-500 text-background' : 'bg-gray-300 text-gray-600'}`}>2</div>
            <span className="text-sm">انتخاب صندلی</span>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-gold-500 text-background' : 'bg-gray-300 text-gray-600'}`}>3</div>
            <span className="text-sm">تایید و پرداخت</span>
          </div>
        </div>

        {/* Event Details */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">جزئیات نمایش</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold-500" />
              <span>15 دی الی 25 دی 1403</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-500" />
              <span>ساعت 19:00 - مدت: 90 دقیقه</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-500" />
              <span>تالار شهر - سالن اصلی</span>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <h3 className="font-bold text-red-800 mb-2">اطلاعات مهم:</h3>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• ورود با ماسک الزامی است</li>
            <li>• نیم ساعت قبل از شروع نمایش حضور داشته باشید</li>
            <li>• امکان استرداد بلیت تا 24 ساعت قبل از نمایش</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Section 1: Showtime Selection */}
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gold-500 text-background flex items-center justify-center text-sm font-bold">1</div>
                <h3 className="text-lg font-bold">انتخاب سانس مورد نظر</h3>
              </div>
              
              <div className="space-y-3">
                {showtimes.map((showtime) => (
                  <div
                    key={showtime.id}
                    onClick={() => {
                      if (showtime.status !== "تکمیل") {
                        setSelectedShowtime(showtime.id);
                        setCurrentStep(2);
                      }
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedShowtime === showtime.id 
                        ? 'border-gold-500 bg-gold-50' 
                        : showtime.status === "تکمیل"
                        ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                        : 'border-border hover:border-gold-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{showtime.day} {showtime.date} - {showtime.time}</div>
                        <div className="text-sm text-foreground/60">
                          {showtime.status === "تکمیل" ? "تکمیل ظرفیت" : `${showtime.remaining} صندلی باقی‌مانده`}
                        </div>
                        {showtime.countdown && (
                          <div className="text-xs text-orange-600 mt-1">{showtime.countdown}</div>
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded text-sm ${
                        showtime.status === "تکمیل" ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {showtime.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Seat Selection */}
            {selectedShowtime && (
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gold-500 text-background flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="text-lg font-bold">انتخاب صندلی مورد نظر</h3>
                </div>

                <div className="mb-4 text-sm text-foreground/60">
                  سانس انتخاب شده: {showtimes.find(s => s.id === selectedShowtime)?.day} {showtimes.find(s => s.id === selectedShowtime)?.date} - {showtimes.find(s => s.id === selectedShowtime)?.time}
                </div>

                {/* Stage */}
                <div className="text-center mb-6">
                  <div className="bg-gray-200 rounded-lg py-2 px-4 inline-block">
                    <span className="text-sm font-semibold">صحنه نمایش</span>
                  </div>
                </div>

                {/* Seat Map */}
                <div className="mb-6">
                  <div className="grid grid-cols-17 gap-1 max-w-4xl mx-auto">
                    <div></div>
                    {Array.from({length: 16}, (_, i) => (
                      <div key={i} className="text-center text-xs text-foreground/60 p-1">{i + 1}</div>
                    ))}
                    
                    {Array.from({length: 6}, (_, rowIndex) => {
                      const rowNumber = rowIndex + 1;
                      return (
                        <>
                          <div key={`row-${rowNumber}`} className="text-center text-xs text-foreground/60 p-1">{rowNumber}</div>
                          {seats.filter(seat => seat.row === rowNumber).map((seat) => {
                            const status = getSeatStatus(seat);
                            return (
                              <button
                                key={seat.id}
                                onClick={() => handleSeatClick(seat)}
                                disabled={seat.status === 'purchased' || seat.status === 'waiting' || seat.status === 'unavailable'}
                                className={`w-6 h-6 rounded ${getSeatColor(status)} transition-colors disabled:cursor-not-allowed`}
                              />
                            );
                          })}
                        </>
                      );
                    })}
                  </div>
                </div>

                {/* Seat Legend */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
            )}

            {/* Section 3: Login/Signup */}
            {selectedSeats.length > 0 && (
              <div className="bg-card rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gold-500 text-background flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="text-lg font-bold">رزرو</h3>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 mb-2">
                    شما همچنین می‌توانید برای تجربه بهتر، قبل از ادامه 
                    <button className="text-blue-600 underline mx-1">اینجا کلیک کنید تا وارد شوید یا ثبت نام کنید</button>
                  </p>
                  <p className="text-blue-700 text-sm">
                    مزایای عضویت: عدم نیاز به وارد کردن مجدد اطلاعات، دسترسی به تاریخچه خرید، تخفیف‌های ویژه و تخفیف وفاداری.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4">خلاصه سفارش</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>تعداد بلیت:</span>
                  <span>{selectedSeats.length} بلیت</span>
                </div>
                {selectedSeats.length > 0 && (
                  <div className="text-sm text-foreground/60">
                    صندلی‌های انتخابی: {selectedSeats.map(seat => `${seat.row}-${seat.number}`).join(', ')}
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>قیمت نهایی:</span>
                    <span>{totalPrice.toLocaleString()} تومان</span>
                  </div>
                </div>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                className="w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-background font-semibold py-3 px-4 rounded-lg transition-colors"
                onClick={() => setCurrentStep(3)}
              >
                رزرو و ادامه
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
