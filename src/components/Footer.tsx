import { Shield, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">Shield<span className="text-primary">Test</span></span>
          </div>
          <p className="text-sm text-muted-foreground">Developer-focused security testing toolkit for domains, APIs, and web applications.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Tools</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/domain-test" className="hover:text-primary transition-colors">Domain Tester</Link>
            <Link to="/api-test" className="hover:text-primary transition-colors">API Tester</Link>
            <Link to="/frontend-test" className="hover:text-primary transition-colors">Frontend Tester</Link>
            <Link to="/dev-dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Resources</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="cursor-default">Documentation</span>
            <span className="cursor-default">API Reference</span>
            <span className="cursor-default">Changelog</span>
            <span className="cursor-default">Status</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Connect</h4>
          <div className="flex gap-3">
            <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"><Github className="h-5 w-5" /></a>
            <a href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ShieldTest. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
