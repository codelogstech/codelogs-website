import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAnthropic,
  SiDocker,
  SiFlutter,
  SiGooglegemini,
  SiJenkins,
  SiKotlin,
  SiKubernetes,
  SiLangchain,
  SiMeta,
  SiMistralai,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOllama,
  SiOpenai,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiScikitlearn,
  SiSpringboot,
  SiStripe,
  SiSwift,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
} from "react-icons/si";

// Map display name (as used in TECH_STACK) → icon component.
// Items not present here render with no icon (text-only chip).
export const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,

  "Node.js": SiNodedotjs,
  Python: SiPython,
  Java: SiOpenjdk,
  "Spring Boot": SiSpringboot,

  Swift: SiSwift,
  Kotlin: SiKotlin,
  "React Native": SiReact,
  Flutter: SiFlutter,

  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  // MS SQL Server: no icon available in Si or Fa; rendered as text-only.
  Redis: SiRedis,
  MySQL: SiMysql,

  // AWS pulled from simple-icons over trademark; using FontAwesome fallback.
  AWS: FaAws,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Jenkins: SiJenkins,

  OpenAI: SiOpenai,
  Anthropic: SiAnthropic,
  Gemini: SiGooglegemini,
  Mistral: SiMistralai,
  Ollama: SiOllama,
  // Llama is Meta's open model — using the Meta brand mark as the closest fit.
  Llama: SiMeta,
  LangChain: SiLangchain,
  TensorFlow: SiTensorflow,
  "scikit-learn": SiScikitlearn,

  Stripe: SiStripe,
  Razorpay: SiRazorpay,
};
