import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Tv, Check, Gamepad2, Sparkles } from 'lucide-react';
import { Game, FoodItem, SlotBookingRequest } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGame?: Game | null;
  cafeItems: FoodItem[];
  onConfirmBooking: (booking: SlotBookingRequest) => void;
  discountClaimed?: boolean;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedGame,
  cafeItems,
  onConfirmBooking,
  discountClaimed,
}) => {
  if (!isOpen) return null;

  const [platform, setPlatform] = useState<'PS5' | 'Xbox Series X' | 'High-End PC' | 'VR Simulator' | 'Pool Table' | 'Snooker Table'>('PS5');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState<string>('03:00 PM');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [selectedSnacks, setSelectedSnacks] = useState<{ [id: string]: number }>({});
  const [coupon, setCoupon] = useState<string>(discountClaimed ? 'PLAYSPHERE10' : '');

  useEffect(() => {
    if (isOpen) {
      if (discountClaimed) {
        setCoupon('PLAYSPHERE10');
      }
      if (selectedGame) {
        const pList = selectedGame.platforms || [];
        if (pList.some(p => p.includes('Pool'))) setPlatform('Pool Table');
        else if (pList.some(p => p.includes('Snooker'))) setPlatform('Snooker Table');
        else if (pList.some(p => p.includes('VR'))) setPlatform('VR Simulator');
        else if (pList.some(p => p.includes('PC'))) setPlatform('High-End PC');
        else if (pList.some(p => p.includes('Xbox'))) setPlatform('Xbox Series X');
        else setPlatform('PS5');
      }
    }
  }, [isOpen, selectedGame, discountClaimed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const availableSlots = [
    '10:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM', '11:00 PM'
  ];

  const hourlyRateMap = {
    'PS5': 300,
    'Xbox Series X': 280,
    'High-End PC': 350,
    'VR Simulator': 450,
    'Pool Table': 200,
    'Snooker Table': 250,
  };

  const baseRate = selectedGame ? selectedGame.pricePerHour : hourlyRateMap[platform];
  const slotSubtotal = baseRate * durationHours;

  const snacksSubtotal = Object.entries(selectedSnacks).reduce((sum, [foodId, qty]) => {
    const food = cafeItems.find((f) => f.id === foodId);
    const itemPrice = food ? Number(food.price) : 0;
    const itemQty = Number(qty);
    return sum + itemPrice * itemQty;
  }, 0);

  const rawTotal = slotSubtotal + snacksSubtotal;
  const isCouponValid = coupon.trim().toUpperCase() === 'PLAYSPHERE10' || discountClaimed;
  const discountAmount = isCouponValid ? Math.round(rawTotal * 0.1) : 0;
  const finalTotal = Math.max(0, rawTotal - discountAmount);

  const toggleSnack = (foodId: string) => {
    setSelectedSnacks((prev) => {
      const current = prev[foodId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[foodId];
        return copy;
      } else {
        return { ...prev, [foodId]: 1 };
      }
    });
  };

  const handleConfirm = () => {
    const foodAddonsList = Object.entries(selectedSnacks).map(([foodId, qty]) => ({
      foodId,
      quantity: qty,
    }));

    onConfirmBooking({
      gameId: selectedGame?.id,
      gameTitle: selectedGame?.title || 'General Gaming Station',
      platform,
      date,
      timeSlot,
      durationHours,
      foodAddons: foodAddonsList,
      couponCode: isCouponValid ? 'PLAYSPHERE10' : undefined,
      totalPrice: finalTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-[#121824] border border-slate-800 rounded-2xl sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0e131d] px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider truncate">
                BOOK YOUR GAMING SLOT
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                {selectedGame ? `Reserved for: ${selectedGame.title}` : 'PlaySphere Lounge'}
              </p>
            </div>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Select Platform */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4 text-lime-400" />
              Select Gaming Setup / Console
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {(['PS5', 'Xbox Series X', 'High-End PC', 'VR Simulator', 'Pool Table', 'Snooker Table'] as const).map((plat) => (
                <button
                  key={plat}
                  type="button"
                  onClick={() => setPlatform(plat)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold text-center transition-all ${
                    platform === plat
                      ? 'bg-lime-400/10 border-lime-400 text-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                      : 'bg-[#0e131d] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p>{plat}</p>
                  <p className="text-[10px] text-slate-500 font-normal mt-0.5">₹{hourlyRateMap[plat]}/hr</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date & Duration Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-lime-400" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#0e131d] border border-slate-800 text-sm text-white rounded-xl px-4 py-2.5 focus:outline-none focus:border-lime-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400" />
                Duration (Hours)
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 5].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setDurationHours(hr)}
                    className={`flex-1 py-2 rounded-xl border text-xs font-extrabold transition-all ${
                      durationHours === hr
                        ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.4)]'
                        : 'bg-[#0e131d] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {hr} {hr === 1 ? 'Hour' : 'Hrs'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Available Time Slots
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    timeSlot === slot
                      ? 'bg-lime-400 text-black border-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.3)]'
                      : 'bg-[#0e131d] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Cafe Add-ons */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              Add Café Snacks To Slot (Optional)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cafeItems.map((food) => {
                const isSelected = !!selectedSnacks[food.id];
                return (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => toggleSnack(food.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                      isSelected
                        ? 'bg-lime-400/10 border-lime-400 text-white'
                        : 'bg-[#0e131d] border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={food.image} alt={food.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-white text-[11px]">{food.name}</p>
                        <p className="text-[10px] text-lime-400 font-semibold">₹{food.price}</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-lime-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coupon Code Input */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. PLAYSPHERE10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-[#0e131d] border border-slate-800 text-xs text-white rounded-xl px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-lime-400"
              />
            </div>
            {isCouponValid && (
              <p className="text-[11px] font-bold text-lime-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 10% Discount Applied! (-₹{discountAmount})
              </p>
            )}
          </div>
        </div>

        {/* Footer Price Summary & Action */}
        <div className="bg-[#0e131d] p-5 border-t border-slate-800 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-lime-400">₹{finalTotal}</span>
              {discountAmount > 0 && (
                <span className="text-xs text-slate-500 line-through">₹{rawTotal}</span>
              )}
            </div>
          </div>

          <button
            id="confirm-slot-booking-btn"
            onClick={handleConfirm}
            className="bg-lime-400 hover:bg-lime-300 text-black px-6 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)] transition-all cursor-pointer"
          >
            CONFIRM & BOOK SLOT
          </button>
        </div>
      </div>
    </div>
  );
};
