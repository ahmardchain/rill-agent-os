"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Bot,
  Check,
  CircleAlert,
  Cpu,
  FileCheck2,
  Newspaper,
  RefreshCw,
  ScanSearch,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { siBinance, siCircle } from "simple-icons";

const stages = ["Ready", "Discovering", "Comparing", "Paying", "Collecting", "Complete"] as const;

const services = [
  { id: "market", name: "Binance Agent OS", role: "read-only market context", price: 0, icon: "binance", position: "service-one" },
  { id: "news", name: "Context index", role: "verified news search", price: 0.18, icon: "news", position: "service-two" },
  { id: "compute", name: "Quant compute", role: "volatility analysis", price: 0.42, icon: "compute", position: "service-three" },
  { id: "proof", name: "Proof layer", role: "source cross-check", price: 0.08, icon: "proof", position: "service-four" },
] as const;

const eventCopy = [
  "Waiting for a job",
  "Finding resources that match the mandate",
  "Comparing trust, price, and policy fit",
  "Authorizing three x402 payments",
  "Returning purchased evidence to the agent",
  "Research package assembled under budget",
];

const demoReceipt = "070d951e478c75059adc111cdd7fafce31d20da33a7f0e2de4521ab8ff161d65";

function BrandMark({ brand, className = "" }: { brand: "binance" | "circle"; className?: string }) {
  const mark = brand === "binance" ? siBinance : siCircle;
  return <svg className={className} viewBox="0 0 24 24" role="img" aria-label={mark.title}><path d={mark.path} /></svg>;
}

function ServiceIcon({ name }: { name: (typeof services)[number]["icon"] }) {
  if (name === "binance") return <BrandMark brand="binance" />;
  if (name === "news") return <Newspaper />;
  if (name === "compute") return <Cpu />;
  return <ScanSearch />;
}

export default function Home() {
  const [stage, setStage] = useState(0);
  const [budget, setBudget] = useState("5.00");
  const [task, setTask] = useState("Find what moved BTC volatility in the last 24 hours and return a verified brief.");
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const running = stage > 0 && stage < 5;
  const total = useMemo(() => services.reduce((sum, item) => sum + item.price, 0), []);

  useEffect(() => {
    if (!running) return;
    const delay = reduceMotion ? 220 : 1120;
    const timer = window.setTimeout(() => setStage((current) => Math.min(current + 1, 5)), delay);
    return () => window.clearTimeout(timer);
  }, [running, stage, reduceMotion]);

  function startMission(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStage(1);
  }

  function resetMission(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setStage(0);
    setCopied(false);
  }

  async function copyReceipt() {
    const receipt = demoReceipt;
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(receipt);
    } else {
      const field = document.createElement("textarea");
      field.value = receipt;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="product-shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="Rill home">rill<span>/</span></a>
        <div className="masthead-title"><span>Machine procurement</span><strong>run_041</strong></div>
        <div className="connections" aria-label="Connected payment infrastructure">
          <span className="connection"><BrandMark brand="binance" />Binance Agent OS</span>
          <span className="connection"><BrandMark brand="circle" />USDC</span>
          <span className="live-state"><i />demo online</span>
        </div>
      </header>

      <div className="product-grid" id="top">
        <section className="mandate-panel" aria-labelledby="mandate-heading">
          <div className="panel-index"><span>01</span><span>MANDATE</span></div>
          <div className="mandate-copy">
            <p className="kicker">One job. One budget.</p>
            <h1 id="mandate-heading">Let the agent buy what it needs.</h1>
            <p className="intro">Rill discovers paid machine resources, chooses a policy-safe route, and authorizes only what the job requires.</p>
          </div>

          <form className="mission-form" onSubmit={startMission}>
            <label htmlFor="mission">Job for the agent</label>
            <textarea id="mission" value={task} onChange={(event) => setTask(event.target.value)} rows={4} spellCheck="false" />
            <div className="budget-field">
              <div className="currency-label"><BrandMark brand="circle" /><label htmlFor="budget">Maximum budget</label></div>
              <div className="budget-input"><span>$</span><input id="budget" type="number" min="0.68" step="0.01" value={budget} onChange={(event) => setBudget(event.target.value)} inputMode="decimal" /><small>USDC</small></div>
            </div>
            <p className="policy-line"><ShieldCheck />Verified providers only · $1.00 max per resource · no recurring charges</p>
            {stage === 5 ? (
              <button className="primary-action reset" type="button" onClick={resetMission}><span>Run again</span><RefreshCw /></button>
            ) : (
              <button className="primary-action" type="submit" disabled={running}><span>{running ? stages[stage] : "Run procurement"}</span>{running ? <span className="loading-dots" aria-hidden="true"><i /><i /><i /></span> : <ArrowRight className="action-arrow" />}</button>
            )}
          </form>

          <div className="scope-note"><CircleAlert /><p><strong>Simulation</strong><br />The demo produces authorization receipts; it does not claim live settlement.</p></div>
        </section>

        <section className={`orchestration stage-${stage}`} aria-labelledby="map-heading" aria-busy={running}>
          <div className="canvas-head">
            <div><span>02 / LIVE ROUTE</span><h2 id="map-heading">Procurement map</h2></div>
            <div className="stage-readout" aria-live="polite" aria-atomic="true"><span>{String(stage).padStart(2, "0")}</span><strong>{stages[stage]}</strong></div>
          </div>

          <div className="route-canvas">
            <svg className="route-lines desktop-lines" viewBox="0 0 1000 620" aria-hidden="true">
              <motion.path className="route trunk" d="M 165 310 C 250 310 330 310 440 310" initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : .65 }} />
              {[[780,95],[840,230],[780,390],[840,525]].map(([x,y], index) => <motion.path key={index} className={`route branch branch-${index + 1}`} d={`M 500 310 C 620 310 650 ${y} ${x - 35} ${y}`} initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : .7, delay: reduceMotion ? 0 : .1 + index * .08 }} />)}
              {stage === 3 && services.slice(1).map((service, index) => <motion.circle key={`pay-${service.id}`} className="payment-packet" r="7" initial={{ cx: 500, cy: 310, opacity: 0 }} animate={reduceMotion ? { cx: index % 2 ? 805 : 745, cy: [230,390,525][index], opacity: 1 } : { cx: index % 2 ? 805 : 745, cy: [230,390,525][index], opacity: [0,1,1,0] }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : index * .17, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }} />)}
              {stage === 4 && services.map((service, index) => <motion.circle key={`return-${service.id}`} className="return-packet" r="6" initial={{ cx: [745,805,745,805][index], cy: [95,230,390,525][index], opacity: 0 }} animate={reduceMotion ? { cx: 500, cy: 310, opacity: 1 } : { cx: 500, cy: 310, opacity: [0,1,1,0] }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : index * .14, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }} />)}
            </svg>

            <svg className="route-lines mobile-lines" viewBox="0 0 400 620" aria-hidden="true">
              <motion.path className="route trunk" d="M 90 75 C 110 150 145 190 200 240" initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : .65 }} />
              {[[88,410],[312,410],[88,545],[312,545]].map(([x,y], index) => <motion.path key={index} className={`route branch branch-${index + 1}`} d={`M 200 290 C 200 350 ${x} 350 ${x} ${y - 35}`} initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }} transition={{ delay: reduceMotion ? 0 : index * .08 }} />)}
              {stage === 3 && [[312,410],[88,545],[312,545]].map(([x,y], index) => <motion.circle key={`mobile-pay-${index}`} className="payment-packet" r="6" initial={{ cx: 200, cy: 290, opacity: 0 }} animate={reduceMotion ? { cx: x, cy: y - 35, opacity: 1 } : { cx: [200,x], cy: [290,y - 35], opacity: [0,1,1,0] }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : index * .17, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }} />)}
              {stage === 4 && [[88,410],[312,410],[88,545],[312,545]].map(([x,y], index) => <motion.circle key={`mobile-return-${index}`} className="return-packet" r="5" initial={{ cx: x, cy: y - 35, opacity: 0 }} animate={reduceMotion ? { cx: 200, cy: 290, opacity: 1 } : { cx: [x,200], cy: [y - 35,290], opacity: [0,1,1,0] }} transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : index * .14, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }} />)}
            </svg>

            <motion.div className="agent-node" initial={false} animate={{ opacity: 1, scale: stage >= 1 ? 1.03 : 1 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
              <div className="node-icon"><Bot /></div><span>RESEARCH AGENT</span><strong>brief_24h</strong><small>{stage === 0 ? "waiting" : stage === 5 ? "delivered" : "working"}</small>
            </motion.div>

            <motion.div className="router-node" initial={false} animate={{ scale: running && !reduceMotion ? [1,1.035,1] : 1 }} transition={{ duration: 1.4, repeat: running && !reduceMotion ? Infinity : 0 }}>
              <div className="router-orbit" aria-hidden="true"><i /><i /><i /></div>
              <Waypoints /><span>RILL ROUTER</span><strong>{stage < 2 ? "route pending" : stage === 5 ? `$${total.toFixed(2)} authorized` : stages[stage].toLowerCase()}</strong>
            </motion.div>

            {services.map((service, index) => (
              <motion.div key={service.id} className={`service-node ${service.position} ${stage >= 2 ? "quoted" : ""} ${stage >= 3 ? "selected" : ""}`} initial={false} animate={{ opacity: stage >= 1 ? 1 : .38, scale: stage >= 1 ? 1 : .96, y: stage >= 1 ? 0 : 8 }} transition={{ type: "spring", stiffness: 320, damping: 24, delay: reduceMotion ? 0 : index * .06 }}>
                <div className="service-icon"><ServiceIcon name={service.icon} /></div>
                <div className="service-copy"><strong>{service.name}</strong><span>{service.role}</span></div>
                <div className="quote"><span>{stage >= 2 ? (service.price === 0 ? "included" : `$${service.price.toFixed(2)}`) : "—"}</span>{stage >= 3 && <Check />}</div>
              </motion.div>
            ))}

          </div>

          <AnimatePresence>
            {stage === 5 && (
              <motion.section className="receipt-drawer" initial={{ y: "105%" }} animate={{ y: 0 }} exit={{ y: "105%" }} transition={{ type: "spring", stiffness: 280, damping: 28 }} aria-label="Procurement authorization receipt" role="status">
                <div className="receipt-summary"><span>READY · POLICY 2.0</span><strong>4 resources · 3 authorizations</strong><p>Verified brief assembled and returned to the research agent.</p></div>
                <div className="receipt-total"><span>AUTHORIZED</span><strong>${total.toFixed(2)}</strong><small>of ${Number(budget || 0).toFixed(2)} USDC</small></div>
                <div className="receipt-proof"><FileCheck2 /><div><span>AUTHORIZATION RECEIPT</span><code>{demoReceipt.slice(0, 6)}…{demoReceipt.slice(-4)}</code></div><button type="button" aria-label="Copy authorization receipt" onClick={copyReceipt}><span>{copied ? "Copied" : "Copy"}</span></button></div>
              </motion.section>
            )}
          </AnimatePresence>

          <div className="event-rail">
            <div className="event-message"><span className="event-cursor" />{eventCopy[stage]}</div>
            <ol aria-label="Workflow progress">
              {["Discover", "Compare", "Pay", "Return"].map((label, index) => <li key={label} className={stage > index + 1 ? "complete" : stage === index + 1 ? "active" : ""}><span>{index + 1}</span>{label}</li>)}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
}
