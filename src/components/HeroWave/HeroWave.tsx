import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PremiumEnterpriseHero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene setup with optimized settings
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: "high-performance",
      precision: "highp"
    });
    
    // Responsive pixel ratio optimization
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
  uniforms: {
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(width, height) },
    u_pixelRatio: { value: pixelRatio },
    // Premium brand color palette
    u_brandOrange:   { value: new THREE.Color(0xff5500) }, // Main brand orange
    u_lightOrange:   { value: new THREE.Color(0xff8533) }, // Lighter orange
    u_warmOrange:    { value: new THREE.Color(0xff751a) },
    u_goldAccent:    { value: new THREE.Color(0xff9900) }, // Strong golden accent
    u_neutralWarm:   { value: new THREE.Color(0xffe0b3) }, // Warm neutral (más dorado, menos pastel)
    u_backgroundBase:{ value: new THREE.Color(0xfafafa) }, // Clean base
    u_backgroundTop: { value: new THREE.Color(0xffffff) }, // Pure white top

    // Animation controls (intensidades subidas)
    u_waveIntensity:   { value: 20.0 }, // MUY fuerte
    u_waveSpeed:       { value: 0.2 },   // más rápida
    u_gradientStrength:{ value: 0.2}    // gradiente más marcado
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
    uniform float u_pixelRatio;
    uniform vec3 u_brandOrange;
    uniform vec3 u_lightOrange;
    uniform vec3 u_warmOrange;
    uniform vec3 u_goldAccent;
    uniform vec3 u_neutralWarm;
    uniform vec3 u_backgroundBase;
    uniform vec3 u_backgroundTop;
    uniform float u_waveIntensity;
    uniform float u_waveSpeed;
    uniform float u_gradientStrength;
    varying vec2 vUv;

    // Smooth noise functions for premium texture
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // Multi-octave noise for sophisticated texture
    float fbm(vec2 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      
      for(int i = 0; i < 6; i++) {
        if(i >= octaves) break;
        value += amplitude * smoothNoise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Premium wave function with multiple harmonics
    float premiumWave(vec2 uv, float time) {
      vec2 pos = uv * 2.0 - 1.0;
      pos.x *= u_resolution.x / u_resolution.y;
      
      float wave1 = sin(pos.x * 1.5 + time * u_waveSpeed * 0.8) * 0.9; // antes 0.3
      float wave2 = sin(pos.x * 2.2 - time * u_waveSpeed * 0.6) * 0.7;
      float wave3 = sin(pos.x * 0.8 + pos.y * 0.3 + time * u_waveSpeed * 0.4) * 0.3; // antes 0.15
      
      float harmonic1 = sin(pos.x * 4.1 + time * u_waveSpeed * 1.2) * 0.08;
      float harmonic2 = sin(pos.x * 6.3 - time * u_waveSpeed * 0.9) * 0.05;
      
      return (wave1 + wave2 + wave3 + harmonic1 + harmonic2) * u_waveIntensity;
    }

    // Enterprise-grade gradient background
    vec3 createEnterpriseGradient(vec2 uv) {
      vec3 topColor = u_backgroundTop;
      vec3 midColor = mix(u_backgroundBase, u_neutralWarm, 0.3);
      vec3 bottomColor = u_backgroundBase;
      
      float gradientY = smoothstep(0.0, 1.0, uv.y);
      gradientY = gradientY * gradientY * (3.0 - 2.0 * gradientY);
      
      vec3 gradient;
      if(gradientY < 0.5) {
        gradient = mix(bottomColor, midColor, gradientY * 2.0);
      } else {
        gradient = mix(midColor, topColor, (gradientY - 0.5) * 2.0);
      }
      
      float horizontalVar = sin(uv.x * 3.14159) * 0.02;
      gradient = mix(gradient, u_neutralWarm, horizontalVar);
      
      return gradient;
    }

    // Professional wave rendering with advanced blending
    vec3 renderPremiumWaves(vec2 uv, vec3 background) {
      float time = u_time;
      vec2 pos = uv * 2.0 - 1.0;
      pos.x *= u_resolution.x / u_resolution.y;
      
      float totalIntensity = 0.0;
      vec3 waveColor = vec3(0.0);
      
      for(int i = 0; i < 4; i++) {
        float layerOffset = float(i) * 0.5;
        float frequency = 1.2 + float(i) * 0.4;
        float amplitude = 0.25 - float(i) * 0.04;
        float speed = u_waveSpeed * (1.0 + float(i) * 0.2);
        
        float wave = sin(pos.x * frequency + time * speed + layerOffset) * amplitude;
        wave += sin(pos.x * frequency * 1.6 - time * speed * 0.8 + layerOffset) * amplitude * 0.6;
        
        float dist = abs(pos.y - wave);
        float intensity = exp(-dist * (15.0 + float(i) * 5.0)) * (1.0 - float(i) * 0.15);
        
        totalIntensity += intensity;
        
        vec3 layerColor;
        if(i == 0) layerColor = u_brandOrange;
        else if(i == 1) layerColor = u_lightOrange;
        else if(i == 2) layerColor = u_warmOrange;
        else layerColor = u_goldAccent;
        
        waveColor += layerColor * intensity;
      }
      
      float edgeFade = smoothstep(-1.4, 1.2, pos.x) * smoothstep(1.4, -1.2, pos.x);
      totalIntensity *= edgeFade;
      
      float centerClear = smoothstep(0.15, 0.8, length(pos));
      totalIntensity *= mix(0.25, 1.0, centerClear);
      
      return mix(background, waveColor, clamp(totalIntensity, 0.0, 0.6));
    }

    void main() {
      vec2 uv = vUv;
      
      vec3 background = createEnterpriseGradient(uv);
      
      float texture = fbm(uv * 12.0 + u_time * 0.02, 3) * 0.015;
      background += vec3(texture);
      
      vec3 finalColor = renderPremiumWaves(uv, background);
      
      finalColor = pow(finalColor, vec3(0.95));
      
      float vignette = 1.0 - length(uv - vec2(0.5)) * 0.2;
      vignette = smoothstep(0.6, 1.0, vignette);
      finalColor *= vignette;
      
      finalColor = mix(finalColor, finalColor * vec3(1.05, 1.0, 0.95), 0.1);
      
      finalColor = clamp(finalColor, vec3(0.0), vec3(1.0));
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
  transparent: false,
});



    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();

    // Optimized animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    // Responsive handling with performance optimization
    const handleResize = () => {
      const w = mountRef.current?.clientWidth || width;
      const h = mountRef.current?.clientHeight || height;
      
      const newPixelRatio = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(newPixelRatio);
      renderer.setSize(w, h);
      
      material.uniforms.u_resolution.value.set(w, h);
      material.uniforms.u_pixelRatio.value = newPixelRatio;
      
      // Adjust wave intensity based on screen size
      const isMobile = w < 768;
      material.uniforms.u_waveIntensity.value = isMobile ? 0.5 : 0.7;
      material.uniforms.u_waveSpeed.value = isMobile ? 0.3 : 0.4;
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="premium-hero-canvas"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        touchAction: 'none'
      }}
    />
  );
};

export default PremiumEnterpriseHero;