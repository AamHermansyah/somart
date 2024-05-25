import React from 'react'

type PropTypes = {
  Icon: React.ComponentType;
  title: string;
  value: string;
}

function CardOverview({ Icon, title, value }: PropTypes) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start gap-2 sm:gap-4 bg-background rounded-3xl px-4 py-6 shadow-sm">
      <div className="w-10 sm:basis-14 h-10 sm:h-14 flex justify-center items-center bg-primary/10 text-primary p-3 rounded-full">
        <Icon />
      </div>
      <div>
        <h4 className="text-xs sm:text-base font-semibold text-muted-foreground">{title}</h4>
        <span className="text-sm sm:text-2xl font-semibold tracking-wide">{value}</span>
      </div>
    </div>
  )
}

export default CardOverview