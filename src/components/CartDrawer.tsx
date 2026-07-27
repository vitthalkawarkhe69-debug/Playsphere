import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  discountClaimed?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  discountClaimed = false,
}) => {
  const [coupon, setCoupon] = useState(discountClaimed ? 'PLAYSPHERE10' : '');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(discountClaimed ? 'PLAYSPHERE10' : null);

  useEffect(() => {
    if (discountClaimed) {
      setCoupon('PLAYSPHERE10');
      setAppliedCoupon('PLAYSPHERE10');
    }
  }, [discountClaimed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon === 'PLAYSPHERE10' ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal - discount) * 0.05); // 5% tax
  const total = Math.max(0, subtotal - discount + taxes);

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'PLAYSPHERE10') {
      setAppliedCoupon('PLAYSPHERE10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in">
      <div className="bg-[#121824] border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl relative">
        {/* Drawer Header */}
        <div className="bg-[#0e131d] p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-wider">
                YOUR ORDER CART
              </h3>
              <p className="text-xs text-slate-400">{cartItems.length} unique items</p>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Items List */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-white">Your Cart is Empty</h4>
              <p className="text-xs text-slate-400 max-w-xs">
                Add snacks from Café Popular or book a gaming slot to start your order!
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0e131d] p-3 rounded-2xl border border-slate-800 flex items-center gap-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop';
                    }}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                  {item.details && <p className="text-[10px] text-slate-400 line-clamp-1">{item.details}</p>}
                  <p className="text-xs font-extrabold text-lime-400 mt-1">₹{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 bg-[#161d2a] p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black text-white px-1">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Trash Delete */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cartItems.length > 0 && (
          <div className="bg-[#0e131d] p-5 border-t border-slate-800 space-y-4">
            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-[#121824] border border-slate-800 text-xs text-white rounded-xl px-3 py-2 uppercase tracking-wider focus:outline-none focus:border-lime-400"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-slate-800 hover:bg-slate-700 text-lime-400 px-3 py-2 rounded-xl font-bold text-xs uppercase"
              >
                APPLY
              </button>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-lime-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Promo (10% OFF)
                  </span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>GST / Taxes (5%)</span>
                <span>₹{taxes}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
                <span>Grand Total</span>
                <span className="text-lime-400 text-base">₹{total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onClearCart}
                className="px-3 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-bold uppercase"
              >
                Clear
              </button>
              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="flex-1 bg-lime-400 hover:bg-lime-300 text-black py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(163,230,53,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO PAY</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
