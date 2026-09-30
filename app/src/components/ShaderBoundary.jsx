import { Component } from 'react';

// Shader backgrounds load remote assets (e.g. the envPreset HDR). If one fails,
// drop the background instead of letting the error unmount the whole page.
export default class ShaderBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn('Shader background disabled:', error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
