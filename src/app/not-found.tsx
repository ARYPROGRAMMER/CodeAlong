"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Code2Icon, HomeIcon, RotateCcwIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";


const generateCodeSnippets = () => [
  `function findPage(path) {`,
  `  // Looking for page...`,
  `  if (!path || path === "undefined") {`,
  `    throw new Error("Path not specified");`,
  `  }`,
  `  const pages = getAllPages();`,
  `  return pages.find(p => p.route === path);`,
  `}`,
  `// Page not found - I did not create this yet`,
  `return { status: 404 };`
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const errorCodes = [
  { code: "404", desc: "Page Not Found" },
  { code: "ECONNREFUSED", desc: "Connection Refused" },
  { code: "ETIMEDOUT", desc: "Connection Timed Out" },
  { code: "ENOTFOUND", desc: "Host Not Found" },
  { code: "ENETUNREACH", desc: "Network Unreachable" },
];

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [codeSnippets, setCodeSnippets] = useState(generateCodeSnippets());

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderFloatingElements = () => {
    if (!mounted) return null;
    
    return Array.from({ length: 15 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-primary/5 border border-primary/20 rounded-md w-8 h-8"
        initial={{ 
          x: Math.random() * dimensions.width, 
          y: -20,
          rotate: Math.random() * 180,
          opacity: 0.2 + Math.random() * 0.3
        }}
        animate={{ 
          y: dimensions.height + 20,
          rotate: Math.random() * 360,
          transition: { 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 5,
            ease: "linear"
          }
        }}
      />
    ));
  };


  if (!mounted) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-7xl font-bold mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-2">Page not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden z-0 opacity-50">
        <div className="absolute h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl -top-20 -left-20 animate-pulse" />
        <div className="absolute h-[250px] w-[250px] rounded-full bg-destructive/10 blur-3xl bottom-10 right-10 animate-pulse delay-1000" />
        <div className="absolute h-[200px] w-[200px] rounded-full bg-secondary/10 blur-3xl bottom-40 left-1/4 animate-pulse delay-2000" />

        {renderFloatingElements()}
      </div>

     
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
            className="mb-4 inline-block"
          >
            <Code2Icon 
              className="h-20 w-20 text-primary/80 mx-auto"
              strokeWidth={1.5}
            />
          </motion.div>
          <motion.h1 
            className="text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Page not found
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            The page you're looking for doesn't exist or has been moved.
            Let's help you get back on track.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Code snippet card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Card className="overflow-hidden border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="bg-muted/80 px-4 py-2 border-b border-border flex items-center">
                  <div className="flex space-x-2 mr-auto">
                    <div className="w-3 h-3 rounded-full bg-destructive/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <span className="text-xs text-muted-foreground">router.ts</span>
                </div>
                <ScrollArea className="h-[280px] font-mono text-sm p-4">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {codeSnippets.map((line, index) => (
                      <motion.div 
                        key={index} 
                        variants={itemVariants}
                        className={cn(
                          "py-1",
                          line.includes("Error") && "text-destructive",
                          line.includes("// Page not found") && "text-amber-500",
                          line.includes("return { status: 404 }") && "font-semibold"
                        )}
                      >
                        {line}
                      </motion.div>
                    ))}

                    <motion.div 
                      className="mt-4 border-t border-border/50 pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2 text-destructive font-medium">
                        <RotateCcwIcon className="h-4 w-4 animate-spin" />
                        <span>Process failed with status 404</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <Card className="h-full border-2 border-primary/10 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6 h-full flex flex-col">
                <motion.h3 
                  className="text-xl font-semibold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  All Issues
                </motion.h3>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3 flex-1"
                >
                  {errorCodes.map((error, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="flex items-center p-3 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all duration-300"
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    >
                      <div className="h-2 w-2 rounded-full bg-primary/70 mr-3 animate-pulse" 
                        style={{ animationDelay: `${i * 200}ms` }} 
                      />
                      <div>
                        <div className="font-mono text-sm font-medium">{error.code}</div>
                        <div className="text-xs text-muted-foreground">{error.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="flex gap-4 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <Button
                    onClick={() => router.back()}
                    variant="outline"
                    className="flex-1 gap-2"
                  >
                    <RotateCcwIcon className="h-4 w-4" />
                    Go Back
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <HomeIcon className="h-4 w-4" />
                      Home
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

   
        <motion.div
          className="flex justify-center space-x-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary/70"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </motion.div>

  
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        />
      </div>
    </div>
  );
}