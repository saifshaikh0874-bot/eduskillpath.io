// ========================
// WhatsApp Widget v2.0 – Billion‑Dollar Edition
// ========================
(function() {
  'use strict';

  // --- Configuration (can be fetched from a backend) ---
  const CONFIG = {
    apiEndpoint: 'https://api.yourstartup.com/agents', // returns list of agents with online status
    buttonColor: '#22c55e',
    buttonIcon: '💬', // or SVG
    title: 'Eduskillpath Support',
    position: { bottom: '24px', right: '24px' },
    trackingId: 'UA-XXXXX-Y', // Google Analytics
    refreshInterval: 60000, // refresh agent status every 60 seconds
    fallbackImage: 'https://via.placeholder.com/42?text=Agent'
  };

  // --- Core widget class ---
  class WhatsAppWidget {
    constructor(config) {
      this.config = config;
      this.agents = [];
      this.widget = null;
      this.button = null;
      this.box = null;
      this.visible = false;
      this.init();
    }

    // Load agent data from API
    async fetchAgents() {
      try {
        const response = await fetch(this.config.apiEndpoint);
        const data = await response.json();
        this.agents = data.agents.filter(agent => agent.online); // only online agents
      } catch (error) {
        console.warn('Failed to fetch agents, using fallback data', error);
        // Fallback to static data if API fails
        this.agents = [
          { name: 'Lucy', role: 'Resume Specialist • Internship Certificate Provider', number: '917781976959', message: 'Hi Eduskillpath, I need help with ATS Resume or Internship Certificate', image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=200&h=200&fit=crop&crop=faces' },
          { name: 'Sofia', role: 'Career Advisor • Resume & Job Support', number: '917494943858', message: 'Hi Eduskillpath, I need career guidance', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces' }
        ];
      }
      this.renderBox();
    }

    // Create the widget DOM
    createWidget() {
      this.widget = document.createElement('div');
      this.widget.id = 'waWidget';
      Object.assign(this.widget.style, {
        position: 'fixed',
        bottom: this.config.position.bottom,
        right: this.config.position.right,
        zIndex: '9999',
        fontFamily: 'system-ui, Arial, sans-serif'
      });

      // Box container
      this.box = document.createElement('div');
      this.box.id = 'waBox';
      Object.assign(this.box.style, {
        display: 'none',
        marginBottom: '12px',
        width: '290px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      });

      // Header
      const header = document.createElement('div');
      header.style.cssText = `background:${this.config.buttonColor};color:white;padding:14px;font-weight:600;font-size:14px;`;
      header.textContent = this.config.title;
      this.box.appendChild(header);

      // Agents container
      this.agentsContainer = document.createElement('div');
      this.agentsContainer.style.cssText = 'padding:14px;display:flex;flex-direction:column;gap:12px;';
      this.box.appendChild(this.agentsContainer);

      // Button
      this.button = document.createElement('button');
      this.button.id = 'waBtn';
      this.button.setAttribute('aria-label', 'Open WhatsApp chat');
      Object.assign(this.button.style, {
        width: '58px',
        height: '58px',
        borderRadius: '50%',
        background: this.config.buttonColor,
        border: 'none',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 12px 25px rgba(0,0,0,0.25)',
        cursor: 'pointer',
        transition: 'transform 0.2s'
      });
      this.button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16"><path d="M13.601 2.326A7.86 7.86 0 008.013 0C3.58 0 0 3.58 0 8.01c0 1.41.37 2.78 1.08 3.99L0 16l4.12-1.07a8.01 8.01 0 003.89 1c4.43 0 8.01-3.58 8.01-8.01a7.96 7.96 0 00-2.42-5.59z"/></svg>`;

      // Assemble
      this.widget.appendChild(this.box);
      this.widget.appendChild(this.button);
      document.body.appendChild(this.widget);

      // Event listeners
      this.button.addEventListener('click', () => this.toggleBox());
      document.addEventListener('click', (e) => {
        if (!this.widget.contains(e.target)) this.hideBox();
      });

      // Track button click
      if (window.gtag) {
        this.button.addEventListener('click', () => {
          gtag('event', 'click', { event_category: 'WhatsApp Widget', event_label: 'Open Box' });
        });
      }
    }

    // Render agents inside the box
    renderBox() {
      this.agentsContainer.innerHTML = '';
      if (!this.agents.length) {
        this.agentsContainer.innerHTML = '<div style="text-align:center;color:#64748b;">No agents online</div>';
        return;
      }
      this.agents.forEach(agent => {
        const link = document.createElement('a');
        link.href = `https://wa.me/${agent.number}?text=${encodeURIComponent(agent.message)}`;
        link.target = '_blank';
        link.style.cssText = 'display:flex;align-items:center;gap:12px;padding:10px;border-radius:10px;text-decoration:none;color:#111;transition:background 0.2s;';
        link.addEventListener('mouseenter', () => link.style.background = '#f3f4f6');
        link.addEventListener('mouseleave', () => link.style.background = 'transparent');

        // Image with fallback
        const img = document.createElement('img');
        img.src = agent.image || this.config.fallbackImage;
        img.alt = agent.name;
        img.style.cssText = 'width:42px;height:42px;border-radius:50%;object-fit:cover;';
        img.onerror = () => img.src = this.config.fallbackImage;

        // Text container
        const textDiv = document.createElement('div');
        textDiv.innerHTML = `
          <div style="font-weight:600;font-size:14px;">${agent.name}</div>
          <div style="font-size:12px;color:#64748b;">${agent.role}</div>
        `;

        link.appendChild(img);
        link.appendChild(textDiv);
        this.agentsContainer.appendChild(link);

        // Track link click
        link.addEventListener('click', () => {
          if (window.gtag) {
            gtag('event', 'click', { event_category: 'WhatsApp Widget', event_label: `Chat with ${agent.name}` });
          }
        });
      });
    }

    toggleBox() {
      this.visible = !this.visible;
      this.box.style.display = this.visible ? 'block' : 'none';
      if (this.visible) {
        this.fetchAgents(); // refresh data when opened
        // Track open
        if (window.gtag) {
          gtag('event', 'view', { event_category: 'WhatsApp Widget', event_label: 'Box Opened' });
        }
      }
    }

    hideBox() {
      this.visible = false;
      this.box.style.display = 'none';
    }

    // Start periodic refresh
    startRefresh() {
      setInterval(() => {
        if (this.visible) this.fetchAgents();
      }, this.config.refreshInterval);
    }

    init() {
      this.createWidget();
      this.fetchAgents();
      this.startRefresh();
    }
  }

  // --- Instantiate the widget when DOM is ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new WhatsAppWidget(CONFIG));
  } else {
    new WhatsAppWidget(CONFIG);
  }
})();
