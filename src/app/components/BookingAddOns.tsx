import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Plus, Minus, Clock, Car, UtensilsCrossed, Flower2, Cake, Bed } from 'lucide-react';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  maxQuantity?: number;
}

interface BookingAddOnsProps {
  onAddOnsChange?: (addOns: { id: string; quantity: number; price: number }[]) => void;
}

export function BookingAddOns({ onAddOnsChange }: BookingAddOnsProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});

  const addOns: AddOn[] = [
    {
      id: 'early-checkin',
      name: 'Early Check-in',
      description: 'Check-in from 10:00 AM instead of 2:00 PM',
      price: 500,
      icon: Clock,
      maxQuantity: 1
    },
    {
      id: 'late-checkout',
      name: 'Late Checkout',
      description: 'Checkout at 2:00 PM instead of 11:00 AM',
      price: 500,
      icon: Clock,
      maxQuantity: 1
    },
    {
      id: 'airport-transfer',
      name: 'Airport Transfer',
      description: 'One-way pickup or drop service',
      price: 1500,
      icon: Car,
      maxQuantity: 2
    },
    {
      id: 'breakfast',
      name: 'Extra Breakfast',
      description: 'Additional breakfast per person',
      price: 350,
      icon: UtensilsCrossed,
      maxQuantity: 4
    },
    {
      id: 'flowers',
      name: 'Flower Bouquet',
      description: 'Fresh seasonal flowers in room',
      price: 800,
      icon: Flower2,
      maxQuantity: 1
    },
    {
      id: 'cake',
      name: 'Celebration Cake',
      description: 'Special occasion cake (1 kg)',
      price: 1200,
      icon: Cake,
      maxQuantity: 1
    },
    {
      id: 'extra-bedding',
      name: 'Extra Bedding',
      description: 'Additional mattress with bedding',
      price: 600,
      icon: Bed,
      maxQuantity: 2
    }
  ];

  const handleQuantityChange = (addOnId: string, delta: number) => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (!addOn) return;

    const currentQuantity = selectedAddOns[addOnId] || 0;
    const newQuantity = Math.max(0, Math.min(currentQuantity + delta, addOn.maxQuantity || 10));

    const newSelectedAddOns = { ...selectedAddOns };
    if (newQuantity === 0) {
      delete newSelectedAddOns[addOnId];
    } else {
      newSelectedAddOns[addOnId] = newQuantity;
    }

    setSelectedAddOns(newSelectedAddOns);

    // Notify parent component
    if (onAddOnsChange) {
      const addOnsArray = Object.entries(newSelectedAddOns).map(([id, quantity]) => ({
        id,
        quantity,
        price: (addOns.find(a => a.id === id)?.price || 0) * quantity
      }));
      onAddOnsChange(addOnsArray);
    }
  };

  const totalAddOnsPrice = Object.entries(selectedAddOns).reduce((total, [id, quantity]) => {
    const addOn = addOns.find(a => a.id === id);
    return total + (addOn?.price || 0) * quantity;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 style={{ fontFamily: 'Playfair Display' }} className="text-2xl font-semibold text-[#2F4F46] mb-2">
          Enhance Your Stay
        </h3>
        <p className="text-sm text-[#8A8A8A]">Add special services to make your stay more comfortable</p>
      </div>

      <div className="space-y-3">
        {addOns.map((addOn) => {
          const Icon = addOn.icon;
          const quantity = selectedAddOns[addOn.id] || 0;
          const isSelected = quantity > 0;

          return (
            <motion.div
              key={addOn.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              className={`
                p-4 rounded-xl border-2 transition-all cursor-pointer
                ${isSelected 
                  ? 'border-[#C6A75E] bg-[#FFF8ED]' 
                  : 'border-[#EAEAEA] bg-white hover:border-[#C6A75E]/50'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                  ${isSelected ? 'bg-[#C6A75E] text-white' : 'bg-[#F7F6F2] text-[#2F4F46]'}
                `}>
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-semibold text-[#2F4F46]">{addOn.name}</h4>
                    <div className="text-right ml-2">
                      <div className="font-semibold text-[#2F4F46]">₹{addOn.price.toLocaleString()}</div>
                      {quantity > 0 && (
                        <div className="text-xs text-[#C6A75E]">₹{(addOn.price * quantity).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-[#8A8A8A] mb-3">{addOn.description}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(addOn.id, -1)}
                      disabled={quantity === 0}
                      className="w-8 h-8 rounded-lg bg-[#F7F6F2] hover:bg-[#E8DCC4] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4 text-[#2F4F46]" />
                    </motion.button>

                    <div className={`
                      w-12 h-8 flex items-center justify-center rounded-lg font-semibold
                      ${isSelected ? 'bg-[#C6A75E] text-white' : 'bg-[#F7F6F2] text-[#2F4F46]'}
                    `}>
                      {quantity}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleQuantityChange(addOn.id, 1)}
                      disabled={quantity >= (addOn.maxQuantity || 10)}
                      className="w-8 h-8 rounded-lg bg-[#F7F6F2] hover:bg-[#E8DCC4] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4 text-[#2F4F46]" />
                    </motion.button>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto flex items-center gap-1.5 text-[#C6A75E] text-sm font-medium"
                      >
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Total */}
      {totalAddOnsPrice > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#2F4F46] to-[#1B4332] text-white"
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">Total Add-ons</span>
            <span className="text-xl font-semibold">₹{totalAddOnsPrice.toLocaleString()}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
