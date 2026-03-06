import { motion } from 'motion/react';
import { Train, Bus, Plane, MapPin, ShoppingBag, Trees, Church, Navigation, Dumbbell } from 'lucide-react';

export function Location() {
  const primaryAccess = [
    { 
      icon: Train, 
      label: 'Alpha 1 Metro Station', 
      distance: '6–8 minutes walk',
      link: 'https://www.google.com/maps/dir/E-146+Alpha+1+Greater+Noida/Alpha+1+Metro+Station+Greater+Noida'
    }
  ];

  const secondaryAccess = [
    { 
      icon: Bus, 
      label: 'Pari Chowk Bus Stand', 
      distance: '5 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Pari+Chowk+Bus+Stand+Greater+Noida'
    },
    { 
      icon: MapPin, 
      label: 'Delta 1 Metro Station', 
      distance: '7 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Delta+1+Metro+Station+Greater+Noida'
    },
    { 
      icon: MapPin, 
      label: 'Knowledge Park II Metro', 
      distance: '10 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Knowledge+Park+II+Metro+Station+Greater+Noida'
    }
  ];

  const majorConnections = [
    { 
      icon: Train, 
      label: 'Ghaziabad Railway Station', 
      distance: '45 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Ghaziabad+Railway+Station'
    },
    { 
      icon: Train, 
      label: 'Anand Vihar Terminal', 
      distance: '50 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Anand+Vihar+Terminal+Railway+Station'
    },
    { 
      icon: Train, 
      label: 'New Delhi Railway Station', 
      distance: '70 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=New+Delhi+Railway+Station'
    },
    { 
      icon: Plane, 
      label: 'Jewar International Airport', 
      distance: '1 hour drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Noida+International+Airport+Jewar'
    },
    { 
      icon: Plane, 
      label: 'IGI Airport Delhi', 
      distance: '1.5 hours drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Indira+Gandhi+International+Airport+Delhi'
    }
  ];

  const allAttractions = [
    { 
      icon: MapPin, 
      label: 'India Expo Mart', 
      distance: '3–5 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=India+Expo+Mart+Greater+Noida'
    },
    { 
      icon: Dumbbell, 
      label: 'Jaypee Atlantic Integrated Sports Complex', 
      distance: '6–8 minutes drive',
      link: 'https://www.google.com/maps/dir/E-146+Alpha+1+Greater+Noida/Jaypee+Atlantic+Integrated+Sports+Complex+Greater+Noida'
    },
    { 
      icon: ShoppingBag, 
      label: 'The Grand Venice Mall', 
      distance: '8–12 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=The+Grand+Venice+Mall+Greater+Noida'
    },
    { 
      icon: Dumbbell, 
      label: 'Shaheed Vijay Singh Pathik Sports Complex', 
      distance: '8–12 minutes drive',
      link: 'https://www.google.com/maps/dir/E-146+Alpha+1+Greater+Noida/Shaheed+Vijay+Singh+Pathik+Sports+Complex+Indoor+Stadium'
    },
    { 
      icon: ShoppingBag, 
      label: 'Galaxy Blue Sapphire Plaza', 
      distance: '10–15 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Galaxy+Blue+Sapphire+Plaza+Greater+Noida'
    },
    { 
      icon: Trees, 
      label: 'City Park Greater Noida', 
      distance: '15–18 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=City+Park+Greater+Noida'
    },
    { 
      icon: ShoppingBag, 
      label: 'MSX Mall', 
      distance: '18–22 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=MSX+Mall+Greater+Noida'
    },
    { 
      icon: ShoppingBag, 
      label: 'Omaxe Connaught Place', 
      distance: '18–22 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Omaxe+Connaught+Place+Greater+Noida'
    },
    { 
      icon: Church, 
      label: 'ISKCON Temple Greater Noida', 
      distance: '20–25 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=ISKCON+Temple+Greater+Noida'
    },
    { 
      icon: MapPin, 
      label: 'Buddh International Circuit', 
      distance: '20–25 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Buddh+International+Circuit+Greater+Noida'
    },
    { 
      icon: ShoppingBag, 
      label: 'Gaur City Mall', 
      distance: '22–30 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Gaur+City+Mall+Noida'
    },
    { 
      icon: Trees, 
      label: 'Surajpur Wetland & Bird Sanctuary', 
      distance: '25–35 minutes drive',
      link: 'https://www.google.com/maps/dir/?api=1&destination=Surajpur+Wetland+Bird+Sanctuary+Greater+Noida'
    }
  ];

  const renderCard = (item: any, idx: number) => {
    const Icon = item.icon;
    return (
      <motion.a
        key={idx}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05, duration: 0.3 }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-[18px] p-5 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer border-b-2 border-transparent hover:border-[#C6A75E] group"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Icon className="w-6 h-6 text-[#2F4F46] group-hover:text-[#C6A75E] transition-colors" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[#2F4F46] font-medium text-sm mb-1 group-hover:text-[#C6A75E] transition-colors">
              {item.label}
            </h4>
            {item.distance && (
              <p className="text-[#8A8A8A] text-xs">{item.distance}</p>
            )}
          </div>
          <Navigation className="w-4 h-4 text-[#C6A75E] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
        </div>
      </motion.a>
    );
  };

  return (
    <section className="py-20 px-6 bg-[#F7F6F2]">
      <div className="max-w-[1200px] mx-auto">
        {/* TRANSPORT ACCESS */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 style={{ fontFamily: 'Playfair Display' }} className="text-3xl md:text-4xl text-[#2F4F46] mb-4 font-semibold">
              Transport Access
            </h3>
            <div className="w-10 h-px bg-[#C6A75E] mx-auto"></div>
          </div>

          {/* Primary Access */}
          <div className="mb-8">
            <h4 className="text-[#2F4F46] font-semibold text-sm mb-4 tracking-wide">PRIMARY ACCESS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {primaryAccess.map((item, idx) => renderCard(item, idx))}
            </div>
          </div>

          {/* Secondary Access */}
          <div className="mb-8">
            <h4 className="text-[#2F4F46] font-semibold text-sm mb-4 tracking-wide">SECONDARY ACCESS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {secondaryAccess.map((item, idx) => renderCard(item, idx))}
            </div>
          </div>

          {/* Major Connections */}
          <div>
            <h4 className="text-[#2F4F46] font-semibold text-sm mb-4 tracking-wide">MAJOR CONNECTIONS</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {majorConnections.map((item, idx) => renderCard(item, idx))}
            </div>
          </div>
        </div>

        {/* NEARBY ATTRACTIONS */}
        <div>
          <div className="text-center mb-12">
            <h3 style={{ fontFamily: 'Playfair Display' }} className="text-3xl md:text-4xl text-[#2F4F46] mb-4 font-semibold">
              Nearby Attractions
            </h3>
            <div className="w-10 h-px bg-[#C6A75E] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAttractions.map((item, idx) => renderCard(item, idx))}
          </div>
        </div>
      </div>
    </section>
  );
}