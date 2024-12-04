import { useRef, useEffect, useState } from "react";
import CanvasImages from "./canvasimages";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

function Canvas({ details = {} }) {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [currentIndex, setCurrentIndex] = useState(startIndex);
    const canvasRef = useRef(null);
    const indexRef = useRef({ value: startIndex });
    
    useGSAP(() => {
        gsap.to(indexRef.current, {
            value: startIndex + numImages - 1,
            duration: duration,
            ease: "linear",
            repeat: -1,
            onUpdate: () => {
                setCurrentIndex(Math.round(indexRef.current.value));
            },
        });
        gsap.from(canvasRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
        });
    }, []);
    
    useEffect(() => {
        const scale = window.devicePixelRatio;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = CanvasImages[currentIndex];
        
        img.onload = () => {
            canvas.width = canvas.offsetWidth * scale;
            canvas.height = canvas.offsetHeight * scale;
            canvas.style.width = canvas.offsetWidth + "px";
            canvas.style.height = canvas.offsetHeight + "px";
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight);
        };
    }, [currentIndex]);

    return (
        <canvas 
            data-scroll
            data-scroll-speed={Math.random().toFixed(2)}
            ref={canvasRef} 
            className="absolute"
            style={{
                width: `${size*1.8}px`,
                height: `${size*1.8}px`,
                top: `${top}%`,
                left: `${left}%`,
                zIndex: zIndex,
            }}
            id="canvas"
        />
    );
}

export default Canvas;
