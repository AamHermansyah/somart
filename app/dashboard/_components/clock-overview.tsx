import { Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const ClockOverview: React.FC = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    // Set the initial time on mount and start the interval
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!time) {
    // Render a placeholder or nothing during SSR
    return null;
  }

  const formattedTime = time.toLocaleTimeString('en-GB', {
    hour12: false,
  });

  const getGreeting = (hours: number): string => {
    if (hours < 5) {
      return 'Selamat malam!';
    } else if (hours < 11) {
      return 'Selamat pagi!';
    } else if (hours < 15) {
      return 'Selamat siang!';
    } else if (hours < 18) {
      return 'Selamat sore!'
    } else {
      return 'Selamat malam!';
    }
  };

  const greeting = getGreeting(time.getHours());

  return (
    <div className="w-full flex flex-col sm:flex-row items-start gap-2 sm:gap-4 bg-primary text-primary-foreground rounded-3xl px-4 py-6 shadow-sm">
      <div className="w-10 sm:basis-14 h-10 sm:h-14 flex justify-center items-center bg-background/10 p-3 rounded-full">
        <Clock />
      </div>
      <div>
        <h4 className="text-xs sm:text-base font-semibold">{greeting}</h4>
        <span className="text-sm sm:text-2xl font-semibold tracking-wide">{formattedTime}</span>
      </div>
    </div>
  );
};

export default ClockOverview;
