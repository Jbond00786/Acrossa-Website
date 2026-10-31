import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock IntersectionObserver
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock ResizeObserver
global.ResizeObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
    // Only call it once to prevent infinite loop during tests
    if (global.requestAnimationFrame.called) return;
    global.requestAnimationFrame.called = true;
    return setTimeout(cb, 0)
});
global.cancelAnimationFrame = vi.fn();

// Mock three.js to avoid issues in jsdom
vi.mock('three', () => {
  class MockVector3 {
      constructor(x=0, y=0, z=0) {
          this.x = x
          this.y = y
          this.z = z
      }
      normalize() { return this }
      multiplyScalar() { return this }
      distanceTo() { return 0 }
      clone() { return new MockVector3(this.x, this.y, this.z) }
      add() { return this }
      copy() { return this }
      set() { return this }
      lerp() { return this }
      lerpVectors() { return this }
  }

  class MockGeometry {
      dispose() {}
  }

  return {
    WebGLRenderer: class {
      constructor() {
        this.domElement = document.createElement('canvas')
      }
      setSize() {}
      setPixelRatio() {}
      render() {}
      dispose() {}
    },
    Scene: class {
      add() {}
      remove() {}
    },
    Fog: class {},
    PerspectiveCamera: class {
      constructor() {
        this.position = new MockVector3()
        this.aspect = 1
        this.lookAt = vi.fn()
      }
      updateProjectionMatrix() {}
    },
    IcosahedronGeometry: class extends MockGeometry {},
    SphereGeometry: class extends MockGeometry {},
    RingGeometry: class extends MockGeometry {},
    PlaneGeometry: class extends MockGeometry {},
    MeshBasicMaterial: class { dispose() {} },
    MeshStandardMaterial: class { dispose() {} },
    Mesh: class {
      constructor() {
        this.rotation = new MockVector3()
        this.position = new MockVector3()
        this.scale = { setScalar: vi.fn(), set: vi.fn() }
        this.lookAt = vi.fn()
        this.material = { opacity: 1, transparent: false, dispose: vi.fn() }
        this.geometry = new MockGeometry()
      }
    },
    Color: class {},
    PointsMaterial: class { dispose() {} },
    BufferGeometry: class extends MockGeometry {
      setAttribute() {}
      setFromPoints() {}
    },
    Float32BufferAttribute: class {},
    Points: class {
        constructor() {
            this.position = new MockVector3()
            this.scale = { setScalar: vi.fn(), set: vi.fn() }
            this.geometry = new MockGeometry()
            this.material = { dispose: vi.fn() }
        }
    },
    AmbientLight: class {},
    DirectionalLight: class {
      constructor() {
        this.position = new MockVector3()
      }
    },
    Group: class {
      constructor() {
        this.rotation = new MockVector3()
        this.position = new MockVector3()
        this.scale = { setScalar: vi.fn(), set: vi.fn() }
      }
      add() {}
    },
    Vector3: MockVector3,
    LineBasicMaterial: class { dispose() {} },
    Line: class {
        constructor() {
            this.geometry = new MockGeometry()
            this.material = { dispose: vi.fn() }
        }
    },
    MathUtils: {
        randFloatSpread: vi.fn(() => 0),
        randFloat: vi.fn(() => 0)
    }
  }
})

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn()

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/About Acrossa/i, { exact: false })).toBeInTheDocument()
  })
})
