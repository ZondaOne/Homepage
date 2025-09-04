import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroWave: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Configuración inicial responsive
    const isMobile = width < 768;
    const initialDotSize = isMobile ? 6.0 : 8.0;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" // Mejor rendimiento en móvil
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar pixelRatio en móvil
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_dotSize: { value: initialDotSize },
        u_bgColor: { value: new THREE.Color(0x000000) }, // Negro
        u_dotColor: { value: new THREE.Color(0xff6600) }, // Naranja
        u_opacity: { value: 1.0 }, // Opacidad aumentada
        u_contrast: { value: 1.2 }, // Contraste aumentado
        u_glitch: { value: 0.5 }, // Efecto glitch
        u_pulse: { value: 3.0 }, // Efecto pulso
        u_twist: { value: 1.9 }, // Efecto twist/rotación
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float u_time;
        uniform vec2 u_resolution;
        uniform float u_dotSize;
        uniform vec3 u_bgColor;
        uniform vec3 u_dotColor;
        uniform float u_opacity;
        uniform float u_contrast;
        uniform float u_glitch;
        uniform float u_pulse;
        uniform float u_twist;
        varying vec2 vUv;

        float wave(vec2 uv, float freq, float speed, float amplitude, float phase, float yOffset){
          return sin(uv.x * freq + u_time * speed + phase) * amplitude + yOffset;
        }

        float glow(float dist, float intensity) {
          return exp(-dist*dist*intensity);
        }

        float halftone(vec2 uv, float intensity) {
          // Crear grid de puntos con efecto twist (más lento)
          float angle = length(uv - vec2(0.5)) * u_twist + u_time * 0.3;
          vec2 rotUV = vec2(
            cos(angle) * (uv.x - 0.5) - sin(angle) * (uv.y - 0.5) + 0.5,
            sin(angle) * (uv.x - 0.5) + cos(angle) * (uv.y - 0.5) + 0.5
          );
          
          vec2 gridUV = rotUV * u_resolution / u_dotSize;
          vec2 gridPos = fract(gridUV);
          
          // Efecto glitch random (más lento)
          float glitchNoise = sin(gridUV.x * 127.1 + gridUV.y * 311.7 + u_time * 6.0) * 0.5 + 0.5;
          float glitchEffect = step(0.95, glitchNoise) * u_glitch;
          gridPos += vec2(glitchEffect * 0.3);
          
          // Distancia desde el centro del punto
          float dist = distance(fract(gridPos), vec2(0.5));
          
          // Tamaño del punto con pulso (más lento)
          float pulse = sin(u_time * 2.0) * 0.1 + 1.0;
          float dotRadius = intensity * 0.45 * pulse * u_pulse;
          
          // Crear el punto con anti-aliasing
          return 1.0 - smoothstep(dotRadius - 0.02, dotRadius + 0.02, dist);
        }

        void main() {
          vec2 uv = vUv;
          uv = uv * 2.0 - 1.0;
          uv.x *= u_resolution.x / u_resolution.y;

          // Efecto de distorsión temporal (más lento)
          float timeWarp = sin(u_time * 1.2) * 0.1;
          uv *= 1.0 + timeWarp;

          float intensity = 0.0;

          // Ondas con más caos y variación (velocidades reducidas)
          float w1 = wave(uv, 3.0 + sin(u_time * 0.3) * 0.5, 0.3, 0.25, 0.0, 0.5);
          float w2 = wave(uv, 2.5 + cos(u_time * 0.4) * 0.3, 0.35, 0.2, 1.0, -0.4);
          float w3 = wave(uv, 4.0 + sin(u_time * 0.2) * 0.7, 0.25, 0.15, 2.0, 0.2);
          float w4 = wave(uv, 3.5 + cos(u_time * 0.5) * 0.4, 0.28, 0.18, 3.0, -0.2);
          
          // Ondas adicionales para más locura (más lentas)
          float w5 = wave(uv, 6.0 + sin(u_time * 0.7) * 0.8, 0.4, 0.1, 4.0, 0.1);
          float w6 = wave(uv, 1.5 + cos(u_time * 0.35) * 0.2, 0.2, 0.3, 5.0, -0.3);

          // Desvanecimiento más dinámico
          float fade1 = smoothstep(-1.5, 1.2, uv.x) * smoothstep(1.5, -1.2, uv.x);
          float fade2 = smoothstep(-1.4, 1.1, uv.x) * smoothstep(1.4, -1.1, uv.x);
          float fade3 = smoothstep(-1.3, 1.3, uv.x) * smoothstep(1.3, -1.3, uv.x);
          float fade4 = smoothstep(-1.6, 1.0, uv.x) * smoothstep(1.6, -1.0, uv.x);

          intensity += glow(abs(uv.y - w1), 200.0 + sin(u_time * 1.2) * 50.0) * fade1;
          intensity += glow(abs(uv.y - w2), 180.0 + cos(u_time * 0.9) * 40.0) * fade2;
          intensity += glow(abs(uv.y - w3), 150.0 + sin(u_time * 1.8) * 60.0) * fade3;
          intensity += glow(abs(uv.y - w4), 170.0 + cos(u_time * 1.5) * 45.0) * fade4;
          intensity += glow(abs(uv.y - w5), 300.0) * fade1 * 0.5;
          intensity += glow(abs(uv.y - w6), 250.0) * fade2 * 0.4;

          // Reducir intensidad general y crear zona central más suave
          intensity = clamp(intensity * u_contrast, 0.0, 1.0);
          
          // Crear una zona central más tenue para el texto (más sutil)
          vec2 center = vec2(0.0, 0.0);
          float distFromCenter = length(uv - center);
          float centerFade = smoothstep(0.2, 1.0, distFromCenter);
          intensity *= mix(0.5, 1.0, centerFade); // Mínimo 50% en el centro

          // Múltiples capas de halftone con diferentes efectos
          float dotsOrange = halftone(vUv, intensity) * u_opacity;
          float dotsWhite = halftone(vUv + vec2(0.3, 0.3), intensity * 0.6) * u_opacity;
          float dotsGlow = halftone(vUv + vec2(-0.2, 0.4), intensity * 0.8) * u_opacity * 0.3;
          
          // Colores más dinámicos con variación temporal
          float colorShift = sin(u_time * 1.5) * 0.1 + 1.0;
          vec3 orange = vec3(1.0 * colorShift, 0.4, 0.0);
          vec3 white = vec3(1.0, 1.0 * colorShift, 1.0);
          vec3 glow = vec3(1.0, 0.8, 0.2); // Amarillo dorado
          
          vec3 finalColor = u_bgColor;
          finalColor = mix(finalColor, orange, dotsOrange);
          finalColor = mix(finalColor, white, dotsWhite * 0.4);
          finalColor = mix(finalColor, glow, dotsGlow);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false,
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = mountRef.current?.clientWidth || width;
      const h = mountRef.current?.clientHeight || height;
      renderer.setSize(w, h);
      material.uniforms.u_resolution.value.set(w, h);
      
      // Ajustar tamaño de puntos según el dispositivo
      const isMobile = w < 768;
      material.uniforms.u_dotSize.value = isMobile ? 6.0 : 8.0;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="hero-canvas"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        touchAction: 'none' // Prevenir zoom en móvil
      }}
    />
  );
};

export default HeroWave;