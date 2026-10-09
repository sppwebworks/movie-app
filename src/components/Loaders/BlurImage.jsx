/**
 * ============================================================
 * CONCEPT: PROGRESSIVE IMAGE LOADING (BLUR-UP)
 * ============================================================
 *
 * WHY: Sharp images suddenly appearing feels jarring. Blur-up
 *      makes image loading feel premium and prevents layout shifts.
 *
 * ES6+ USED: useState, spread props
 * ============================================================
 */

import { useState } from "react";

const BlurImage = ({ src, alt, className = "", ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="blur-image">
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${className} ${loaded ? "blur-loaded" : "blur-pending"}`}
        loading="lazy"
        {...rest}
      />
    </div>
  );
};

export default BlurImage;
