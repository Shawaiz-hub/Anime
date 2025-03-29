
import React, { useEffect, useRef } from 'react';

const BlackholeAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = 70; // Height of navbar approximately
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation properties
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      opacity: number;
    }> = [];
    
    // Create particles
    const createParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const particleCount = 200;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * (canvas.width / 2);
        
        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: Math.random() * 2 + 0.5,
          speed: (Math.random() * 1) + 0.2,
          angle: Math.atan2(centerY - (centerY + Math.sin(angle) * distance), centerX - (centerX + Math.cos(angle) * distance)),
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };
    
    createParticles();
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw blackhole center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create radial gradient for blackhole
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.3, 'rgba(30, 10, 40, 0.8)');
      gradient.addColorStop(0.7, 'rgba(40, 20, 60, 0.3)');
      gradient.addColorStop(1, 'rgba(30, 10, 40, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fill();
      
      // Update and draw particles
      particles.forEach(particle => {
        // Calculate direction toward center
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update position - move toward center with increasing speed as they get closer
        const speedMultiplier = distance < 50 ? 3 : distance < 100 ? 2 : 1;
        particle.x += Math.cos(particle.angle) * particle.speed * speedMultiplier;
        particle.y += Math.sin(particle.angle) * particle.speed * speedMultiplier;
        
        // Particles disappear when they reach center
        if (distance < 5) {
          particle.opacity -= 0.1;
          particle.size -= 0.1;
        }
        
        // Draw particle
        if (particle.opacity > 0 && particle.size > 0) {
          ctx.fillStyle = `rgba(180, 180, 255, ${particle.opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Respawn particle at edge
          const angle = Math.random() * Math.PI * 2;
          const newDistance = canvas.width / 2.5;
          particle.x = centerX + Math.cos(angle) * newDistance;
          particle.y = centerY + Math.sin(angle) * newDistance;
          particle.size = Math.random() * 2 + 0.5;
          particle.opacity = Math.random() * 0.8 + 0.2;
          particle.angle = Math.atan2(centerY - particle.y, centerX - particle.x);
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default BlackholeAnimation;
