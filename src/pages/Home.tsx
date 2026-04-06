import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Shield, Globe, Send, Monitor, Zap, Lock, ArrowRight,
  CheckCircle, Terminal, Code, Database, Activity
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const tools = [
  {
    icon: Globe,
    title: "Domain Security",
    desc: "Analyze SSL certificates, security headers, HTTPS status, and vulnerability scores for any domain.",
    to: "/domain-test",
    color: "text-primary",
    bgColor: "bg-primary/10 border-primary/20",
  },
  {
    icon: Send,
    title: "API Tester",
    desc: "Send HTTP requests, inspect responses, manage headers and body — like Postman, built right in.",
    to: "/api-test",
    color: "text-warning",
    bgColor: "bg-warning/10 border-warning/20",
  },
  {
    icon: Monitor,
    title: "Frontend Tester",
    desc: "Check page performance, mobile responsiveness scores, and run SEO audits on any website.",
    to: "/frontend-test",
    color: "text-safe",
    bgColor: "bg-safe/10 border-safe/20",
  },
];

const features = [
  { icon: Zap, title: "Instant Results", desc: "Get detailed security reports in under 3 seconds." },
  { icon: Lock, title: "Privacy First", desc: "All tests run client-side. Zero data retention." },
  { icon: Terminal, title: "Developer Friendly", desc: "Built for devs — copy results, export JSON, save history." },
  { icon: Code, title: "API Ready", desc: "Designed for easy integration with your CI/CD pipeline." },
  { icon: Database, title: "Test History", desc: "Track all your tests with persistent history and analytics." },
  { icon: Activity, title: "Live Monitoring", desc: "Watch security metrics and performance trends over time." },
];

const Home = () => (
  <div className="min-h-screen">
    {/* Hero */}
    <section className="relative pt-28 sm:pt-32 pb-20 sm:pb-28 px-4 overflow-hidden min-h-[85vh] flex items-center">
      <div className="absolute inset-0 gradient-bg" />
      <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-[0.07] pointer-events-none" width={1920} height={1080} />

      <motion.div
        className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-danger/[0.04] rounded-full blur-[100px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-8 border border-primary/20"
        >
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary">Developer Security Toolkit</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-[1.1] tracking-tight"
        >
          Test. Analyze.
          <br />
          <span className="text-primary neon-text">Secure.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          A powerful developer toolkit for domain security analysis,
          API testing, and frontend performance audits — all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/domain-test"
            className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            <Globe className="h-4 w-4" />
            Test a Domain
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/api-test"
            className="glass text-foreground font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm hover:neon-glow transition-shadow"
          >
            <Send className="h-4 w-4" />
            Test an API
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5 text-primary" /> No signup required</span>
          <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> 100% client-side</span>
          <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> Instant results</span>
        </motion.div>
      </div>
    </section>

    {/* Tools */}
    <section className="py-20 sm:py-28 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Testing Tools</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to <span className="text-primary">ship secure</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Three powerful modules designed for developers who care about security.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
              <Link to={tool.to} className="block group h-full">
                <div className="glass rounded-2xl p-7 h-full hover:neon-glow transition-all duration-300 flex flex-col">
                  <div className={`w-14 h-14 rounded-xl ${tool.bgColor} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`h-7 w-7 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Launch tool <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-20 sm:py-28 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-3 block">Features</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for <span className="text-primary">developers</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-2xl p-6 group hover:neon-glow transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1.5 text-sm">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 sm:py-28 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-3xl" />
            <div className="relative glass rounded-3xl p-8 sm:p-12 md:p-16 text-center neon-glow">
              <div className="absolute inset-0 opacity-[0.03] rounded-3xl overflow-hidden" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              <div className="relative z-10">
                <Shield className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Start testing <span className="text-primary">now</span>
                </h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  No account needed. Run your first security test in seconds — completely free.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/domain-test" className="gradient-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4" /> Domain Security Test
                  </Link>
                  <Link to="/api-test" className="glass text-foreground font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 text-sm hover:neon-glow transition-shadow">
                    <Send className="h-4 w-4" /> API Request Tester
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default Home;
