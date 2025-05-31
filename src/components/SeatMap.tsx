import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, Move, X, Plus, Minus } from "lucide-react";

interface SeatMapProps {
  rows: number;
  seatsPerRow: number;
  onSeatSelect: (seatId: string, isSelected: boolean) => void;
  selectedSeats: string[];
  unavailableSeats: string[];
  purchasedSeats: string[];
  waitingSeats: string[];
  seatPrices?: {
    [key: string]: number; // e.g. "VIP": 150000, "اصلی": 100000
  };
}

const SeatMap = ({
  rows,
  seatsPerRow,
  onSeatSelect,
  selectedSeats,
  unavailableSeats,
  purchasedSeats,
  waitingSeats,
  seatPrices = { VIP: 150000, اصلی: 100000 }, // Default prices if not provided
}: SeatMapProps) => {
  // State for mobile modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for zoom and pan
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Add passive touch handler to document to improve touch performance
    document.addEventListener(
      "touchmove",
      function (e) {
        // This empty handler with passive: false allows us to preventDefault() in our actual handler
      },
      { passive: false }
    );

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const getSeatStatus = (seatId: string) => {
    if (selectedSeats.includes(seatId)) return "selected";
    if (purchasedSeats.includes(seatId)) return "purchased";
    if (waitingSeats.includes(seatId)) return "waiting";
    if (unavailableSeats.includes(seatId)) return "unavailable";
    return "available";
  };

  const getSeatColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-blue-500 hover:bg-blue-600 cursor-pointer border-blue-300";
      case "selected":
        return "bg-red-500 cursor-pointer border-red-400";
      case "purchased":
        return "bg-gray-800 cursor-not-allowed border-gray-600";
      case "waiting":
        return "bg-orange-500 cursor-not-allowed border-orange-400";
      case "unavailable":
        return "bg-gray-400 cursor-not-allowed border-gray-300";
      default:
        return "bg-blue-500 hover:bg-blue-600 cursor-pointer border-blue-300";
    }
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    if (status === "available") {
      onSeatSelect(seatId, true);
    } else if (status === "selected") {
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
      seatSpacing: "gap-3",
      price: seatPrices["VIP"] || 150000,
    });

    // Main Section (Middle rows)
    sections.push({
      name: "اصلی",
      rows: 4,
      seatsPerRow: 16,
      startRow: 3,
      className: "mb-4",
      seatSpacing: "gap-2",
      price: seatPrices["اصلی"] || 100000,
    });

    return sections;
  };

  const sections = createTheaterLayout();

  // Calculate total cost
  const calculateTotalCost = () => {
    let total = 0;

    selectedSeats.forEach((seatId) => {
      const [rowNumber] = seatId.split("-").map(Number);

      // Determine which section this seat belongs to
      const section = sections.find(
        (s) => rowNumber >= s.startRow && rowNumber < s.startRow + s.rows
      );

      if (section) {
        total += section.price;
      }
    });

    return total;
  };

  // Format price in Toman
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  // Zoom handlers
  const handleZoomIn = () => {
    console.log("Zoom in clicked");
    setScale((prev) => {
      const newScale = Math.min(prev + 0.2, 3);
      console.log("Scale changed from", prev, "to", newScale);
      return newScale;
    });
  };

  const handleZoomOut = () => {
    console.log("Zoom out clicked");
    setScale((prev) => {
      const newScale = Math.max(prev - 0.2, 0.5);
      console.log("Scale changed from", prev, "to", newScale);
      return newScale;
    });
  };

  const handleResetZoom = () => {
    console.log("Reset zoom clicked");
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // State to track if we're just clicking (not dragging)
  const [isJustClicking, setIsJustClicking] = useState(true);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [touchStartPosition, setTouchStartPosition] = useState({ x: 0, y: 0 });

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate drag if it's not a click on a seat button
    if (e.target instanceof HTMLButtonElement) return;

    setIsJustClicking(true);
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default to avoid any browser handling that might interfere
    e.preventDefault();

    // Only initiate drag if it's not a touch on a seat button
    if (e.target instanceof HTMLButtonElement) return;

    // Store the start time and position to determine if it's a tap or drag
    setTouchStartTime(Date.now());
    setTouchStartPosition({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });

    setIsJustClicking(true);
    setIsDragging(true);
    setDragStart({
      x: e.touches[0].clientX - position.x,
      y: e.touches[0].clientY - position.y,
    });

    console.log("Touch start at:", {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    // If we've moved more than a tiny bit, it's a drag, not a click
    if (
      isJustClicking &&
      (Math.abs(e.clientX - dragStart.x - position.x) > 5 ||
        Math.abs(e.clientY - dragStart.y - position.y) > 5)
    ) {
      setIsJustClicking(false);
    }

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Always prevent default to ensure we can drag the map
    e.preventDefault();

    if (!isDragging) return;

    // If we've moved more than a tiny bit, it's a drag, not a tap
    const deltaX = Math.abs(e.touches[0].clientX - touchStartPosition.x);
    const deltaY = Math.abs(e.touches[0].clientY - touchStartPosition.y);

    if (isJustClicking && (deltaX > 5 || deltaY > 5)) {
      setIsJustClicking(false);
      console.log("Now dragging, no longer just clicking");
    }

    const newX = e.touches[0].clientX - dragStart.x;
    const newY = e.touches[0].clientY - dragStart.y;

    // Update position for dragging
    setPosition({
      x: newX,
      y: newY,
    });

    console.log("Touch move - Position:", { x: newX, y: newY });
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    // If it was just a click/tap (not a drag), we don't need to do anything special
    setIsDragging(false);

    // For touch events, check if it was a quick tap (less than 200ms)
    if (e.type.includes("touch")) {
      const touchDuration = Date.now() - touchStartTime;
      if (isJustClicking && touchDuration < 200) {
        // It was a tap, not a drag
        // We'll let the click handler on the seat handle the selection
      }
    }
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(prev + 0.1, 3));
    } else {
      setScale((prev) => Math.max(prev - 0.1, 0.5));
    }
  };

  // The actual seat map content
  const SeatMapContent = () => (
    <div
      className="flex flex-col items-center gap-6 bg-gradient-to-b from-gray-50 to-gray-100 p-6 rounded-lg relative overflow-hidden"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={(e) => handleDragEnd(e)}
      onMouseLeave={(e) => handleDragEnd(e)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={(e) => handleDragEnd(e)}
      onTouchCancel={(e) => handleDragEnd(e)}
      onWheel={handleWheel}
      style={{
        cursor: isDragging && !isJustClicking ? "grabbing" : "grab",
        touchAction: "none", // Disable browser touch actions to ensure our handlers work
        height: "100%",
        WebkitUserSelect: "none", // Prevent text selection during drag
        userSelect: "none",
        WebkitTouchCallout: "none", // Disable iOS callout
        WebkitTapHighlightColor: "transparent", // Remove tap highlight
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${
            position.y / scale
          }px)`,
          transformOrigin: "center center",
          transition: isDragging ? "none" : "transform 0.1s ease-out",
          willChange: "transform",
          touchAction: "none", // Ensure touch events are handled by our handlers
          WebkitOverflowScrolling: "touch", // Improve scrolling on iOS
          width: "100%",
        }}
      >
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
                  بخش {section.name} - {formatPrice(section.price)}
                </h3>
              </div>

              {/* Section Layout */}
              <div className="flex flex-col items-center gap-2">
                {/* Column headers */}
                <div
                  className={`grid gap-1 mb-2`}
                  style={{
                    gridTemplateColumns: `auto repeat(${section.seatsPerRow}, 1fr)`,
                  }}
                >
                  <div className="w-8"></div>
                  {Array.from({ length: section.seatsPerRow }, (_, i) => (
                    <div
                      key={i}
                      className="text-center text-xs text-foreground/60 w-8 h-8 flex items-center justify-center"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                {/* Seat rows for this section */}
                {Array.from({ length: section.rows }, (_, rowIndex) => {
                  const rowNumber = section.startRow + rowIndex;

                  return (
                    <div
                      key={rowNumber}
                      className={`grid gap-1 ${section.seatSpacing}`}
                      style={{
                        gridTemplateColumns: `auto repeat(${section.seatsPerRow}, 1fr)`,
                      }}
                    >
                      {/* Row number */}
                      <div className="text-center text-sm font-semibold text-foreground/70 w-8 h-8 flex items-center justify-center bg-card rounded">
                        {String.fromCharCode(65 + rowNumber - 1)}
                      </div>

                      {/* Seats in this row */}
                      {Array.from(
                        { length: section.seatsPerRow },
                        (_, seatIndex) => {
                          const seatNumber = seatIndex + 1;
                          const seatId = `${rowNumber}-${seatNumber}`;
                          const status = getSeatStatus(seatId);

                          return (
                            <button
                              key={seatId}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering drag
                                // Only handle click if we're not in the middle of a drag operation
                                if (isJustClicking || !isDragging) {
                                  handleSeatClick(seatId);
                                }
                              }}
                              onTouchStart={(e) => {
                                // Don't let the parent handle this touch
                                e.stopPropagation();
                              }}
                              onTouchEnd={(e) => {
                                e.stopPropagation();
                                // Only handle tap if we're not in the middle of a drag operation
                                if (isJustClicking) {
                                  handleSeatClick(seatId);
                                }
                              }}
                              disabled={
                                status === "purchased" ||
                                status === "waiting" ||
                                status === "unavailable"
                              }
                              className={`w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105 border-2 ${getSeatColor(
                                status
                              )} ${
                                status === "selected"
                                  ? "ring-2 ring-red-300"
                                  : ""
                              } touch-manipulation`}
                              title={`صندلی ${String.fromCharCode(
                                65 + rowNumber - 1
                              )}${seatNumber} - ${
                                status === "available"
                                  ? "آزاد"
                                  : status === "selected"
                                  ? "انتخاب شما"
                                  : status === "purchased"
                                  ? "خریداری شده"
                                  : status === "waiting"
                                  ? "در انتظار پرداخت"
                                  : "غیرقابل خرید"
                              }`}
                            >
                              {seatNumber}
                            </button>
                          );
                        }
                      )}

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

        {/* Floor */}
        <div className="w-full max-w-4xl mt-8 mb-4">
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-8 rounded-lg shadow-inner flex items-center justify-center">
            <span className="text-sm text-gray-600 font-medium">کف سالن</span>
          </div>
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
          <p>
            ظرفیت کل:{" "}
            {sections.reduce(
              (total, section) => total + section.rows * section.seatsPerRow,
              0
            )}{" "}
            صندلی
          </p>
          <p>بخش VIP: ردیف‌های A-B | بخش اصلی: ردیف‌های C-F</p>
        </div>
      </div>

      {/* Zoom controls - always visible */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-3 bg-white/90 p-3 rounded-lg shadow-md z-50">
        <button
          type="button"
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleZoomIn();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleZoomIn();
          }}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700"
          title="بزرگنمایی"
        >
          <Plus size={24} />
        </button>
        <button
          type="button"
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleZoomOut();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleZoomOut();
          }}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700"
          title="کوچک‌نمایی"
        >
          <Minus size={24} />
        </button>
        <button
          type="button"
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleResetZoom();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleResetZoom();
          }}
          className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 active:bg-gray-700"
          title="بازنشانی نما"
        >
          <Move size={24} />
        </button>
      </div>

      {/* Total cost - always visible */}
      <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg shadow-md">
        <div className="text-sm font-semibold text-black">مجموع هزینه:</div>
        <div className="text-lg font-bold text-blue-600">
          {formatPrice(calculateTotalCost())}
        </div>
        <div className="text-xs text-gray-500">
          تعداد صندلی: {selectedSeats.length}
        </div>
      </div>
    </div>
  );

  // For mobile, we'll show a button that opens the modal
  if (isMobile) {
    return (
      <>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
              <span>نمایش نقشه صندلی‌ها</span>
              <ZoomIn size={18} />
            </button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-full h-[90vh] p-0 overflow-hidden flex flex-col">
            <DialogHeader className="p-4 border-b flex-shrink-0">
              <DialogTitle className="text-center">انتخاب صندلی</DialogTitle>
            </DialogHeader>
            <div
              className="flex-1 overflow-hidden"
              style={{ height: "calc(90vh - 130px)" }}
            >
              <SeatMapContent />
            </div>
            <DialogFooter className="p-4 border-t bg-white">
              <div className="w-full flex justify-between items-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full"
                >
                  تایید
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Show a summary of selected seats outside the modal */}
        {selectedSeats.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-black">
                  صندلی‌های انتخاب شده: {selectedSeats.length}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedSeats
                    .map((seatId) => {
                      const [rowNumber, seatNumber] = seatId.split("-");
                      return `${String.fromCharCode(
                        65 + Number(rowNumber) - 1
                      )}${seatNumber}`;
                    })
                    .join("، ")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-black">مجموع:</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatPrice(calculateTotalCost())}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // For desktop, we'll show the seat map directly
  return <SeatMapContent />;
};

export default SeatMap;
