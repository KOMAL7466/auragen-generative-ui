import { useState } from "react";

function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "AuraGen",
    supportEmail: "support@auragen.com",
    cognitiveEngine: true,
    aiAssistant: true,
    ragEnabled: true,
    autoSeed: false,
  });

  const toggle = (key) => setSettings({ ...settings, [key]: !settings[key] });

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <div>
          <h1>Settings</h1>
          <p>Configure platform preferences</p>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>General Settings</h2>
            <p>Basic platform configuration</p>
          </div>
        </div>
        <div className="property-form-grid">
          <div className="admin-form-group">
            <label>Site Name</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          <div className="admin-form-group">
            <label>Support Email</label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            />
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div>
            <h2>Feature Toggles</h2>
            <p>Enable or disable platform features</p>
          </div>
        </div>
        <div className="settings-toggles">
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={settings.cognitiveEngine}
              onChange={() => toggle("cognitiveEngine")}
            />
            <span>Cognitive Load Engine</span>
          </label>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={settings.aiAssistant}
              onChange={() => toggle("aiAssistant")}
            />
            <span>AI Assistant</span>
          </label>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={settings.ragEnabled}
              onChange={() => toggle("ragEnabled")}
            />
            <span>RAG-based Retrieval</span>
          </label>
          <label className="settings-toggle">
            <input
              type="checkbox"
              checked={settings.autoSeed}
              onChange={() => toggle("autoSeed")}
            />
            <span>Auto-seed Database</span>
          </label>
        </div>
      </section>
    </div>
  );
}

export default AdminSettings;