import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    container.replaceChildren();

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x3e2522, 6, 32);

    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 16);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff2df, 3.0);
    dirLight1.position.set(6, 12, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd3a376, 2.0);
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
      color: 0xfff2df,
      metalness: 0.25,
      roughness: 0.25,
    });

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xd3a376,
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
      halos.push({ mesh: haloMesh, speed: Math.random() * 0.008 + 0.004 });
    }

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd3a376,
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
    const packetMaterial = new THREE.MeshBasicMaterial({ color: 0xfff2df });

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

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;
    const onMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      targetX = x * 0.3;
      targetY = y * 0.3;
    };
    container.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId;
    let isRendering = false;
    let inView = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const animate = () => {
      if (!isRendering) return;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      camera.position.x = currentX;
      camera.position.y = currentY;
      camera.lookAt(0, 0, 0);

      networkGroup.rotation.y += 0.001;
      networkGroup.rotation.x += 0.0005;

      halos.forEach((halo) => {
        halo.mesh.rotation.x += halo.speed;
        halo.mesh.rotation.y += halo.speed;
      });

      packets.forEach((packet) => {
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

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
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
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const syncRendering = () => {
      const shouldRender = inView && !document.hidden && !motion.matches;
      if (shouldRender === isRendering) return;
      isRendering = shouldRender;
      if (shouldRender) animate();
      else cancelAnimationFrame(animationFrameId);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncRendering();
      },
      { threshold: 0.05 },
    );
    observer.observe(container);
    document.addEventListener('visibilitychange', syncRendering);
    motion.addEventListener('change', syncRendering);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncRendering);
      motion.removeEventListener('change', syncRendering);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.isLine) object.geometry.dispose();
      });
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

export default Hero3D;
