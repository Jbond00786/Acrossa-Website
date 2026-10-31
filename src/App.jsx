import React, { useEffect, useRef, useState, useMemo } from 'react';
import { 
  ArrowRight, CalendarDays, Layers, Activity, Menu, X, 
  CheckCircle2, Shield, MessageSquare, ChevronRight, 
  AlertCircle, Users, FileText, Target, ShieldCheck, 
  Clock, CheckSquare, Search, ChevronDown, Truck, Headset, Wrench,
  Mail, Sliders, Lock, Zap, HelpCircle, ArrowUpRight
} from 'lucide-react';
import * as THREE from 'three';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syncopate:wght@400;700&display=swap');

    @font-face {
      font-family: 'Adcure';
      src: url('/AdcureRegular.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    @keyframes slideDownFade {
      0% {
        opacity: 0;
        transform: translateY(-16px) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .animate-new-log {
      animation: slideDownFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes radarSweep {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-radar {
      animation: radarSweep 8s linear infinite;
    }
  `}</style>
);

// Acrossa Brand Emblem Vector (matching your exact symbol mark)
// Acrossa Brand Emblem Vector (Bolded & Rescaled)
const AcrossaLogoEmblem = ({ className = "w-14 md:w-16 h-14 md:h-16", dark = false }) => (
  <svg 
    viewBox="0 0 100 82" 
    className={`flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${className}`} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bold Top Apex / Chevron Peak */}
    <path 
      d="M29 41 L45 18 L55 18 L71 41 L59 41 L50 28 L41 41 Z" 
      fill={dark ? "#FFF2DF" : "#262D35"} 
    />
    
    {/* Bold Sage Green Diagonal Bar & Node + Left Loop */}
    <path 
      d="M24 49 C15 49 9 55 9 62 C9 69 15 74 24 74 C34 74 42 65 51 52 L75 25" 
      stroke="#788B7B" 
      strokeWidth="9" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="79" cy="21" r="7" fill="#788B7B" />
    
    {/* Left Loop Arch */}
    <path 
      d="M24 49 C32 49 39 55 45 62" 
      stroke="#788B7B" 
      strokeWidth="9" 
      strokeLinecap="round" 
    />

    {/* Bold Warm Terracotta / Copper Right Loop */}
    <path 
      d="M48 53 C54 62 61 74 71 74 C79 74 85 69 85 62 C85 53 79 49 71 49 C65 49 59 52 53 58" 
      stroke="#BA7C4D" 
      strokeWidth="9" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

const Logo = ({ className = "", dark = false }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`flex items-center gap-3.5 md:gap-4.5 cursor-pointer select-none group ${className}`}>
      {/* Prominent, Bolder & Perfectly Aligned Logo Mark */}
      <div className="w-14 md:w-16 h-14 md:h-16 flex-shrink-0 relative flex items-center justify-center -translate-y-0.5">
        {!imageError ? (
          <img 
            src="/2.png" 
            alt="Acrossa Logo" 
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105" 
            onError={() => setImageError(true)} 
          />
        ) : (
          <AcrossaLogoEmblem className="w-full h-full" dark={dark} />
        )}
      </div>

      <div 
        className={`text-2xl md:text-[2rem] tracking-[0.16em] leading-none flex items-center ${dark ? 'text-[#FFF2DF]' : 'text-[#3E2522]'}`} 
        style={{ fontFamily: "'Adcure', 'Syncopate', sans-serif" }}
      >
        <span className="font-extrabold text-[#D3A376]">A</span>
        <span className="font-normal">CROSSA</span>
      </div>
    </div>
  );
};
const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    container.innerHTML = '';

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x3E2522, 6, 32);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFF2DF, 3.0);
    dirLight1.position.set(6, 12, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xD3A376, 2.0);
    dirLight2.position.set(-6, -6, 3);
    scene.add(dirLight2);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    
    const isMobile = container.clientWidth < 768;
    networkGroup.position.x = isMobile ? 0 : 4.2;
    networkGroup.scale.setScalar(isMobile ? 0.85 : 1.2);

    const nodeCount = 22;
    const nodes = [];
    const halos = [];

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFF2DF,
      metalness: 0.25,
      roughness: 0.25,
    });

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xD3A376,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const nodeGeometry = new THREE.SphereGeometry(0.36, 32, 32);
    const haloGeometry = new THREE.IcosahedronGeometry(0.72, 1);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 13;
      const z = (Math.random() - 0.5) * 9;

      const nodePos = new THREE.Vector3(x, y, z);
      nodes.push(nodePos);

      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(nodePos);

      const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
      haloMesh.position.copy(nodePos);
      haloMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      networkGroup.add(nodeMesh);
      networkGroup.add(haloMesh);
      halos.push({ mesh: haloMesh, speed: (Math.random() * 0.008) + 0.004 });
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xD3A376,
      transparent: true,
      opacity: 0.28,
    });

    const connections = [];
    const maxDistance = 6.8;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < maxDistance) {
          connections.push({ start: nodes[i], end: nodes[j], distance: dist });
          const points = [nodes[i], nodes[j]];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeo, lineMaterial);
          networkGroup.add(line);
        }
      }
    }

    const packetCount = 14;
    const packets = [];
    const packetGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xFFF2DF });

    if (connections.length > 0) {
      for (let i = 0; i < packetCount; i++) {
        const connection = connections[Math.floor(Math.random() * connections.length)];
        const packetMesh = new THREE.Mesh(packetGeometry, packetMaterial);
        networkGroup.add(packetMesh);

        packets.push({
          mesh: packetMesh,
          start: connection.start,
          end: connection.end,
          progress: Math.random(),
          speed: (0.003 + Math.random() * 0.004) * (5.5 / connection.distance),
        });
      }
    }

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = x * 0.3;
      targetY = y * 0.3;
    };
    container.addEventListener('mousemove', onMouseMove);

    let animationFrameId;
    let isRendering = true;

    const animate = () => {
      if (!isRendering) return;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      camera.position.x = currentX;
      camera.position.y = currentY;
      camera.lookAt(0, 0, 0);

      networkGroup.rotation.y += 0.001;
      networkGroup.rotation.x += 0.0005;

      halos.forEach(halo => {
        halo.mesh.rotation.x += halo.speed;
        halo.mesh.rotation.y += halo.speed;
      });

      packets.forEach(packet => {
        packet.progress += packet.speed;
        if (packet.progress >= 1 && connections.length > 0) {
          packet.progress = 0;
          const newConnection = connections[Math.floor(Math.random() * connections.length)];
          packet.start = newConnection.start;
          packet.end = newConnection.end;
          packet.speed = (0.003 + Math.random() * 0.004) * (5.5 / newConnection.distance);
        }
        packet.mesh.position.lerpVectors(packet.start, packet.end, packet.progress);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 768) {
        networkGroup.position.x = 0;
        networkGroup.scale.setScalar(0.85);
      } else {
        networkGroup.position.x = 4.2;
        networkGroup.scale.setScalar(1.2);
      }
    };
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!isRendering) {
          isRendering = true;
          animate();
        }
      } else {
        isRendering = false;
        cancelAnimationFrame(animationFrameId);
      }
    }, { threshold: 0.05 });
    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        isRendering = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRendering = true;
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      nodeGeometry.dispose();
      haloGeometry.dispose();
      packetGeometry.dispose();
      nodeMaterial.dispose();
      haloMaterial.dispose();
      lineMaterial.dispose();
      packetMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full cursor-default" />;
};

const RevealOnScroll = ({ children, delay = 0, direction = "up", scale = 0.96, className = "", as: Component = "div" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let transformStart = `translateY(30px)`;
  if (direction === "left") transformStart = `translateX(-40px)`;
  if (direction === "right") transformStart = `translateX(40px)`;
  if (direction === "none") transformStart = `translate(0px)`;

  return (
    <Component
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${isVisible ? "opacity-100 transform-none" : "opacity-0"} ${className}`}
      style={{
        transform: isVisible ? "translate(0) scale(1)" : `${transformStart} scale(${scale})`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </Component>
  );
};

const PageHeader = ({ eyebrow, title, subtitle }) => (
  <div className="pt-32 pb-16 px-6 md:px-12 lg:px-24 max-w-5xl relative">
    <RevealOnScroll as="p" direction="left" className="text-[#8C6E63] font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 flex items-center gap-3">
      <span className="w-8 h-0.5 bg-[#8C6E63] inline-block"></span> {eyebrow}
    </RevealOnScroll>
    <RevealOnScroll as="h1" direction="up" delay={100} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-6 text-[#3E2522]">
      {title}
    </RevealOnScroll>
    <RevealOnScroll as="p" direction="up" delay={200} className="text-lg md:text-xl text-[#3E2522]/80 leading-relaxed max-w-3xl font-medium">
      {subtitle}
    </RevealOnScroll>
  </div>
);

const AnimatedProcess = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;
    const duration = 7000; 
    const fillTime = 5000; 
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % duration;

      if (elapsed < fillTime) {
        setProgress((elapsed / fillTime) * 100);
      } else if (elapsed < fillTime + 1500) {
        setProgress(100); 
      } else {
        setProgress(0); 
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const steps = [
    { step: "01", title: "Understand", desc: "Learn about your operations, existing software tools, and recurring coordination challenges." },
    { step: "02", title: "Define", desc: "Agree on exact deliverables, authorized access limits, service hours, and escalation paths." },
    { step: "03", title: "Organize", desc: "Configure agreed workflows, secure operator logins, and test communication loops." },
    { step: "04", title: "Deliver", desc: "Assume designated shifts, report exceptions in real time, and audit for continuous reliability." }
  ];

  return (
    <div className="relative flex flex-col md:flex-row w-full gap-12 md:gap-0 mt-8 max-w-6xl mx-auto">
      <div className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-[3px] z-0">
        <div className="w-full h-full bg-[#8C6E63]/20 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#10B981]/20 via-[#10B981] to-[#4ADE80] rounded-full transition-all duration-75 ease-linear" 
          style={{ width: `${progress}%`, opacity: progress === 0 ? 0 : 1 }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_4px_rgba(16,185,129,0.9)]"></div>
        </div>
      </div>

      <div className="block md:hidden absolute left-[28px] top-[28px] bottom-[28px] w-[3px] z-0">
        <div className="w-full h-full bg-[#8C6E63]/20 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#10B981]/20 via-[#10B981] to-[#4ADE80] rounded-full transition-all duration-75 ease-linear" 
          style={{ height: `${progress}%`, opacity: progress === 0 ? 0 : 1 }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_20px_4px_rgba(16,185,129,0.9)]"></div>
        </div>
      </div>

      {steps.map((item, i) => {
        const threshold = i * 33.33; 
        const isActive = progress >= threshold;
        const isCompleted = progress > threshold + 5;

        return (
          <div key={i} className="relative z-10 flex flex-row md:flex-col items-start md:items-center text-left md:text-center w-full md:w-1/4 group">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg md:text-xl transition-all duration-500 flex-shrink-0 border-4 mb-0 md:mb-6 
              ${isActive ? 'bg-[#10B981] border-[#10B981]/30 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-110' : 'bg-[#3E2522] border-[#FFF2DF] text-[#FFF2DF]'}`}
            >
              <div className="relative flex items-center justify-center w-full h-full">
                <span className={`absolute transition-opacity duration-300 ${isCompleted ? 'opacity-0' : 'opacity-100'}`}>{item.step}</span>
                <CheckCircle2 size={24} className={`absolute transition-all duration-300 ${isCompleted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
              </div>
            </div>
            
            <div className={`pl-6 md:pl-0 pt-1 md:pt-0 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-2'}`}>
              <h4 className={`font-bold text-xl mb-2 transition-colors duration-500 ${isActive ? 'text-[#10B981]' : 'text-[#3E2522]'}`}>{item.title}</h4>
              <p className="text-[#3E2522]/80 text-sm leading-relaxed max-w-[240px] mx-auto">{item.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OperationalMetricsStrip = () => (
  <section className="w-full bg-[#2A1816] text-[#FFF2DF] py-10 px-6 md:px-12 lg:px-24 border-y border-[#D3A376]/20 relative z-20">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
      {[
        { value: "< 60s", label: "Emergency Response", sub: "Rapid protocol escalation" },
        { value: "99.8%", label: "Roster Fill Rate", sub: "Standby escalation loop" },
        { value: "24/7/365", label: "Live Command Desk", sub: "Nights, weekends & holidays" },
        { value: "100%", label: "Audit Trails", sub: "Photo & GPS verified DARs" }
      ].map((stat, i) => (
        <div key={i} className={`flex flex-col items-center text-center ${i > 0 ? 'pt-6 md:pt-0' : ''}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl md:text-4xl font-extrabold text-[#D3A376] font-mono tracking-tight">{stat.value}</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          </div>
          <span className="font-bold text-xs md:text-sm text-[#FFF2DF] uppercase tracking-wider">{stat.label}</span>
          <span className="text-[11px] text-[#FFF2DF]/60 mt-0.5">{stat.sub}</span>
        </div>
      ))}
    </div>
  </section>
);

const OperationalRealityComparison = () => {
  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C6E63] mb-3">Operational Contrast</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3E2522] tracking-tight">The Reality of Service Scaling</h2>
          <p className="text-[#3E2522]/80 mt-4 text-base">Comparing daily headaches before and after establishing a dedicated remote operations desk.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Without Acrossa */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border-2 border-rose-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-rose-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold border border-rose-200">
                  <X size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold block">Internal Management</span>
                  <h3 className="text-xl font-bold text-[#3E2522]">Without Acrossa</h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">REACTIVE</span>
            </div>

            <ul className="space-y-5 text-sm">
              {[
                { title: "2:00 AM Call-Out Panic", desc: "Managers and owners awakened to patch dropped shifts and find replacement guards/drivers." },
                { title: "Unchecked Shift Drift", desc: "No proactive confirmation loops; no-shows discovered only when clients call to complain." },
                { title: "Scattered Messaging Channels", desc: "Critical updates fragmented across SMS, radio, and personal WhatsApp threads." },
                { title: "Unbillable Overtime Leaks", desc: "Frantic shift coverage creates unauthorized double-shifts and bloated payroll expenses." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">✕</div>
                  <div>
                    <strong className="block text-[#3E2522] font-bold text-base mb-0.5">{item.title}</strong>
                    <span className="text-[#3E2522]/70 leading-relaxed text-xs md:text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* With Acrossa */}
          <div className="bg-[#2A1816] text-[#FFF2DF] rounded-3xl p-8 md:p-10 border-2 border-[#D3A376]/40 shadow-2xl relative overflow-hidden group hover:border-[#D3A376] transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D3A376]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D3A376]/20 flex items-center justify-center text-[#D3A376] font-bold border border-[#D3A376]/30">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D3A376] font-bold block">Acrossa Remote Desk</span>
                  <h3 className="text-xl font-bold text-[#FFF2DF]">With Acrossa</h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> SYSTEMIZED
              </span>
            </div>

            <ul className="space-y-5 text-sm relative z-10">
              {[
                { title: "24/7 Standby Auto-Escalation", desc: "Pre-approved backup rosters activated immediately by trained operators without waking leadership." },
                { title: "Pre-Shift Verification Loops", desc: "Staff availability confirmed 2–4 hours ahead; zero undetected open posts." },
                { title: "Single Source of Truth", desc: "All shift activity, DARs, and work tickets logged inside your existing native platforms." },
                { title: "Audited Overtime Control", desc: "Rosters and punch clocks reconciled before payroll to safeguard operating margins." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">✓</div>
                  <div>
                    <strong className="block text-[#FFF2DF] font-bold text-base mb-0.5">{item.title}</strong>
                    <span className="text-[#FFF2DF]/75 leading-relaxed text-xs md:text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQAccordionSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How quickly can Acrossa integrate into our current software?",
      a: "Most engagements launch within 48 to 72 hours. We don't require you to migrate to proprietary software; we simply onboard our vetted operators into your existing systems (such as TrackTik, Samsara, ServiceTitan, or Connecteam) using client-authorized credentials."
    },
    {
      q: "How does Acrossa handle critical operational emergencies?",
      a: "During onboarding, we establish a rigid, documented Escalation Matrix. When a high-severity incident occurs—such as an uncontained facility alarm or a vehicular accident—our desk immediately coordinates with frontline staff and executes direct warm-transfers to your designated on-call contacts per your protocol."
    },
    {
      q: "Do we get dedicated dispatchers or shared desk coverage?",
      a: "We offer both models depending on your volume. High-volume operations needing continuous focus receive dedicated operators assigned exclusively to their account. Growing teams with intermittent or weekend coverage needs can utilize our shared command desk for flexible, cost-effective uptime."
    },
    {
      q: "How do we verify what tasks were completed each day?",
      a: "You have complete transparency. Since our operators work directly inside your platforms, you maintain real-time visibility. Additionally, our desk delivers a comprehensive shift pass-down and Daily Activity Report (DAR) at the end of every operating window."
    },
    {
      q: "What contract commitments are required?",
      a: "We believe in earning our place in your daily operations. Engagements begin with an initial 30-day proof-of-performance period, after which services continue on flexible month-to-month scopes with transparent terms."
    }
  ];

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/20 border-t border-[#8C6E63]/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#8C6E63] font-bold text-xs uppercase tracking-widest mb-3">
            <HelpCircle size={16} /> Operational Clarifications
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#3E2522]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div 
                key={i} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#D3A376] shadow-md' : 'border-[#8C6E63]/15 hover:border-[#D3A376]/60'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FFF2DF]/30 transition-colors"
                >
                  <span className="text-base md:text-lg font-bold text-[#3E2522] pr-4">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#D3A376] text-white' : 'bg-[#FFF2DF] text-[#8C6E63]'
                  }`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm md:text-base text-[#3E2522]/80 leading-relaxed border-t border-[#8C6E63]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EnterpriseSecurityBanner = () => (
  <section className="w-full px-6 md:px-12 lg:px-24 py-16 bg-[#2A1816] text-[#FFF2DF] border-t border-[#D3A376]/20">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-5">
        <div className="relative w-16 h-16 rounded-2xl bg-[#D3A376]/10 border border-[#D3A376]/30 flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={32} className="text-[#D3A376] relative z-10" />
          <div className="absolute inset-0 rounded-2xl border border-dashed border-[#D3A376]/40 animate-radar"></div>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D3A376] font-bold block mb-1">Confidentiality & Compliance</span>
          <h3 className="text-xl md:text-2xl font-bold text-[#FFF2DF]">Enterprise Data Protection Guarantee</h3>
          <p className="text-xs md:text-sm text-[#FFF2DF]/70 mt-1 max-w-xl">
            We enforce strict role-based access, encrypted connections, and mandatory mutual Non-Disclosure Agreements (NDAs). Zero local storage of client customer data.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-[#FFF2DF]/80">
          🔒 Strict NDA Protection
        </span>
        <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-medium text-[#D3A376]">
          🛡️ Authorized Logins
        </span>
      </div>
    </div>
  </section>
);

const FinalCTA = ({ setView }) => (
  <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#3E2522] text-[#FFF2DF] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-[#D3A376] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8C6E63] opacity-20 blur-[120px] rounded-full pointer-events-none"></div>
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <RevealOnScroll as="h2" direction="up" className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
        Let's Make Your Day-to-Day Operations Easier.
      </RevealOnScroll>
      <RevealOnScroll as="p" direction="up" delay={150} className="text-base md:text-lg opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
        Tell us where your team needs additional operational support. We'll review your software tools, shifts, and priorities to evaluate fit.
      </RevealOnScroll>
      <RevealOnScroll direction="up" delay={300}>
        <button 
          onClick={() => setView('contact')}
          className="px-8 py-4 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold tracking-wider rounded-lg text-sm md:text-base transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group mx-auto"
        >
          Discuss Your Operations
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </RevealOnScroll>
    </div>
  </section>
);

const PlatformIntegrationGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredPlatform, setHoveredPlatform] = useState(null);

  const platforms = [
    { 
      name: "TrackTik", 
      category: "security", 
      catLabel: "Security Operations", 
      badge: "Guard & DAR Audits",
      desc: "Live tour checkpoint monitoring, geofence patrol tracking, and real-time incident report verification.",
      color: "from-blue-600 to-indigo-700",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <path d="M12 14h16M20 14v16" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="20" cy="14" r="2.5" fill="#FFFFFF" />
          <circle cx="20" cy="22" r="1.5" fill="#38BDF8" />
          <path d="M15 28c2.5 2 7.5 2 10 0" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      )
    },
    { 
      name: "Silvertrac", 
      category: "security", 
      catLabel: "Security Patrols", 
      badge: "Incident Logging",
      desc: "Daily Activity Report (DAR) auditing, automated post orders, and priority supervisor dispatch.",
      color: "from-slate-700 to-slate-900",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#1E293B" />
          <path d="M20 8l10 4v8c0 7-5 12-10 14-5-2-10-7-10-14v-8l10-4z" stroke="#CBD5E1" strokeWidth="2" fill="#0F172A" />
          <path d="M16 20l3 3 6-6" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    { 
      name: "Connecteam", 
      category: "workforce", 
      catLabel: "Workforce & Rosters", 
      badge: "Shift Attendance",
      desc: "Live mobile punch-clock reconciliation, open-shift fill coordination, and operational team communications.",
      color: "from-sky-500 to-blue-600",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0284C7" />
          <circle cx="15" cy="16" r="3.5" fill="#FFFFFF" />
          <circle cx="25" cy="16" r="3.5" fill="#FFFFFF" />
          <path d="M11 27c0-3 3-5 6-5s6 2 6 5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M23 27c0-2.5 2-4 5-4s5 1.5 5 4" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )
    },
    { 
      name: "Samsara", 
      category: "logistics", 
      catLabel: "Fleet Telematics", 
      badge: "ELD & Route Telemetry",
      desc: "Hours of Service (HOS) monitoring, real-time geofence tracking, and driver safety exception alerts.",
      color: "from-neutral-800 to-neutral-950",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0A0F1D" />
          <circle cx="20" cy="20" r="9" stroke="#10B981" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="20" cy="20" r="4.5" fill="#10B981" />
          <circle cx="20" cy="11" r="2" fill="#FFFFFF" />
          <circle cx="29" cy="20" r="2" fill="#FFFFFF" />
          <circle cx="20" cy="29" r="2" fill="#FFFFFF" />
          <circle cx="11" cy="20" r="2" fill="#FFFFFF" />
        </svg>
      )
    },
    { 
      name: "ServiceTitan", 
      category: "field-service", 
      catLabel: "Field Trades Ops", 
      badge: "Capacity Dispatch",
      desc: "Trade technician routing, emergency job assignment, arrival window alerts, and quote tracking.",
      color: "from-blue-700 to-blue-950",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <path d="M20 9l8 4.5v9c0 5.5-4 10-8 11.5-4-1.5-8-6-8-11.5v-9l8-4.5z" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M20 14v12M15 17h10" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      )
    },
    { 
      name: "Jobber", 
      category: "field-service", 
      catLabel: "Contractor Operations", 
      badge: "Job & ETA Routing",
      desc: "Scheduling density optimization, customer ETA messaging, work order logs, and invoice close-outs.",
      color: "from-emerald-600 to-teal-700",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#064E3B" />
          <path d="M15 13h10v4h-5v9c0 2-1 3-3 3s-3-1-3-3" stroke="#34D399" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="25" cy="15" r="2" fill="#FFFFFF" />
        </svg>
      )
    },
    { 
      name: "Zendesk", 
      category: "support", 
      catLabel: "Helpdesk & Triage", 
      badge: "24/7 Tier-1 Desk",
      desc: "Fast inquiry intake, priority ticket classification, customer queue management, and warm supervisor handoffs.",
      color: "from-green-700 to-emerald-900",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#03363D" />
          <path d="M12 28V12l10 16V12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
          <circle cx="15" cy="15" r="3" fill="#10B981" />
          <path d="M25 12c-4 0-7 3-7 7h7v-7z" fill="#0284C7" />
          <path d="M15 28c4 0 7-3 7-7h-7v7z" fill="#10B981" />
          <circle cx="25" cy="25" r="3" fill="#FFFFFF" />
        </svg>
      )
    },
    { 
      name: "RingCentral", 
      category: "support", 
      catLabel: "VoIP & Communications", 
      badge: "Inbound Call Desk",
      desc: "Live phone answering, IVR call overflow, dispatch audio recordings, and SMS communication queues.",
      color: "from-orange-500 to-amber-600",
      logo: (
        <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
          <rect width="40" height="40" rx="10" fill="#0C1E38" />
          <circle cx="20" cy="20" r="9" stroke="#F97316" strokeWidth="2.5" fill="none" />
          <circle cx="20" cy="20" r="5" stroke="#38BDF8" strokeWidth="2" fill="none" strokeDasharray="2 3" />
          <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
          <path d="M27 13c2 2 3 4.5 3 7" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const categories = [
    { id: "all", label: "All Ecosystems" },
    { id: "security", label: "Security & Patrols" },
    { id: "logistics", label: "Fleet & Trucking" },
    { id: "field-service", label: "Field Trades" },
    { id: "support", label: "Support & Voice" }
  ];

  const filtered = activeCategory === "all" 
    ? platforms 
    : platforms.filter(p => p.category === activeCategory);

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF] border-t border-[#8C6E63]/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D3A376]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#8C6E63]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <RevealOnScroll direction="up">
            <span className="text-xs font-mono uppercase font-bold tracking-[0.25em] text-[#D3A376] block mb-3">
              Zero Migration Required • 100% Native Access
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#3E2522] tracking-tight">
              We Work Directly Inside Your Systems
            </h3>
            <p className="text-[#3E2522]/75 text-base md:text-lg mt-4 leading-relaxed">
              No new software to purchase. No disruption to your team. Our trained coordinators securely log into your existing tools and execute your standard operating procedures from Day 1.
            </p>
          </RevealOnScroll>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((tab) => {
              const isSelected = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none ${
                    isSelected
                      ? "bg-[#3E2522] text-[#FFF2DF] shadow-md scale-105 ring-2 ring-[#D3A376]/40"
                      : "bg-white/80 text-[#3E2522]/70 hover:text-[#3E2522] hover:bg-white border border-[#8C6E63]/15"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Platform Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((plat, idx) => {
            const isHovered = hoveredPlatform === plat.name;
            return (
              <RevealOnScroll key={plat.name} direction="up" delay={idx * 60}>
                <div
                  onMouseEnter={() => setHoveredPlatform(plat.name)}
                  onMouseLeave={() => setHoveredPlatform(null)}
                  className={`group relative bg-white rounded-2xl p-6 border transition-all duration-500 ease-out flex flex-col justify-between h-full cursor-default overflow-hidden ${
                    isHovered
                      ? "border-[#D3A376] shadow-[0_20px_40px_-15px_rgba(211,163,118,0.45)] -translate-y-2"
                      : "border-[#8C6E63]/15 shadow-sm hover:border-[#D3A376]/60 hover:shadow-md"
                  }`}
                >
                  {/* Hover ambient color flare */}
                  <div
                    className={`absolute -top-12 -right-12 w-28 h-28 rounded-full blur-xl transition-all duration-700 pointer-events-none opacity-20 group-hover:opacity-40 bg-gradient-to-br ${plat.color}`}
                  ></div>

                  <div>
                    {/* Header: Logo + Live Connection Beacon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="relative flex items-center justify-center p-1 rounded-xl transition-transform duration-500 group-hover:scale-110 shadow-sm">
                        {plat.logo}
                      </div>

                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF2DF] border border-[#8C6E63]/15 text-[10px] font-mono text-[#8C6E63]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="font-semibold">{plat.badge}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono tracking-wider uppercase text-[#D3A376] font-bold block mb-1">
                      {plat.catLabel}
                    </span>
                    <h4 className="text-xl font-bold text-[#3E2522] mb-2 group-hover:text-[#8C6E63] transition-colors">
                      {plat.name}
                    </h4>
                    <p className="text-xs md:text-sm text-[#3E2522]/70 leading-relaxed">
                      {plat.desc}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-[#8C6E63]/10 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle2 size={13} /> Native Session
                    </span>
                    <span className="text-[10px] font-mono text-[#8C6E63]/80 group-hover:text-[#D3A376] transition-colors">
                      Zero Migration →
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Live Ecosystem Telemetry Bar */}
        <div className="mt-12 bg-[#2A1816] text-[#FFF2DF] rounded-2xl p-6 md:p-8 border border-[#D3A376]/25 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#D3A376]/20 border border-[#D3A376]/30 text-[#D3A376] flex items-center justify-center font-bold flex-shrink-0">
              <Layers size={22} className="animate-pulse" />
            </div>
            <div>
              <h5 className="font-bold text-base md:text-lg text-[#FFF2DF]">Custom or In-House Proprietary Software?</h5>
              <p className="text-xs md:text-sm text-[#FFF2DF]/70 mt-0.5 max-w-xl">
                We also operate inside internal portals, custom ERPs, and bespoke web apps. We ingest your runbooks and SOPs in 72 hours.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono relative z-10 flex-shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Encrypted VDI & SSO
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D3A376]">
              Audit Logs Retained
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const CoverageCalculator = ({ setView }) => {
  const [vertical, setVertical] = useState('security');
  const [shiftsPerDay, setShiftsPerDay] = useState(6);
  const [coverageWindow, setCoverageWindow] = useState('24/7');

  const calculation = useMemo(() => {
    let multiplier = 1;
    if (coverageWindow === '24/7') multiplier = 3;
    if (coverageWindow === 'after-hours') multiplier = 1.5;
    if (coverageWindow === 'business-hours') multiplier = 1;

    const monthlyShifts = shiftsPerDay * 30;
    const adminHoursSaved = Math.round(monthlyShifts * 0.45 * multiplier);
    const incidentAuditCapacity = monthlyShifts * 4;

    return {
      monthlyShifts,
      adminHoursSaved,
      incidentAuditCapacity
    };
  }, [shiftsPerDay, coverageWindow]);

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-20 bg-[#FFE0B2]/20 border-t border-[#8C6E63]/10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-[#8C6E63]/15 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#8C6E63]/10">
          <div>
            <div className="flex items-center gap-2 text-[#D3A376] font-bold text-xs uppercase tracking-widest mb-2">
              <Sliders size={16} /> Operational Capacity Estimator
            </div>
            <h3 className="text-3xl font-extrabold text-[#3E2522]">Estimate Your Management Time Saved</h3>
          </div>
          <p className="text-sm text-[#3E2522]/70 max-w-xs">
            See how much administrative coordination Acrossa absorbs from your leadership team each month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#3E2522] mb-2">Operational Sector</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'security', label: 'Security' },
                  { id: 'logistics', label: 'Logistics' },
                  { id: 'field', label: 'Field Trades' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setVertical(item.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      vertical === item.id 
                        ? 'bg-[#3E2522] text-[#FFF2DF] border-[#3E2522]' 
                        : 'bg-[#FFF2DF]/40 text-[#3E2522] border-[#8C6E63]/20 hover:border-[#D3A376]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#3E2522]">Daily Active Shifts / Units</label>
                <span className="font-mono font-bold text-lg text-[#D3A376]">{shiftsPerDay} active/day</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={shiftsPerDay}
                onChange={(e) => setShiftsPerDay(parseInt(e.target.value, 10))}
                className="w-full accent-[#D3A376] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#3E2522]/50 font-mono mt-1">
                <span>1 shift</span>
                <span>15 shifts</span>
                <span>30+ shifts</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#3E2522] mb-2">Coverage Window Required</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'business-hours', label: 'Daytime (9–5)' },
                  { id: 'after-hours', label: 'Nights & Wknds' },
                  { id: '24/7', label: '24/7 Complete' }
                ].map((win) => (
                  <button
                    key={win.id}
                    onClick={() => setCoverageWindow(win.id)}
                    className={`py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all border ${
                      coverageWindow === win.id 
                        ? 'bg-[#D3A376] text-[#3E2522] border-[#D3A376]' 
                        : 'bg-[#FFF2DF]/40 text-[#3E2522] border-[#8C6E63]/20 hover:border-[#D3A376]'
                    }`}
                  >
                    {win.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#2A1816] text-[#FFF2DF] p-6 md:p-8 rounded-2xl border border-[#D3A376]/20 shadow-lg">
            <span className="text-[11px] font-mono tracking-widest text-[#D3A376] uppercase block mb-4">Estimated Monthly Impact</span>
            
            <div className="space-y-4 pb-6 border-b border-[#FFF2DF]/10">
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">Management Hours Reclaimed</span>
                <span className="text-3xl font-extrabold text-emerald-400">~{calculation.adminHoursSaved} hrs / mo</span>
              </div>
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">Shifts Coordinated & Audited</span>
                <span className="text-2xl font-bold text-[#FFF2DF]">{calculation.monthlyShifts} shifts</span>
              </div>
              <div>
                <span className="text-xs text-[#FFF2DF]/60 block">Live Telemetry & Tour Checks</span>
                <span className="text-xl font-bold text-[#D3A376]">{calculation.incidentAuditCapacity.toLocaleString()}+ points</span>
              </div>
            </div>

            <button 
              onClick={() => setView('contact')}
              className="w-full mt-6 py-3.5 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold rounded-lg text-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              Discuss Customized Coverage <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LiveDashboard = () => {
  const [stats, setStats] = useState({ shifts: 46, exceptions: 3, rate: 98 });
  const [feedData, setFeedData] = useState([]);

  const multiIndustryLogPool = useMemo(() => [
    { status: 'RESOLVED', note: 'Truck #104 gate arrival logged at Chicago terminal. Seal number confirmed.' },
    { status: 'LOGGED', note: 'Routine DAR audited for Gateway Retail Post #12. 100% checkpoints scanned.' },
    { status: 'ESCALATED', note: 'Unscheduled late check-in on Route 4. Standby driver placed on 15m standby.' },
    { status: 'RESOLVED', note: 'HVAC technician dispatch confirmed for Urgent Job #882. Arrival ETA sent to client.' },
    { status: 'REFERRED', note: 'Tier-1 customer escalation logged in Zendesk. Dispatched on-call supervisor.' },
    { status: 'LOGGED', note: 'Silvertrac geofence departure verified for Mobile Patrol Unit #3.' },
    { status: 'SEEN', note: 'Plumbing contractor completed work order #412. Photo verification uploaded to Jobber.' },
    { status: 'RESOLVED', note: 'Guard roster call-off at Logistics Hub C. Standby officer confirmed within 12 minutes.' },
    { status: 'LOGGED', note: 'Samsara telematics check: Freight Unit #209 cleared inspection stop on I-80.' },
    { status: 'ESCALATED', note: 'Facility alarm alert received at 03:42. Keyholder contacted per escalation tree.' },
    { status: 'RESOLVED', note: 'Timesheet reconciliation complete for weekend overnight crew. 0 overtime discrepancies.' },
    { status: 'LOGGED', note: 'Inbound emergency line answered in 14s. Service ticket #1093 assigned to field lead.' }
  ], []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'RESOLVED': return "text-emerald-400 bg-emerald-400/10 border-emerald-400/25";
      case 'LOGGED': return "text-[#D3A376] bg-[#D3A376]/10 border-[#D3A376]/25";
      case 'ESCALATED': return "text-rose-400 bg-rose-400/10 border-rose-400/25";
      case 'REFERRED': return "text-amber-400 bg-amber-400/10 border-amber-400/25";
      case 'SEEN': return "text-[#FFE0B2] bg-[#FFE0B2]/10 border-[#FFE0B2]/25";
      default: return "text-[#FFF2DF] bg-[#FFF2DF]/10 border-[#FFF2DF]/25";
    }
  };

  useEffect(() => {
    const initialLogs = [
      { id: 'init-1', time: '05:38', status: 'RESOLVED', note: 'Field Tech arrived at Site B. Client notified via ServiceTitan. Coverage confirmed.' },
      { id: 'init-2', time: '05:32', status: 'LOGGED', note: 'Routine DAR submitted for North Logistics Hub. Checkpoints verified on TrackTik.' },
      { id: 'init-3', time: '05:25', status: 'ESCALATED', note: 'Missed geofence check-in at Warehouse 4. Supervisor notified and confirmed on site.' }
    ].map(item => ({ ...item, color: getStatusColor(item.status) }));

    setFeedData(initialLogs);

    let logIndex = 0;
    const tickerInterval = setInterval(() => {
      const logTemplate = multiIndustryLogPool[logIndex % multiIndustryLogPool.length];
      logIndex++;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        time: timeString,
        status: logTemplate.status,
        color: getStatusColor(logTemplate.status),
        note: logTemplate.note
      };

      setFeedData(prev => [newEntry, ...prev].slice(0, 8));

      setStats(prev => {
        const shiftBump = Math.random() > 0.65 ? 1 : 0;
        let newExceptions = prev.exceptions + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0);
        newExceptions = Math.max(1, Math.min(8, newExceptions));
        const newRate = Math.min(100, Math.max(94, 98 + (newExceptions > 4 ? -2 : 1)));
        return { shifts: prev.shifts + shiftBump, exceptions: newExceptions, rate: newRate };
      });
    }, 5000);

    return () => clearInterval(tickerInterval);
  }, [multiIndustryLogPool]);

  return (
    <div style={{ perspective: '1200px' }} className="relative">
      <div 
        style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}
        className="w-full bg-[#2A1816] rounded-2xl shadow-2xl border border-[#D3A376]/20 overflow-hidden transition-all duration-700 hover:[transform:none]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFF2DF]/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]"></div>
            <h4 className="font-mono text-xs text-[#FFF2DF]/90 tracking-widest uppercase">Live Operational Feed</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-[#D3A376] font-mono tracking-widest uppercase">24/7 COMMAND</span>
            <span className="text-[10px] text-[#D3A376] font-mono border border-[#D3A376]/30 px-2 py-0.5 rounded bg-[#D3A376]/10">ACTIVE</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-px bg-[#FFF2DF]/5 border-b border-[#FFF2DF]/10">
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">TOTAL SHIFTS</span>
            <span className="text-xl font-bold text-[#FFF2DF]">{stats.shifts}</span>
          </div>
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">OPEN EXCEPTIONS</span>
            <span className="text-xl font-bold text-[#D3A376]">{String(stats.exceptions).padStart(2, '0')}</span>
          </div>
          <div className="p-4 bg-[#2A1816]">
            <span className="block text-[10px] text-[#FFF2DF]/50 font-mono mb-1">SLA COMPLIANCE</span>
            <span className="text-xl font-bold text-emerald-400">{stats.rate}%</span>
          </div>
        </div>

        <div className="h-[290px] relative overflow-hidden bg-[#2A1816] px-4 py-2">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#2A1816] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#2A1816] to-transparent z-10 pointer-events-none"></div>
          
          <div className="pt-2 pb-6 flex flex-col gap-2.5">
            {feedData.map((item) => (
              <div key={item.id} className="animate-new-log flex gap-3 items-start border-b border-[#FFF2DF]/5 pb-2.5">
                <span className="text-xs font-mono text-[#FFF2DF]/50 mt-0.5 whitespace-nowrap">{item.time}</span>
                <div>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${item.color} mb-1 inline-block font-semibold`}>
                    {item.status}
                  </span>
                  <p className="text-xs md:text-sm text-[#FFF2DF]/90 leading-snug font-medium pr-1">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HomeView = ({ setView, scrollY }) => (
  <div className="w-full animate-in fade-in duration-500">
    <main className="w-full relative overflow-hidden min-h-[92vh] flex items-center bg-[#3E2522] pt-28 md:pt-36 pb-20">
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
        style={{
          transform: `translateY(${scrollY * 0.12}px)`,
          opacity: Math.max(0.15, 1 - scrollY * 0.0015)
        }}
      >
        <Hero3D />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 pointer-events-none">
        <div className="w-full lg:w-3/5 xl:w-1/2 flex flex-col items-start pointer-events-auto">
          <RevealOnScroll as="p" direction="left" delay={0} className="text-[#D3A376] font-bold tracking-[0.25em] text-xs md:text-sm uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-[#D3A376] inline-block"></span>
            Remote Operations & Business Support
          </RevealOnScroll>
          
          <RevealOnScroll as="h1" direction="up" delay={100} className="text-4xl md:text-6xl lg:text-[4.2rem] font-extrabold leading-[1.08] tracking-tight mb-6 text-[#FFF2DF]">
            Your Business Deserves Operations That Keep Up.
          </RevealOnScroll>
          
          <RevealOnScroll as="p" direction="up" delay={200} className="text-base md:text-xl text-[#FFF2DF]/85 leading-relaxed max-w-xl mb-8 font-medium">
            We help North American service companies coordinate daily shifts, manage dispatch queues, handle exceptions, and maintain 24/7 operational continuity.
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={300} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button 
              onClick={() => setView('contact')} 
              className="w-full sm:w-auto px-8 py-4 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold tracking-wider rounded-lg text-sm md:text-base transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
            >
              Discuss Your Operations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => setView('services')} 
              className="text-[#FFF2DF] font-bold tracking-wide border-b-2 border-[#FFF2DF]/30 pb-1 hover:text-[#D3A376] hover:border-[#D3A376] transition-colors duration-300 flex items-center gap-2 text-sm md:text-base"
            >
              Explore All Services
            </button>
          </RevealOnScroll>
        </div>
      </div>
    </main>

    <OperationalMetricsStrip />

    {/* Section: Operational Friction Cards with Micro-Animations */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/30 relative border-t border-[#8C6E63]/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <RevealOnScroll as="h2" direction="left" className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-[#3E2522]">
            When Operations Get Busy, Important Details Get Missed.
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={100} className="text-lg text-[#3E2522]/80 leading-relaxed mb-8">
            Growing service companies often hit an administrative ceiling. You can't scale revenue when management is buried in daily coordination. We provide additional operational capacity to help you manage:
          </RevealOnScroll>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { 
              title: "Open Shifts & Delays", 
              desc: "Last-minute scheduling changes and field delays.",
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <Clock className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-rose-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full w-3.5 h-3.5 bg-rose-500 border-2 border-white group-hover:border-[#D3A376] transition-colors duration-500"></span>
                  </div>
                </div>
              )
            },
            { 
              title: "Endless Follow-ups", 
              desc: "Time-consuming field and team confirmations.",
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <Users className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute inset-[-4px] border-[2px] border-dashed border-[#D3A376]/40 rounded-xl animate-[spin_6s_linear_infinite] group-hover:border-white/50 transition-colors duration-500"></div>
                </div>
              )
            },
            { 
              title: "Fragmented Comms", 
              desc: "Information scattered across multiple channels.",
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <MessageSquare className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#8C6E63]/60 rounded-full animate-bounce group-hover:bg-white" style={{ animationDelay: '0ms' }}></div>
                  <div className="absolute top-1 right-2 w-2 h-2 bg-[#D3A376] rounded-full animate-bounce group-hover:bg-white" style={{ animationDelay: '150ms' }}></div>
                  <div className="absolute bottom-2 right-1.5 w-1.5 h-1.5 bg-[#D3A376]/80 rounded-full animate-bounce group-hover:bg-white" style={{ animationDelay: '300ms' }}></div>
                </div>
              )
            },
            { 
              title: "Delayed Reporting", 
              desc: "Incomplete records and delayed administrative data.",
              icon: (
                <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#FFF2DF]/50 border border-[#8C6E63]/20 group-hover:bg-[#D3A376] group-hover:border-[#D3A376] transition-all duration-500">
                  <FileText className="w-6 h-6 text-[#D3A376] group-hover:text-white transition-colors duration-500 relative z-10" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-400 rounded-full border-2 border-white group-hover:border-[#D3A376] transition-colors duration-500 flex items-center justify-center animate-bounce shadow-sm">
                    <span className="text-[10px] text-white font-bold block mb-[1px]">!</span>
                  </div>
                </div>
              )
            }
          ].map((item, i) => (
            <RevealOnScroll key={i} direction="up" delay={120 * i} className="group relative bg-white p-6 md:p-8 rounded-2xl border border-[#8C6E63]/10 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(211,163,118,0.3)] hover:-translate-y-2 hover:border-[#D3A376]/50 transition-all duration-500 ease-out overflow-hidden cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FFE0B2]/40 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform duration-700 ease-out group-hover:scale-[2]"></div>
              
              <div className="relative z-10">
                <div className="mb-5">{item.icon}</div>
                <h4 className="font-bold text-lg md:text-xl mb-2 text-[#3E2522] group-hover:text-[#8C6E63] transition-colors">{item.title}</h4>
                <p className="text-[#3E2522]/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    <OperationalRealityComparison />

    {/* Section: Practical Support (3 Main Core Offerings) */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
      <div className="w-full flex flex-col items-center mb-16 text-center max-w-3xl mx-auto">
        <RevealOnScroll as="h2" direction="up" className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#3E2522] mb-6">
          Practical Support for Everyday Operations.
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {[
          { icon: <CalendarDays size={26} />, title: "Scheduling & Coverage", desc: "Shift confirmations, open-shift tracking, availability coordination, and attendance follow-ups." },
          { icon: <Activity size={26} />, title: "Dispatch & Comms", desc: "Cross-industry dispatching, routine field communications, live tracking, and escalations." },
          { icon: <Layers size={26} />, title: "Admin & Reporting", desc: "Timesheet tracking, operational summaries, SOP maintenance, and task coordination." }
        ].map((service, i) => (
          <RevealOnScroll key={i} direction="up" delay={150 * i} className="h-full">
            <div onClick={() => setView('services')} className="group bg-white border border-[#8C6E63]/10 rounded-xl p-10 flex flex-col justify-between hover:shadow-xl hover:border-[#D3A376]/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full">
              <div>
                <div className="w-14 h-14 bg-[#FFE0B2]/30 border border-[#D3A376]/30 rounded-lg flex items-center justify-center mb-8 text-[#3E2522] group-hover:bg-[#D3A376] group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#3E2522]">{service.title}</h3>
                <p className="text-[#3E2522]/70 leading-relaxed font-medium mb-8">{service.desc}</p>
              </div>
              <span className="font-bold text-[#8C6E63] group-hover:text-[#D3A376] flex items-center gap-2 transition-colors duration-300 w-fit uppercase text-xs tracking-wider">
                View Deliverables <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>

    {/* Section: Built for Growing Teams */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#3E2522] text-[#FFF2DF]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-5/12">
          <RevealOnScroll as="h2" direction="left" className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            Built for Growing Teams That Need Reliable Support.
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={100} className="text-lg opacity-80 leading-relaxed mb-8">
            We partner with businesses that manage recurring schedules, field teams, multiple client sites, and ongoing administrative tasks.
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={200}>
            <button onClick={() => setView('about')} className="text-[#D3A376] font-bold tracking-wide border-b border-[#D3A376]/30 pb-1 hover:text-[#FFE0B2] transition-colors flex items-center gap-2">
              Learn about our agency <ArrowRight size={16} />
            </button>
          </RevealOnScroll>
        </div>
        <div className="lg:w-7/12 grid grid-cols-2 gap-4 w-full">
          {[
            { label: "Founders & Owners", icon: <ShieldCheck size={28} /> },
            { label: "Operations Managers", icon: <Target size={28} /> },
            { label: "Dispatch Supervisors", icon: <Activity size={28} /> },
            { label: "Administrative Teams", icon: <Users size={28} /> }
          ].map((item, i) => (
            <RevealOnScroll key={i} direction="up" delay={100 * i} className="bg-[#FFF2DF]/5 border border-[#FFF2DF]/10 p-6 rounded-xl text-center flex flex-col items-center justify-center gap-4 hover:border-[#D3A376]/50 transition-colors">
              <div className="text-[#D3A376]">{item.icon}</div>
              <span className="font-bold text-sm">{item.label}</span>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Section: Animated Process Flow */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <RevealOnScroll as="h2" direction="up" className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-4">
            A Clear Process. Dependable Follow-Through.
          </RevealOnScroll>
        </div>
        
        <RevealOnScroll direction="up" delay={200}>
          <AnimatedProcess />
        </RevealOnScroll>
      </div>
    </section>

    {/* Section: Operational Principles (Accountability Grid with Expanding Overlays) */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFE0B2]/30 border-t border-[#8C6E63]/10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <RevealOnScroll as="h2" direction="up" className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-6">
          Operational Support Built Around Accountability.
        </RevealOnScroll>
        <RevealOnScroll as="p" direction="up" delay={100} className="text-lg text-[#3E2522]/80 font-medium">
          We don't just complete tasks; we take ownership of the process. Our approach is grounded in these core principles.
        </RevealOnScroll>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Clear Communication", desc: "Strict adherence to agreed protocols and structured reporting channels.", icon: <MessageSquare className="w-6 h-6" /> },
          { title: "Documented Processes", desc: "Organized shift handoffs and rigorously maintained standard operating procedures.", icon: <FileText className="w-6 h-6" /> },
          { title: "Consistent Follow-Through", desc: "Reliable execution and meticulous tracking of all open operational tasks.", icon: <CheckCircle2 className="w-6 h-6" /> },
          { title: "Defined Escalation", desc: "Pre-agreed responsibility matrices and clear paths for emergencies.", icon: <AlertCircle className="w-6 h-6" /> },
          { title: "Flexible Support", desc: "Adaptable coordination that scales with your specific business requirements.", icon: <Layers className="w-6 h-6" /> },
          { title: "Strict Confidentiality", desc: "Secure, discreet, and professional handling of all client and field data.", icon: <ShieldCheck className="w-6 h-6" /> }
        ].map((item, i) => (
           <RevealOnScroll key={i} direction="up" delay={120 + (i * 80)} className="group relative bg-white p-8 rounded-2xl border border-[#8C6E63]/10 overflow-hidden transition-all duration-500 ease-out hover:shadow-[0_20px_40px_-15px_rgba(211,163,118,0.4)] hover:-translate-y-2 hover:border-[#D3A376]/50 cursor-default">
             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFE0B2]/50 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 ease-out group-hover:scale-[2.5]"></div>
             
             <div className="relative z-10">
               <div className="w-14 h-14 rounded-xl bg-[#FFF2DF] text-[#D3A376] flex items-center justify-center mb-6 transition-all duration-500 ease-out shadow-sm border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:text-white group-hover:scale-110 group-hover:border-transparent">
                 {item.icon}
               </div>
               <h3 className="text-xl font-bold text-[#3E2522] mb-3 group-hover:text-[#8C6E63] transition-colors duration-300">{item.title}</h3>
               <p className="text-[#3E2522]/70 leading-relaxed text-sm font-medium">{item.desc}</p>
             </div>
           </RevealOnScroll>
        ))}
      </div>
    </section>

    {/* Section: Visibility into Daily Work (Animated Deliverables + 3D Live Feed) */}
    <section className="w-full px-6 md:px-12 lg:px-24 py-24 bg-[#FFF2DF]">
       <div className="max-w-7xl mx-auto">
         <div className="lg:w-1/2 pr-0 lg:pr-8 mb-12">
            <RevealOnScroll as="h2" direction="left" className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#3E2522] mb-6">
              Visibility Into the Daily Work.
            </RevealOnScroll>
            <RevealOnScroll as="p" direction="left" delay={100} className="text-lg text-[#3E2522]/80 leading-relaxed">
              We provide structured, verifiable outputs. You never have to guess what was completed or where an escalation stands. 
              <span className="block mt-4 text-sm font-bold text-[#8C6E63] uppercase tracking-wider">*Illustrative Deliverables Include:</span>
            </RevealOnScroll>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-4">
              {[
                {
                  title: "Live Exception Tracking",
                  desc: "Real-time logging and immediate alerts for field anomalies.",
                  icon: (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <Activity className="w-6 h-6 text-[#D3A376] z-10" />
                      <div className="absolute w-10 h-10 border-2 border-[#D3A376]/40 rounded-full animate-ping"></div>
                      <div className="absolute w-6 h-6 bg-[#D3A376]/20 rounded-full animate-pulse"></div>
                    </div>
                  )
                },
                {
                  title: "Daily Coverage Reports",
                  desc: "Verified completion rates and shift attendance data.",
                  icon: (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <CheckCircle2 className="w-6 h-6 text-[#10B981] z-10" />
                      <div className="absolute w-10 h-10 border-[2px] border-dashed border-[#10B981]/40 rounded-full animate-[spin_6s_linear_infinite]"></div>
                    </div>
                  )
                },
                {
                  title: "Structured Pass-Downs",
                  desc: "Seamless, documented handovers between shifts and teams.",
                  icon: (
                     <div className="relative flex items-center justify-center w-full h-full">
                       <div className="absolute transform -translate-x-3 translate-y-1 text-[#8C6E63]">
                         <FileText className="w-5 h-5" />
                       </div>
                       <div className="absolute transform translate-x-3 -translate-y-1 text-[#D3A376] opacity-80">
                         <FileText className="w-5 h-5" />
                       </div>
                       <div className="absolute flex animate-[pulse_1.5s_ease-in-out_infinite]">
                         <ArrowRight className="w-4 h-4 text-[#3E2522]" />
                       </div>
                     </div>
                  )
                },
                {
                  title: "Weekly Operational Summaries",
                  desc: "High-level metrics and verified performance data for leadership.",
                  icon: (
                     <div className="flex items-end justify-center gap-1 w-full h-full p-2.5">
                        <div className="w-1.5 bg-[#D3A376] rounded-sm h-[40%] animate-[pulse_1.5s_ease-in-out_infinite]"></div>
                        <div className="w-1.5 bg-[#8C6E63] rounded-sm h-[70%] animate-[pulse_1.5s_ease-in-out_infinite_0.3s]"></div>
                        <div className="w-1.5 bg-[#3E2522] rounded-sm h-[100%] animate-[pulse_1.5s_ease-in-out_infinite_0.6s]"></div>
                     </div>
                  )
                }
              ].map((item, i) => (
                <RevealOnScroll key={i} direction="left" delay={120 + (i*80)} className="group flex items-start gap-5 bg-white p-5 rounded-2xl border border-[#8C6E63]/10 hover:border-[#D3A376]/50 hover:shadow-[0_10px_30px_-10px_rgba(211,163,118,0.3)] transition-all duration-500 ease-out hover:-translate-y-1">
                  <div className="relative w-14 h-14 rounded-xl bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 overflow-hidden">
                    {item.icon}
                  </div>
                  <div className="pt-0.5">
                    <h4 className="text-[#3E2522] font-bold text-base md:text-lg mb-1 group-hover:text-[#8C6E63] transition-colors duration-300">{item.title}</h4>
                    <p className="text-[#3E2522]/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
            
            <RevealOnScroll direction="right" className="hidden md:block">
               <LiveDashboard />
            </RevealOnScroll>
         </div>
       </div>
    </section>

    <PlatformIntegrationGrid />
    <CoverageCalculator setView={setView} />
    <FAQAccordionSection />
    <EnterpriseSecurityBanner />
    <FinalCTA setView={setView} />
  </div>
);

const DispatchAccordion = ({ title, sector, desc, icon: Icon, delay }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <RevealOnScroll direction="right" delay={delay} className={`bg-white rounded-xl border transition-all duration-300 ease-out overflow-hidden mb-4 ${isOpen ? 'border-[#D3A376] shadow-md' : 'border-[#8C6E63]/10 hover:border-[#D3A376]/50'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FFF2DF]/25 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#D3A376] text-[#FFF2DF]' : 'bg-[#FFE0B2]/30 text-[#D3A376]'}`}>
            <Icon size={22} />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#8C6E63] font-bold block">{sector}</span>
            <strong className="text-[#3E2522] text-lg font-bold">{title}</strong>
          </div>
        </div>
        <ChevronDown className={`text-[#8C6E63] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 text-[#3E2522]/80 leading-relaxed text-sm">
          {desc}
        </div>
      </div>
    </RevealOnScroll>
  );
};

const ServicesView = ({ setView }) => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader 
      eyebrow="Our Services"
      title="Structured Support for Daily Workflows."
      subtitle="We bundle repetitive operational tasks into reliable, ongoing remote execution. Explore our core service verticals."
    />

    <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-24 space-y-24">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <RevealOnScroll as="h2" direction="left" className="text-3xl font-bold mb-4 text-[#3E2522] flex items-center gap-3">
            <CalendarDays className="text-[#D3A376]" size={32} /> Scheduling & Coverage Coordination
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={100} className="text-[#3E2522]/80 mb-6 leading-relaxed">
            Eliminate scramble hours. We maintain real-time rosters, confirm upcoming shifts in advance, and coordinate backup coverage according to your post orders.
          </RevealOnScroll>
          <ul className="space-y-4">
            {[
              { title: "Pre-Shift Confirmations", desc: "Verifying availability 2–4 hours prior to roll call to preempt no-shows." },
              { title: "Open-Shift & Call-Out Management", desc: "Activating pre-approved standby rosters immediately when absences occur." },
              { title: "Platform Roster Sync", desc: "Updating scheduling tools (Connecteam, TrackTik, Quo) to prevent payroll mismatches." }
            ].map((item, i) => (
              <RevealOnScroll key={i} as="li" direction="left" delay={150 + (i * 75)} className="group flex items-start gap-4 bg-white p-5 rounded-xl border border-[#8C6E63]/10 hover:border-[#D3A376]/50 shadow-sm transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF2DF]/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:scale-110 transition-all">
                  <CheckSquare className="text-[#D3A376] group-hover:text-white" size={18} />
                </div>
                <div className="relative z-10">
                  <strong className="block text-[#3E2522] text-base mb-1">{item.title}</strong>
                  <span className="text-[#3E2522]/70 text-xs md:text-sm">{item.desc}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
        <RevealOnScroll direction="right" className="bg-[#FFE0B2]/30 p-8 rounded-2xl border border-[#D3A376]/25 lg:mt-8">
          <h3 className="text-xl font-bold text-[#3E2522] mb-3">Clear Responsibility Boundaries</h3>
          <p className="text-[#3E2522]/80 text-sm leading-relaxed mb-4">
            Acrossa operates strictly on your designated escalation protocols and roster rules. We do not make hiring or disciplinary decisions; final operational authority remains 100% in your hands.
          </p>
          <span className="text-xs font-mono text-[#8C6E63] font-bold uppercase tracking-wider block">
            • Strict SOP Compliance • Zero Management Drift
          </span>
        </RevealOnScroll>
      </section>

      <section>
        <div className="max-w-2xl mb-10">
          <RevealOnScroll as="h2" direction="left" className="text-3xl font-bold mb-3 text-[#3E2522] flex items-center gap-3">
            <Activity className="text-[#D3A376]" size={32} /> Multi-Sector Dispatch & Communications
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={50} className="text-[#3E2522]/80 leading-relaxed">
            Our remote operators are specialized across four core North American field service industries:
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <DispatchAccordion 
            delay={100}
            sector="Physical Security & Patrols"
            title="Security Dispatch & Tour Auditing" 
            icon={ShieldCheck} 
            desc={
              <div className="space-y-3">
                <p className="font-semibold text-[#3E2522]">Dedicated remote coordination for physical security companies, mobile patrols, and executive protection.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Guard Tour Auditing:</strong> Live verification of RFID / QR checkpoint scans and geofence perimeter compliance.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Incident Management:</strong> Instant supervisor escalation for gate alarms, trespassers, or unverified post departures.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Daily Activity Reports (DARs):</strong> Compiling and formatting client-ready DARs with timestamped photos.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Systems:</strong> Native execution in TrackTik, Silvertrac, Connecteam, and Quo.
                  </div>
                </div>
              </div>
            }
          />

          <DispatchAccordion 
            delay={150}
            sector="Freight & Logistics"
            title="Trucking & Route Dispatch Coordination" 
            icon={Truck} 
            desc={
              <div className="space-y-3">
                <p className="font-semibold text-[#3E2522]">Keep trucks loaded and freight moving smoothly with active 24/7 route tracking.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Check-in Loops:</strong> Scheduled driver touchpoints for pickup arrival, loading status, and delivery confirmation.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Detention & Delay Tracking:</strong> Immediate documentation of facility delays to substantiate detention charges.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Broker & Customer Comms:</strong> Proactive ETA notifications to shippers and brokers before delays escalate.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Systems:</strong> Samsara, Motive, DAT, Truckstop, McLeod, and standard ELD telematics.
                  </div>
                </div>
              </div>
            }
          />

          <DispatchAccordion 
            delay={200}
            sector="Field Trades & Maintenance"
            title="Field Service & Technician Dispatch" 
            icon={Wrench} 
            desc={
              <div className="space-y-3">
                <p className="font-semibold text-[#3E2522]">Seamless scheduling and arrival window management for HVAC, electrical, plumbing, and restoration teams.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Arrival Window Tracking:</strong> Monitoring job durations and alerting homeowners/clients before arrival windows slip.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Emergency Job Triage:</strong> Immediate assignment of urgent service tickets to the nearest on-call technician.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Work Order Verification:</strong> Verifying completion notes, signatures, and material logs before closing out jobs.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Systems:</strong> ServiceTitan, Jobber, Housecall Pro, and Simpro.
                  </div>
                </div>
              </div>
            }
          />

          <DispatchAccordion 
            delay={250}
            sector="Customer Operations"
            title="Inbound Customer Support & Tier-1 Answering" 
            icon={Headset} 
            desc={
              <div className="space-y-3">
                <p className="font-semibold text-[#3E2522]">Professional voice and digital reception ensuring zero dropped client inquiries.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>24/7 Answering Desk:</strong> Professional phone answering adhering to your specific script and brand tone.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Emergency Routing:</strong> Instant warm-transfers to on-call managers for high-priority operational emergencies.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Ticket Logging:</strong> Comprehensive triage and classification in your CRM or ticketing platform.
                  </div>
                  <div className="p-3 bg-[#FFF2DF]/50 rounded-lg border border-[#8C6E63]/10">
                    <strong>Systems:</strong> Zendesk, Freshdesk, RingCentral, Dialpad, and Intercom.
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <RevealOnScroll as="h2" direction="left" className="text-3xl font-bold mb-4 text-[#3E2522] flex items-center gap-3">
            <Layers className="text-[#D3A376]" size={32} /> Operations Administration
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={50} className="text-[#3E2522]/80 mb-6 leading-relaxed">
            Raw platform data turned into clean, actionable leadership summaries.
          </RevealOnScroll>
          <ul className="space-y-3">
            {[
              { title: "Timesheet Reconciliation", desc: "Comparing punch-clock records against assigned rosters to catch unauthorized overtime." },
              { title: "Weekly KPI Summaries", desc: "Compiling shift fill rates, average response delays, and exception frequencies." },
              { title: "Standard Operating Procedure Maintenance", desc: "Keeping site post orders, customer instructions, and emergency trees updated." }
            ].map((item, i) => (
              <RevealOnScroll key={i} as="li" direction="left" delay={100 + (i * 50)} className="group flex items-start gap-4 bg-white p-5 rounded-xl border border-[#8C6E63]/10 shadow-sm hover:border-[#D3A376]/50 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFF2DF]/60 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                <div className="w-10 h-10 rounded-lg bg-[#FFF2DF]/50 flex items-center justify-center flex-shrink-0 border border-[#8C6E63]/10 group-hover:bg-[#D3A376] group-hover:scale-110 transition-all">
                  <CheckSquare className="text-[#D3A376] group-hover:text-white" size={18} />
                </div>
                <div className="relative z-10">
                  <strong className="block text-[#3E2522] text-base mb-1">{item.title}</strong>
                  <span className="text-[#3E2522]/70 text-xs md:text-sm">{item.desc}</span>
                </div>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
        <div className="bg-[#3E2522] p-8 rounded-2xl text-[#FFF2DF] lg:mt-6">
          <h3 className="text-xl font-bold mb-3 text-[#D3A376]">Need a Custom Scope?</h3>
          <p className="text-[#FFF2DF]/80 text-sm leading-relaxed mb-6">
            Every service business runs on unique software combinations and custom post orders. We craft bespoke operational scopes based on your specific requirements.
          </p>
          <button 
            onClick={() => setView('contact')}
            className="px-6 py-3 bg-[#D3A376] hover:bg-[#FFE0B2] text-[#3E2522] font-bold rounded text-sm transition-all"
          >
            Request Custom Scope
          </button>
        </div>
      </section>
    </div>
    
    <PlatformIntegrationGrid />
    <CoverageCalculator setView={setView} />
    <FinalCTA setView={setView} />
  </div>
);

const HowWeWorkView = ({ setView }) => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader 
      eyebrow="How We Work"
      title="Structured Onboarding. Predictable Execution."
      subtitle="We believe in clear boundaries, structured communication, and documented processes to ensure a reliable remote partnership."
    />

    <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-12">
      <div className="space-y-8">
        {[
          { num: "01", title: "Discovery & Workflow Audit", desc: "We evaluate your current tools, communication channels, and recurring friction points to map out where remote coordination delivers maximum relief." },
          { num: "02", title: "Defined Scope of Work (SOW)", desc: "We document exact deliverables, authorized access limits, active operational hours, and emergency escalation matrices before touching live systems." },
          { num: "03", title: "Secure System Onboarding", desc: "We configure authorized operator logins inside your software, set up private communication channels, and perform end-to-end communication tests." },
          { num: "04", title: "Active Handover & Periodic Audits", desc: "Our operators take over designated shifts. We provide structured daily handover reports and conduct regular cadence reviews with your operations leadership." }
        ].map((step, i) => (
          <RevealOnScroll key={i} direction="up" delay={80 * i} className="flex flex-col md:flex-row gap-6 md:gap-10 items-start bg-white p-8 rounded-2xl border border-[#8C6E63]/10 shadow-sm">
            <span className="text-4xl md:text-5xl font-extrabold text-[#D3A376] opacity-60 font-mono">{step.num}</span>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-[#3E2522] mb-2">{step.title}</h3>
              <p className="text-[#3E2522]/80 leading-relaxed text-sm md:text-base">{step.desc}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>

    <PlatformIntegrationGrid />
    <FinalCTA setView={setView} />
  </div>
);

const GlobalHubsSection = () => (
  <section className="w-full mt-24 mb-12">
    <div className="bg-[#2A1816] rounded-[2rem] p-10 md:p-16 border border-[#D3A376]/20 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D3A376]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <RevealOnScroll as="h2" direction="up" className="text-center text-[#FFF2DF]/70 text-lg md:text-xl font-medium tracking-wide mb-16 relative z-10">
        The operational backbone behind growing companies worldwide.
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        <div className="space-y-6 text-[#FFF2DF]/80 leading-relaxed text-lg">
          <RevealOnScroll direction="left" delay={100}>
            <p>Founded in 2025 by <strong>Rafiullah Waheed</strong>—drawing on his <strong>Master of Business Administration (MBA)</strong> and over <strong>7 years of specialized experience</strong> in remote security dispatching, administrative management, and global workforce coordination—Acrossa was created with one clear goal: helping companies run smoother, faster, and more professionally through trusted remote operations. We are not just another outsourcing company. We become a real part of your daily operations.</p>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={200}>
            <p>Today, our 45+ member team works across Afghanistan, Pakistan, Philippines, India, Bangladesh, and Indonesia, supporting businesses that need reliable dispatching, scheduling, coordination, client communication, reporting, and operational support every single day.</p>
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={300}>
            <p>We help service companies manage their day-to-day operations by staying connected with field teams, handling schedules, responding to issues quickly, communicating with clients, and making sure operations continue smoothly 24/7. Our teams are trained to work in fast-paced western business environments with professionalism, discipline, and strong communication.</p>
          </RevealOnScroll>
        </div>

        <div>
          <RevealOnScroll as="h3" direction="right" className="text-[#FFF2DF] font-bold text-2xl mb-8">
            Global Service Hubs
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Afghanistan', 'Pakistan', 'India', 'Philippines', 'Bangladesh', 'Indonesia'].map((hub, i) => (
              <RevealOnScroll key={hub} direction="up" delay={150 + (i * 80)}>
                <div className="flex items-center gap-6 bg-black/20 hover:bg-[#D3A376]/10 border border-[#FFF2DF]/10 hover:border-[#D3A376]/50 px-6 py-5 rounded-xl transition-all duration-500 cursor-default group shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(211,163,118,0.2)] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
                  <span className="text-sm font-mono text-[#D3A376]/50 group-hover:text-[#D3A376] transition-colors">{(i+1).toString().padStart(2, '0')}</span>
                  <span className="text-[#FFF2DF] font-medium tracking-wide">{hub}</span>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AboutView = ({ setView }) => (
  <div className="w-full animate-in fade-in duration-500">
    <PageHeader 
      eyebrow="About Acrossa"
      title="A Dedicated Remote Operations Partner."
      subtitle="Helping service businesses keep everyday operations organized."
    />

    <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <RevealOnScroll as="h2" direction="left" className="text-3xl font-bold text-[#3E2522] mb-6">Our Mission</RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={100} className="text-[#3E2522]/80 leading-relaxed mb-6">
            Acrossa was founded to help growing service businesses solve a specific problem: scaling field operations without collapsing the back office. We recognized that generic virtual assistants often lack the focus required to handle the rigid scheduling, dispatch coordination, and reporting needed in industries like security, logistics, and field maintenance.
          </RevealOnScroll>
          <RevealOnScroll as="p" direction="left" delay={200} className="text-[#3E2522]/80 leading-relaxed">
            Our approach is grounded in professional execution, clear documentation, and accountable follow-through. We exist to absorb the recurring administrative pressure so your leadership can focus on client acquisition and strategic growth.
          </RevealOnScroll>
        </div>
        <RevealOnScroll direction="right" className="bg-[#FFE0B2]/30 p-10 rounded-2xl border border-[#8C6E63]/10">
          <h3 className="text-xl font-bold text-[#3E2522] mb-6">Our Core Principles</h3>
          <ul className="space-y-6">
            {[
              { title: "Clarity Over Complexity", desc: "We prioritize documented systems and clear communication over chaotic, unstructured work." },
              { title: "Native Integration", desc: "We work inside your existing tools. We don't force proprietary software on your business." },
              { title: "Strict Boundaries", desc: "We focus purely on operations coordination. We do not dilute our expertise." }
            ].map((val, i) => (
              <li key={i}>
                <strong className="block text-[#3E2522]">{val.title}</strong>
                <span className="text-[#3E2522]/70 text-sm">{val.desc}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>

      <GlobalHubsSection />
    </section>

    <FinalCTA setView={setView} />
  </div>
);

const ContactView = ({ setView }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    const formData = new FormData(e.target);
    const web3FormsKey = import.meta.env?.VITE_WEB3FORMS_KEY;
    formData.append("access_key", web3FormsKey);
    formData.append("subject", "New Inquiry from Acrossa Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        setIsSubmitting(false);
        setErrorMessage(data.message || "Failed to submit inquiry. Please email us directly at contact@acrossaops.com.");
      }
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage("Network error connecting to form service. Please email contact@acrossaops.com.");
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <PageHeader 
        eyebrow="Contact Acrossa"
        title="Start the Conversation."
        subtitle="Tell us about your business, the work consuming your time, and the operational support you need."
      />

      <section className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pb-28 grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-6">
          <RevealOnScroll direction="left">
            <h3 className="text-2xl font-bold text-[#3E2522] mb-4">Let's connect.</h3>
            <p className="text-[#3E2522]/70 mb-8 leading-relaxed">
              We begin every engagement with a brief discovery conversation to evaluate if our remote support aligns with your current operational needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <Search size={20} className="text-[#D3A376]" /> 
                <span className="font-medium">Discovery Discussion</span>
              </div>
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <FileText size={20} className="text-[#D3A376]" /> 
                <span className="font-medium">Scope & Requirements</span>
              </div>
              <div className="flex items-center gap-3 text-[#3E2522]/80">
                <Target size={20} className="text-[#D3A376]" /> 
                <span className="font-medium">Secure Onboarding</span>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[#FFE0B2]/30 rounded-2xl border border-[#D3A376]/25">
              <h4 className="font-bold text-[#3E2522] text-xs uppercase tracking-wider mb-2">Direct Inquiries</h4>
              <a href="mailto:contact@acrossaops.com" className="text-[#3E2522] font-semibold text-sm hover:text-[#8C6E63] flex items-center gap-2">
                <Mail size={16} /> contact@acrossaops.com
              </a>
              <p className="text-xs text-[#3E2522]/60 mt-2">
                Service coverage: United States & Canada
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll direction="up" delay={200} className="md:col-span-3 bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-[#8C6E63]/15">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-[#FFE0B2] text-[#D3A376] rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#3E2522] mb-2">Inquiry Received</h3>
              <p className="text-[#3E2522]/70 text-sm max-w-sm mb-6">
                Thank you for reaching out. We will review your requirements and follow up within one business day.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-[#3E2522] text-[#FFF2DF] text-xs font-bold rounded-lg uppercase tracking-wider"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {errorMessage && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Name *</label>
                  <input type="text" name="name" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Business Email *</label>
                  <input type="email" name="email" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]" placeholder="jane@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Company Name *</label>
                  <input type="text" name="company" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]" placeholder="Acme Logistics / Patrol" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Direct Phone *</label>
                  <input type="tel" name="phone" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]" placeholder="+1 (555) 000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Services Needed *</label>
                  <select name="service_needed" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3 py-2.5 text-sm text-[#3E2522] focus:outline-none focus:border-[#D3A376]">
                    <option value="">Select service...</option>
                    <option value="security-dispatching">Security Dispatching</option>
                    <option value="truck-dispatching">Truck Dispatching</option>
                    <option value="field-service-dispatching">Field Service Dispatching</option>
                    <option value="call-center-inbound">Call Center & Inbound</option>
                    <option value="scheduling-coverage">Scheduling & Coverage</option>
                    <option value="operations-administration">Operations Administration</option>
                    <option value="multiple-custom">Multiple / Custom Scope</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Coverage Window *</label>
                  <select name="coverage_window" required className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3 py-2.5 text-sm text-[#3E2522] focus:outline-none focus:border-[#D3A376]">
                    <option value="">Select coverage...</option>
                    <option value="24-7">24/7/365 Continuous</option>
                    <option value="after-hours">Nights & Weekends</option>
                    <option value="business-hours">Daytime Business Hours</option>
                    <option value="surge-overflow">Surge / Call-Out Overflow</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Current Software Tools Used</label>
                <input type="text" name="current_software" className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376]" placeholder="e.g. TrackTik, Silvertrac, Samsara, ServiceTitan, Connecteam" />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#3E2522] uppercase tracking-wider mb-1.5">Main Operational Challenge *</label>
                <textarea name="message" required rows="3" className="w-full bg-[#FFF2DF]/30 border border-[#8C6E63]/20 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#D3A376] resize-none" placeholder="What takes up most of your day?"></textarea>
              </div>

              <div className="text-[11px] text-[#8C6E63] flex items-center gap-1.5 pt-1">
                <Shield size={14} className="flex-shrink-0" />
                <span>Your information is handled confidentially and used solely to evaluate your business inquiry.</span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3.5 bg-[#3E2522] text-[#FFF2DF] font-bold rounded-lg transition-all duration-300 shadow-md text-sm ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#8C6E63]'
                }`}
              >
                {isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </RevealOnScroll>
      </section>
    </div>
  );
};

const PolicyModal = ({ title, content, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className="bg-[#FFF2DF] rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-[#8C6E63]/20 relative max-h-[85vh] overflow-y-auto">
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-[#3E2522]/60 hover:text-[#3E2522] p-1"
        aria-label="Close dialog"
      >
        <X size={22} />
      </button>
      <h3 className="text-2xl font-bold text-[#3E2522] mb-4">{title}</h3>
      <div className="text-[#3E2522]/80 text-sm leading-relaxed space-y-4">
        {content}
      </div>
      <div className="mt-8 pt-4 border-t border-[#8C6E63]/20 text-right">
        <button 
          onClick={onClose}
          className="px-5 py-2 bg-[#3E2522] text-[#FFF2DF] font-semibold text-xs rounded-lg uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'how-we-work', 'about', 'contact'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'how-we-work', 'about', 'contact'].includes(hash)) {
        setView(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newView) => {
    setView(newView);
    if (typeof window !== 'undefined') {
      window.location.hash = newView;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const isDarkHero = view === 'home';
  const isScrolled = scrollY > 20;

  const navBg = isScrolled 
    ? 'bg-[#2A1816]/95 backdrop-blur-md shadow-md border-b border-[#FFF2DF]/10 py-3.5' 
    : 'bg-transparent py-5';

  const isDarkText = !isDarkHero && !isScrolled;
  const navTextColor = isDarkText ? 'text-[#3E2522]' : 'text-[#FFF2DF]';

  const NavLink = ({ label, target }) => (
    <button 
      onClick={() => navigate(target)} 
      className={`transition-colors duration-300 font-bold tracking-wide flex items-center gap-1 text-xs md:text-sm uppercase
        ${view === target 
           ? 'text-[#D3A376]' 
           : `${navTextColor} hover:text-[#D3A376]`}`}
    >
      {label} {view === target && <ChevronRight size={14} className="mt-0.5" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#FFF2DF] text-[#3E2522] font-sans selection:bg-[#D3A376] selection:text-[#3E2522] flex flex-col">
      <GlobalStyles />
      
      <nav className={`w-full px-6 md:px-12 lg:px-24 flex justify-between items-center fixed top-0 left-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="flex items-center group" onClick={() => navigate('home')}>
          <Logo dark={!isDarkText} className="group-hover:scale-105 transition-transform duration-300" />
        </div>
        
        <div className="hidden md:flex gap-7 items-center">
          <NavLink label="Home" target="home" />
          <NavLink label="Services" target="services" />
          <NavLink label="How We Work" target="how-we-work" />
          <NavLink label="About" target="about" />
          <button 
            onClick={() => navigate('contact')} 
            className={`ml-2 px-5 py-2.5 rounded-lg transition-all duration-300 uppercase tracking-widest text-xs font-bold shadow-md ${
              isDarkText 
                ? 'bg-[#3E2522] text-[#FFF2DF] hover:bg-[#8C6E63]' 
                : 'bg-[#D3A376] text-[#3E2522] hover:bg-[#FFE0B2]'
            }`}
          >
            Discuss Operations
          </button>
        </div>

        <button 
          className={`md:hidden ${navTextColor}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[68px] left-0 w-full bg-[#FFF2DF] z-40 border-b border-[#8C6E63]/20 flex flex-col px-6 py-6 shadow-xl animate-in slide-in-from-top-4">
          {['home', 'services', 'how-we-work', 'about', 'contact'].map((v) => (
            <button 
              key={v} 
              onClick={() => navigate(v)} 
              className={`py-3.5 font-bold text-left border-b border-[#3E2522]/10 uppercase text-xs tracking-wider ${
                view === v ? 'text-[#D3A376]' : 'text-[#3E2522]'
              }`}
            >
              {v.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      )}

      <div className="flex-grow pt-0">
        {view === 'home' && <HomeView setView={navigate} scrollY={scrollY} />}
        {view === 'services' && <ServicesView setView={navigate} />}
        {view === 'how-we-work' && <HowWeWorkView setView={navigate} />}
        {view === 'about' && <AboutView setView={navigate} />}
        {view === 'contact' && <ContactView setView={navigate} />}
      </div>

      <footer className="w-full bg-[#2A1816] text-[#FFF2DF] py-14 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-[#FFF2DF]/10 pb-10 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center cursor-pointer group mb-4" onClick={() => navigate('home')}>
              <Logo dark={true} className="group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-xs md:text-sm opacity-65 font-medium max-w-sm leading-relaxed">
              Dependable remote operations, dispatching, and administrative support for growing North American service companies.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 tracking-wider uppercase text-xs text-[#D3A376]">Navigation</h4>
            <ul className="space-y-2 text-xs opacity-80 font-medium">
              <li><button onClick={() => navigate('home')} className="hover:text-[#D3A376] transition-colors">Home</button></li>
              <li><button onClick={() => navigate('services')} className="hover:text-[#D3A376] transition-colors">Services</button></li>
              <li><button onClick={() => navigate('how-we-work')} className="hover:text-[#D3A376] transition-colors">How We Work</button></li>
              <li><button onClick={() => navigate('about')} className="hover:text-[#D3A376] transition-colors">About Acrossa</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 tracking-wider uppercase text-xs text-[#D3A376]">Inquiries</h4>
            <ul className="space-y-2 text-xs opacity-80 font-medium">
              <li><button onClick={() => navigate('contact')} className="hover:text-[#D3A376] transition-colors">Inquiry Form</button></li>
              <li><a href="mailto:contact@acrossaops.com" className="hover:text-[#D3A376] transition-colors">contact@acrossaops.com</a></li>
              <li className="text-[11px] opacity-60">US & Canada Operational Coverage</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs opacity-50 font-medium tracking-wide">
          <p>© {new Date().getFullYear()} Acrossa Operations LLC. acrossaops.com</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-[#FFF2DF] transition-colors">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-[#FFF2DF] transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>

      {activeModal === 'privacy' && (
        <PolicyModal 
          title="Privacy Policy"
          onClose={() => setActiveModal(null)}
          content={
            <>
              <p>Acrossa Operations LLC respects your privacy. When you contact us or submit an operations inquiry, we collect company details, contact names, email addresses, and operational descriptions solely to evaluate your service requirements and formulate a tailored Scope of Work.</p>
              <p>We do not sell, rent, or distribute client contact data to third parties. All operational records, shift data, and platform access credentials shared during trial or active phases are governed by mutual Non-Disclosure Agreements (NDAs).</p>
            </>
          }
        />
      )}

      {activeModal === 'terms' && (
        <PolicyModal 
          title="Terms of Service"
          onClose={() => setActiveModal(null)}
          content={
            <>
              <p>Acrossa provides remote business operations, scheduling maintenance, and dispatch support acting as an authorized operational contractor within client-designated software tools.</p>
              <p>Acrossa executes tasks based strictly on agreed standard operating procedures (SOPs) and post orders provided by the client. Client management retains full authority for statutory employment decisions, guard licensing, vehicle maintenance, and final disciplinary actions.</p>
            </>
          }
        />
      )}
    </div>
  );
}