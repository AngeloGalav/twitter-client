import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet';

function ChangeView({ center, zoom}) {
    const map = useMap();
    useEffect(() => map.setView(center, zoom), [center]);
    return null;
  }

export default ChangeView
