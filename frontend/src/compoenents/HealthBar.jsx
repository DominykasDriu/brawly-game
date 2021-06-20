import React from 'react'

export default function HealthBar({hp}) {;
  return (
    <div className="healthbar">
      <div className="healthbar_filler" style={{width: `${hp}%`}}></div>
    </div>
  );
}
