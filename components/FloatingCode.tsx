"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CODE_SNIPPETS = [
  `function encrypt(data) {\n  const key = generateKey();\n  return cipher(data, key);\n}`,
  `const model = tf.sequential();\nmodel.add(layers.dense({\n  units: 128,\n  activation: 'relu'\n}));`,
  `async function scan(target) {\n  const ports = await nmap(target);\n  return ports.filter(open);\n}`,
  `SELECT users.name,\n  COUNT(sessions.id)\nFROM users\nJOIN sessions ON\n  users.id = sessions.uid\nGROUP BY users.name;`,
  `#!/bin/bash\nfor host in $(cat targets);\ndo\n  ping -c 1 $host\ndone`,
  `public class Node<T> {\n  T data;\n  Node<T> next;\n  Node(T data) {\n    this.data = data;\n  }\n}`,
  `import torch\nclass Net(nn.Module):\n  def forward(self, x):\n    return self.fc(x)`,
  `const router = express();\nrouter.get('/api', async (req, res) => {\n  const data = await db.query();\n  res.json(data);\n});`,
  `git commit -m "fix: auth bypass"\ngit push origin main\ngh pr create --fill`,
  `.container {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit,\n    minmax(300px, 1fr));\n  gap: 1.5rem;\n}`,
  `try {\n  const token = jwt.verify(\n    req.headers.auth,\n    SECRET\n  );\n} catch (e) {\n  return 401;\n}`,
  `docker build -t app .\ndocker run -d \\\n  -p 3000:3000 \\\n  --name server app`,
];

type FloatingSnippet = {
  id: number;
  code: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  direction: "up" | "down";
  size: "sm" | "md" | "lg";
  rotate: number;
};

function generateSnippets(count: number): FloatingSnippet[] {
  const snippets: FloatingSnippet[] = [];
  for (let i = 0; i < count; i++) {
    const size = ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg";
    snippets.push({
      id: i,
      code: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 35 + Math.random() * 30,
      delay: -(Math.random() * 40),
      direction: Math.random() > 0.5 ? "up" : "down",
      size,
      rotate: (Math.random() - 0.5) * 12,
    });
  }
  return snippets;
}

const sizeClasses = {
  sm: "text-[9px] leading-[14px] px-3 py-2 max-w-[160px]",
  md: "text-[10px] leading-[15px] px-4 py-3 max-w-[210px]",
  lg: "text-[11px] leading-[16px] px-4 py-3 max-w-[260px]",
};

export default function FloatingCode() {
  const reduceMotion = useReducedMotion();
  const [snippets, setSnippets] = useState<FloatingSnippet[]>([]);

  useEffect(() => {
    setSnippets(generateSnippets(14));
  }, []);

  if (reduceMotion || snippets.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    >
      {snippets.map((s) => (
        <motion.div
          key={s.id}
          className={`absolute font-mono whitespace-pre rounded-xl border border-accent/[0.15] bg-panel/[0.12] text-accent/[0.30] backdrop-blur-[0.5px] select-none ${sizeClasses[s.size]}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            rotate: `${s.rotate}deg`,
          }}
          animate={{
            y: s.direction === "up"
              ? ["0vh", "-110vh"]
              : ["0vh", "110vh"],
            x: [
              "0px",
              `${(Math.random() - 0.5) * 80}px`,
              `${(Math.random() - 0.5) * 60}px`,
              "0px",
            ],
          }}
          transition={{
            y: {
              duration: s.duration,
              repeat: Infinity,
              ease: "linear",
              delay: s.delay,
            },
            x: {
              duration: s.duration * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            },
          }}
        >
          {s.code}
        </motion.div>
      ))}
    </div>
  );
}